import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import {useSwipeable} from "react-swipeable";

const TextCarousel: NextPage = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const texts = ["Ini text 1", "Ini text 2", "Ini text 3"];
    const handlers = useSwipeable({
        onSwipedRight: () => {
            if (activeIdx > 0) {
                setActiveIdx(activeIdx - 1);
            } else {
                setActiveIdx(texts.length - 1);
            }
        },
        onSwipedLeft: () => {
            if (activeIdx < texts.length - 1) {
                setActiveIdx(activeIdx + 1);
            } else {
                setActiveIdx(0);
            }
        },
        trackMouse: true
    });
    useEffect(() => {
        if (document) {
            const scrollSize = document.getElementById("text-carousel")?.offsetWidth;
            document.getElementById("text-carousel")?.scroll({
                // @ts-ignore
                left: activeIdx * scrollSize,
                behavior: "smooth"
            });
        }
    });

    return (
        <div className="h-[500px] w-[500px]">
            {activeIdx}
            <div id="text-carousel" className="flex overflow-hidden bg-blue-300" {...handlers}>
                {texts.map((txt, idx) => (
                    <div className="min-w-full" key={`txt-${idx}`}>
                        <h1>{txt}</h1>
                    </div>
                ))}
            </div>
            {/*<div className="text-carousel__indicator">*/}
            {/*    {texts.map((txt, idx) => (*/}
            {/*        <div*/}
            {/*            key={idx}*/}
            {/*            onClick={() => setActiveIdx(idx)}*/}
            {/*            className={`*/}
            {/*  text-carousel__indicator-item*/}
            {/*  ${activeIdx === idx && "active"}*/}
            {/*`}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
};

export default TextCarousel;