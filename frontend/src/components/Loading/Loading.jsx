// JSX element of a  loading of 3 dots which is animated in form of bouncy effect
import React, { useState } from 'react';

const Loading = () => {
    const [dots, setDots] = useState(['', '', '']);

    const animateDots = () => {
        const newDots = dots.map((dot, index) => {
            if (dot === ' ') {
                return '';
            } else {
                return ' ';
            }
        });
        newDots[0] = '.';
        setDots(newDots);
    };

    setInterval(animateDots, 500);

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="flex space-x-2 justify-center items-center">
                <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
            </div>
            <h2 className="mt-4 text-2xl font-bold">
                Processing ...
            </h2>
        </div>
    );
};

export default Loading;