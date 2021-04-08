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
const decrypt = (data) => {
  let decryptedData = {}
  const keys = Object.keys(data)
  const values = Object.values(data)

  values.forEach((ciphertext, index) => {
    const text = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8)
    decryptedData = { ...decryptedData, [keys[index]]: text }
  })
  return decryptedData
}

module.exports = { encrypt, decrypt }
