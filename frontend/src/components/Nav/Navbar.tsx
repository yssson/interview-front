import React from "react";
import logo from "@assets/img/logo.png";
import styles from "@assets/styles/Navbar.module.css";
import {useNavigate} from "react-router-dom";
import {checkAuth} from "@api/fetchUser";

export const smoothScroll = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    const element = document.querySelector(target); //이동하고자하는 html 요소 선택
    if (element) {
        element.scrollIntoView({ behavior: "smooth" }); //scrollIntoView: 특정요소로 부드럽게 스크롤 이동
    }
};


export const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const links = [
        {
            href: "/",
            label: "home",
            onClick: (e: React.MouseEvent) => {
                e.preventDefault(); // 기본 앵커 이동 막기
                navigate("/"); // /home으로 먼저 이동
                setTimeout(() => smoothScroll(e, "#section1"), 100); // 약간의 딜레이 후 스크롤 이동
            }
        },
        {
            href: "/",
            label: "guest book",
            onClick: (e: React.MouseEvent) => {
                e.preventDefault(); // 기본 앵커 이동 막기
                navigate("/"); // /home으로 먼저 이동
                setTimeout(() => smoothScroll(e, "#section3"), 100); // 약간의 딜레이 후 스크롤 이동
            }
        },
        {
            href: "/admin/login",
            label: "admin panel",
            onClick: async (e: React.MouseEvent) => {
                e.preventDefault();
                // 이미 로그인한 상태면 바로 admin page로 이동
                const verifyAuth = await checkAuth();
                if (verifyAuth) {
                    navigate("/admin"); //토큰 있으면 바로 /admin 이동
                } else { navigate("/admin/login"); }
            },
        }
    ];
    return (
        <div className="fixed left-0 h-screen w-[300px] border-r-2 border-none p-[50px_30px] bg-transparent z-10">
            {/* 로고 */}
            <a href="/">
                <img className="h-[55px] block mb-8 filter brightness-0" src={logo} alt="Home Logo" />
            </a>
            {/* 네비 바 */}
            <div className={`${styles["menu-bar-options"]} text-lg font-bold gap-[12px] pt-10 flex flex-col text-left items-start`}>
                {links.map((link, index) => (
                    <a key={index} href={link.href} onClick={link.onClick}>
                        {link.label}
                    </a>
                ))}
            </div>
        </div>
    );
};