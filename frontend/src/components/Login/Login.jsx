import React from "react"
import img1 from "../../assets/img1.jpg"

const Login = () => {

    return (
        <>
            <div className="relative w-full box-border" style={{ height: "80vh" }}>
                <div className="w-full h-full flex justify-center items-center">
                    <img src={img1} alt="background image" className="absolute w-full h-screen object-cover brightness-75" />
                    <div className="absolute w-96 z-10 py-10 pl-4 text-center bg-white bg-opacity-45 rounded-lg flex flex-col">
                        <div className="w-full z-30 flex flex-col ml-4">
                            <h1 className="text-left font-myBold7 text-xl mb-4">Welcome to Food Racipe</h1>
                            <form className="text-center flex flex-col">

                                <input type="email" className='my-2 p-3 rounded outline-none h-10 text-black w-80' placeholder='Enter Email' />
                                <input type="password" className='my-2 p-3 rounded outline-none h-10 text-black w-80' placeholder='Enter Password' />

                                <label className="mr-12 text-center">Create Account Here <label className='cursor-pointer text-blue-700'>Registration</label></label>
                            </form>
                        </div>

                        <div className='w-96 mx-auto my-0 text-center pr-10'>
                            <button className='w-32 rounded-xl p-2 bg-black text-white hover:bg-opacity-90 mt-6'>Login</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;