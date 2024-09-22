'use client'

import {useEffect, useRef} from 'react'
import { GUI } from 'dat.gui'
import Image from 'next/image'

import styles from '../../css/SHYPIXEL.module.css'
import defaultImg from '../../imgs/shyPixel_card/default.png'

export default function ShyPixel(){

    class Pixel{

        ox : number
        oy : number
        dsx : number
        dsy : number
        or : number
        og : number
        ob : number
        r : number
        g : number
        b : number

        constructor(ox: number, oy: number, r: number, g: number, b: number){
            this.ox = ox;
            this.oy = oy;
            this.dsx = ox;
            this.dsy = oy;
            this.or = r;
            this.og = g;
            this.ob = b;
            this.r = r;
            this.g = g;
            this.b = b;
        }

        draw(ctx: CanvasRenderingContext2D){
            let distance = Math.sqrt(Math.pow( mousePoint.x - this.ox ,2) + Math.pow(mousePoint.y - this.oy ,2))
            let stroke = config.strength / distance;
            
            if(config.glow){

                this.r += stroke
                this.g += stroke
                this.b += stroke

                this.r += (this.or - this.r) * config.easeFactor
                this.g += (this.og - this.g) * config.easeFactor
                this.b += (this.ob - this.b) * config.easeFactor

                ctx.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`
            }else{
                ctx.fillStyle = `rgb(${this.or}, ${this.og}, ${this.ob})`
            }

            this.dsx += Math.cos(Math.atan2(this.oy - mousePoint.y, this.ox - mousePoint.x)) * stroke
            this.dsy += Math.sin(Math.atan2(this.oy - mousePoint.y, this.ox - mousePoint.x)) * stroke

            this.dsx += (this.ox - this.dsx) * config.easeFactor
            this.dsy += (this.oy - this.dsy) * config.easeFactor

            ctx.beginPath()
            ctx.arc(this.dsx, this.dsy, config.px, 0, Math.PI * 2 )
            ctx.fill()
        }
    }

    const canvasRef  = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    let config = {
        strength: 1500,
        easeFactor : 0.1,
        glow : true,
        px : 7
    }

    let mousePoint = {
        x : 0,
        y : 0
    }

    useEffect(() => {
        const currenrRef = canvasRef.current;
        const ctx = currenrRef?.getContext('2d')
        const img = imgRef.current;

        let imgPos = {x : 0, y : 0}

        let pixels: Array<Pixel> = []

        const initCanvas = () => {
            if(ctx && currenrRef){
                ctx.fillStyle = 'black'
                ctx.beginPath()
                ctx.fillRect(0,0,currenrRef.width,currenrRef.height)
                ctx.closePath()
            }
        }

        const resizeHandler = () => {
            if(currenrRef){
                currenrRef.width = window.innerWidth;
                currenrRef.height = window.innerHeight;
                initCanvas()
                drawPixelImg()
            }
        }

        const drawAnime = () => {
            if(ctx){
                ctx.clearRect(0,0,window.innerWidth, window.innerHeight)
                initCanvas()
                pixels.forEach((pixel) => {
                    pixel.draw(ctx)
                })
                requestAnimationFrame(drawAnime)
            }
        }

        const createPixel = () => {
            if(ctx && img){
                const imgData = ctx.getImageData(imgPos.x, imgPos.y, img.width, img.height)
            
                const result: Array<Pixel> = []
                let AmountOfX = Math.floor(img.width / config.px) + img.width % config.px;
                let AmountOfY = Math.floor(img.height / config.px) + img.height % config.px;

                for(let y = 0; y <= img.height; y += config.px){
                    for(let x = 0; x <= img.width; x += config.px){

                        const StartIndex = 4 * ( x  + ( y * img.width) )

                        let sumR = 0;
                        let sumG = 0;
                        let sumB = 0;
                        let count = 0;
                        for(let suby = 0; suby <= config.px; suby += 1){
                            for(let subx = 0; subx <= config.px; subx += 1){

                                if(subx + x >= img.width || suby + y >= img.height){
                                    continue;
                                }


                                let index = 4 * ((x + subx) + ((y + suby) * img.width))
                                sumR += imgData.data[index]
                                sumG += imgData.data[index + 1]
                                sumB += imgData.data[index + 2]
                                count += 1;
                            }
                        }

                        // + (window.innerWidth - ( config.px * AmountOfX * 2.3) + config.px) / 2
                        // + (window.innerHeight - ( config.px * AmountOfY * 2.3 ) + config.px) / 2
                        result.push(new Pixel(x*2.3, y*2.3, sumR/count, sumG/count, sumB/count))

                    }
                }

                return result
            }

            return []
        }

        const drawPixelImg = () => {
            if(img && ctx && currenrRef){
                imgPos.x = ( currenrRef.width - img.width ) / 2
                imgPos.y = ( currenrRef.height - img.height ) / 2
                
                ctx.drawImage(img, imgPos.x, imgPos.y)

                pixels = createPixel();
            }
        }
        
        const mouseMoveHandler = (event: MouseEvent) => {
            mousePoint.x = event.clientX;
            mousePoint.y = event.clientY;
        }

        /** const showController = () => {
            const datGUI = new GUI({closed : true})
            datGUI.add(config, 'strength', 0, 10000)
            datGUI.add(config, 'easeFactor', 0, 0.5)
            datGUI.add(config, 'glow')
            const PixelController = datGUI.add(config, 'px', 1, 100, 1);
            PixelController.onFinishChange(() => {

            })
        }
        showController()
        */
        resizeHandler()
        requestAnimationFrame(drawAnime)
        window.addEventListener('resize', resizeHandler);
        window.addEventListener('mousemove', mouseMoveHandler)
        

        return () => {
            window.removeEventListener('resize', resizeHandler)
            window.removeEventListener('mousemove', mouseMoveHandler)
        }

    },[])

    return (
        <div className={styles.main}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
            ></canvas>
            <Image 
                ref={imgRef}
                priority={true}
                src={defaultImg} alt='' className={styles.target_img}/>
        </div>
    )
}