// 어드민 상단 바
import logo from "@assets/img/logo.png";
import {useNavigate} from "react-router-dom";
import {logout} from "@api/fetchUser";

const NavbarAdminTop = () => {
    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
    };


    return (
        <nav className={'fixed w-full top-0 left-0 h-12 bg-white shadow'}>
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
                {/* 로고 & Admin 텍스트 */}
                <div className="flex items-center gap-3" onClick={() => navigate("/admin")}>
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                    <p className="text-lg font-bold">Admin</p>
                </div>

                {/* 로그아웃 버튼 */}
                <button
                    onClick={handleLogout}
                    className="text-black text-xs px-3 py-2 rounded-lg transition-colors border hover:bg-black hover:text-white"
                >
                    로그아웃
                </button>
            </div>
        </nav>
    );
};

export default NavbarAdminTop;
