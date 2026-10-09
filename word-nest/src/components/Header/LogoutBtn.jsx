import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const logoutHandler = async () => {
        setLoading(true);

        try {
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={logoutHandler}
            disabled={loading}
            className="
                group relative inline-flex items-center justify-center gap-2
                overflow-hidden rounded-full
                border border-rose-500/30
                bg-rose-500/10
                px-5 py-2.5
                text-sm font-semibold text-rose-400
                shadow-sm
                transition-all duration-300 ease-out
                hover:border-rose-400
                hover:bg-rose-500
                hover:text-white
                hover:shadow-lg hover:shadow-rose-500/20
                active:scale-95
                disabled:cursor-not-allowed disabled:opacity-60
                focus:outline-none focus:ring-2
                focus:ring-rose-400 focus:ring-offset-2
                focus:ring-offset-gray-950
            "
        >
            {loading ? (
                <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Logging out...
                </>
            ) : (
                <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>

                    Logout
                </>
            )}
        </button>
    );
}

export default LogoutBtn;