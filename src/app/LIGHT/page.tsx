import styles from '../../css/LIGHT.module.css'

export default function LIGHT(){
    return(
        <div className={`${styles.main}`}>
            <h2 className={styles.h2}>
                <span className={`${styles.span}`}>There's</span>  
                <span className={`${styles.span} ${styles.light}`}>light</span> 
                <span className={`${styles.span}`}> even in</span> 
                <span className={`${styles.span}`}>the darkest</span>  
                <span className={`${styles.span}`}>places</span>
            </h2>
        </div>
    )
}