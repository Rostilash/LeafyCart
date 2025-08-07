import * as functions from "firebase-functions";
import * as corsLib from "cors";

const cors = corsLib({ origin: true });

export const createLiqPayPayment = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { amount, name, email } = req.body;

    // Твоя логіка генерації LiqPay payment data
    const data = "generatedData";
    const signature = "generatedSignature";

    res.json({ data, signature });
  });
});
