/* eslint-disable no-unused-vars */
/* eslint-disable jest/require-hook */
const crypto = require('crypto');
require('dotenv').config();

function genJWT() {
  const jwtSecret = crypto.randomBytes(256).toString('base64');
  return jwtSecret;
}
const xyz = genJWT();

function base64Encode(str) {
  return Buffer.from(str).toString('base64');
}

const email = 'tavish@dev.com'; // 'new@admin.com';
const password = 'dev'; // 'admin';

const obj = `${email}:${password}`;
const encoded = base64Encode(obj);

// Generate a random 32-byte key for encryption
// const secretKey = crypto.randomBytes(32).toString('hex');
const secretKey = process.env.CIPHER_SECRET;

// Encrypt a password using AES-256-GCM encryption
function encryptPassword(password) {
  // Convert the secret key to a buffer, this helps with encryption
  const keyBuffer = Buffer.from(secretKey, 'hex');

  // Generate a random 16-byte initialization vector (IV)
  const iv = crypto.randomBytes(16);

  // Create a cipher using AES-256-GCM with the key and IV
  const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);

  // Update the cipher with the password, encoding in 'utf8', and get the encrypted result in 'hex'
  let encryptedPassword = cipher.update(password, 'utf8', 'hex');

  // Finalize the cipher to get the last part of the encrypted data
  encryptedPassword += cipher.final('hex');

  // Get the authentication tag used for integrity verification
  const authTag = cipher.getAuthTag();

  // Combine IV, authentication tag, and encrypted password for storage or transmission
  //                [0-32]                      [32-64]                     [64-]
  const encrpyted = iv.toString('hex') + authTag.toString('hex') + encryptedPassword;
  return encrpyted;
}

// Decrypt an encrypted password using AES-256-GCM
function decryptPassword(encryptedPassword) {
  // Convert the secret key to a buffer
  const keyBuffer = Buffer.from(secretKey, 'hex');

  // Extract IV and authentication tag from the encrypted password
  const iv = Buffer.from(encryptedPassword.slice(0, 32), 'hex');
  const authTag = Buffer.from(encryptedPassword.slice(32, 64), 'hex');

  // Create a decipher using AES-256-GCM with the key and IV
  const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);

  // Set the authentication tag for decryption
  decipher.setAuthTag(authTag);

  try {
    // Update the decipher with the encrypted password
    // encoding in 'hex', and get the decrypted result in 'utf8'
    let decryptedPassword = decipher.update(encryptedPassword.slice(64), 'hex', 'utf8');

    // Finalize the decipher to get the last part of the decrypted data
    decryptedPassword += decipher.final('utf8');

    // Return the decrypted password
    return decryptedPassword;
  } catch (error) {
    // Handle decryption errors and log the details
    console.error('Error during decryption:', error.message);

    // Return null if decryption fails
    return null;
  }
}

// Example usage: Encrypt and then decrypt a password after a delay
setTimeout(async () => {
  const originalPassword = 'admin123';

  // Encrypt the original password
  const encryptedPassword = encryptPassword(originalPassword);
  console.log('Encrypted Password:', encryptedPassword);

  // Decrypt the encrypted password
  const decryptedPassword = decryptPassword(encryptedPassword);
  console.log('Decrypted Password:', decryptedPassword);
}, 100);
