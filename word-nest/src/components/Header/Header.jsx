import { Container, Logo, LogoutBtn } from "../index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gray-950/90 py-3 text-white shadow-lg backdrop-blur-md">
            <Container>
                <nav className="flex flex-wrap items-center gap-4">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="shrink-0 transition-transform duration-200 hover:scale-105"
                    >
                        <Logo width="70px" />
                    </Link>

                    {/* Navigation links */}
                    <ul className="ml-auto flex flex-wrap items-center justify-end gap-2">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        end={item.slug === "/"}
                                        className={({ isActive }) =>
                                            `inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                                isActive
                                                    ? "bg-pink-500 text-white shadow-md shadow-pink-500/20"
                                                    : "text-gray-300 hover:bg-white/10 hover:text-pink-300"
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;