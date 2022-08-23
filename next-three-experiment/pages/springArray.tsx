// @ts-nocheck
import {useEffect, useRef, useState} from "react";
import {animated, config, useSpring, useTransition} from "react-spring";
import {NextPage} from "next";

const SpringArray: NextPage = () => {

    const n = useRef(0)
    const styles = useSpring({
        from: {height: 0},
        to: {height: 300},
        config: { duration: 4000 },
    })

    return (
        <animated.div
            className='bg-red-500'
            style={{
                width: 300,
                // backgroundColor: '#46e891',
                borderRadius: 16,
                ...styles,
            }}
        />
    )
}


export default SpringArray