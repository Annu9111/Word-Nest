import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({
    children,
    authentication = true,
}) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate("/login", { replace: true });
        } else if (!authentication && authStatus) {
            navigate("/", { replace: true });
        }
    }, [authStatus, navigate, authentication]);

    if (authentication && !authStatus) {
        return null;
    }

    if (!authentication && authStatus) {
        return null;
    }

    return <>{children}</>;
}