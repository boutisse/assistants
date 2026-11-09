// Phase 4 : test de bout en bout du connecteur Odoo + garde-fou, profil lecture,
// contre la copie de test, avec la clé d'un utilisateur de test.
// Usage : node p4-test.mjs <dossier du paquet odoo-mcp patché>
// Variables : ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_API_KEY (lues dans l'environnement, jamais affichées).
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'node:path';

const pkg = process.argv[2];
const transport = new StdioClientTransport({
  command: 'node',
  args: [path.join(pkg, 'dist/bin.js')],
  env: { ...process.env, MODE: 'stdio', BOUTISSE_PROFIL: 'lecture' },
  stderr: 'pipe',
});
const journal = [];
transport.stderr?.on('data', (d) => journal.push(String(d)));
const client = new Client({ name: 'p4-test', version: '1.0.0' });
await client.connect(transport);

const appel = async (name, args) => {
  const r = await client.callTool({ name, arguments: args });
  const texte = (r.content || []).map((c) => c.text || '').join('\n');
  let data = null;
  try { data = JSON.parse(texte); } catch { /* texte brut */ }
  return { erreur: !!r.isError, refus: texte.includes('RefusGardeFouBoutisse'), texte, data };
};
const res = [];
const note = (test, ok, detail) => res.push({ test, ok, detail });

// 1. Outils exposés
const outils = (await client.listTools()).tools.map((t) => t.name).sort();
const attendus = ['odoo_execute', 'odoo_fields_get', 'odoo_read', 'odoo_run_report', 'odoo_search_count', 'odoo_search_read'];
note('Outils exposés = 6 outils de lecture', JSON.stringify(outils) === JSON.stringify(attendus), outils.join(', '));

// 2. Qui suis-je ? (méthode du socle : res.users.settings, filtré par Odoo sur la personne connectée)
const us = await appel('odoo_search_read', { model: 'res.users.settings', domain: [], fields: ['user_id'], limit: 5 });
const lignes = Array.isArray(us.data) ? us.data : [];
note('Qui suis-je ?', lignes.length === 1, lignes.length ? `uid ${lignes[0].user_id[0]} → ${lignes[0].user_id[1]}` : us.texte.slice(0, 300));

// 3. Paie : ce que la clé voit
const j = await appel('odoo_search_read', { model: 'account.journal', domain: [['name', 'ilike', 'paie']], fields: ['name', 'code'], limit: 10 });
const journaux = Array.isArray(j.data) ? j.data : (j.data?.records || []);
note('Journal de paie visible', journaux.length > 0, journaux.map((x) => `${x.code} ${x.name}`).join(' ; ') || j.texte.slice(0, 200));
const c64 = await appel('odoo_search_count', { model: 'account.move.line', domain: [['account_id.code', '=like', '64%']] });
note('Lignes en comptes 64 (salaires) visibles', !c64.erreur, c64.erreur ? c64.texte.slice(0, 200) : `${c64.texte.trim()} lignes`);

// 4. Écritures : toutes doivent être refusées par le garde-fou, avant Odoo (ids inexistants par sécurité)
const tentatives = [
  ['Comptabiliser une facture (action_post)', { model: 'account.move', method: 'action_post', args: [[999999999]] }],
  ['Créer via execute (create)', { model: 'mail.activity', method: 'create', args: [{}] }],
  ['Modifier via execute (write)', { model: 'res.partner', method: 'write', args: [[999999999], { name: 'x' }] }],
  ['Poster un message (message_post)', { model: 'account.move', method: 'message_post', args: [[999999999]], kwargs: { body: 'test' } }],
  ['Supprimer via execute (unlink)', { model: 'sale.order', method: 'unlink', args: [[999999999]] }],
];
for (const [label, args] of tentatives) {
  const r = await appel('odoo_execute', args);
  note(`Refus : ${label}`, r.refus, r.refus ? 'refusé par le garde-fou' : r.texte.slice(0, 200));
}

await client.close();
const traces = journal.join('').split('\n').filter((l) => l.includes('boutisse_garde_fou') && l.includes('refus')).length;
note('Refus tracés (boutisse_garde_fou)', traces >= tentatives.length, `${traces} lignes`);

for (const r of res) console.log(`${r.ok ? 'OK  ' : 'KO  '} ${r.test} — ${r.detail}`);
console.log(`\n${res.filter((r) => r.ok).length}/${res.length} OK`);
