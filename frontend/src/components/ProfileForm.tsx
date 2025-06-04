import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Role, ProfileInput } from "@interfaces/types";

interface ProfileFormProps {
  profile?: ProfileInput;
  onSubmit: (data: ProfileInput) => void;
  onDelete?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onSubmit,
    onDelete,
}) => {
  const [formData, setFormData] = useState<ProfileInput>({
    name: "",
    nickname: "",
    motto: "",
    mbti: "",
    role: Role.인턴, //enum 타입 변수 초기화
    profileImage: "", // 파일 대신 URL로 저장
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        nickname: profile.nickname,
        motto: profile.motto,
        mbti: profile.mbti,
        role: profile.role || Role.인턴, // Enum 처리
        profileImage: profile.profileImage,
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "role" ? (Role[value as keyof typeof Role] ?? value) : value, // Enum 매핑
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // FormData 사용 없이 JSON 전송
  };
  return (
    <form className="p-6 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4 flex flex-col items-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
          <img
            id="preview"
            // src={
            //
            // }
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">이름*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block text-sm font-medium text-gray-700">별명</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block text-sm font-medium text-gray-700">
          좌우명
        </label>
        <input
          type="text"
          name="motto"
          value={formData.motto}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block text-sm font-medium text-gray-700">MBTI</label>
        <select
          name="mbti"
          value={formData.mbti}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">선택하세요</option>
          {[
            "ISTJ",
            "ISFJ",
            "INFJ",
            "INTJ",
            "ISTP",
            "ISFP",
            "INFP",
            "INTP",
            "ESTP",
            "ESFP",
            "ENFP",
            "ENTP",
            "ESTJ",
            "ESFJ",
            "ENFJ",
            "ENTJ",
          ].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700">직급*</label>
        <select
          name="role"
          value={formData.role as Role}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">선택하세요</option>
          {Object.values(Role).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onDelete && (
            <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md"
                onClick={onDelete} // 삭제 버튼 클릭 시 onDelete 실행
            >
              삭제
            </button>
        )}
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
        >
          저장
        </button>
      </div>
    </form>
  );
};
