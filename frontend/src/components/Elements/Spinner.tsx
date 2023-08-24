import { CSSProperties } from "react";
import { FadeLoader } from "react-spinners";

export const Spinner = () => {
    const stylesOverride: CSSProperties = {
        display: "block",
        position: "absolute",
        top: "50%",
        left: "50%"
    };

    return <FadeLoader color="#333" cssOverride={stylesOverride} />;};
