// Test firebase function

const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

const stripe = require("stripe")(
  "sk_test_51NbNxWSCvAqhlDJn8zY5tIk8MOuKR8hB9SQoEIu6sidnQr3qHTLjOrnJYIWi6obApW1ANCTrnLBB0EhN7KuMetsh00N8Pz19wv"
);

exports.createStripeCharge = functions.firestore
  .document("charges/{uId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    try {
      const charge = {
        amount: data.price,
        currency: "INR",
        source: data.source.id,
      };
      const idempotencyKey = context.params.uId;

      const res = await stripe.charges.create(charge, { idempotencyKey });

      await snap.ref.set({ charge }, { merge: true });
    } catch (error) {
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
    }
  });
