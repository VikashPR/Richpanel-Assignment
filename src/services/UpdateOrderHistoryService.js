import { db } from '../firebase';

// for everynew order, add it to the user's order history

export default function UpdateOrderHistory(uId, orderDetails) {
    let oldOrderHistory = [];
    db.collection("orderHistory").doc(uId).get().then((doc) => {
        if (doc.exists) {
            doc.data().orderHistory.forEach((order) => {
                order.planStatus = "cancelled";
                oldOrderHistory.push(order);
            });
        }
    }).then(() => {
        oldOrderHistory.push(orderDetails);
        db.collection("orderHistory").doc(uId).set({
            orderHistory: oldOrderHistory
        });
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}