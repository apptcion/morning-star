'use client'

import React, {useState, useEffect, useRef, RefObject} from 'react'
import styles from '../../css/TREE.module.css'
import HslToHex from './util'

import Toggle from './toggle'

export default function TREE(){

    const canvasRef:RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<CanvasRenderingContext2D>();

    const [status, setStatus] = useState(true)

    useEffect(() => {
        const canvas : HTMLCanvasElement | null = canvasRef.current
        const context : CanvasRenderingContext2D | null = canvas === null ? null : canvas.getContext('2d')

        const minHue = 80;
        const maxHue = 340;

        let drawing = false;

        if(!canvas) return
        
        if(!context) return

        const initCanvas = () => {
            if(context){
                context.beginPath()
                if(status){ //낮
                    context.fillStyle = "white";
                }else{
                    context.fillStyle = "black";
                    context.globalCompositeOperation = 'lighter'
                }
                context.rect(0,0,window.innerWidth, window.innerHeight)
                context.fill()
                context.closePath()

                context.beginPath()

                //context.moveTo(0, window.innerHeight)
                //context.lineTo(0,window.innerHeight*0.9)
                //context.moveTo(0,window.innerHeight*0.9)
                //context.quadraticCurveTo(window.innerWidth/2, window.innerHeight*0.8, window.innerWidth, window.innerHeight*0.9)
                
                //context.rect(0,window.innerHeight*0.9, window.innerWidth,window.innerHeight)
                
                context.fill()
                context.closePath()
            }
        }

        const resizeHandler = () => {
            canvas.width = innerWidth
            canvas.height = innerHeight

            initCanvas()
        }

        const Radian = (angle : number) => angle * (Math.PI/180)

        const calcAngleToPos = (angle : number, startAngle: number, length : number ,startX : number, startY : number) => {
            return [(length * Math.cos(Radian(angle + startAngle))) + startX,window.innerHeight  - (length * Math.sin(Radian(angle + startAngle))) - (window.innerHeight - startY)]

        }

        const clickHandler = (event : MouseEvent) => {
            if(!drawing) {
                drawing = true;
                let Length = Math.random()*(300 - 150 + 1) + 150

                
                let hue = 'black'
                if(!status){ //밤
                    console.log("밤")    
                    let hueSource = (maxHue - minHue) * Math.random() + minHue;

                    hue = HslToHex(hueSource, 84, 50)
            
                }
                let startAngle = Math.random()* (10)
                
                drawWithAngle(event.offsetX, window.innerHeight,Length, 90, 0,hue ,0)
            }
        }

        const drawWithAnimation = async (posX: number, posY: number, angle: number, startAngle: number, length: number, tick: number, endTick: number, color : string ,durationTime: number = 1000): Promise<[number, number]> => {
            if (tick > endTick) {
                context.closePath();
                drawing = false;
                return [posX, posY];
            } else {
                context.beginPath();
                context.lineWidth = length / 40;
                context.lineCap = 'round';
                context.strokeStyle = color

                let target = calcAngleToPos(angle, startAngle, length / endTick, posX, posY);
        
                context.moveTo(posX, posY);
                context.lineTo(target[0], target[1]);
                context.stroke();
        
                return new Promise<[number, number]>((resolve) => {
                    setTimeout(() => {
                        resolve(drawWithAnimation(target[0], target[1], angle, startAngle, length, tick + 1, endTick,color, durationTime));
                    }, durationTime / endTick);
                });
            }
        };


        const drawWithAngle = async (posX: number, posY: number, length: number, angle: number, startAngle: number, color : string,branch: number) => {

            let endPoint = await drawWithAnimation(posX, posY, angle, startAngle, length, 1, 60, color ,100);
       
            branch += 1
            if (branch <= 4) {
                for(let i = 1; i <= 3; i++){
                    let nextAngle = Math.floor(Math.random() * (75 - (-25) + 1));

                    let divisionRatio = Math.floor((Math.random() * (0.5) + 0.5)*10)

                    let Ratio1 = divisionRatio
                    let Ratio2 = 10 - divisionRatio

                    let nextPosX = (posX*Ratio2 + endPoint[0] * Ratio1) / (10);
                    let nextPosY = ((posY*Ratio2 + endPoint[1] * Ratio1)/10);

                    let nextLength = length * ((Math.random() *(0.3) + 0.4))

                    console.log(`posY : ${posY}, endPoint[1] : ${endPoint[1]}`)
                    console.log(`branch : ${branch} - nextAngle : ${nextAngle}, nextPosY : ${nextPosY}`)
                    setTimeout(() => {
                        drawWithAngle(nextPosX, nextPosY, nextLength, nextAngle, angle/2, color ,branch);
                    }, 0);
                }
            }
        
            drawing = false;
            context.closePath();
        };
        resizeHandler()



        window.addEventListener('resize', resizeHandler)
        canvas.addEventListener('click', clickHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
            window.removeEventListener('click', clickHandler)
        }

    },[status])

    return (
        <main className={`${styles.main}`}>
            <Toggle
                changeHandler={setStatus}
                nowStatus={status}
            ></Toggle>
            <canvas
            ref={canvasRef}
            className={`${styles.canvas}`}>
            </canvas>
        </main>
    )
}