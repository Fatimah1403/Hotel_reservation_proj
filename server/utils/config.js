/* eslint-disable no-unused-vars */
/* eslint-disable jest/require-hook */
const crypto = require('crypto');

function genJWT() {
  const jwtSecret = crypto.randomBytes(256).toString('base64');
  return jwtSecret;
}
const xyz = genJWT();
console.log({ xyz });

function base64Encode(str) {
  return Buffer.from(str).toString('base64');
}

const email = 'tavish@dev.com'; // 'new@admin.com';
const password = 'dev'; // 'admin';

const obj = `${email}:${password}`;
const encoded = base64Encode(obj);
console.log({ encoded });