'use client'
import styles from '@/css/Card.module.css'
import Image, { StaticImageData } from 'next/image'
import anime_MainCard from '../imgs/anime_card/MainCard.png'
// import rgb_MainCard from '../imgs/rgb_card/MainCard.png'
import toggle_MainCard from '../imgs/toggle_card/MainCard.png'
import bokeh_MainCard from '../imgs/bokeh_card/MainCard.png'
// import light_MainCard from '../imgs/light_card/MainCard.png'
import draw_MainCard from '../imgs/draw_card/MainCard.png'
import wave_MainCard from '../imgs/wave_card/MainCard.png'
import tree_MainCard from '../imgs/tree_card/MainCard.png'
import network_MainCard from '../imgs/network_card/MainCard.png'
import shyPixel_MainCard from '../imgs/shyPixel_card/MainCard.png'
import eyes_MainCard from '../imgs/eyes_card/MainCard.png'
import {getCookie, setCookie} from '../js/cookie'

import {useEffect} from 'react'

function Card({img, name, link}:{img: StaticImageData, name: string, link: string}) {

  return (
          <a href={`/${link}`} className={` ${styles.link}`}>
        <div className={`${styles.MainCard} ANIME_CARD`}>
          <Image src = { img } className={styles.cardImg} alt={`${name}`}/>
          <span className={styles.CardName}>{`${name}`}</span>
        </div>
      </a>
  )
}


export default function Home() {

  useEffect(() => {
    if(getCookie('ticket') === undefined){
      setCookie('from','http://chess.apptcion.site');
      console.log("토큰 없음", getCookie('ticket'))
      location.href = 'https://apptcion.site/filter';
    }else{
      fetch('https://apptcion.site/isValid',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          ticket:getCookie('ticket'),
        })
      }).then((response) => {
          if(response.ok) return response.json();
      }).then((data) => {
        if(!data){
          setCookie('from','http://chess.apptcion.site/');
          location.href = 'https://apptcion.site/filter';
          console.log("토큰 잘못됨", getCookie('ticket'))
        }
      })
    }
  })

  return (
    <div className={` ${styles.CardContainer} `}>
      {/* 지브리 애니메이션*/}
      <Card img={anime_MainCard} name="GHIBLI" link="GHIBLI"/>

      {/* RGB*/}
      {/* <Card img={rgb_MainCard} name="RGB" link="RGB"/> */}

      {/* 토글버튼 */}
      <Card img={toggle_MainCard} name="TOGGLE" link="TOGGLE"/>

      {/* 빛 효과 */}
      {/* <Card img={light_MainCard} name="LIGHT" link="LIGHT"/> */}
      
      {/* 파도 */}
      <Card img={wave_MainCard} name="WAVE" link="WAVE"/>
      
      {/* 그림그리기 */}
      <Card img={draw_MainCard} name="DRAW" link="DRAW"/>

      {/* 보케 효과 */}
      <Card img={bokeh_MainCard} name="BOKEH" link="BOKEH"/>

      {/* 나무 효과 */}
      <Card img={tree_MainCard} name="TREE" link="TREE"/>

     {/* 네트워크 효과 */}
      <Card img={network_MainCard} name="NETWORK" link="NETWORK"/>

      {/* 도망치는 픽셀 효과 */}
      <Card img={shyPixel_MainCard} name="SHY_PIXEL" link="SHY_PIXEL"/>

      {/* 부끄러운 픽셀 효과 */}
      <Card img={eyes_MainCard} name="EYES" link="EYES"/>

  </div>
  );
}