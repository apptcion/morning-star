import styles from '../../css/DRAW.module.css'
import React from 'react'

interface ColorProps{
    onDataChange: (newColor : string) => void;
}

const Color: React.FC<ColorProps> = ({ onDataChange }) => {
    const changeColor = (color:string) => {
      onDataChange(color);

    };
  
    return (
      <div className={`${styles.colors}`}>
        <div className={`${styles.color} ${styles.red}`} onClick={() => changeColor('red')}></div> {/* 빨강 */}
        <div className={`${styles.color} ${styles.orange}`} onClick={() => changeColor('orange')}></div> {/* 주황 */}
        <div className={`${styles.color} ${styles.yellow}`} onClick={() => changeColor('yellow')}></div> {/* 노랑 */}
        <div className={`${styles.color} ${styles.green}`} onClick={() => changeColor('green')}></div> {/* 초록 */}
        <div className={`${styles.color} ${styles.blue}`} onClick={() => changeColor('blue')}></div> {/* 파랑 */}
        <div className={`${styles.color} ${styles.indigo}`} onClick={() => changeColor('indigo')}></div> {/* 남색 */}
        <div className={`${styles.color} ${styles.purple}`} onClick={() => changeColor('purple')}></div> {/* 보라 */}
        <div className={`${styles.color} ${styles.black}`} onClick={() => changeColor('black')}></div> {/* 검정 */}
      </div>
    );
  }

  export default Color