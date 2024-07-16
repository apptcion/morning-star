import styles from '../../css/TREE.module.css'

interface toggleProps {
    changeHandler : (status: boolean) => void
    nowStatus : boolean
}

const toggle = (props : toggleProps) => {
    return (
        <div className={`${styles.toggleWrap}`}>
            <input className= {`${styles.inputButton}`} type="checkbox" id="btn"
                onChange={() => {
                    props.changeHandler(!props.nowStatus)
                }}
            />
            <label htmlFor="btn" className={`${styles.label}`}>
                <div className={`${styles.toggle}`}>
                    <div className={`${styles.toggleBtn}`} />
                </div>
            </label>

        </div>
    )
}
export default toggle