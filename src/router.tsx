import { redirect } from 'react-router'
import { createHashRouter } from 'react-router-dom';

import { checkUserAuthorized } from 'lib/action/user';

import AdminLayouts from 'layouts/AdminLayout';
import DashBoardPage from 'pages/Dashboard';
import FilePage from 'pages/File'
import LoginPage from 'pages/Login';

const CustomRouter = createHashRouter([
    {
        path: "/",
        element: <AdminLayouts />,
        loader: async (ctx) => {

            const url = new URL(ctx.request.url);
            
            // check url didn't go to static file.
            const filePtn = /\..+$/;
            if (!filePtn.test(url.pathname)) {
                if (url.pathname === "/") {
                    return redirect("/file");
                }

                const isAuthorized = await checkUserAuthorized();
                if (!isAuthorized) {
                    return redirect("/login");
                }
            }

            return null;
        },
        children: [
            {
                path: "/file/*",
                element: <FilePage />,
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>,
        loader: async () => {

            const isAuthorized = await checkUserAuthorized();
            if (isAuthorized) {
                return redirect("/");
            } 
            
            return null;
        }
    }
]);


export default CustomRouter;