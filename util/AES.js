// crypto
// const crypto = require('crypto');

// function aesEncrypt(data, key) {
//     const cipher = crypto.createCipher('aes192', key);
//     var crypted = cipher.update(data, 'utf8', 'hex');
//     crypted += cipher.final('hex');
//     return crypted;
// }

// function aesDecrypt(encrypted, key) {
//     const decipher = crypto.createDecipher('aes192', key);
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }


// var data = 'Hello, this is a secret message!';
// var key = 'Password!';
// var encrypted = aesEncrypt(data, key);
// var decrypted = aesDecrypt(encrypted, key);




// jsencrypt

// const JSEncrypt = require('jsencrypt')

// // 加密
// function aesEncrypt(data) {
//     var encryptor = new JSEncrypt()  // 创建加密对象实例
//     //之前ssl生成的公钥，复制的时候要小心不要有空格
//     var pubKey = '-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJj8Oa9t2N8t/7W4MBAdGS4cl8fSR4ljoVnsJ29jN/TJchEMAw7H1WEtaX880c72AnGDxXj88/COOD/WinLT4ZECAwEAAQ==-----END PUBLIC KEY-----'
//     encryptor.setPublicKey(pubKey)//设置公钥
//     return encryptor.encrypt(data)  // 对内容进行加密
// }


// // 解密
// function aesDecrypt(data) {
//     var decrypt = new JSEncrypt() //创建解密对象实例
//     //之前ssl生成的秘钥
//     var priKey  = '-----BEGIN RSA PRIVATE KEY-----MIIBOgIBAAJBAJj8Oa9t2N8t/7W4MBAdGS4cl8fSR4ljoVnsJ29jN/TJchEMAw7H1WEtaX880c72AnGDxXj88/COOD/WinLT4ZECAwEAAQJAJkTiATpPR/TvxHtguocs51YLudamQn4DvMTQUJLXSoo+u70O+6pDMNO4tZvNA2VYWSCydxkgYH+Buc3SrGW2YQIhAM8XqM1uFVsfgPIOPpG2W2gMvr95pKUPlFYyObOBrFG9AiEAvR1ea31jAz/pF9Kc9M+UlFvSPY97a34Bz+s0BWkDSmUCIHSRE7H2Sc0N0Y3uGKf6Jj9OFTw/4z4Jo+xUvwfccLtdAiEAoQ+NJZCRLehVVVOrFxhfGwckhAdZ/o8/bduL33uzML0CIFZEKBoID/4bgi6q93AxYk3Bq1ou64QxDT4rKEI8ngun-----END RSA PRIVATE KEY-----'
//     decrypt.setPrivateKey(priKey)//设置秘钥
//     return decrypt.decrypt(data)//解密之前拿公钥加密的内容
// }



// node-rsa

const NodeRSA = require('node-rsa');

// const key = new NodeRSA({ b: 512 }); //生成512位的密钥，用来生成公钥，私钥

// var pubkey = key.exportKey('pkcs8-public');  //导出公钥
// var prikey = key.exportKey('pkcs8-private');  // 用来生成公钥，私钥

// console.log(pubkey)
// console.log(prikey)

// 公钥加密
function aesEncrypt(data) {
    const publicKey = "-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJcQ15iV34jLMoqmlcDCTPHd5S+A5OD5D7e+IAGq1Ka25/uvgec9GQFe0nM2tLqy/GkcXtvD2E8uAIic/qmIVK0CAwEAAQ==-----END PUBLIC KEY-----"
    const nodersa = new NodeRSA(publicKey);
    const encrypted = nodersa.encrypt(data, 'base64');
    return encrypted;
}

 
// 私钥解密
function aesDecrypt(data) {
    const privateKey = "-----BEGIN PRIVATE KEY-----MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEAlxDXmJXfiMsyiqaVwMJM8d3lL4Dk4PkPt74gAarUprbn+6+B5z0ZAV7Scza0urL8aRxe28PYTy4AiJz+qYhUrQIDAQABAkEAkxZYBX6wJt5KeMvYddX522pFk+o5cH+w+SQKv/TYlvVtPtEgEWLYEk3SB8+O43IWL482fYuKN3lfBMkFqj8GtQIhAOvgBi1Xv5ZhEzVRV5cBnZ4QVHTX+3KN7MbVFzY0alx7AiEAo/Rqg2WTKQ2UGj9M00Zt0biO47eW9Nhsw5V1J/hxLvcCIQDXkaMzl2lyTv/WD6QkTwa06am2K5oTRKAry53uHRNDtwIgYJf4RM+MIsyoK8qNZZAB1WQpcwnPuxLjCVu9eT4K2MMCIQDDRoIvh4WYyVPsvtDlA/4Xa77i/Wzz1NQDPJovEA2uRQ==-----END PRIVATE KEY-----"
    const nodersa = new NodeRSA(privateKey);
    const decrypted = nodersa.decrypt(data, 'utf8');
    return decrypted;
}
 
 
// 实例
// const data = { name: 'owen', age: 20 };
// const encrypted = encrypt(data);
// console.log('encrypted:', encrypted);
 
// const decrypted = decrypt(encrypted);
// console.log('decrypted:', decrypted);


module.exports = {
    aesEncrypt,
    aesDecrypt
}