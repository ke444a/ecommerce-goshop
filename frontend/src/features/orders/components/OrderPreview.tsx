import { convertData } from "../../../utils/convertData";
import { Link } from "react-router-dom";
import { useState } from "react";

export const OrderPreview = (props: IOrder) => {
    const [isShowInvoice, setIsShowInvoice] = useState<boolean>();

    return (
        <>
            <div className="bg-white border border-gray-300 p-4 w-full drop-shadow-custom rounded-md flex flex-col xs:flex-row xs:justify-between xs:items-center mb-3">
                <div className="flex space-x-1 justify-between items-center w-full md:w-1/2 text-sm sm:text-base">
                    <div>
                        <p className="text-secondary">Order Id</p>
                        <p className="font-semibold">{props.id}</p>
                    </div>
                    <div>
                        <p className="text-secondary">Date of placement</p>
                        <p className="font-semibold">{convertData(props.createdAt)}</p>
                    </div>
                    <div>
                        <p className="text-secondary">Amount</p>
                        <p className="font-semibold">${props.amount}</p>
                    </div>
                </div>
                <button
                    className="bg-primary text-white font-semibold text-xs px-6 py-3 rounded-md transition-opacity hover:bg-opacity-90 mt-4 xs:mt-0 xs:ml-4 md:ml-0"
                    onClick={() => setIsShowInvoice((prevShow) => !prevShow)}
                >
                    {isShowInvoice ? "Hide" : "View"} invoice
                </button>
            </div>
            {isShowInvoice && (
                <div className="border-gray-200 border rounded-xl bg-white mb-8 animate-dropdown text-sm">
                    <table className="min-w-full text-left">
                        <thead className="font-medium border-b-gray-200 border-b">
                            <tr className="text-secondary font-bold">
                                <th scope="col" className="px-4 py-7">
                    Product
                                </th>
                                <th scope="col" className="px-4 py-7">
                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.items.map((item) => (
                                <tr
                                    key={props.id + item}
                                    className="transition duration-300 ease-in-out hover:bg-neutral-100"
                                >
                                    <td className="flex items-center px-4 py-3">
                                        <img
                                            src={item.product.image as string}
                                            alt="Product image"
                                            className="w-16 h-16 rounded-md object-cover mr-4"
                                        />
                                        <p className="font-bold">
                                            <Link to={`/products/${item.product.id}`}>
                                                {item.product.name}
                                            </Link>
                                        </p>
                                    </td>
                                    <td className="text-secondary px-4">
                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-4 py-3 border-t-gray-200 border-t">
                        <p className="text-secondary">Shipping details</p>
                        <p className="font-semibold">{props.user?.fullName}</p>
                        <p className="font-semibold">{props.address}</p>
                    </div>
                </div>
            )}
        </>
    );
};
