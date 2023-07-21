import { useSpring, animated } from "@react-spring/web";
import { useRef, MouseEvent, Dispatch, SetStateAction, ReactNode } from "react";

type Props = {
  setIsShowPopup: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

const Popup = (props: Props) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const animation = useSpring({
        config: {
            duration: 250,
        },
        from: { opacity: 0, transform: "translateY(-100%)" },
        to: { opacity: 1, transform: "translateY(0%)" },
    });

    const handleClosePopup = (e: MouseEvent<HTMLDivElement>) => {
        if (popupRef.current === e.target) {
            props.setIsShowPopup(false);
        }
    };

    return (
        <div
            className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black-cover z-50"
            ref={popupRef}
            onClick={handleClosePopup}
        >
            <animated.div style={animation}>
                { props.children }
            </animated.div>
        </div>
    );
};

export default Popup;