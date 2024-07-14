
const $cards = document.getElementsByClassName('GHIBLI_cards__2i47_')
const $images = document.getElementsByClassName('GHIBLI_img__VPkY_')
const $backgrounds = document.getElementsByClassName('GHIBLI_bg__srk8')
console.log($cards)
console.log($images)
console.log($background)
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