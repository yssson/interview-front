import { useEffect, useState } from "react";
import {Outlet, useLocation} from "react-router-dom";
import { fetchProfiles } from "@api/fetchProfiles";
import { Navbar_Admin_Aside } from "@components/Nav/Navbar_Admin_Aside";
import { Interviewee } from "@types/types";

export const Navbar_ProfileList = () => {
  const [profiles, setProfiles] = useState<Interviewee[]>([]);
  const location = useLocation();
  const type = location.pathname.split('/')[2]; // 'interview' 또는 'profile'

  useEffect(() => {
    const fetchAndSetProfiles = async () => {
        const data: Interviewee[] = await fetchProfiles();
        setProfiles(data);
    };
    fetchAndSetProfiles();
  }, []);

  // 프로필 리스트를 links로 변환
  const links = profiles.map((p) => ({
    path: `/admin/${type}/${p.id}`,
    label: p.name
  }));

  return (
      <div className="flex h-screen">
        {/* ✅ 공통 컴포넌트 사용 */}
        <Navbar_Admin_Aside links={links} />

        {/* 메인 콘텐츠 */}
        <div className="flex-1">
          <Outlet context={{ setProfiles }} />
        </div>
      </div>
  );
};
