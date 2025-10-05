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

export function liqPayPromise(data: string, signature: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const liqpay = (window as any).LiqPayCheckout.init({
      data,
      signature,
      embedTo: "#liqpay_checkout",
      mode: "popup",
    });

    liqpay.on("liqpay.callback", (response: any) => {
      if (response.status === "success" || response.status === "sandbox") {
        resolve(response);
      } else {
        reject(new Error("Payment failed or cancelled"));
      }
    });

    liqpay.on("liqpay.close", () => reject(new Error("Payment window closed")));
  });
}
