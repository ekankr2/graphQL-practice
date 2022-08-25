import React, {useCallback, useState} from 'react';
import {NextPage} from "next";
import CarouselSlider from "../components/CarouselSlider";


const items = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
];

const Carousel: NextPage = () => {
    const [index, setIndex] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const onIndexChange = useCallback((nextIndex, isLast) => {
        setIndex(nextIndex);
        setDisabled(isLast);
    }, []);

    const onNextClick = useCallback(() => {
        setIndex(index + 1);
    }, [setIndex, index]);

    const onPrevClick = useCallback(() => {
        setIndex(index - 1);
    }, [setIndex, index]);

    return (
        <div className="flex">
            <CarouselSlider onIndexChange={onIndexChange}
                            index={index}
                            containerClassName="Slider_With_padding"
                            items={items}
                            padding={37.5}>
                {(item, key) => (
                    <div key={key} className="Slider__Item">
                        {item}
                    </div>
                )}
            </CarouselSlider>
        </div>
    );
};

export default Carousel;