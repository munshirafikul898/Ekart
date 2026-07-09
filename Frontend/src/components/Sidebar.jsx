import {
    LayoutDashboard,
    PlusSquare,
    Package,
    ShoppingCart,
    Users,
    Menu,
    X,
} from "lucide-react";

import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
    const [open, setOpen] = useState(false);

    const navStyle = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
            isActive
                ? "bg-pink-600 text-white shadow"
                : "text-gray-700 hover:bg-pink-100 hover:text-pink-500"
        }`;

    return (
        <>
            <div className="lg:hidden mt-5 px-4">
                <div className="bg-pink-50 border border-pink-200 rounded-xl shadow-sm px-4 py-3 flex items-center gap-3">
                    <button
                        onClick={() => setOpen(!open)}
                        className="w-10 h-10 rounded-lg bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    <h1 className="text-lg font-semibold text-gray-800">
                        Admin Panel
                    </h1>
                </div>
            </div>

            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className="flex">
                <aside
                    className={`fixed top-14 left-0 h-[calc(100vh-56px)] w-64 bg-white shadow-md border-r p-4 z-50 transition-transform duration-300
                    ${
                        open ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0`}
                >
                    <h1 className="text-xl font-bold text-pink-600 mb-6">
                        Admin Panel
                    </h1>

                    <nav className="flex flex-col gap-2">
                        <NavLink
                            to="/dashboard/sales"
                            className={navStyle}
                            onClick={() => setOpen(false)}
                        >
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/add-product"
                            className={navStyle}
                            onClick={() => setOpen(false)}
                        >
                            <PlusSquare size={18} />
                            <span>Add Product</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/products"
                            className={navStyle}
                            onClick={() => setOpen(false)}
                        >
                            <Package size={18} />
                            <span>Products</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/orders"
                            className={navStyle}
                            onClick={() => setOpen(false)}
                        >
                            <ShoppingCart size={18} />
                            <span>Orders</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/users"
                            className={navStyle}
                            onClick={() => setOpen(false)}
                        >
                            <Users size={18} />
                            <span>Users</span>
                        </NavLink>
                    </nav>
                </aside>

                <main className="flex-1 lg:ml-64 p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Sidebar;