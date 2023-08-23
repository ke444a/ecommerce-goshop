import { CSSProperties } from "react";
import { FadeLoader } from "react-spinners";

export const Spinner = () => {
    const stylesOverride: CSSProperties = {
        display: "block",
        position: "absolute",
        // margin: "40px auto",
        top: "50%",
        left: "50%"
    };

    return <FadeLoader color="#333" cssOverride={stylesOverride} />;};
