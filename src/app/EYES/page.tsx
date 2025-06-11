'use client'
import styles from '../../css/EYES.module.css'
import { useEffect, useRef } from 'react'

export default function Eyes(){

    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(() => {
        
        const ctx:CanvasRenderingContext2D | null | undefined = canvasRef.current?.getContext('2d')

        const init = () => {
            if(canvasRef.current){
                canvasRef.current.width = window.innerWidth
                canvasRef.current.height = window.innerHeight

                anime()
            }
        }

        const clear = () => {
            if(ctx){
                ctx.fillStyle = '#f0d6b3'
                ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
                ctx.fill()
            }
        }
        const mouse  = {
            x: window.innerWidth  * 0.5,
            y: window.innerHeight * 0.5
        }
        
        const mousemove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }

        const config = {
            eyeR: window.innerHeight * 0.09
        }

        let AnimationID = 0
        const anime = () => {
            clear()
            if(ctx){
                ctx.beginPath()
                ctx.fillStyle = 'white'
                ctx.lineWidth = 4
                ctx.arc(window.innerWidth * 0.4, window.innerHeight * 0.5, config.eyeR, 0, Math.PI*2)
                ctx.moveTo(window.innerWidth * 0.6, window.innerHeight * 0.5)
                ctx.arc(window.innerWidth * 0.6, window.innerHeight * 0.5, config.eyeR, 0, Math.PI*2)
                ctx.stroke()
                ctx.fill()
                ctx.closePath()

                ctx.beginPath()
                ctx.fillStyle = 'black'

                const pupil1 = [window.innerWidth * 0.4, window.innerHeight * 0.5]
                const pupil2 = [window.innerWidth * 0.6, window.innerHeight * 0.5]

                const distance = [
                 Math.sqrt(Math.pow(pupil1[0] - mouse.x,2) + Math.pow(pupil1[1] - mouse.y,2)),
                 Math.sqrt(Math.pow(pupil2[0] - mouse.x,2) + Math.pow(pupil2[1] - mouse.y,2))]

                const maxPupilMove = config.eyeR - window.innerHeight * 0.02;

                // 눈 중심과 마우스 사이 거리
                const fullDistance1 = Math.sqrt(Math.pow(mouse.x - window.innerWidth * 0.4, 2) + Math.pow(mouse.y - window.innerHeight * 0.5, 2));
                const fullDistance2 = Math.sqrt(Math.pow(mouse.x - window.innerWidth * 0.6, 2) + Math.pow(mouse.y - window.innerHeight * 0.5, 2));

                const ratio1 = Math.min(1, Math.pow(fullDistance1 / (window.innerWidth * 0.5), 1));
                const ratio2 = Math.min(1, Math.pow(fullDistance2 / (window.innerWidth * 0.5), 1));

                // 비례 이동
                const moveDistance1 = maxPupilMove * ratio1;
                const moveDistance2 = maxPupilMove * ratio2;

                const angle1 = Math.atan2(mouse.y - window.innerHeight * 0.5, mouse.x - window.innerWidth * 0.4);
                pupil1[0] = window.innerWidth * 0.4 + Math.cos(angle1) * moveDistance1;
                pupil1[1] = window.innerHeight * 0.5 + Math.sin(angle1) * moveDistance1;

                const angle2 = Math.atan2(mouse.y - window.innerHeight * 0.5, mouse.x - window.innerWidth * 0.6);
                pupil2[0] = window.innerWidth * 0.6 + Math.cos(angle2) * moveDistance2;
                pupil2[1] = window.innerHeight * 0.5 + Math.sin(angle2) * moveDistance2;

                ctx.arc(pupil1[0], pupil1[1], window.innerHeight * 0.02, 0, Math.PI*2)
                ctx.moveTo(pupil2[0], pupil2[1])
                ctx.arc(pupil2[0], pupil2[1], window.innerHeight * 0.02, 0, Math.PI*2)
                
                ctx.fill()

            }
            requestAnimationFrame(anime)
        }

        init()

        window.addEventListener('resize', init)
        window.addEventListener('mousemove', mousemove)

        return () => {
            window.removeEventListener('resize', init)
            window.removeEventListener('mousemove', mousemove)
            cancelAnimationFrame(AnimationID)
        }

    })

    return (
        <div className={styles.main}>
            <canvas className={styles.canvas} ref={canvasRef}></canvas>
            <div className={styles.line}></div>
        </div>
    )
}