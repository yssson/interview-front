export enum Role {
  이사 = "이사",
  부장 = "부장",
  차장 = "차장",
  과장 = "과장",
  대리 = "대리",
  주임 = "주임",
  인턴 = "인턴",
}

//인터뷰어 목록(하위 메뉴)
export interface Interviewee {
  id: string;
  name: string;
  role: Role;
}

//프로필 조회할 때
export interface Profile extends Interviewee {
  nickname?: string;
  motto?: string;
  mbti?: string;
  profileImage?: string;
}

// Input용 데이터
export interface ProfileInput {
  name: string;
  role: Role;
  nickname?: string;
  motto?: string;
  mbti?: string;
  profileImage?: string;
}

//인터뷰 내용 불러올 때
export interface Interview {
  interviewee: Interviewee; // Interviewee 객체
  questions: { id: string; question: string; answer: string }[];
}

//방명록 불러올 때(이름 대소문자
interface GuestBook {
  id: string; // DB에서 자동 생성된 ID
  name: string;
  message: string
}

//방명록 create할 때
export interface CreateGuestBook {
  name: string;
  message: string;
  password: string; // 4자리 숫자
}