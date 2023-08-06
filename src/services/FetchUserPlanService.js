import { db } from '../firebase';


export const fetchUserPlan = async (userId) => {
    const userPlan = await db.collection('users').doc(userId).get();
    return userPlan.data().userPlan;
}
    