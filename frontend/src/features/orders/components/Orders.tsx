import { useMemo } from "react";
import { useGetAllOrdersQuery } from "../api/getAllOrders";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrdersByUserQuery } from "../api/getOrdersByUser";
import { OrderPreview } from "./OrderPreview";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

export const Orders = () => {
    const { token, isAdmin, currentUser } = useAuth();
    const { data: ordersAdmin } = useGetAllOrdersQuery(token, isAdmin);
    const { data: ordersUser } = useGetOrdersByUserQuery(currentUser?.uid || "", token, isAdmin);

    const ordersComponent = useMemo(() => {
        if(!ordersAdmin && !ordersUser) {
            return null;
        }

        if (ordersUser && ordersUser?.length > 0) {
            return ordersUser.map((order) => (
                <OrderPreview key={order.id} {...order} />
            ));
        } else if (ordersAdmin && ordersAdmin?.length > 0) {
            return ordersAdmin.map((order) => (
                <OrderPreview key={order.id} {...order} />
            ));
        }
        return ;

    }, [ordersAdmin, ordersUser]);

    if ((ordersAdmin && ordersAdmin.length > 0) || (ordersUser && ordersUser.length > 0)) {
        return (
            <div className="mt-4 p-5 bg-white drop-shadow-custom rounded-md h-full">
                <h3 className="font-semibold text-xl sm:text-3xl mb-8">
          Manage Orders
                </h3>
                {ordersComponent}
            </div>
        );
    }

    return (
        <>
            <h3 className="font-semibold text-xl sm:text-3xl mt-4 p-5">Manage Orders</h3>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <MdOutlineRemoveShoppingCart className="w-16 h-16" />
                <h4 className="text-xl font-semibold mt-2">No orders yet...</h4>
            </div>
        </>
    );
};
