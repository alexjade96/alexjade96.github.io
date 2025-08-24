// scripts/generate-meta.js
import fs from 'fs';
fs.writeFileSync('static/site-meta.json', JSON.stringify({
  lastUpdated: new Date().toISOString()
}));
