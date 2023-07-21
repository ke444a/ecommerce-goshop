import { useMemo } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrdersDetailedByUserQuery } from "../api/getOrdersDetailedByUser";
import { OrderPreview } from "./OrderPreview";

export const Orders = () => {
    const { currentUser, token } = useAuth();
    const { data: userOrders } = useGetOrdersDetailedByUserQuery(currentUser?.uid || "", token);

    const ordersComponent = useMemo(() => {
        if (!userOrders) {
            return null;
        }

        return userOrders.map((order) => (
            <OrderPreview key={order.id} {...order} />
        ));
    }, [userOrders]);

    return (
        <div>
            {ordersComponent}
        </div>
    );
};

export default Orders;