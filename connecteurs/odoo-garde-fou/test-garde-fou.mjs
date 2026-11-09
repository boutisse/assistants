// Test du garde-fou contre le vrai code du connecteur (0.2.2), sans Odoo :
// un faux client Odoo enregistre les appels qui passent.
// Usage : node test-garde-fou.mjs <chemin vers dist/tools/index.js patché>
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const cible = process.argv[2];
if (!cible) throw new Error('Chemin de dist/tools/index.js manquant');

const appels = [];
const fauxClient = new Proxy({}, {
  get: (_, methode) => async (...a) => { appels.push(methode); return methode === 'create' ? 42 : []; },
});
const clientResolver = async () => ({ client: fauxClient, session: { allowedCompanyIds: [1], uid: 2, context: {} } });
const logger = { toolCall() {}, info() {}, warn() {}, error() {} };

async function monter(profil) {
  process.env.BOUTISSE_PROFIL = profil;
  const mod = await import(`${pathToFileURL(cible).href}?p=${profil}`);
  const outils = new Map();
  const server = { registerTool: (nom, _meta, h) => outils.set(nom, h) };
  mod.registerAllTools(server, clientResolver, logger);
  return outils;
}

async function appeler(outils, nom, args) {
  appels.length = 0;
  const r = await outils.get(nom)(args, {});
  return { refus: r.isError && r.content[0].text.includes('RefusGardeFouBoutisse'), r, atteintOdoo: appels.length > 0 };
}

let n = 0;
const ok = (msg) => { n += 1; console.log(`ok ${n} - ${msg}`); };

// ---- lecture
let o = await monter('lecture');
assert.deepEqual([...o.keys()].sort(), ['odoo_execute', 'odoo_fields_get', 'odoo_read', 'odoo_run_report', 'odoo_search_count', 'odoo_search_read']);
ok('lecture : 6 outils exposés, ni create/write/unlink/call_action');
let t = await appeler(o, 'odoo_search_read', { model: 'account.move', domain: [], fields: ['name'] });
assert.ok(!t.refus && t.atteintOdoo); ok('lecture : search_read passe');
t = await appeler(o, 'odoo_execute', { model: 'account.move.line', method: 'read_group', args: [[], ['balance'], ['account_id']] });
assert.ok(!t.refus && t.atteintOdoo); ok('lecture : read_group passe');
t = await appeler(o, 'odoo_execute', { model: 'account.move', method: 'action_post', args: [[1]] });
assert.ok(t.refus && !t.atteintOdoo); ok('lecture : action_post refusé avant Odoo');
t = await appeler(o, 'odoo_execute', { model: 'account.move', method: 'message_post', kwargs: { body: 'x', subtype_xmlid: 'mail.mt_note' } });
assert.ok(t.refus && !t.atteintOdoo); ok('lecture : même une note interne est refusée');

// ---- brouillon
o = await monter('brouillon');
assert.ok(o.has('odoo_create') && o.has('odoo_write') && !o.has('odoo_unlink') && !o.has('odoo_call_action'));
ok('brouillon : create/write exposés, unlink/call_action masqués');
t = await appeler(o, 'odoo_create', { model: 'sale.order', values: { partner_id: 7, client_order_ref: 'BC-123' } });
assert.ok(!t.refus && t.atteintOdoo); ok('brouillon : devis brouillon créé');
t = await appeler(o, 'odoo_create', { model: 'sale.order', values: { partner_id: 7, state: 'sale' } });
assert.ok(t.refus && !t.atteintOdoo); ok('brouillon : devis confirmé refusé (champ state)');
t = await appeler(o, 'odoo_create', { model: 'account.move', values: { move_type: 'out_invoice' } });
assert.ok(t.refus && !t.atteintOdoo); ok('brouillon : création de facture refusée');
t = await appeler(o, 'odoo_write', { model: 'account.move', ids: [6966], values: { ref: 'x' } });
assert.ok(t.refus && !t.atteintOdoo); ok('brouillon : modification de facture refusée');
t = await appeler(o, 'odoo_write', { model: 'res.partner.bank', ids: [3], values: { acc_number: 'FR76' } });
assert.ok(t.refus && !t.atteintOdoo); ok('brouillon : modification de RIB refusée');
t = await appeler(o, 'odoo_execute', { model: 'account.move', method: 'message_post', kwargs: { body: 'Écart BC 02322', subtype_xmlid: 'mail.mt_note' } });
assert.ok(!t.refus && t.atteintOdoo); ok('brouillon : note interne sur facture acceptée');
t = await appeler(o, 'odoo_execute', { model: 'account.move', method: 'message_post', kwargs: { body: 'x', subtype_xmlid: 'mail.mt_comment', partner_ids: [12] } });
assert.ok(t.refus && !t.atteintOdoo); ok('brouillon : message avec destinataire refusé');
t = await appeler(o, 'odoo_create', { model: 'ir.attachment', values: { name: 'bc.jpg', res_model: 'sale.order', res_id: 1, datas: 'AA==' } });
assert.ok(!t.refus); ok('brouillon : photo du BC jointe au devis');
t = await appeler(o, 'odoo_create', { model: 'ir.attachment', values: { name: 'x', res_model: 'res.users', res_id: 1 } });
assert.ok(t.refus); ok('brouillon : pièce jointe hors périmètre refusée');

// ---- admin
o = await monter('admin');
assert.ok(o.has('odoo_unlink') && o.has('odoo_call_action'));
ok('admin : 10 outils exposés');
t = await appeler(o, 'odoo_write', { model: 'ir.actions.server', ids: [951], values: { name: 'x' } });
assert.ok(!t.refus); ok('admin : action serveur modifiable');
t = await appeler(o, 'odoo_unlink', { model: 'account.move', ids: [6833] });
assert.ok(t.refus && !t.atteintOdoo); ok('admin : suppression de pièce comptable refusée');
t = await appeler(o, 'odoo_execute', { model: 'account.move', method: 'action_post', args: [[1]] });
assert.ok(t.refus); ok('admin : comptabilisation refusée');
t = await appeler(o, 'odoo_write', { model: 'res.partner.bank', ids: [1], values: { allow_out_payment: true } });
assert.ok(t.refus); ok('admin : RIB « de confiance » refusé');

// ---- profil absent ou faux => lecture
o = await monter('nimportequoi');
assert.ok(!o.has('odoo_create')); ok('profil inconnu : retombe en lecture');

console.log(`\n${n} tests passés`);
