const CryptoJS = require('crypto-js');
require('dotenv').config();

// AES encryption
export const encrypt = (data) => {
  let encryptedData = {};
  const keys = Object.keys(data);
  const values = Object.values(data);

  values.forEach((plaintext, index) => {
    const ciphertext = CryptoJS.AES.encrypt(plaintext, process.env.REACT_APP_SECRET_KEY).toString();

    encryptedData = { ...encryptedData, [keys[index]]: ciphertext };
  });
  return encryptedData;
};

// AES decryption
export const decrypt = (data) => {
  let encryptedData = {};
  const keys = Object.keys(data);
  const values = Object.values(data);

  values.forEach((ciphertext, index) => {
    const plaintext = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    encryptedData = { ...encryptedData, [keys[index]]: plaintext };
  });
  return encryptedData;
};
