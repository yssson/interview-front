import {Outlet, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {checkAuth} from "@api/fetchUser";

// 어드민페이지 전체를 감싸는 상위 컴포넌트 -> 로그인 한 상태인지 검사, 아니면 로그인 화면으로
export const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            const authValid = await checkAuth();
            setIsAuthenticated(authValid);
            if(!authValid && window.location.pathname !== "/admin/login") {
                console.log("인증실패");
                navigate("/admin/login", { replace: true });
            }
        }
        verifyAuth();
    }, [navigate]);

    return isAuthenticated ? <Outlet /> : null;
};