#!/usr/bin/env node
// tools/coop-csv-to-batch.cjs
const fs = require('fs');
const path = require('path');

const src = process.argv[2] || 'examples/coop_delivery.csv';
const out = process.argv[3] || 'out/coop-delivery-batch.json';

if (!fs.existsSync(src)) {
  console.error('CSV not found:', src);
  process.exit(1);
}

const raw = fs.readFileSync(src, 'utf8').trim();
const lines = raw.split(/\r?\n/);
const header = lines.shift().split(',');

// simple CSV → objects
const rows = lines.map(line => {
  const parts = line.split(',');
  const obj = {};
  header.forEach((h, idx) => {
    obj[h] = (parts[idx] || '').replace(/^"|"$/g, '');
  });
  return obj;
});

const now = new Date().toISOString();

// on fabrique un batch RWA
const batch = {
  type: 'wakama.rwa.coop.delivery',
  version: 1,
  source: 'coop-csv',
  ts: now,
  site: {
    country: 'CI'
  },
  deliveries: rows.map(r => ({
    coop_id: r.coop_id,
    coop_name: r.coop_name,
    farmer_id: r.farmer_id,
    farmer_name: r.farmer_name,
    crop: r.crop,
    quantity_kg: Number(r.quantity_kg),
    unit_price_usd: Number(r.unit_price_usd),
    delivery_date: r.delivery_date,
    zone: r.zone,
    field: r.field,
    notes: r.notes
  })),
  meta: {
    rows: rows.length,
    note: 'Generated from CSV by tools/coop-csv-to-batch.cjs'
  }
};

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(batch, null, 2));
console.log('Wrote batch:', out);
