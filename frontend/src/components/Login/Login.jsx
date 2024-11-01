import React, { useRef, useState } from "react"
import bgImg from "../../assets/bg.webp"
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverApi } from "../../CONSTANTS";
import Cookies from "js-cookie";
import { updateData } from "../../features/userAcc.reducer";
import { store } from "../../app/store";
import { getRefreshToken } from "../../utils/getRefreshToken";
import Loading from "../Loading/Loading";

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e = undefined) => {
        e?.preventDefault();
        // check if already logged in.
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            // TODO : Give client an error message
            return;
        }

        const [email, password] = [emailRef.current.value, passwordRef.current.value];

        // check if there is something in the inputs.
        if (!(email.trim() && password.trim())) {
            //error
            // TODO : Give client an error message
        }

        // check if this is email or username.
        let username = email.includes("@") ? "" : email;


        setLoading(true);
        // send the response.
        let response;
        try {
            response = await axios.post(serverApi + "users/login", {
                email, password, username
            });

            // save the tokens. so that it will saved in brave browser too
            Cookies.set("refreshToken", response.data.data.refreshToken);
            Cookies.set("user", response.data.data.user.username);

            localStorage.setItem("refreshToken", response.data.data.refreshToken);
            // save the result in store

            const prevState = store.getState(prev => prev.userAcc);
            store.dispatch(updateData({
                ...prevState,
                isLogin: true,
                accDetails: {
                    username: response.data.data.user.username,
                    email: response.data.data.user.email,
                    fullName: response.data.data.user.fullName,
                    avatar: response.data.data.user.avatar,
                },
            }));

            setLoading(false);
            navigate("/user/" + response.data.data.user.username);


        } catch (error) {
            setLoading(false);
            console.log(error);
            // error
            // TODO : Give client an error message
        }


    }

    return (
        <>
            <div className="relative w-full box-border" style={{ height: "80vh" }}>
                <div className="w-full h-full flex justify-center items-center">
                    <img src={bgImg} alt="background image" className="absolute w-full h-screen object-cover brightness-75" />
                    <div className="absolute w-96 z-10 py-10 pl-4 text-center bg-white bg-opacity-45 rounded-lg flex flex-col">
                        <div className={`${loading ? "opacity-0" : "opacity-100"}`}>
                            <div className="w-full z-30 flex flex-col ml-4">
                                <h1 className="text-left font-myBold7 text-xl mb-4">Sign in you account</h1>

                                <form onSubmit={(e) => handleLogin(e)} className="text-center flex flex-col">
                                    <input ref={emailRef} type="text" className='my-2 p-3 rounded outline-none h-10 text-black w-80' placeholder='username or email' />
                                    <input ref={passwordRef} type="password" className='my-2 p-3 rounded outline-none h-10 text-black w-80' placeholder='Password' />

                                    <label className="mr-12 text-center">didn't have account?
                                        <NavLink onClick={handleLogin} to={"/register"}>
                                            <button className='cursor-pointer text-blue-700 ml-2 border-blue-700'>click here</button>
                                        </NavLink>
                                    </label>
                                </form>
                            </div>

                            <div className='w-96 mx-auto my-0 text-center pr-10'>
                                <button onClick={() => handleLogin()} className='w-32 rounded-xl p-2 bg-black text-white hover:bg-opacity-90 mt-6'>Login</button>
                            </div>
                        </div>

                        {/* loading */}
                        <div
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${loading ? "" : "hidden"
                                }`}
                        >
                            <Loading />
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;