    'use client'
    import styles from '../../css/BOKEH.module.css'
    import { useEffect, useState, useRef, RefObject } from 'react'
    import  HslToHex from './util'


    export default function Bokeh(){

        const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)

        useEffect(() => {
            const canvas: HTMLCanvasElement | null = canvasRef.current
            const context: CanvasRenderingContext2D | null = canvas === null ? null : canvas.getContext("2d")

            const circles:Array<{pos : Array<number>, vec : Array<number>, radius : number, color : string}> = [];

            let X = 0;
            let animationFrameID: number;

            const colors = [
                'rgba(200,0,0,1)',
                'rgba(0,200,0,1)',
                'rgba(50,50,200,1)'
            ]
            
            const startPoints = [
                [0,0], //좌측 상단
                [0,window.innerHeight], // 좌측 하단
                [window.innerWidth,window.innerHeight], //우측 하단
                [window.innerWidth, 0] //우측 상단
            ]

            const calcRadian = (x:number) => x*Math.PI/180

            const resizeHanler = () => {
                if(canvas){
                    canvas.width = window.innerWidth
                    canvas.height = window.innerHeight
                    
                    cancelAnimationFrame(animationFrameID)
                    initCanvas()
                    draw()
                }
            }

            const initCanvas = () => {
                context?.beginPath()
                if(context instanceof CanvasRenderingContext2D) context.globalCompositeOperation = 'lighter'

                context?.closePath()
                
            }

            const outOfCanvas = (pos:Array<number>, radius:number) => {

                if(pos[1] - radius >= window.innerHeight || pos[1]+radius < 0){ // Y값이 화면 밖인가
                    if(pos[0] - radius >= window.innerWidth || pos[0] + radius < 0){ // X값이 화면 밖인가{
                        console.log("화면 밖으로 나감!")
                        return true;
                    }
                }
                return false;
            }
        
            while(circles.length <= 30){
                    

                    //let startPoint = Math.floor((Math.random()*10)%4)
        
                    let vecX = (Math.random()*2.5)//-2.5
                    let vecY = (Math.random()*2.5)//-2.5

                    const minHue = 80;
                    const maxHue = 340;

                    const hue = (maxHue - minHue) * Math.random() + minHue;
        
                    circles.push({
                        pos : [0,0],
                        vec : [vecX, vecY],
                        radius : (Math.random()*300),
                        color : HslToHex(hue, 84, 50)
                    }) 
            }

            const draw = () => {
                context?.beginPath()
                context?.clearRect(0,0, window.innerWidth,window.innerHeight)
                context?.rect(0,0,innerWidth-1,innerWidth-6)
                if(context instanceof CanvasRenderingContext2D) {
                    context.fillStyle = 'black'

                }
                context?.fill()
                context?.closePath()
                circles.forEach((circleData, index)=>{
                    const {pos, vec, radius, color}  = circleData
                    
                    if(context instanceof CanvasRenderingContext2D) {
                        context.fillStyle = color
                        
                        context.shadowColor = color;
                        context.shadowBlur = 0
                    }
                    context?.beginPath();
                    context?.arc(pos[0], pos[1], Math.abs(radius + Math.sin(calcRadian(X/2))*(radius/120)   ), 0, Math.PI *2)
                    context?.fill()
                    context?.closePath()
                    
                    if(outOfCanvas(pos, radius)){
                        delete circles[index]
                    }else{
                    pos[0] += vec[0]
                    pos[1] += vec[1]
                    }
                
                })
                if(X%120 == 0){

                    //let startPoint = Math.floor((Math.random()*10)%4)
        
                    let vecX = (Math.random()*2.5)//-2.5
                    let vecY = (Math.random()*2.5)//-2.5

                    const minHue = 80;
                    const maxHue = 340;

                    const hue = (maxHue - minHue) * Math.random() + minHue;
        
                    circles.push({
                        pos : [0,0],
                        vec : [vecX, vecY],
                        radius : (Math.random()*250),
                        color : HslToHex(hue, 84, 50)
                    }) 
                }

                X += 10
                animationFrameID = requestAnimationFrame(draw)
            }

            resizeHanler()
            initCanvas()
            

            window.addEventListener('resize', resizeHanler)

        })

        return (
            <main className={`${styles.main}`}>
                <canvas 
                ref={canvasRef}
                className={styles.canvas}>
                </canvas>
            </main>
        )
    }