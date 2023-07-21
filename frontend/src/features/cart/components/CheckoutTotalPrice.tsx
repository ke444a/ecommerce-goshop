import { ReactNode } from "react";

type Props = {
    amount: number;
    children?: ReactNode;
    
}

const CheckoutTotalPrice = (props: Props) => {
    return (
        <div className="mb-8 lg:my-0 flex flex-col items-center justify-center mx-auto w-2/3">
            <div className="border-gray-300 border-[1px] rounded-xl py-4 px-6 h-fit w-full">
                <h5 className="font-semibold text-lg xs:text-xl mb-2">Order Summary</h5>
                <div className="flex justify-between w-full text-secondary border-gray-300 border-b-[1px] py-2">
                    <p className="mr-2 xs:mr-0">Subtotal</p>
                    <p>${props.amount}</p>
                </div>
                <div className="flex justify-between w-full text-secondary border-gray-300 border-b-[1px] py-2">
                    <p className="mr-2 xs:mr-0">Shipping</p>
                    <p>$0</p>
                </div>
                <div className="flex justify-between w-full text-secondary border-gray-300 border-b-[1px] py-2">
                    <p className="mr-2 xs:mr-0">Tax</p>
                    <p>$0</p>
                </div>
                <div className="flex justify-between w-full py-2">
                    <h5 className="font-semibold text-lg mr-2 xs:mr-0 xs:text-xl">Order Total</h5>
                    <h5 className="font-semibold text-xl">${props.amount}</h5>
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default CheckoutTotalPrice;