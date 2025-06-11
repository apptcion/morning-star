'use client'

import {useRef, useEffect} from 'react';
import styles from '../../css/NETWORK.module.css'

export default function Network(){

    
    const canvasRef = useRef<HTMLCanvasElement>(null)

    interface Velcity{
        vx : number;
        vy : number;
    }

    interface Points{
        x : number;
        y : number;
    }

    
    let particles: Array<Particle> = []
    let mouse: Points = {
        x : 0,
        y : 0
    }

    class Line{

        start: Points;
        end: Points;

        constructor(start: Points, end: Points){
            this.start = start;
            this.end = end;
        }

        draw(ctx: CanvasRenderingContext2D, distance: number, maxDistance: number){
            ctx.beginPath();
            ctx.moveTo(this.start.x, this.start.y);
            ctx.lineTo(this.end.x, this.end.y);
            ctx.strokeStyle = `rgba(255, 255, 0, ${1 - distance/maxDistance})`;
            ctx.lineWidth = 3 - distance/100;
            ctx.closePath();
            ctx.stroke();
        }
    }

    class Particle{

        point: Points
        r: number;
        v: Velcity;
        maxDistance: number;

        constructor(point : Points, r : number, v: Velcity, maxDistance = 400){
            this.point = point;
            this.r = r;
            this.v = v;
            this.maxDistance = maxDistance;
        }

        draw(ctx: CanvasRenderingContext2D){
            if(ctx){
                ctx.beginPath()
                ctx.fillStyle = 'white'
                ctx.arc(this.point.x, this.point.y, this.r, 0, Math.PI * 2, false)
                ctx.closePath()
                ctx.fill()
            }
        }

        animate(ctx: CanvasRenderingContext2D,  width: number, height : number){
        
            this.point.x += this.v.vx;
            this.point.y += this.v.vy;
        
            if(this.point.x < -100 || this.point.y < -100 || this.point.x > width || this.point.y > height){

                this.point.x = Math.random() * width;
                this.point.y = Math.random() * height;
                this.r = (Math.random() * 1.5) + 0.5;

                this.v = {
                    vx : ( Math.random() * 3 ) - 1.5,
                    vy : ( Math.random() * 3 ) - 1.5
                }
            }

            particles.forEach((particle) => {
                let d = getDistance(this.point, particle.point)
                if(d < this.maxDistance) new Line(this.point, particle.point).draw(ctx, d, this.maxDistance);
            })

            this.draw(ctx)
            
        }
    }

    function getDistance(start: Points, end: Points){
        return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))
    }

    useEffect(() => {

        const currentRef = canvasRef.current;
        const ctx:CanvasRenderingContext2D | null | undefined = currentRef?.getContext('2d');

        let animationFrameID: number;

        if(currentRef){
            currentRef.width = window.innerWidth + 80;
            currentRef.height = window.innerHeight + 80;
        }

        function initCanvas(){
            if(ctx && currentRef){
                ctx.fillStyle = 'black';
                //ctx.globalCompositeOperation = 'lighter'
                ctx.fillRect(0,0,currentRef.width, currentRef.height)
                
            }
        }

        function render(){
            if(ctx && currentRef){
                ctx.clearRect(0, 0, currentRef.width, currentRef.height);

                
                ctx.fillStyle = 'black';
                ctx.fillRect(0,0,currentRef.width, currentRef.height)
                particles.forEach((particle) => {
                    particle.animate(ctx, currentRef.width, currentRef.height)
                })

                animationFrameID = window.requestAnimationFrame(render)
            }
        }

        function resizeHandler() {
            if(currentRef){
                currentRef.width = window.innerWidth;
                currentRef.height = window.innerHeight;

                cancelAnimationFrame(animationFrameID)
                initCanvas()
                createParticles()
                render()
            }

        }

        let total = 70;
        function createParticles(){
            particles = []
            for(let i = 1; i <= total; i++) {
                let x = Math.random() * currentRef!.width;
                let y = Math.random() * currentRef!.height;

                let r = (Math.random() * 1.5) + 0.5;

                let velocity = {
                    vx : (Math.random() * 2) - 1,
                    vy : (Math.random() * 2) - 1
                }

                particles.push(new Particle({x ,y},r, velocity))
            }
            particles.push(new Particle(mouse, 1, {vx : 0,vy : 0}))
        }
        initCanvas()
        createParticles()
        render()
        window.addEventListener('resize', resizeHandler);

        const mousemove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }

        currentRef?.addEventListener('mousemove', mousemove)

        return () => {
            window.removeEventListener('resize', resizeHandler)
            currentRef?.removeEventListener('mousemove', mousemove )
        }

    },[])

    return (
        <div className={styles.wrap}>
        <canvas
            ref={canvasRef}
        ></canvas>
        </div>
    )
}