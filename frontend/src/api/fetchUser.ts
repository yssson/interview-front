const API_AUTH_URL = `${process.env.REACT_APP_API_BASE_URL}/auth`;

// 로그인
export const login = async (name: string, password: string) => {
    try {
        const response = await fetch(`${API_AUTH_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password }),
            credentials: "include", // httpOnly 쿠키 포함 요청
        });
        // HTTP 상태 코드 확인 (200~299)
        if (!response.ok) {
            let errorMessage = "로그인 실패";
            try {
                // JSON 응답 먼저 시도
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                // JSON이 아니면 text()로 읽기
                errorMessage = await response.text() || errorMessage;
            }
            throw new Error(errorMessage);
        }

        // 응답을 JSON으로 변환
        const data = await response.json();
        console.log("서버 응답:", data);

        return { user: data.user };

    } catch (error) {
        console.error("로그인 오류:", error);
        throw error;
    }
};

export const logout = async() => {
    await fetch(`${API_AUTH_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    // 로그인 화면으로 리디렉션
    window.location.href = "/admin/login"; // 로그인 페이지로 이동
};

export const checkAccessToken = async () => {
    try {
        const response = await fetch(`${API_AUTH_URL}/access_token`, {
            method: "GET",
            credentials: "include", //httpOnly 쿠키 포함 (accessToken 자동 전송)
        });

        if (!response.ok) {
            throw new Error("Access Token이 유효하지 않습니다.");
        }

        return true; // accessToken이 유효함
    } catch (error) {
        console.error("Access Token이 유효하지 않습니다:", error);
        return false; // accessToken이 만료됨
    }
};

export const checkRefreshToken = async () => {
    try {
        const response = await fetch(`${API_AUTH_URL}/refresh_token`, {
            method: "GET",
            credentials: "include", // httpOnly 쿠키 포함 (refreshToken 자동 전송)
        });


        if (!response.ok) {
            throw new Error("Refresh Token이 유효하지 않습니다.");
        }

        return true; // accessToken이 새로 발급됨 (쿠키에 저장됨)
    } catch (error) {
        console.error("Refresh Token이 만료되었습니다:", error);
        return false; // refreshToken도 만료됨
    }
};

export const checkAuth = async () => {
    const isAccessValid = await checkAccessToken(); // accessToken 검사

    if (isAccessValid) return true;


    return await checkRefreshToken(); // refreshToken까지 만료되면 false 반환
};