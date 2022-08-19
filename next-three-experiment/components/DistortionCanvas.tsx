import React, {useState} from 'react';
import {Landing} from "./slider/landing/landing";
import {Slider} from "./slider/Slider";

const DistortionCanvas = () => {
    const [item, setItem] = useState<number>(0);

    const list: any[] = [
        {
            species: 'Amur Leopard',
            age: 2,
            bio: 'Love snacks',
            url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/leopard2.jpg'
        },
        {
            species: 'Asiatic Lion',
            age: 8,
            bio: 'Love shrimps',
            url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/lion2.jpg'
        },
        {
            species: 'Siberian Tiger',
            age: 9,
            bio: 'Hate Elefants',
            url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/tiger2.jpg'
        },
        {
            species: 'Brown Bear',
            age: 12,
            bio: 'Love salmon',
            url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123024/bear2.jpg'
        },
    ]

    return (
        <div className="App">
            {/*<Landing animals={list} item={item}></Landing>*/}
            {/*<Slider onItem={(index: number) => setItem(index)} size={list.length}></Slider>*/}
        </div>
    )
};

export default DistortionCanvas;