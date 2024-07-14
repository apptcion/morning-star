'use client'
import styles from '../../css/DRAW.module.css'
import React, { useRef ,useState, useEffect, RefObject} from 'react'

interface CanvasProps{
    colorName : string
}

const Canvas:React.FC<CanvasProps> = (props) => {

    const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<CanvasRenderingContext2D>();
    const paintData = useRef({ lines: [] as Array<{ points: Array<[number, number]>, color : string }> });
    const dotData = useRef({ dots : [] as Array<{pos : Array<number>, color : string}>       });
        
    let isDrawing = false;
    let lastX:number = 0;
    let lastY:number = 0;
    let second: number = 0;


    useEffect(() => {      
        const canvas : HTMLCanvasElement | null = canvasRef.current;
        const context : CanvasRenderingContext2D | null = canvas === null ? null : canvas.getContext("2d")

        if(canvas){
            canvas.width = (window.innerWidth- 35)
            canvas.height = (window.innerHeight - 38)
        }

        if(context){
            context.strokeStyle= props.colorName
            context.lineWidth = 5
            ctxRef.current = context
        }


        const resizeHandler = () => {
            if(canvas){
                canvas.width = (window.innerWidth- 20)
                canvas.height = (window.innerHeight - 20)
                if(ctxRef.current){
                    ctxRef.current.strokeStyle = props.colorName;
                    ctxRef.current.lineWidth = 2.5;
                }
                initCanvas()
            }
        }
        
        
        let LineData = {
            points : [] as Array<[number, number]>,
            color : props.colorName as string
        };

        const initCanvas = () => {
            /* Draw Paint Data (lines) */
            paintData.current.lines.forEach((lineData) => {
                const {points, color} = lineData
                if(ctxRef.current instanceof CanvasRenderingContext2D) ctxRef.current.strokeStyle = color
                ctxRef.current?.moveTo(points[0][0], points[0][1])
                ctxRef.current?.beginPath()
                console.log("Line Start Point  - ",points[0][0], points[0][1] )
                points.forEach((dot)=> {
                    if(ctxRef.current instanceof CanvasRenderingContext2D) ctxRef.current.strokeStyle = color
                    let X = dot[0]
                    let Y = dot[1]

                    ctxRef.current?.lineTo(X,Y)
                    ctxRef.current?.moveTo(X,Y)
                    ctxRef.current?.stroke()
                })
                ctxRef.current?.closePath()
            })

            /* Draw Dot Data (dots) */
            dotData.current.dots.forEach((dotdata) => {
                ctxRef.current?.beginPath()
                const {pos, color} = dotdata
                if(ctxRef.current instanceof CanvasRenderingContext2D) ctxRef.current.fillStyle = color
                ctxRef.current?.moveTo(pos[0], pos[1])
                ctxRef.current?.arc(pos[0],pos[1],2.5,0,Math.PI*2)
                ctxRef.current?.fill()
                ctxRef.current?.closePath()
            })

        }

        const startDrawing = (event : MouseEvent) => {
            if(ctxRef.current instanceof CanvasRenderingContext2D) ctxRef.current.strokeStyle = props.colorName

            isDrawing = true;
            lastX = event.layerX-20;
            lastY = event.layerY-20;
            
            ctxRef.current?.beginPath()
            ctxRef.current?.moveTo(lastX, lastY)

            LineData.points.push([lastX,lastY])
        }
        const finishDrawing = () => {
            isDrawing = false
            second = 0
            paintData.current.lines.push(LineData)
            LineData =  {
                points : [] as Array<[number, number]>,
                color : props.colorName as string
            };
            //ctxRef.current?.closePath()
        }

        const drawing = (event : MouseEvent) => {
            if(isDrawing && ctxRef.current !== null){
                ctxRef.current?.lineTo(event.layerX-20, event.layerY-20)
                ctxRef.current?.stroke()
                ctxRef.current?.moveTo(event.layerX-20, event.layerY-20)

                lastX = event.layerX-20;
                lastY = event.layerY-20;
                //if(second%3==0) { // Reducing time for Rendering
                    LineData.points.push([lastX,lastY])
                //}
                //second += 1.5
            }
        }

        const clickHandler = (event : MouseEvent) => {
            if(ctxRef.current !== null){
                if(ctxRef.current instanceof CanvasRenderingContext2D) ctxRef.current.fillStyle = props.colorName;
                ctxRef.current?.arc(event.layerX-20, event.layerY-20, 2.5, 0, Math.PI * 2)
                ctxRef.current?.fill()

                dotData.current.dots.push({
                    pos:  [event.layerX-20, event.layerY-20],
                    color : props.colorName as string
                })
            }
        }

        initCanvas()

        window.addEventListener('resize', resizeHandler);
        canvas?.addEventListener('mousemove', drawing);
        canvas?.addEventListener('mousedown', startDrawing);
        canvas?.addEventListener('mouseup', finishDrawing);
        canvas?.addEventListener('click', clickHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
            canvas?.removeEventListener('mousemove', drawing);
            canvas?.removeEventListener('mousedown', startDrawing);
            canvas?.removeEventListener('mouseup', finishDrawing);
            canvas?.addEventListener('click', clickHandler);
        };
    },[props.colorName]);

    return (
        <canvas 
        className={`${styles.canvas} `}
        ref={canvasRef}>
        </canvas>
    )
}

export default Canvas