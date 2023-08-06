import { db } from '../firebase';

export default function SetUserPlan(userId, userPlan) {
    return db.collection('users').doc(userId).update({
        userPlan: userPlan,
    }).then(() => {
        console.log("User Plan successfully updated!");
    }
    ).catch((error) => {
        console.error("Error updating user plan: ", error);
    });
}
