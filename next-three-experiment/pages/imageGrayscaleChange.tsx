import React from 'react';
import {NextPage} from "next";

const ImageGrayscaleChange:NextPage = () => {
    return (
        <>
            <div className='absolute z-10 w-[400px] h-[600px] grayscale hover:opacity-0 opacity-100 transition-opacity duration-500 ease-linear
            bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/402px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg)]'></div>
            <div className='absolute w-[400px] h-[600px]
            bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/402px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg)]'></div>
        </>
    );
};

export default ImageGrayscaleChange;