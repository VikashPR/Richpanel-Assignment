import { db } from '../firebase';

export default function SetUserPlan(userId, userPlan) {
    return db.collection('users').doc(userId).update({
        userPlan: userPlan,
    });
}
