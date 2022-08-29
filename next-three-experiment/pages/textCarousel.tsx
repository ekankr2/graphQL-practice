import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NextPage} from "next";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [1,2,3,4,5]

const TextCarousel: NextPage = () => {
    const autoplay = useRef(
        // @ts-ignore
        Autoplay({ delay: 1500, stopOnInteraction: false }, (emblaRoot: any) => emblaRoot.parentElement)
    );

    const [viewportRef, embla] = useEmblaCarousel({ axis: "y", loop: true, align: 'center' }, [autoplay.current]);
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        if (!embla) return;
        embla.on("select", onSelect);
        embla.on("reInit", onSelect);
        onSelect();
    }, [embla, onSelect]);

    return (
        <div className="bg-black text-white max-w-[500px] max-h-[500px]">
            <div className="w-full overflow-hidden relative" ref={viewportRef}>
                <div className="h-[250px] flex flex-col select-none">
                    {slides.map((data, index) => (
                        <div className="min-h-[33%] relative flex justify-center items-center" key={index}>
                            <div className="overflow-hidden">
                                <h1 className="min-w-full min-h-full font-bold text-2xl">
                                    {data}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute w-full opacity-70 from-transparent via-black to-black h-[80px] bg-gradient-to-t top-0 left-0"></div>
                <div className="absolute w-full opacity-70 bg-gradient-to-t from-black via-black to-transparent h-[80px] bottom-0 left-0"></div>
            </div>
        </div>
    );
};

export default TextCarousel;