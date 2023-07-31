import { Link } from "react-router-dom";

const CheckoutProductView = (props: Partial<IProduct>) => {
    return (
        <div className="flex">
            <Link className="mr-8 shrink-0 w-[240px]" to="/">
                <img
                    className="w-full h-60 rounded-xl object-cover"
                    src={props.image as string}
                    alt="Product image"
                />
            </Link>
            <div className="flex flex-col h-full">
                <h5 className="font-semibold text-xl mb-1">{props.name}</h5>
                {/* <p className="text-secondary mb-1">{props.category}</p> */}
                <h5 className="font-semibold text-xl mb-1">${props.price}</h5>
            </div>
        </div>
    );
};

export default CheckoutProductView;
