import {NextPage} from "next";
import React, {Suspense} from 'react';
import dynamic from "next/dynamic";

const Gallery = dynamic(() => import('../components/GalleryCanvas'))

const Home: NextPage = () => {
    return (
        <div className="gallery">
            <Suspense fallback={null}>
                <Gallery/>
            </Suspense>
        </div>
    )
}


export default Home
