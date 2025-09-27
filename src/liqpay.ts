// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import * as crypto from "crypto";
// import type { PaymentProps } from "./redux/slices/checkoutSlice";

// admin.initializeApp();

// const LIQPAY_PUBLIC_KEY = "sandbox";
// const LIQPAY_PRIVATE_KEY = "sandbox";

// exports.createLiqPayPayment = functions.https.onCall(async (request: functions.https.CallableRequest<PaymentProps>) => {
//   const { amount, name, email } = request.data;

//   const order_id = `order_${Date.now()}`;
//   const liqpayParams = {
//     public_key: LIQPAY_PUBLIC_KEY,
//     version: "3",
//     action: "pay",
//     amount,
//     currency: "UAH",
//     description: `Замовлення від ${name}, email: ${email}`,
//     order_id,
//     result_url: "https://your-site.com/success",
//     server_url: "https://your-site.com/api/liqpay-callback",
//   };

//   const jsonString = JSON.stringify(liqpayParams);
//   const dataEncoded = Buffer.from(jsonString).toString("base64");
//   const signature = crypto
//     .createHash("sha1")
//     .update(LIQPAY_PRIVATE_KEY + dataEncoded + LIQPAY_PRIVATE_KEY)
//     .digest("base64");

//   return { data: dataEncoded, signature };
// });
