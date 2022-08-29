import React, {useCallback, useEffect, useState} from 'react';
import {NextPage} from "next";
import useEmblaCarousel from "embla-carousel-react";

const slides = [1,2,3,4,5]

const TextCarousel: NextPage = () => {
    const [viewportRef, embla] = useEmblaCarousel({ axis: "y", loop: true, align: 'center' });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

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
        <div className="bg-black text-white w-[300px] max-h-[500px]">
            <div className="w-full overflow-hidden" ref={viewportRef}>
                <div className="h-[250px] flex flex-col select-none">
                    {slides.map((index) => (
                        <div className="min-h-[33%] relative flex justify-center items-center" key={index}>
                            <div className="overflow-hidden flex justify-center items-center">
                                <h1 className="min-w-full min-h-full">
                                    {index}
                                </h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TextCarousel;