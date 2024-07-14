'use client';
import styles from '../../css/WAVE.module.css';
import React, { useRef, useEffect, useState } from 'react';

export default function WAVE() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const XRef = useRef(0);

    const [speed, setSpeed] = useState(3)
    const [height, setHeight] = useState(100)
    const [diff, setDiff] = useState(100)

    useEffect(() => {
        XRef.current += 0

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const resizeHandler = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight-4;
            cancelAnimationFrame(animationFrameId);
            draw(); // Resize 후에 새로 그리도록 호출
        };
        let animationFrameId: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            
            DrawWave(ctx, 6, 1, XRef.current, 'rgba(200,200,0,0.1)'); //노랑
            DrawWave(ctx, 6, 3, XRef.current, 'rgba(205, 0, 0, 0.4'); // 빨강
            DrawWave(ctx, 6, 2, XRef.current, 'rgba(0, 0, 250, 0.4)'); // 파랑
            XRef.current += speed;

            animationFrameId = requestAnimationFrame(draw);
        };

        resizeHandler(); // 초기 설정을 위해 한 번 호출
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
            cancelAnimationFrame(animationFrameId);
        };

    }, [speed, height, diff]);

    const SpeedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(Number(event.target.value))
    }

    const HeightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(Number(event.target.value))

    }

    const DiffHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiff(Number(event.target.value))
    }

    const ResetHandler = () => {
        setSpeed(3)
        setHeight(100)
        setDiff(100)
    }

    function DrawWave(ctx: CanvasRenderingContext2D, points: number, unique: number, X: number, color : string) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        
        ctx.beginPath()
        ctx.lineTo(0, window.innerHeight/2 )
    
        for (let i = window.innerWidth/10; i < window.innerWidth; i += window.innerWidth / 5) {
            let index = (i- window.innerWidth/10)/(window.innerWidth/5) + 1
            ctx.quadraticCurveTo(i , Math.sin(calcRadian(X + index*90 + unique*diff))*(height) +  window.innerHeight/2 , i + window.innerWidth/10,  (Math.sin(calcRadian(X + index*90 + unique*diff))*(height) + Math.sin(calcRadian(X + (index+ 1)*90  + unique*diff))*(height))/2 + window.innerHeight/2)
            
        }
        ctx.lineTo(window.innerWidth, window.innerHeight/2 )
        
        ctx.lineTo(window.innerWidth, window.innerHeight)
        ctx.lineTo(0, window.innerHeight)
        ctx.fill()
        ctx.closePath()
    }

    return (
        <div>
            <div className={`${styles.Control}`}>
                <h2>Control</h2>
                <text>SPEED : </text><input  type='range' min="0" max="100" value={speed} onChange={SpeedHandler}/>
                <text>HEIGHT : </text><input type='range' min="0" max="1000" value={height} onChange={HeightHandler}/>
                <text>DIFF : </text><input type='range' min="0" max="360" value={diff} onChange={DiffHandler}/><br></br>
                <button onClick={ResetHandler}>reset</button>
            </div>
        <canvas
            className={styles.canvas}
            ref={canvasRef}
        /></div>
    );
}


function calcRadian(x: number) {
    return x * Math.PI / 180;
}