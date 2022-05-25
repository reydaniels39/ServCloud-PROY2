'use strict';

var CryptoJS = require("crypto-js");

module.exports.encrypt = async (event) => {
  const mensaje = event.pathParameters.mensaje;
  const Key = "EncryptionKey"

  try{
    var encrypted = CryptoJS.AES.encrypt(mensaje, Key).toString();
    
    encrypted = encrypted.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');
    
    return {
      MensajeEncriptado: encrypted,
      Key: Key
    };
  }
  catch(error){
    console.info(error);
    throw new Error(error);
  }
};

module.exports.decrypt = async (event) => {
  const mensaje = event.pathParameters.mensaje;
  const Key = event.pathParameters.key;

  var mensajeR = mensaje.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');

  try{
    var decrypted = CryptoJS.AES.decrypt(mensajeR, Key).toString(CryptoJS.enc.Utf8);
    return {
      MensajeDesencriptado: decrypted,
    };
  }
  catch(error){
    console.info(error);
    throw new Error(error);
  }
};

//https://lfgbigjewg.execute-api.us-west-2.amazonaws.com/encrypt/{mensaje}
//https://lfgbigjewg.execute-api.us-west-2.amazonaws.com/decrypt/{mensaje}/{key}