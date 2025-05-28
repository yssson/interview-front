import { Interview } from "../types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchInterview } from "@api/fetchInterviews";
import { ProfileCards } from "@components/ProfileCards";
import {Navbar} from "../components/Nav/Navbar";

//유튜브 변환 함수
function convertYoutubeLinks(text: string): string {
  const youtubeRegex =
      /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(\?si=[a-zA-Z0-9_-]+)?/g;

  return text.replace(
      youtubeRegex,
      (match, p1, p2, p3, videoId) => `
      <iframe width="560" height="315"
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0" allowfullscreen></iframe>`
  );
}

export const InterviewPage = () => {
  const { id } = useParams(); // url의 id부분 꺼내옴
  const [interview, setInterview] = useState<Interview | null>(null); //인터뷰 저장

  const getInterview = async () => {
    if (!id) return;
    try {
      const data = await fetchInterview(id);
      setInterview(data);
    } catch (error) {
      console.error("인터뷰 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getInterview();
  }, [id]);



  if (!interview) {
    return <p className="p-8 text-gray-600">인터뷰 데이터를 불러오는 중...</p>;
  }

  return (
      <div className="bg-white pl-[300px]">
        <Navbar />
        <div className="px-20 py-16 border-l-2 border-[#f9f9f9] w-full flex justify-center " id="interview-container">
          <div className="max-w-[1200px] w-full">
          <h1 className="text-5xl font-bold mt-20 mb-20">{interview.interviewee.name} {interview.interviewee.role}님의 인터뷰</h1>

          {interview.questions.map((q, index) => (
              <div key={index} className="mt-4 mb-8">
                <h2 className="font-semibold text-xl border-b-2 border-gray-200 pb-4 mb-2">
                  <span className="text-[#8ebdee] font-bold text-3xl" >Q. </span>{q.question}
                </h2>
                <div className="rounded-lg p-6 mb-6 ">
                  <div
                      className="text-lg leading-relaxed text-gray-700"
                      dangerouslySetInnerHTML={{ __html: convertYoutubeLinks(q.answer) }}
                  />
                </div>
              </div>
          ))}
          </div>
        </div>
        <div className="w-[calc(100vw-300px)] border-l-2 border-[#f9f9f9] mb-[60px] mt-[100px]">
          <h3 className="font-bold text-2xl mb-[30px] px-20">PMI의 다른 개발자 인터뷰를 확인하세요! </h3>
        <ProfileCards path="/interview" theme="white" />
      </div>
      </div>
  );
};
