import Navbar from "../../../components/Elements/Navbar";
import { useState } from "react";
import { BiSolidShoppingBags, BiSolidUser } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { AdminProducts } from "../../products/components/AdminProducts";
import Profile from "../../users/components/Profile";
import { useAuth } from "../../../context/AuthContext";
import { Orders } from "../../orders/components/Orders";
import { useLocation } from "react-router-dom";

export const Dashboard = () => {
    const { isAdmin } = useAuth();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState<number>(location.state?.destination === "profile" ? 2 : (isAdmin ? 0 : 1));

    return (
        <div className="container">
            <Navbar />
            <div>
                <ul className="flex items-center flex-col xs:flex-row xs:space-x-8 sm:space-x-20 p-4 justify-center">
                    {isAdmin && (<li
                        className={`flex w-full xs:w-auto justify-center p-2 xs:px-4 items-center cursor-pointer transition-colors duration-200 ${
                            selectedTab === 0
                                ? "text-primary border-b border-primary"
                                : "text-secondary"
                        }`}
                        onClick={() => setSelectedTab(0)}
                    >
                        <BiSolidShoppingBags className="inline-block mr-1" />
                        <span>Products</span>
                    </li>)}
                    <li
                        className={`flex w-full xs:w-auto justify-center p-2 px-4 items-center cursor-pointer transition-colors duration-200 ${
                            selectedTab === 1
                                ? "text-primary border-b border-primary"
                                : "text-secondary"
                        }`}
                        onClick={() => setSelectedTab(1)}
                    >
                        <TbTruckDelivery className="inline-block mr-1" />
                        <span>Orders</span>
                    </li>
                    <li
                        className={`flex w-full xs:w-auto justify-center p-2 px-4 items-center cursor-pointer transition-colors duration-200 ${
                            selectedTab === 2
                                ? "text-primary border-b border-primary"
                                : "text-secondary"
                        }`}
                        onClick={() => setSelectedTab(2)}
                        data-cy="profile-btn"
                    >
                        <BiSolidUser className="inline-block mr-1" />
                        <span>Profile</span>
                    </li>
                </ul>
            </div>
            {isAdmin && selectedTab === 0 && <AdminProducts />}
            {selectedTab === 1 && <Orders />}
            {selectedTab === 2 && <Profile />}
        </div>
    );
};
