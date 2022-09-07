import React from 'react';
import {NextPage} from "next";

const MovingArrow: NextPage = () => {
    return (
        <div>
            <div className="scroll">
                <span className="scroll__line"></span>
            </div>
            <span className="scroll__arrow">
    <svg width="17px" height="9px" viewBox="0 0 17 9" version="1.1" xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="square">
            <g id="Desktop_Screen-Copy-39" transform="translate(-660.000000, -1241.000000)" stroke="#FFFFFF">
                <g id="Group-Copy-2" transform="translate(660.000000, 1008.000000)">
                    <path d="M0.5,233.5 L8.5,241.5" id="p-copy-2"></path>
                    <path d="M16.0178344,233.982166 L9,241" id="p-copy-3"></path>
                </g>
            </g>
        </g>
    </svg>
  </span>
        </div>
    );
};

export default MovingArrow;