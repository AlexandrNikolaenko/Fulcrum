'use client'

import { useState, useEffect } from "react";

export default function Fon() {
    let [text, setText] = useState('');
    console.log(text);
    let [counter, setCounter] = useState(0);
    const endText = ['Т', 'О', 'Ч', 'К', 'А', '\n        ', 'О', 'П', 'О', 'Р', 'Ы']
    
    useEffect(() => {
        if (counter != endText.length) {
            setTimeout(() => {
                setText(text.concat(endText[counter]));
                setCounter(counter + 1);
            }, 200);
        }
    });

    return(
        <div className="fixed z-0 h-[502px] w-full bg-base-blue">
            <div className="flex relative justify-center w-full h-full p-[65px]">
                <h1 className="font-title font-black text-white text-[84px] rotate-[-25deg] text-wrap max-w-[573px]">ТОЧКА</h1>
                <canvas className="absolute"/>
            </div>
            
        </div>
    )
}