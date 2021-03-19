const CryptoJS = require("crypto-js")
require("dotenv").config()

// AES encryption
export const encrypt = (data) => {
  let encryptedDate = {}
  const keys = Object.keys(data)
  const values = Object.values(data)

  values.forEach((plaintext, index) => {
    const ciphertext = CryptoJS.AES.encrypt(plaintext, process.env.REACT_APP_SECRET_KEY).toString()
    encryptedDate = { ...encryptedDate, [keys[index]]: ciphertext }
  })
  return encryptedDate
}

// AES decryption
export const decrypt = (data) => {
  let decryptedDate = {}
  const keys = Object.keys(data)
  const values = Object.values(data)

  values.forEach((ciphertext, index) => {
    const plaintext = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8)
    decryptedDate = { ...decryptedDate, [keys[index]]: plaintext }
  })
  return decryptedDate
}
