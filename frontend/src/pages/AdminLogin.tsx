import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@api/fetchUser";
import logo from "@assets/img/logo.png";

export const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    //로그인 버튼 핸들링-> username, password를 받아서 fetch함수로 전달-> navigate or error
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");  // 에러 초기화
        try {
            await login(username, password);  // 로그인 함수에서 accessToken만 받음
            //성공
            navigate("/admin", { replace: true }); // /login을 히스토리에서 제거
        } catch (error) {
            //실패
            setError(error.message);
            console.error("로그인 에러:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="p-8 rounded-xl w-96 pb-40">
                {/* 로고 */}
                <div className="flex justify-center mb-10 items-end gap-4" onClick={() => navigate("/")}>
                    <img src={logo} alt="로고" className="w-40 object-contain" />
                </div>
                {/* 에러 메시지 */}
                {error && <p className="text-red-500 text-center mb-3 text-lg">{error}</p>}
                {/* 로그인 폼 */}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="이름"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-3 border rounded-lg text-lg placeholder:text-base"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border rounded-lg text-lg placeholder:text-base"
                    />
                    <button
                        type="submit"
                        className={`p-3 rounded-lg text-white text-lg font-semibold transition-all ${
                            username && password ? "bg-black hover:bg-gray-800" : "bg-gray-400"
                        }`}
                        disabled={!username || !password}
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};
