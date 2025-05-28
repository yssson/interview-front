import { Interview } from '@types/types';
import {toast} from "react-toastify";
import {fetchWithAuth} from "@api/fetchWithAuth";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = `${apiUrl}/interview`;

//특정 인터뷰 내용 조회
export const fetchInterview = async (intervieweeId: string): Promise<Interview> => {
  try {
    // 인터뷰 내용 요청
    const response = await fetch(`${API_BASE_URL}/${intervieweeId}`);

    if (!response.ok) {
      throw new Error(`HTTP 오류 발생: ${response.status}`);
    }

    const interviewData: Interview = await response.json();
    if (!interviewData) {
      throw new Error("인터뷰 데이터가 존재하지 않음.");
    }

    interviewData.questions = interviewData.questions || null;
    return interviewData;
  } catch (error) {
    console.error("fetchInterview API 호출 중 오류 발생:", error);
    toast.error(
        error instanceof Error ? error.message : "인터뷰 데이터를 불러오는 중 오류 발생",
        { position: "top-right" }
    );
    throw error;
  }
};

//질문 삭제
export const deleteQuestion = async (intervieweeId: string, questionId: string) => {
  try {
    //질문 삭제 요청
    const response = await fetchWithAuth(`${API_BASE_URL}/${intervieweeId}/question/${questionId}`, {
      method: 'DELETE',
      headers: {"Content-Type": "application/json"}
    });
    if (!response) return null;  // 401 Unauthorized 처리된 경우 (fetchWithAuth 내부에서 로그아웃 됨)

    //실패
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "질문 삭제 실패");
    }

    //성공
    toast.success("질문이 삭제되었습니다.", { position: "top-right" });
    return true;
  } catch (error) {
    console.error(error);
    toast.error(
        error instanceof Error ? error.message : "질문 삭제 중 오류 발생",
        { position: "top-right" }
    );
    return null;
  }
};

//질문 추가
export const addNewQuestion = async (intervieweeId: string, question: string, answer: string) => {
  try {
    //질문 추가 요청
    const response = await fetchWithAuth(`${API_BASE_URL}/${intervieweeId}/question`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ question, answer }),
    });
    if (!response) return null;  // 401 Unauthorized 처리된 경우 (fetchWithAuth 내부에서 로그아웃 됨)

    //응답 json으로 파싱
    const data = await response.json();

    //실패
    if (!response.ok) {
      throw new Error(data.message || `Failed to add question: ${response.status}`);
    }

    //성공
    toast.success("질문이 성공적으로 추가되었습니다!", { position: "top-right" });
    return data;
  } catch (error) {
    console.error("질문 추가 오류:", error);
    toast.error(error instanceof Error ? error.message : "질문 추가 중 오류 발생", { position: "top-right" });
    return null;
  }
};

//질문 수정
export const editQuestion = async (intervieweeId: string, questionId: string, question: string, answer: string) => {
  try {
    //질문 수정 요청
    const response = await fetchWithAuth(`${API_BASE_URL}/${intervieweeId}/question/${questionId}`, {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ question, answer })
    });
    if (!response) return null;  // 401 Unauthorized 처리된 경우 (fetchWithAuth 내부에서 로그아웃 됨)

    //응답 json으로 파싱
    const data = await response.json();

    //실패
    if (!response.ok) {
      throw new Error(data.message || `Failed to edit question: ${response.status}`);
    }

    //성공
    toast.success("질문이 수정되었습니다.", { position: "top-right" });
    return data;
  } catch (error) {
    console.error(error);
    toast.error(error instanceof Error ? error.message : "질문 수정 중 오류 발생", { position: "top-right" });
    return null;
  }
};
