import { db } from '../firebase';

export default function setUserCharge(userId, stripeObject) {
    console.log("setUserCharge", userId, stripeObject);
  return db.collection("charges").doc(userId).set(stripeObject);
}

