import React from "react";
import { useClerk, useUser, Show } from "@clerk/react";
import { Eraser, Group, Hash, House, Image, LogOut, Scissors, SquarePen, Users, Users2Icon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    const navItems = [
        { to: "/ai", label: "Dashboard", Icon: House },
        { to: "/ai/write-article", label: "Ai Content Writer", Icon: SquarePen },
        { to: "/ai/blog-titles", label: "Title Generator", Icon: Hash },
        { to: "/ai/generate-images", label: "Image Generator", Icon: Image },
        { to: "/ai/remove-background", label: "Background Remover", Icon: Eraser },
        { to: "/ai/remove-object", label: "Magic Object Eraser", Icon: Scissors },
        { to: "/ai/community", label: "Community", Icon: Users }

    ]

    return (
        <>
            {/* Mobile Overlay */}
            {sidebar && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 sm:hidden"
                    onClick={() => setSidebar(false)}
                />
            )}

            <aside
                className={`
        fixed sm:static
        top-16 left-0
        z-40
        h-[calc(100vh-64px)]
        w-64
        bg-white
        border-r
        border-gray-200
        transition-transform
        duration-300
        flex
        flex-col
        justify-between
        ${sidebar
                        ? "translate-x-0"
                        : "-translate-x-full sm:translate-x-0"
                    }
      `}
            >
                <div>

                    <div className="py-8">

                        <img
                            src={user?.imageUrl}
                            alt=""
                            className="w-20 h-20 rounded-full mx-auto object-cover"
                        />

                        <h2 className="mt-3 text-center font-semibold">
                            {user?.fullName}
                        </h2>

                        <p className="text-center text-sm text-gray-500">
                            {user?.primaryEmailAddress?.emailAddress}
                        </p>

                    </div>



                    <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
                        {navItems.map(({ to, label, Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/ai"}
                                onClick={() => setSidebar(false)}
                                className={({ isActive }) =>
                                    `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive
                                        ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                                        : ""
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"
                                                }`}
                                        />

                                        <span
                                            className={`${isActive ? "text-white" : "text-gray-700"
                                                }`}
                                        >
                                            {label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                </div>

                <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
                    <div onClick={openUserProfile } className="flex gap-2 items-center cursor-pointer">
                        <img src={user.imageUrl} className="w-8 rounded-full" alt="User Avatar" />
                        <div>
                            <h1 className="text-sm font-medium">
                                {user.fullName}
                            </h1>
                            <p className="text-xs text-gray-500">
                                <Show
                                    when={{ plan: "premium" }}
                                    fallback={<p>Upgrade to Premium</p>}
                                >
                                    Premium
                                </Show>
                            </p>
                        </div>
                    </div>

                    <LogOut onClick={signOut} className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer" />



                </div>

            </aside>
        </>
    );
};

export default Sidebar;