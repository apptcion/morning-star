import styles from '../../css/RGB.module.css'

export default function RGB(){
    return (
        <div className={styles.main}>
            <div className={styles.bg_rgb}></div>

            <div className={styles.bg_b}>
                <h1 className={`${styles.text_w}`} data-text="LUNA">LUNA</h1>
            </div>
            
            <div className={`${styles.bg_w} `}>
                <h1 className={` ${styles.text_b}`} data-text="DIMIGO">DIMIGO</h1>
            </div>
        </div>
    )
}