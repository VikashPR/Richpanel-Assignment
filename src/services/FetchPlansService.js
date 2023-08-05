import { db } from '../firebase';

export const fetchPlans = async () => {
    const plans = await db.collection('plans').get();
    return plans.docs.map((plan) => plan.data());
}
