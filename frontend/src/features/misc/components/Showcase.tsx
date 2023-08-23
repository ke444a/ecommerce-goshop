import Navbar from "../../../components/Elements/Navbar";
import { Link } from "react-router-dom";

const Showcase = () => {
    return (
        <div className="bg-showcase bg-cover bg-center bg-no-repeat mb-8">
            <div className="bg-black-cover w-full h-full">
                <div className="container text-white pt-4 -mt-4">
                    <Navbar />
                    <div className="flex flex-col items-center text-center pb-40 pt-36 xs:pb-44 xs:pt-40 md:pb-60 md:pt-56">
                        <h1 className="font-bold text-5xl mb-8">
              Autumn Collection is here
                        </h1>
                        <p className="text-lg mb-8">
              The time is now for it to be okay to be great. People in this
              world shun people for being great. For being a bright color. For
              standing out. But the time is now to be okay to be the greatest
              you.
                        </p>
                        <Link to="/products/shop" className="font-semibold text-sm bg-white bg-opacity-20 transition hover:bg-opacity-40 rounded-md py-2 px-4 border-[1px] border-white border-opacity-[45%]">
              Explore
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Showcase;
