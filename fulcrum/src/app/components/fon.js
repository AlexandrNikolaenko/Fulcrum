'use client'

import { useState, useEffect } from "react";

export default function Fon() {
    let [text, setText] = useState(['', '']);
    console.log(text);
    let [counter, setCounter] = useState(0);
    const endText = ['Т', 'О', 'Ч', 'К', 'А', 'О', 'П', 'О', 'Р', 'Ы']
    
    useEffect(() => {
        if (counter < 5) {
            setTimeout(() => {
                setText([text[0].concat(endText[counter]), '']);
                setCounter(counter + 1);
            }, 150);
        } else if (counter >= 5 && counter != endText.length) {
            setTimeout(() => {
                setText([text[0], text[1].concat(endText[counter])]);
                setCounter(counter + 1);
            }, 120)
        }
    });

    return(
        <div className="fixed z-0 h-[502px] w-full bg-base-blue overflow-hidden">
            <div className="flex relative justify-center items-center w-full h-full p-[65px]">
                <div className="rotate-[-25deg] w-[573px] flex flex-col justify-start relative z-10">
                    <span className="font-title text-left font-black text-white text-[84px] text-wrap w-fit self-start">{text[0]}</span>
                    <span className="font-title text-left font-black text-white text-[84px] text-wrap w-fit self-end">{text[1]}</span>
                </div>
                <svg className="absolute w-[709.85px] overflow-visible h-[663.59px] z-0">
                    <path strokeWidth={170} fill="transparent" className="bg-dark-blue stroke-dark-blue" d="
                        M 67.46 607.7
                        S -7.4 249.88 54.61 225.1
                        S 288.5 551.41 354.67 523.82
                        S 269.4 139.39 322.33 118.51
                        S 607.69 410.21 666.89 379.69
                        S 604.36 52.26 604.36 52.26
                    "></path>
                </svg>
            </div> 
        </div>
    )
}