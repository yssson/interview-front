import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
    links: { path: string; label: string }[];
}

export const NavbarAdminAside = ({ links }: SidebarProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <aside className="w-60 bg-white border-r border-gray-200 hidden md:block h-full">
            <div className="p-6">
                <nav className="space-y-2">
                    {links.map((link) => {
                        // 현재 URL이 link.path로 시작하는지 확인
                        const isActive =
                            location.pathname === link.path ||
                            location.pathname.startsWith(link.path);

                        return (
                            <button
                                key={link.path}
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 font-medium ${
                                    isActive ? "bg-gray-200" : "text-gray-700"
                                } transition-all`}
                                onClick={() => navigate(link.path)}
                            >
                                {link.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
};
