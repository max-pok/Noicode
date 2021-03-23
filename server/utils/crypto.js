const CryptoJS = require("crypto-js")

// AES encryption
const encrypt = (data) => {
  let encryptedData = {}
  const keys = Object.keys(data)
  const values = Object.values(data)

  values.forEach((plaintext, index) => {
    const ciphertext = CryptoJS.AES.encrypt(plaintext, process.env.REACT_APP_SECRET_KEY).toString()
    encryptedData = { ...encryptedData, [keys[index]]: ciphertext }
  })
  return encryptedData
}

// AES decryption
const decrypt = (ciphertext) => {
  return CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8)
}

module.exports = { encrypt, decrypt }
