import styles from '@/css/GHIBLI.module.css'
import Image from 'next/image'

import sophie_bg from '../../imgs/anime_card/sophie_bg.png'
import sophie from '../../imgs/anime_card/Sophie_Hatter-removebg-preview.png'

import totoro_bg from '../../imgs/anime_card/totoro_bg.png'
import totoro from '../../imgs/anime_card/totoro.png'
import totoro2 from '../../imgs/anime_card/totoro2.png'

import senAndChihiro_bg from '../../imgs/anime_card/senAndChihiro_bg.png'
import senAndChihiro from '../../imgs/anime_card/senAndChihiro.png'

import Script from 'next/script'

export default function GHIBLI() {
    return (
        <div className={` ${styles.main}`}>
            <div className={` ${styles.cards} `}>
                <h3 className={` ${styles.MainTitle} `}>GHIBLI MOVIES</h3>
                
                <div className={ `${styles.card} ${styles.one}` }>
                    <Image className={` ${styles.bg}` } alt="" src={ sophie_bg} style={{ top : '-4px', left : '-3px' }}></Image>
                    <Image className={` ${styles.img}` } alt="" src={ sophie } />
                    <div className={` ${styles.text}`}>
                        <p className={` ${styles.title} `}>Howl's moving castle</p>
                    </div>
                </div>

                <div className={` ${styles.card} ${styles.two}`}>
                    <Image className={` ${styles.bg}` } alt="" src={ totoro_bg} style={{ top : '-4px', left : '-3px' }}></Image>
                    <Image className={` ${styles.img}` } alt="" src={ totoro }/>
                    <Image className={` ${styles.img} ${styles.subImg}`} alt="" src={ totoro2 }></Image>
                    <div className={` ${styles.text} `}>
                        <p className={` ${styles.title} `}>Totoro</p>
                    </div>
                </div>
                <div className={` ${styles.card} ${styles.three}`}>
                    <Image className={` ${styles.bg} `} alt="" src={senAndChihiro_bg} style={{ top : '-4px', left : '-3px' }}></Image>
                    <Image className={` ${styles.img}`} alt="" src={senAndChihiro}></Image>
                    <div className={` ${styles.text} `}>
                        <p className={` ${styles.title} `}>Spirited Away</p>
                    </div>
                </div>
            </div>
            <Script strategy='afterInteractive'>
                {`
                    
                    const $cards = document.getElementsByClassName('GHIBLI_cards__2i47_')
                    const $images = document.getElementsByClassName('GHIBLI_img__VPkY_')
                    const $backgrounds = document.getElementsByClassName('GHIBLI_bg__srk86');

                    console.log($cards)
                    console.log($images)
                    console.log($backgrounds)

                    const RANGE = 40;
                    const calcValue = (a, b) => {
                        return (a/b * RANGE - RANGE/2).toFixed(1);
                    };
                    document.addEventListener(
                        'mousemove',
                        (event) => {
                            const yValue = calcValue(event.y, window.innerHeight);
                            const xValue = calcValue(event.x, window.innerWidth);
                            $cards[0].style.transform = 'rotateX(' + yValue + 'deg) rotateY(' + xValue + 'deg)';
                        
                            $images[0].style.transform = 'translateX(' + -xValue + 'px) translateY(' + yValue + 'px)'
                            $images[1].style.transform = 'translateX(' + -xValue + 'px) translateY(' + yValue + 'px)'
                            $images[2].style.transform = 'translateX(' + -xValue + 'px) translateY(' + yValue + 'px)'
                            $images[3].style.transform = 'translateX(' + -xValue + 'px) translateY(' + yValue + 'px)'
                            
                            $backgrounds[0].style.$backgroundsPosition = (xValue * .45) + 'px' +  (-yValue * .45) + 'px'
                            $backgrounds[1].style.$backgroundsPosition = (xValue * .45) + 'px' +  (-yValue * .45) + 'px'
                            $backgrounds[2].style.$backgroundsPosition = (xValue * .45) + 'px' +  (-yValue * .45) + 'px'

                        }
                    )                
                `}
            </Script>
        </div>
    )
}



