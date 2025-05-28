import Navbar_Admin_Top from "@components/Nav/Navbar_Admin_Top";
import {Navbar_Admin_Aside} from "@components/Nav/Navbar_Admin_Aside";
import {Outlet} from "react-router-dom";

export const AdminPage = () => {
    const links = [
        { path: "/admin/profile", label: "프로필 수정" },
        { path: "/admin/interview", label: "인터뷰 수정" },
        { path: "/admin/updateUser", label: "사용자 관리" }
    ];

    return (
        <div className="flex flex-col h-screen">
            {/* 상단바 */}
            <Navbar_Admin_Top />

            {/* 컨텐츠 영역 */}
            <div className="flex flex-1 pt-12">
                {/* 사이드바 */}
                <Navbar_Admin_Aside links={links} />

                {/* 메인 콘텐츠 */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

