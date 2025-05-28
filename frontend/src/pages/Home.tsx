import { useEffect, useState } from "react";
import { Navbar } from "@components/Nav/Navbar";
import { ProfileCards } from "@components/ProfileCards";
import {Guestbook} from "@components/Guestbook";
import styles from "@assets/styles/Home.module.css"

export const Home = () => {
  const [marginLeft, setMarginLeft] = useState("300px"); // 마진 상태, 초기 margin-left 값
  const [isHovered, setIsHovered] = useState(false); //hover 상태
  const [opacity, setOpacity] = useState(0); // 글자의 가시성을 위한 상태

  useEffect(() => {
    // scrollContainer는 스크롤을 감지할 요소를 선택합니다.
    const scrollContainer = document.querySelector(".snap-y");
    if (!scrollContainer) return; // scrollContainer가 없으면 return

    // 보간 함수: start 값에서 end 값으로 amt 비율만큼 변화시킨 값을 반환합니다.
    const lerp = (start: number, end: number, amt: number) =>
      start + (end - start) * amt;

    // 스크롤 위치 복원: 페이지가 로드되면 이전에 저장된 스크롤 위치로 이동
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      scrollContainer.scrollTop = parseInt(savedScrollPosition); // 저장된 위치로 이동
    }

    // handleScroll 함수: 스크롤 위치에 따라 margin-left를 점진적으로 변화시킵니다.
    const handleScroll = () => {
      const scrollY = scrollContainer.scrollTop; // 현재 스크롤 위치 (세로 방향)
      const maxScroll = window.innerHeight / 3; // 최대 스크롤 범위 (전체 화면의 1/3)
      const progress = Math.min(scrollY / maxScroll, 1); // 0 ~ 1 범위로 진행 상태 계산

      // margin-left의 시작값(300px)에서 끝값(0px)으로 점진적으로 변화시킴
      const interpolatedMargin = lerp(300, 0, progress);
      const newMarginLeft = `${interpolatedMargin}px`; // 계산된 margin-left 값
      const newOpacity = progress;

      // margin-left 상태 업데이트 (transition 제거)
      setMarginLeft(newMarginLeft);
      setOpacity(newOpacity);

      // 스크롤 위치 저장
      sessionStorage.setItem("scrollPosition", scrollY.toString());
    };

    // scroll 이벤트 리스너 추가
    scrollContainer.addEventListener("scroll", handleScroll);

    // cleanup: 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-screen">
      <Navbar />
      <div className="snap-y snap-proximity h-screen overflow-y-scroll overflow-x-hidden bg-[#f5f5f7]">
        {/* section 1 */}
        <section
            id="section1"
            className="section flex flex-col justify-center h-[calc(100vh-30vh)] pl-[300px] text-left overflow-x-hidden "
        >
          <h1 className="text-9xl font-bold mb-8">2025</h1>

          {/* PMI 텍스트 */}
          <div
              className={`${styles.flexContainer} ${isHovered ? styles.hovered : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
          >
            {/* P + artners */}
            <span className={`${styles.letter} text-8xl font-bold `}>
          P<span className={styles.hiddenText}>artners</span>
        </span>

            {/* M + ake */}
            <span className={`${styles.letter} text-8xl font-bold `}>
          M<span className={styles.hiddenText}>ake</span>
        </span>

            {/* I + nnovation */}
            <span className={`${styles.letter} text-8xl font-bold `}>
          I<span className={styles.hiddenText}>nnovation</span>
        </span>
          </div>

          <h2 className="text-6xl font-semibold mt-8">IT Developer</h2>
        </section>

        {/* Section 2 */}
        <section
            id="section2"
            className="relative flex flex-col w-full"
            style={{
              marginLeft,
              width: `calc(100vw - ${marginLeft})`,

            }}
        >
          {/* 인터뷰 제목 */}
          <h1 className="  absolute top-[-180px]  text-[130px] font-extrabold text-black z-30 max-w-full break-words text-wrap">
            Interviews
          </h1>

          {/* 프로필 카드 목록 */}
          <div
              className="flex flex-col items-center justify-center z-20 bg-[#161617] pt-[200px] w-full min-h-screen flex-grow"
              style={{ maxWidth: "100vw", overflowX: "hidden" }} // ✅ 추가
          >
            <h3 className="text-amber-400 text-[25px] "
                style={{
              opacity: opacity, // opacity 값을 상태에 따라 변경
              transition: 'opacity 0.3s ease', // 서서히 나타나도록 설정
            }}>클릭하여 개발자 인터뷰를 확인하세요!</h3>
            <ProfileCards path="/interview" theme="dark" />
          </div>
        </section>

        {/* Section 3 */}
        <section
            id="section3"
            className="section snap-start min-h-screen flex flex-col items-center justify-center bg-white overflow-x-hidden"
        >
          <Guestbook />
        </section>
      </div>
    </div>
  );
};
