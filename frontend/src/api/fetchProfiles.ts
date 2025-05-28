import {Interviewee,ProfileInput} from "@types/types";
import {toast} from "react-toastify";
import {fetchWithAuth} from "@api/fetchWithAuth";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = `${apiUrl}/profile`;

// 프로필 목록 조회
export const fetchProfiles = async (): Promise<Interviewee[]> => {
  try {
    // 프로필 목록 요청
    const response = await fetch(API_BASE_URL);

    // 응답 json으로 파싱
    const data = await response.json();

    // HTTP 상태 코드가 200~299 범위가 아니면 에러 처리(조회일 경우 프론트에서 에러메시지)
    if (!response.ok) {
      throw new Error(`HTTP 오류 발생: ${response.status}`);
    }

    return data.map((profile: Interviewee) => ({ ...profile }));
  } catch (error) {
    console.error("프로필 목록 불러오기 실패:", error); // 디버깅용 에러
    toast.error(
        error instanceof Error ? error.message : "네트워크 오류 발생",
        { position: "top-right" } //사용자용 에러(토스트 에러 창)
    );
    return [];
  }
};

// 특정 프로필 조회
export const fetchProfile = async (id: string): Promise<Interviewee | null> => {
  try {
    // 프로필 요청
    const response = await fetch(`${API_BASE_URL}/${id}`);

    // 응답 json으로 파싱
    const data = await response.json();

    // HTTP 상태 코드가 200~299 범위가 아니면 에러 처리(조회일 경우 프론트에서 에러메시지)
    if (!response.ok) {
      throw new Error(`HTTP 오류 발생: ${response.status}`);
    }

    return data;
  } catch (error) {
    //디버깅용 에러
    console.error("프로필 조회 오류:", error);
    //사용자용 에러(토스트 에러 창)
    toast.error(
        error instanceof Error ? error.message : "데이터를 불러오는 중 오류 발생",
        { position: "top-right"}
    );
    return null;
  }
};

//프로필 추가(POST)
export const createProfile = async (profileData: ProfileInput) => {
  try {
    // 프로필 추가 요청
    const response = await fetchWithAuth(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });
    if (!response) return null;  // 401 Unauthorized 처리된 경우 (fetchWithAuth 내부에서 로그아웃 됨)

    // 응답 json으로 파싱
    const data = await response.json();

    // 실패
    if (!response.ok) {
      throw new Error(data.message || "프로필 생성 실패");
    }

    // 성공
    toast.success("새 직원이 추가되었습니다!", { position: "top-right" });
    return data;
  } catch (error) {
    //디버깅용 에러
    console.error("프로필 추가 오류: ", error);
    //사용자용 에러(토스트 에러 창)
    toast.error(
        error instanceof Error ? error.message : "프로필 생성 중 오류 발생",
        { position: "top-right"}
    );
    return null;
  }
};


//특정 프로필 업데이트(PATCH)
export const updateProfile = async (
  profileId: string,
  profileData: ProfileInput,
) => {
  try {
    // 프로필 업데이트 요청
    const response = await fetchWithAuth(`${API_BASE_URL}/${profileId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(profileData),
    });
    if (!response) return null;  // 401 Unauthorized 처리된 경우 (fetchWithAuth 내부에서 로그아웃 됨)

    // 응답 json으로 파싱
    const data = await response.json();

    // 실패
    if (!response.ok) {
      throw new Error(data.message || "프로필 업데이트 실패");
    }

    //성공
    toast.success("프로필이 수정되었습니다!", { position: "top-right" });
    return data;
  } catch (error) {
    //디버깅용 에러
    console.error(error);
    //사용자용 에러(토스트 에러 창)
    toast.error(
        error instanceof Error ? error.message : "프로필 업데이트 중 오류 발생",
        { position: "top-right"}
    );
    return null;
  }
};

//프로필 삭제(DELETE)
export const deleteProfile = async (profileId: string) => {
  try {
    // 삭제 요청
    const response = await fetchWithAuth(`${API_BASE_URL}/${profileId}`, {
      method: "DELETE"
    });
    if (!response) return null;  // 401 Unauthorized 처리된 경우 (fetchWithAuth 내부에서 로그아웃 됨)

    // 실패
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "프로필 삭제 실패");
    }

    //성공
    toast.success("프로필이 삭제되었습니다.", { position: "top-right" });
    return true;
  } catch (error) {
    //디버깅용 에러
    console.error(error);
    //사용자용 에러(토스트 에러 창)
    toast.error(
        error instanceof Error ? error.message : "프로필 삭제 중 오류 발생",
        { position: "top-right"}
    );
    return null;
  }
};
