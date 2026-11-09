// Garde-fou Boutisse pour @netlinksinc/odoo-mcp 0.2.2
// Règles pures (aucune dépendance) : quel outil est exposé, et quels appels sont refusés,
// selon le profil du déploiement (variable d'environnement BOUTISSE_PROFIL).
//
// Profils :
//   lecture    : lire, compter, introspecter, imprimer un rapport PDF. Aucune écriture.
//   brouillon  : lecture + devis brouillons, activités, notes internes, pièces jointes de devis.
//   admin      : tous les outils, sauf pièces comptables, paiements, rapprochements, RIB, modules
//                (même périmètre interdit que scripts/odoo_write.py de Briac).
//
// Un refus renvoie un message en français ; l'appel n'atteint jamais Odoo.

export const PROFILS = ['lecture', 'brouillon', 'admin'];

const OUTILS_LECTURE = [
  'odoo_search_read',
  'odoo_read',
  'odoo_search_count',
  'odoo_fields_get',
  'odoo_run_report',
  'odoo_execute', // limité aux méthodes de lecture ci-dessous
];

const OUTILS = {
  lecture: new Set(OUTILS_LECTURE),
  brouillon: new Set([...OUTILS_LECTURE, 'odoo_create', 'odoo_write']),
  admin: new Set([...OUTILS_LECTURE, 'odoo_create', 'odoo_write', 'odoo_unlink', 'odoo_call_action']),
};

// Méthodes appelables par odoo_execute en lecture.
const METHODES_LECTURE = new Set([
  'search',
  'search_count',
  'name_search',
  'read_group',
  'formatted_read_group',
  'fields_get',
  'default_get',
  'check_access_rights',
  'has_access',
]);

// Profil brouillon : ce qu'on peut créer / modifier.
const CREATION_BROUILLON = new Set(['sale.order', 'sale.order.line', 'mail.activity', 'ir.attachment']);
const MODIFICATION_BROUILLON = new Set(['sale.order', 'sale.order.line', 'mail.activity']);
// Pièces jointes : seulement sur ces objets (photo de bon de commande sur un devis, etc.).
const PJ_MODELES = new Set(['sale.order', 'account.move', 'project.project']);
// Notes internes (message_post en sous-type note) : seulement sur ces objets.
const NOTE_MODELES = new Set(['sale.order', 'account.move', 'project.project', 'project.task', 'purchase.order', 'res.partner']);
// Champs jamais écrits par un assistant en profil brouillon.
const CHAMPS_INTERDITS = new Set([
  'state', 'move_type', 'payment_state', 'invoice_status', 'locked',
  'user_id', 'company_id', 'partner_bank_id', 'bank_account_id',
  'x_studio_bon_a_payer', 'x_studio_differences_commandefacture',
]);

// Profil admin : objets et méthodes intouchables (miroir de odoo_write.py).
const MODELES_PROTEGES = new Set([
  'account.move', 'account.move.line', 'account.payment', 'account.payment.register',
  'account.bank.statement', 'account.bank.statement.line', 'account.partial.reconcile',
  'account.full.reconcile', 'res.partner.bank', 'ir.module.module', 'res.users.apikeys',
]);
const METHODES_PROTEGEES = new Set([
  'action_post', 'button_draft', 'button_cancel', 'action_register_payment',
  'reconcile', 'remove_move_reconcile', 'action_validate', 'unlink',
  'button_immediate_install', 'button_immediate_uninstall', 'button_immediate_upgrade',
]);

export function profilCourant(env = process.env) {
  const p = (env.BOUTISSE_PROFIL || '').trim().toLowerCase();
  // Par défaut : lecture. Un oubli de configuration ne donne jamais plus de droits.
  return PROFILS.includes(p) ? p : 'lecture';
}

export function outilExpose(profil, outil) {
  return OUTILS[profil]?.has(outil) ?? false;
}

function champsDe(values) {
  const lignes = Array.isArray(values) ? values : [values];
  return lignes.flatMap((v) => (v && typeof v === 'object' ? Object.keys(v) : []));
}

function verifierNote(args) {
  // message_post accepté uniquement comme note interne, sans destinataire.
  if (!NOTE_MODELES.has(args.model)) return `Note interne refusée sur ${args.model}.`;
  const kw = args.kwargs || {};
  if (kw.subtype_xmlid !== 'mail.mt_note') {
    return "Seules les notes internes sont permises (subtype_xmlid = 'mail.mt_note') : rien ne part vers l'extérieur.";
  }
  if ((kw.partner_ids && kw.partner_ids.length) || kw.email_from || kw.mail_auto_delete === false) {
    return 'Une note interne ne peut pas avoir de destinataire.';
  }
  // Les arguments positionnels de message_post ne doivent pas servir à contourner la règle.
  if ((args.args || []).length > 1) return 'message_post : passer les paramètres par nom (kwargs).';
  return null;
}

// Renvoie null si l'appel est permis, sinon le motif du refus (texte français).
export function verifier(profil, outil, args = {}) {
  if (!outilExpose(profil, outil)) return `Outil ${outil} non disponible avec le profil « ${profil} ».`;

  if (profil === 'admin') {
    if (['odoo_create', 'odoo_write', 'odoo_unlink', 'odoo_call_action'].includes(outil) && MODELES_PROTEGES.has(args.model)) {
      return `Profil admin : ${args.model} est protégé (pièces comptables, paiements, rapprochements, RIB, modules). À faire dans Odoo par la personne habilitée.`;
    }
    if (outil === 'odoo_execute' && (METHODES_PROTEGEES.has(args.method) || (MODELES_PROTEGES.has(args.model) && !METHODES_LECTURE.has(args.method) && args.method !== 'message_post'))) {
      return `Profil admin : ${args.model}.${args.method} est protégé.`;
    }
    if (outil === 'odoo_call_action' && METHODES_PROTEGEES.has(args.action_name)) {
      return `Profil admin : action ${args.action_name} protégée.`;
    }
    return null;
  }

  if (outil === 'odoo_execute') {
    if (METHODES_LECTURE.has(args.method)) return null;
    if (profil === 'brouillon' && args.method === 'message_post') return verifierNote(args);
    return `Méthode ${args.method} refusée avec le profil « ${profil} » (lecture${profil === 'brouillon' ? ', brouillons et notes internes' : ''} uniquement).`;
  }

  if (outil === 'odoo_create') {
    if (!CREATION_BROUILLON.has(args.model)) return `Création refusée sur ${args.model} (profil brouillon : devis, activités, pièces jointes).`;
    const champs = champsDe(args.values);
    const interdit = champs.find((c) => CHAMPS_INTERDITS.has(c));
    if (interdit) return `Champ ${interdit} interdit : un assistant ne fixe jamais un statut, une validation ou un RIB.`;
    if (args.model === 'ir.attachment') {
      const lignes = Array.isArray(args.values) ? args.values : [args.values];
      if (!lignes.every((v) => PJ_MODELES.has(v?.res_model))) return 'Pièce jointe refusée : uniquement sur un devis, une facture ou un projet.';
    }
    return null;
  }

  if (outil === 'odoo_write') {
    if (!MODIFICATION_BROUILLON.has(args.model)) return `Modification refusée sur ${args.model} (profil brouillon : devis et activités).`;
    const interdit = champsDe(args.values).find((c) => CHAMPS_INTERDITS.has(c));
    if (interdit) return `Champ ${interdit} interdit : un assistant ne fixe jamais un statut, une validation ou un RIB.`;
    return null;
  }

  return null; // outils de lecture
}
