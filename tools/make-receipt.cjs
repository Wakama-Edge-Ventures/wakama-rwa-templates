#!/usr/bin/env node
// tools/make-receipt.cjs
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const src = process.argv[2];
const outDir = process.argv[3] || 'receipts';

if (!src) {
  console.error('usage: node tools/make-receipt.cjs <batch.json> [outdir]');
  process.exit(1);
}

const raw = fs.readFileSync(src, 'utf8');
const sha = crypto.createHash('sha256').update(raw).digest('hex');
const now = new Date().toISOString();

const parsed = JSON.parse(raw);

const receipt = {
  cid: 'QmPLACEHOLDER',         // will be replaced by real Pinata CID
  sha256: sha,
  tx: '',
  file: path.basename(src),
  gw: 'https://gateway.pinata.cloud/ipfs',
  source: parsed.source || 'simulated',
  status: 'n/a',
  slot: null,
  ts: now
};

// new: keep rwa_kind if present
if (parsed.rwa_kind) {
  receipt.rwa_kind = parsed.rwa_kind;
}

fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${Date.now()}-receipt.json`);
fs.writeFileSync(outPath, JSON.stringify(receipt, null, 2));
console.log('Wrote receipt', outPath);
