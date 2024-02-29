/*

footer of the project.
position will be fixed to the bottom.

 */

import React from 'react'

const Footer = () => {
    return (
        <div className='w-screen h-20 flex justify-center items-center z-10 absolute bottom-0 bg-black'>
            <h2 className='text-white'> &copy; 2024 Aamirfeer.  All rights reserved.</h2>
        </div>
    )
}

export default Footer