import {toast} from "react-toastify";
import { logout, checkAuth } from "@api/fetchUser";

const fetchRequest = async (url: string, options: RequestInit, token?: string | null) => {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
        },
        credentials: "include",
    });
};

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    let response = await fetchRequest(url, options);

    if (response.status !== 401) return response; // 401이 아니면 그대로 반환

    // ✅ accessToken이 만료된 경우, refreshToken으로 재발급 시도
    const success = await checkAuth();
    if (!success) {
        // refreshToken까지 만료되었으면 로그아웃 처리
        toast.error("로그인이 만료되었습니다. 다시 로그인해 주세요.", { position: "top-right" });
        await new Promise(resolve => setTimeout(resolve, 1500));
        await logout();
        return null;
    }

    // ✅ 새 accessToken이 쿠키에 저장되었으므로 다시 요청
    return fetchRequest(url, options);
};