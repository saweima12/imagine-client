import { redirect } from 'react-router'
import { createHashRouter } from 'react-router-dom';

import { checkUserAuthorized, userLogout } from 'lib/action/user';

import AdminLayout from 'layouts/AdminLayout';
import FilePage from 'pages/File'
import LoginPage from 'pages/Login';

const CustomRouter = createHashRouter([
    {
        path: "/",
        element: <AdminLayout />,
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
    },
    {
        path: "/signout",
        loader: async () => {
            // Remvoe cookie
            userLogout();

            return redirect("/login");
        }
    }
]);


export default CustomRouter;