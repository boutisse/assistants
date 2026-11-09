// Remplace dist/tools/index.js de @netlinksinc/odoo-mcp 0.2.2 (version épinglée).
// Les outils sont enregistrés à travers un intermédiaire qui :
//   1. n'expose pas les outils hors profil (ils n'apparaissent même pas à Claude) ;
//   2. vérifie chaque appel avant qu'il n'atteigne Odoo (regles.js).
import { registerActionTool } from './action.js';
import { registerExecuteTool } from './execute.js';
import { registerIntrospectTool } from './introspect.js';
import { registerOrmTools } from './orm.js';
import { registerReportTool } from './report.js';
import { outilExpose, profilCourant, verifier } from './regles.js';

function journal(evenement) {
  process.stderr.write(`${JSON.stringify({ event: 'boutisse_garde_fou', ...evenement })}\n`);
}

export function registerAllTools(server, clientResolver, logger) {
  const profil = profilCourant();
  journal({ profil, etape: 'demarrage' });

  const intermediaire = {
    registerTool(nom, meta, handler) {
      if (!outilExpose(profil, nom)) {
        journal({ profil, outil: nom, etape: 'outil_masque' });
        return undefined;
      }
      return server.registerTool(nom, meta, async (args, extra) => {
        const refus = verifier(profil, nom, args || {});
        if (refus) {
          journal({ profil, outil: nom, model: args?.model, method: args?.method, etape: 'refus', motif: refus });
          return {
            content: [{ type: 'text', text: JSON.stringify({ error_type: 'RefusGardeFouBoutisse', message: refus }) }],
            isError: true,
          };
        }
        return handler(args, extra);
      });
    },
  };

  registerOrmTools(intermediaire, clientResolver, logger);
  registerExecuteTool(intermediaire, clientResolver, logger);
  registerReportTool(intermediaire, clientResolver, logger);
  registerActionTool(intermediaire, clientResolver, logger);
  registerIntrospectTool(intermediaire, clientResolver, logger);
}
