import React, {Suspense} from 'react';
import {NextPage} from "next";
import DistortionCanvas from "../components/DistortionCanvas";

const ImageDistortion:NextPage = () => {
    return (
        <div>
            <Suspense fallback={null}>
                <DistortionCanvas/>
            </Suspense>
        </div>
    );
};

export default ImageDistortion;