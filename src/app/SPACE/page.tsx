'use client'

import React, { useEffect, useRef, useState, RefObject} from 'react'

import * as THREE from 'three';

export default function Space(){
    const canvasRef:RefObject<HTMLCanvasElement> = useRef(null);

    const camera = new THREE.PerspectiveCamera()

    useEffect(() => {
        const currentRef = canvasRef.current;

        
    })

    return(
        <canvas
            ref={canvasRef}
        ></canvas>
    )
}