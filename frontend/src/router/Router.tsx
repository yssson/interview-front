import {useRoutes} from "react-router-dom";
import {Home} from "@pages/Home";
import {NavbarProfileList} from "@components/Nav/NavbarProfileList";
import {InterviewPage} from "@pages/InterviewPage";
import { UpdateProfile } from "@components/Admin/UpdateProfile";
import { UpdateUser } from "@components/Admin/UpdateUser";
import {AdminPage} from "@pages/AdminPage";
import {UpdateInterview} from "@components/Admin/UpdateInterview";
import {AdminLogin} from "@pages/AdminLogin";
import {PrivateRoute} from "@components/PrivateRoute/PrivateRoute";

export const Router = () => {
    // @ts-ignore
    return useRoutes([
        {
            path: '/',
            children: [
                {
                  path: '',
                  element: <Home/>
                },
                {
                    path: 'interview/:id', //프로필 카드 클릭시 이동
                    element: <InterviewPage/>
                },
                {
                    path: '/admin/login',
                    element: <AdminLogin />
                },
            ]
        },
        {
            path: '/admin',
            element: <PrivateRoute />,
            children: [
                {
                    path:'',
                    element: <AdminPage/>,
                    children: [
                        {
                            path: 'interview', //http://localhost:3002/admin/interview
                            element: <NavbarProfileList/>, //인터뷰 직원 리스트
                            children: [
                                {
                                    path: '/admin/interview/:id', //http://localhost:3002/admin/interview/id
                                    element: <UpdateInterview/>
                                }
                            ]
                        },
                        {
                            path:'profile', //http://localhost:3002/admin/profile
                            element: <NavbarProfileList />,
                            children: [
                                {
                                    path: ':id', //http://localhost:3002/admin/profile/id
                                    element: <UpdateProfile />
                                }
                            ]
                        },
                        {
                            path:'updateUser',
                            element: <UpdateUser/>,
                            children: [
                                {
                                    path: 'new',
                                    element: <UpdateProfile />
                                }
                            ]
                        }
                    ]
                }

            ]
        }
    ]);
}