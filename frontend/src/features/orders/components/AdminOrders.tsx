import { useMemo } from "react";
import { useGetAllOrdersDetailedQuery } from "../api/getAllOrdersDetailed";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrdersDetailedByUserQuery } from "../api/getOrdersDetailedByUser";
import { OrderPreview } from "./OrderPreview";

export const Orders = () => {
    const { token, isAdmin, currentUser } = useAuth();
    const { data: ordersAdmin } = useGetAllOrdersDetailedQuery(token, isAdmin);
    const { data: ordersUser } = useGetOrdersDetailedByUserQuery(currentUser?.uid || "", token, isAdmin);

    const ordersComponent = useMemo(() => {
        if(!ordersAdmin && !ordersUser) {
            return null;
        }

        if (ordersUser) {
            return ordersUser.map((order) => (
                <OrderPreview key={order.id} {...order} />
            ));
        } else if (ordersAdmin) {
            return ordersAdmin.map((order) => (
                <OrderPreview key={order.id} {...order} />
            ));
        }

    }, [ordersAdmin, ordersUser]);

    return (
        <>
            {ordersComponent}
        </>
    );
};
