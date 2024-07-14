import styles from '@/css/Card.module.css'
import Image from 'next/image'
import anime_MainCard from '../imgs/anime_card/MainCard.png'
import rgb_MainCard from '../imgs/rgb_card/MainCard.png'
import toggle_MainCard from '../imgs/toggle_card/MainCard.png'
import bokeh_MainCard from '../imgs/bokeh_card/MainCard.png'
import light_MainCard from '../imgs/light_card/MainCard.png'
import draw_MainCard from '../imgs/draw_card/MainCard.png'
import wave_MainCard from '../imgs/wave_card/MainCard.png'

export default function Home() {
  return (
    <div className={` ${styles.CardContainer} `}>
      {/* 지브리 애니메이션*/}
      <a href="/GHIBLI" className={` ${styles.link}`}>
        <div className={` ${styles.MainCard} ANIME_CARD`}>
          <Image src = { anime_MainCard } className={styles.cardImg} alt="GHIBLI"/>
          <span className={styles.CardName}>3D Card</span>
        </div>
      </a>

      {/* RGB*/}
      <a href="/RGB" className={` ${styles.link}`}>
        <div className={` ${styles.MainCard} RGB_CARD`}>
          <Image src = { rgb_MainCard } className={styles.cardImg} alt="RGB"/>
          <span className={styles.CardName}>RGB</span>
        </div>
      </a>

      {/* 토글버튼 */}
      <a href="/TOGGLE" className={` ${styles.link}`}>
        <div className={` ${styles.MainCard} TOGGLE_CARD`}>
          <Image src = { toggle_MainCard } className={styles.cardImg} alt="TOGGLE"/>
          <span className={styles.CardName}>TOGGLE</span>
        </div>
      </a>

      {/* 빛 효과 */}
      <a href="/LIGHT" className={` ${styles.link}`}>
        <div className={` ${styles.MainCard} LIGHT_CARD`}>
          <Image src = { light_MainCard } className={styles.cardImg} alt="LIGHT"/>
          <span className={styles.CardName}>LIGHT</span>
        </div>
      </a>
      
      {/* 파도 */}
      <a href="/WAVE" className={` ${styles.link}`}>
        <div className={` ${styles.MainCard} WAVE_CARD`}>
          <Image src = { wave_MainCard } className={styles.cardImg} alt="WAVE"/>
          <span className={styles.CardName}>WAVE</span>
        </div>
      </a>
      
      {/* 그림그리기 */}
      <a href="/DRAW" className={` ${styles.link}`}>
        <div className={` ${styles.MainCard} DRAW_CARD`}>
          <Image src = { draw_MainCard } className={styles.cardImg} alt="DRAW"/>
          <span className={styles.CardName}>DRAW</span>
        </div>
      </a>

      {/* 보케 효과 */}
      <a href="/BOKEH" className={` ${styles.link}`}>
        <div className={` ${styles.MainCard} BOKEH_CARD`}>
          <Image src = { bokeh_MainCard } className={styles.cardImg} alt="BOKEH"/>
          <span className={styles.CardName}>BOKEH</span>
        </div>
      </a>
      
  </div>
  );
}