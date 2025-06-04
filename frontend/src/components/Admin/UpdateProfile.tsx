import {ProfileInput, Role} from "../../types/types";
import { useEffect, useState } from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import { ProfileForm } from "@components/ProfileForm";
import {fetchProfile, createProfile, updateProfile, deleteProfile, fetchProfiles} from "@api/fetchProfiles";
import {toast} from "react-toastify";

export const UpdateProfile = () => {
  const { id } = useParams();
  const [isNew, setIsNew] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileInput | null>(null);
  const navigate = useNavigate();

  //url에 id 유무에 따라 화면 설정
  useEffect(() => {
    if (!id) {
      setIsNew(true);  // id가 없으면 isNew를 true로 설정
    } else {
      setIsNew(false);  // id가 있으면 isNew를 false로 설정
    }

      if (!isNew && id) {
          fetchProfile(id).then((data) => {
              if (!data) {
                  toast.error("해당 프로필의 데이터가 없습니다.", { position: "top-right" });
                  return;
              }
              setProfile(data);
          });
      }
  }, [id, isNew]);

    // 부모의 setProfiles 가져오기
    const context = useOutletContext<{ setProfiles: React.Dispatch<React.SetStateAction<any[]>> }>();
    if (!context) {
        return null;
    }
    const { setProfiles } = context;

    const handleSubmit = async (data: ProfileInput) => {
        if (isNew) {
            // 새 프로필 생성
            const res= await createProfile(data);
            navigate(`/admin/profile/${res.id}`);
        } else if (id) {
            // 프로필 수정
            await updateProfile(id, data);
            const updatedProfiles = await fetchProfiles();
            setProfiles(updatedProfiles); //수정후 프로필 목록 상태 다시 설정
        }
    };

    const handleDelete = async () => {
        if (profile && id) {
            if (window.confirm(`${profile.name}님의 프로필을 정말 삭제하시겠습니까?`)) {
                await deleteProfile(id);

                const updatedProfiles = await fetchProfiles();
                setProfiles(updatedProfiles); // 삭제후 프로필 목록 상태 다시 설정
                navigate("/admin/profile"); // 삭제 후 목록 페이지로 돌아가기
            }
        }
    };


  return (
      <div className="max-w-5xl mx-auto px-4">
          <header className="my-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{isNew ? "새 사용자 추가" : "프로필 수정"}</h1>
          </header>
          <div className="rounded-lg border border-gray-300 p-8 space-y-4">
              <ProfileForm
            profile={
                profile || {
                  name: "",
                  nickname: "",
                  motto: "",
                  mbti: "",
                  role: Role.인턴,
                  profileImage: "",
                }
            }
            onSubmit={handleSubmit}
            onDelete={!isNew ? handleDelete : undefined}
        />
      </div>
      </div>
  );
};