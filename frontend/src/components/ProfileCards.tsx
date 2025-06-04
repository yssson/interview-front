import { Profile } from "@interfaces/types";
import {useEffect, useRef, useState} from "react";
import { fetchProfiles } from "@api/fetchProfiles";
import styles from "@assets/styles/ProfileCards.module.css";

interface ProfileCardsProps {
    path: string; //카드 클릭 후 url path
    theme: "light" | "dark"; //카드 색
}

export const ProfileCards = ({ path, theme }: ProfileCardsProps) => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const swiperRef = useRef<HTMLDivElement>(null); //div 요소 참조

    //useEffect 훅: Api 호출해서 프로필 카드 가져오기 / 컴포넌트가 마운트될 때 한 번 실행
    useEffect(() => {
        const loadProfiles = async () => {
            const data = await fetchProfiles();
            setProfiles([...data, ...data]); // 프로필 2배로 복제, 프로필 데이터가 변경될때마다 상태 업데이트
        };
        loadProfiles();
    }, []);

    //useEffect 훅: 슬라이드 애니메이션 처리 / profiles 상태 변경될 때마다
    useEffect(() => {
        // exit
        if (profiles.length === 0 || !swiperRef.current) return;

        let index = 0;
        const slideWidth = swiperRef.current.firstElementChild?.clientWidth || 300;
        const totalSlides = profiles.length;

        const interval = setInterval(() => {
            if (swiperRef.current) {
                index++;
                swiperRef.current.style.transition = "transform 0.5s ease-in-out";
                swiperRef.current.style.transform = `translateX(-${index * slideWidth}px)`;

                // 원본 리스트 끝나면 부드럽게 처음으로 이동
                if (index >= totalSlides / 2 * 2) {
                    setTimeout(() => {
                        swiperRef.current!.style.transition = "none";
                        swiperRef.current!.style.transform = `translateX(-${totalSlides / 3 * slideWidth}px)`;
                        index = totalSlides / 3;
                    }, 500);
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [profiles]);

    return (
        <div className={`${styles.container}`} style={{ width: "100%" }}>
                <div className={`${styles.swiperWrapper}`} ref={swiperRef}>
                    {/* 프로필 카드 */}
                    {profiles.map((user, index) => (
                            <div key={index} className={`${styles.swiperSlideCustom} py-10`} >
                                <div
                                    onClick={() => window.location.href = `${path}/${user.id}`}
                                    className={`w-full min-w-[240px] h-full max-h-[600px] flex flex-col rounded-xl p-6 cursor-pointer
        transition-transform transform hover:scale-[1.02] hover:shadow-xl duration-300 
        backdrop-blur-lg
        ${theme === "dark" ? "bg-black text-white shadow-md" : "bg-[#f5f5f7] border-gray-600 text-gray-900 shadow-sm"}`}
                                    style={{ transformOrigin: "center" }}
                                >
                                    <div className="grid grid-rows-[4fr_0.3fr_0.3fr_0.3fr] h-full">
                                        <div className="w-full overflow-hidden p-2 flex items-center justify-center">
                                            <img
                                                src="/default-img.PNG"
                                                alt={user.name}
                                                className="w-full aspect-[4/5] object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="text-center mt-2 flex items-center justify-center w-full gap-2">
                                            <h3 className="text-xl font-bold">{user.name}</h3>
                                            <p className={`font-medium ${theme === "dark" ? "text-gray-400" : "text-blue-500"}`}>
                                                {user.role}
                                            </p>
                                        </div>
                                        {user.motto && (
                                            <div className={`text-center text-sm px-4 italic ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
                                                "{user.motto}"
                                            </div>
                                        )}
                                        <div className="flex flex-wrap justify-center gap-3 mt-3 items-center">
                                            {user.nickname && (
                                                <span
                                                    className={`px-[8px] py-[4px] rounded-full font-bold text-sm 
                          ${theme === "dark" ? "bg-gray-700/50 text-gray-200" : "bg-gray-300 text-gray-900"}`}
                                                >
                        #{user.nickname}
                      </span>
                                            )}
                                            {user.mbti && (
                                                <span
                                                    className={`px-[8px] py-[4px] rounded-full font-bold text-sm 
                          ${theme === "dark" ? "bg-gray-700/50 text-gray-200" : "bg-gray-300 text-gray-900"}`}
                                                >
                        #{user.mbti}
                      </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
};
