'use client'
import styles from '../../css/Toggle.module.css'
import { useState } from 'react';
import Image from 'next/image';
import mountain_bg from '../../imgs/toggle_card/2774416_removeBG.svg'

export default function Toggle(){
    const [isDay, setTime] = useState(true)

    return (
        <div className={styles.main}>
            {
                isDay ? 
                <div className={`${styles.text} ${styles.Day}`}>Day</div> :
                <div className={`${styles.text} ${styles.Night}`}>Night</div>
            }
            <div className={`${styles.canvas} 
                ${ isDay? styles.DayBg : styles.NightBg}`} >
            </div>
            {/*<Image alt='' src={mountain_bg} className={`${styles.mountain_bg}`}></Image>*/}
            <div className={`${styles.mountain_cover} 
                ${isDay? styles.Day_cover: styles.Night_cover}`}>
            </div>

            <div className={styles.toggle_box}>
                <input type="checkbox" id="btn" className={styles.btn} onChange={
                    () => setTime(!isDay)
                }/>
                <label htmlFor='btn' className={styles.toggle_switch}>
                    <div className={styles.shadow_cover}></div>
                    <div className={styles.toggle_btn}>
                        <div className={styles.moon_box}>
                            <span className={`${styles.moon} ${styles.creter1}`}></span>
                            <span className={`${styles.moon} ${styles.creter2}`}></span>
                            <span className={`${styles.moon} ${styles.creter3}`}></span>
                        </div>
                    </div>
                    <div className={styles.halo_box}>
                        <span className={styles.solar_halo1}></span>
                        <span className={styles.solar_halo2}></span>
                        <span className={styles.solar_halo3}></span>
                    </div>
                    <div className={styles.cloud_wrap1}>
                        <span className={`${styles.cloud1} ${styles.c1_cir1}`}></span>
                        <span className={`${styles.cloud1} ${styles.c1_cir2}`}></span>
                        <span className={`${styles.cloud1} ${styles.c1_cir3}`}></span>
                        <span className={`${styles.cloud1} ${styles.c1_cir4}`}></span>
                        <span className={`${styles.cloud1} ${styles.c1_cir5}`}></span>
                        <span className={`${styles.cloud1} ${styles.c1_cir6}`}></span>
                        <span className={`${styles.cloud1} ${styles.c1_cir7}`}></span>
                        <span className={`${styles.cloud1} ${styles.c1_cir8}`}></span>
                    </div>
                    <div className={styles.cloud_wrap2}>
                        <span className={`${styles.cloud2} ${styles.c2_cir1}`}></span>
                        <span className={`${styles.cloud2} ${styles.c2_cir2}`}></span>
                        <span className={`${styles.cloud2} ${styles.c2_cir3}`}></span>
                        <span className={`${styles.cloud2} ${styles.c2_cir4}`}></span>
                        <span className={`${styles.cloud2} ${styles.c2_cir5}`}></span>
                        <span className={`${styles.cloud2} ${styles.c2_cir6}`}></span>
                        <span className={`${styles.cloud2} ${styles.c2_cir7}`}></span>
                    </div>

                    <div className={styles.star_box}>
                        <div className={`${styles.star} ${styles.star1}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star2}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star3}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star4}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star5}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star6}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star7}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star8}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star9}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star10}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star11}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star12}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                        <div className={`${styles.star} ${styles.star13}`}>
                            <div className={styles.star_cir1}></div>
                            <div className={styles.star_cir2}></div>
                            <div className={styles.star_cir3}></div>
                            <div className={styles.star_cir4}></div>
                            <div className={styles.star_main}></div>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    )
}