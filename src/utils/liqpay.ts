import CryptoJS from "crypto-js";

export const generateDataAndSignature = (params: Record<string, any>, privateKey: string, publicKey: string) => {
  const dataToSign = {
    ...params,
    public_key: publicKey,
  };

  const jsonString = JSON.stringify(dataToSign);
  const data = btoa(unescape(encodeURIComponent(jsonString)));
  const signature = CryptoJS.SHA1(privateKey + data + privateKey).toString(CryptoJS.enc.Base64);

  return { data, signature };
};
