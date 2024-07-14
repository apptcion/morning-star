'use client'
import React, {useState} from 'react'
import Canvas from './canvas'
import Color from './Color'


export default function DRAW(){

    const [color, setColor] = useState('black')

    const handleColor = (newColor:string) => {
        console.log("HandleCOlor : ", newColor)
        setColor(newColor);
    }

    return (
        <div>
        <Color
            onDataChange={handleColor}
        ></Color>
        <Canvas
            colorName={color}
        ></Canvas>
        </div>
    )
}