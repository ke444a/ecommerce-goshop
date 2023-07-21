import Stripe from "stripe";

export const processOrderAddress = (address: Stripe.Address | null) => {
    const line1 = [address?.line1, address?.line2].filter(Boolean).join(", ");
    const line2 = [address?.city, address?.state].filter(Boolean).join(", ");
    const line3 = [address?.postal_code].filter(Boolean).join(", ");

    const finalAddress = [line1, line2, line3].filter(Boolean).join(", ");
    return finalAddress;
};