import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Interviewee} from "@interfaces/types";
import {useState} from "react";


export const UpdateUser = () => {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState<Interviewee[]>([]);
    const location = useLocation();
    // };


    return (
        <>
            <div className="flex">
                {/* 사이드바 */}
                <aside className="w-60 bg-white border-r border-gray-200 hidden md:block h-screen">
                    <div className="p-6">
                        <nav className="space-y-2">
                            <button
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 font-medium  ${location.pathname.startsWith("/admin/updateUser/new") ? "bg-gray-200" : "text-gray-700"}`}
                                onClick={() => navigate('/admin/updateUser/' +
                                    'new')}
                            >
                                사용자 추가
                            </button>
                        </nav>
                    </div>
                </aside>

                <div className="flex-1">
                <Outlet context={{ setProfiles }} />
                </div>
            </div>
            </>
    )
}