import styles from '../../css/forU.module.css'

export default function main(){
    return (
        <div>
            <input className={styles.btn} id="btn"/>
            <label htmlFor='btn' className={styles.label}>
                <h1 className={styles.h1}>Mr 지민 킴</h1>
            </label>
        </div>
    )
}