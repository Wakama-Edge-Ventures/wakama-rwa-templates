#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// how many deliveries to generate
const N = parseInt(process.argv[2] || '5', 10);
// output dir
const outDir = process.argv[3] || 'generated';

fs.mkdirSync(outDir, { recursive: true });

for (let i = 0; i < N; i++) {
  const ts = new Date(Date.now() - i * 60_000).toISOString();
  const qty = 1100 + i * 37;

  const obj = {
    type: 'wakama.coop.delivery',
    version: 1,
    rwa_kind: 'coop_delivery',
    source: 'ingest',
    coop: {
      name: 'Etra',
      zone: 'Bouaké',
      village: 'KouassiKongokro',
      gps: [7.495783, -4.917362],
      signed_with: 'Wakama.farm',
      signed_at: '2025-04-23',
      surface_ha: 400
    },
    delivery: {
      batch_id: `etra-bouake-2025-04-23-${String(i + 1).padStart(2, '0')}`,
      crops: ['manioc', 'maize', 'tomato'],
      quantity_kg: qty,
      farmer_count: 20 + i,
      notes: 'auto-generated for dashboard demo'
    },
    ts
  };

  const outPath = path.join(outDir, `coop-delivery-${i + 1}.json`);
  fs.writeFileSync(outPath, JSON.stringify(obj, null, 2));
  console.log('Wrote', outPath);
}
