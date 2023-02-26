import React from 'react'
import { useNavigate } from 'react-router';
import { FaUserAlt, FaKey } from 'react-icons/fa'

import { userLogin } from 'lib/api';
import { setCookie } from 'lib/utils/cookie';
import { COOKIE_USER, COOKIE_PWD} from 'types';

const LoginView = () => {
    let navigate = useNavigate()
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onLogin = async () => {
        if (username.length < 1 || password.length < 1) {
            console.log("error");
            return;
        }

        const result = await userLogin(username, password);

        if (result.isOK()) {
            setCookie(COOKIE_USER, username);
            setCookie(COOKIE_PWD, result.data?.token || "");
            navigate("/");
        }

    };


    return (
        <div className="flex login-wrapper">
            <div className="mx-auto pt-40 login-form">
                <h4 className="flex px-10 py-2 letter-title-font login-title">Imagine Backend</h4>
                <section className="py-5 px-10 box-content">
                    <div className="flex justify-center align-center field">
                        <div className="flex p-2 justify-center self-center icon"><FaUserAlt /></div>
                        <input 
                            className="flex-1 p-2 input" 
                            onChange={e => setUsername(e.target.value)} 
                            placeholder="Username" 
                            type="text" 
                        />
                    </div>
                    <div className="flex justify-center align-center field">
                        <div className="flex p-2 justify-center self-center icon"><FaKey /></div>
                        <input 
                            className="p-2 input" 
                            onChange={e => setPassword(e.target.value)} 
                            placeholder="Password"
                            type="password" 
                        />
                    </div>
                    
                    <div className="mb-10"></div>

                    <button onClick={onLogin} type="button" className="p-2 login-btn">
                        Login
                    </button>
                </section>

            </div>
        </div>
    )
}

export default LoginView;