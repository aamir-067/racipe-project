import React, { useRef } from "react"
import bgImg from "../../assets/bg.webp"
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverApi } from "../../CONSTANTS";
import Cookies from "js-cookie";

const Login = () => {

    const { register, handleSubmit } = useForm();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const handleLogin = async () => {
        console.log('triggered');
        const [email, password] = [emailRef.current.value, passwordRef.current.value];

        // check if there is something in the inputs.
        if (!(email.trim() && password.trim())) {
            //error
        }

        // check if this is email or username.
        let username = email.includes("@") ? email : "";

        // send the response.
        let response;
        try {
            response = await axios.post(serverApi + "users/login", {
                email, password, username
            });

            console.log(response.data);

            // save the tokens. so that it will saved in brave browser too
            Cookies.set("refreshToken", response.data.data.refreshToken);
            Cookies.set("accessToken", response.data.data.accessToken);

            console.log(response.data.data.refreshToken);

            localStorage.setItem("refreshToken", response.data.data.refreshToken);
            localStorage.setItem("accessToken", response.data.data.accessToken);
            // save the result in store
        } catch (error) {
            console.log(error.response);
            // error
        }


    }

    return (
        <>
            <div className="relative w-full box-border" style={{ height: "80vh" }}>
                <div className="w-full h-full flex justify-center items-center">
                    <img src={bgImg} alt="background image" className="absolute w-full h-screen object-cover brightness-75" />
                    <div className="absolute w-96 z-10 py-10 pl-4 text-center bg-white bg-opacity-45 rounded-lg flex flex-col">
                        <div className="w-full z-30 flex flex-col ml-4">
                            <h1 className="text-left font-myBold7 text-xl mb-4">Sign in you account</h1>

                            <form onSubmit={handleSubmit(handleLogin)} className="text-center flex flex-col">
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
                </div>
            </div>
        </>
    )
}

export default Login;