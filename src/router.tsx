import { redirect } from 'react-router'
import { createHashRouter } from 'react-router-dom';

import { checkUserAuthorized } from 'lib/action/cookie';

import AdminLayouts from 'layouts/AdminLayout';

import DashBoardPage from 'pages/Dashboard';
import FilePage from 'pages/File'
import LoginPage from 'pages/Login';

const CustomRouter = createHashRouter([
    {
        path: "/",
        element: <AdminLayouts />,
        loader: async (ctx) => {

            if (!checkUserAuthorized()) {
                return redirect("/login");
            }

            const url = new URL(ctx.request.url);
            if (url.pathname === "/") {
                return redirect("/dashboard");
            }

            return null;
        },
        children: [
            {
                path: "/file/*",
                element: <FilePage />
            },
            {
                path: "/dashboard/",
                element: <DashBoardPage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>,
        loader: async () => {
            if (checkUserAuthorized()) {
                return redirect("/");
            } 
            return null;
        }
    }
]);


export default CustomRouter;