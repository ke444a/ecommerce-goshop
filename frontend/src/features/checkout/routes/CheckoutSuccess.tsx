import { FaCircleCheck, FaArrowRightLong } from "react-icons/fa6";
import { Link, useSearchParams } from "react-router-dom";
import { useGetCheckoutSessionQuery } from "../../orders";
import { useAuth } from "../../../context/AuthContext";
import { Spinner } from "../../../components/Elements/Spinner";

export const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();
    const checkoutSessionId = searchParams.get("id") || "";
    const { token } = useAuth();
    const { data: sessionData, isLoading, isSuccess} = useGetCheckoutSessionQuery(checkoutSessionId, token);

    if (isLoading) {
        return <Spinner />;
    }
    
    if (!isSuccess) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-2xl mt-10 mx-auto p-10 flex flex-col justify-center items-center w-full min-[550px]:w-[500px]">
            <div className="bg-[#23A26D1F] bg-opacity-[12%] rounded-[50%] w-24 h-24 flex items-center justify-center mb-6">
                <FaCircleCheck className="text-[#23A26D] w-11 h-11 animate-pulse" />
            </div>
            <h6 className="text-2xl mb-3.5">Payment Success!</h6>
            <h2 className="font-semibold text-4xl">
          ${(sessionData.amount_total / 100).toFixed(2)}
            </h2>
            <hr className="my-12 bg-customGradient h-px w-full" />
            <div className="w-full">
                <div className="flex justify-between mb-6">
                    <h6 className="text-secondary text-lg">Payment Time</h6>
                    <p className="font-medium text-lg">{sessionData.created}</p>
                </div>
                <div className="flex justify-between mb-6">
                    <h6 className="text-secondary text-lg">Payment Method</h6>
                    <p className="font-medium text-lg capitalize">
                        {sessionData.payment_method_types[0]}
                    </p>
                </div>
                <div className="flex justify-between mb-6">
                    <h6 className="text-secondary text-lg">Sender Name</h6>
                    <p className="font-medium text-lg">{sessionData.customer_details.name}</p>
                </div>
                <div className="flex justify-between mb-6">
                    <h6 className="text-secondary text-lg">Sender Email</h6>
                    <p className="font-medium text-lg">{sessionData.customer_details.email}</p>
                </div>
                <div className="flex justify-between">
                    <h6 className="text-secondary text-lg">Shipping Address</h6>
                    <p className="font-medium text-lg text-right">{sessionData.shippingAddress}<br />{sessionData.customer_details.address.country}</p>
                </div>
            </div>
            <Link to="/dashboard" className="flex items-center mt-12 hover:underline">
                <span className="mr-2">Back to Dashboard</span>
                <FaArrowRightLong />
            </Link>
        </div>
    );
};

export default CheckoutSuccess;
