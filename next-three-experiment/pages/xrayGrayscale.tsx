import React from 'react';
import {NextPage} from "next";

const XrayGrayscale: NextPage = () => {
    return (
        <div className='relative bg-black w-screen h-screen flex justify-center items-center'>
            <div className='absolute z-10 bg-black w-[996px] h-[680px] relative flex items-center justify-center hover:opacity-0
            transition-opacity duration-700 ease-linear'>
                <div className="w-[209px] bg-[url('/images/xrayImage.png')] h-[578px] grayscale"></div>
            </div>
            <div className='absolute flex justify-center items-center h-[680px] w-[996px]'>
                <div className='absolute w-[275px] h-[375px] right-10 top-[80px] flex flex-row'>
                    <div className='border-t-[1px] border-b-[1px] border-r-[1px] h-full w-[113px] border-txt_color'></div>
                    <div className='flex items-center ml-2 text-txt_color h-full'>Individual Vertebra</div>
                </div>
                <div className="w-[209px] bg-[url('/images/xrayImage.png')] h-[578px]"></div>
            </div>
        </div>
    );
};

export default XrayGrayscale;