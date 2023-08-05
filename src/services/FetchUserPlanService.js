import { db } from '../firebase';


export const fetchUserPlan = async (userId) => {
    const userPlan = await db.collection('users').doc(userId).get();
    console.log(userPlan.data().userPlan);
    return userPlan.data().userPlan;
}
    