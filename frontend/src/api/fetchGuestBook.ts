import {GuestBook, CreateGuestBook} from "@types/types"
import {toast} from "react-toastify";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = `${apiUrl}/guest-book`;

//방명록 목록 조회
export const fetchGuestBookList = async (): Promise<GuestBook[]> => {
    try {
        //방명록 목록 요청
        const response = await fetch(API_BASE_URL);
        //답장 json으로 파싱
        let data: any;
        try {
            data = await response.json();
        } catch {
            console.error("⚠ 서버 오류: 응답이 올바른 JSON 형식이 아닙니다.");
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
        // 실패
        if (!response.ok) throw new Error(`HTTP 오류 발생: ${response.status}`);
        //성공
        return data;
    } catch (error) {
        //디버깅용 에러
        console.error("방명록 목록 불러오기 실패:", error);
        //사용자용 에러(토스트 에러 창)
        toast.error(
            error instanceof Error ? error.message : "네트워크 오류 발생",
            { position: "top-right" }
        );
        return [];
    }
};

//방명록 생성
export const createGuestBook = async (entry: CreateGuestBook): Promise<GuestBook | null> => {
    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
        });

        let data: any;
        try {
            data = await response.json();
        } catch {
            console.error("⚠ 서버 오류: 응답이 올바른 JSON 형식이 아닙니다.");
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }

        if (!response.ok) {
            throw new Error(data?.message || "방명록 생성 실패");
        }
        //성공
        toast.success("방명록이 추가되었습니다!", {position: "top-right",});
        return data;
    } catch (error) {
        console.error("방명록 추가 실패:", error);
        toast.error(
            error instanceof Error ? error.message : "네트워크 오류 발생",
            { position: "top-right" }
        );
        return null;
    }
};

//방명록 삭제
export const deleteGuestBook = async (id: string, password: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        let data: any;
        try {
            data = await response.json();
        } catch {
            console.error("⚠ 서버 오류: 응답이 올바른 JSON 형식이 아닙니다.");
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }

        if (!response.ok) {
            throw new Error(data?.message || "방명록 삭제 실패");
        }
        //성공
        toast.success("방명록이 삭제되었습니다!", {position: "top-right",});
        return true;
    } catch (error) {
        console.error("방명록 삭제 실패:", error);
        toast.error(
            error instanceof Error ? error.message : "네트워크 오류 발생",
            { position: "top-right" }
        );
        return false;
    }
};


