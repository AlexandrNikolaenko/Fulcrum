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
            }, 150)
        }
    });

    return(
        <div className="fixed z-0 h-[502px] w-full bg-base-blue">
            <div className="flex relative justify-center w-full h-full p-[65px]">
                <div className="rotate-[-25deg] w-[573px] flex flex-col">
                    <span className="font-title text-left font-black text-white text-[84px] text-wrap w-fit self-start">{text[0]}</span>
                    <span className="font-title text-left font-black text-white text-[84px] text-wrap w-fit self-end">{text[1]}</span>
                </div>
                <canvas className="absolute"/>
            </div>
            
        </div>
    )
}