'use client'

import { useState, useEffect } from "react";

export default function Fon() {
    let [text, setText] = useState('');
    let [counter, setCounter] = useState(0);
    const endText = ['Т', 'О', 'Ч', 'К', 'А', '\n        ', 'О', 'П', 'О', 'Р', 'Ы']
    
    useEffect(() => {
        if (counter != endText.length) {
            setTimeout(() => {
                setText(text.concat(endText[counter]));
                setCounter(counter + 1);
            }, 100);
        }
    });

    return(
        <div className="fixed z-0 h-[502px] p-[65px]">
            <h1 className="font-title font-black">{text}</h1>
        </div>
    )
}