# Connecteur Odoo Boutisse = @netlinksinc/odoo-mcp 0.2.2 (épinglé) + garde-fou Boutisse.
# La version est épinglée parce que le garde-fou remplace dist/tools/index.js :
# toute montée de version se fait à la main, après relecture du nouveau index.js.
FROM node:22-slim

RUN npm install -g @netlinksinc/odoo-mcp@0.2.2 && npm cache clean --force

ARG CIBLE=/usr/local/lib/node_modules/@netlinksinc/odoo-mcp/dist/tools
COPY regles.js ${CIBLE}/regles.js
COPY index.js  ${CIBLE}/index.js

# Profil par défaut : lecture. Le déploiement « brouillon » le surcharge (fly.brouillon.toml).
ENV MODE=http \
    MCP_PORT=3000 \
    MCP_TRUST_PROXY=true \
    MCP_USER_STORE_PATH=/data/users.json \
    BOUTISSE_PROFIL=lecture

EXPOSE 3000
CMD ["odoo-mcp"]
