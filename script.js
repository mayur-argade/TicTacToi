const X_Class= 'x'
const CIRCLE_Class= 'circle'
const winningMessageElement= document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartbutton = document.getElementById('restartbutton')
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements= document.querySelectorAll('[data-cell]')
const board= document.getElementById('board')
let circleTurn

startgame()

restartbutton.addEventListener('click', startgame)

function startgame() {
    circleTurn=false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_Class)
        cell.classList.remove(CIRCLE_Class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })    
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}



function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_Class:X_Class
    placemark(cell, currentClass)
    if(checkWin(currentClass)){
        endgame(false)
    }else if(isdraw()){
        endgame(true)
    }else{
        swapTurns()
    setBoardHoverClass()
    }
    //check for draw
    //switch turns
    
}
function endgame(draw) {
    if(draw){
        winningMessageTextElement.innerText = 'Draw !'
    }else{
        winningMessageTextElement.innerText= `${circleTurn ? "0's" : "X's" } WINS!` 
    }
    winningMessageElement.classList.add('show')
}
function isdraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_Class) || 
        cell.classList.contains(CIRCLE_Class)
    })
}

function placemark(cell, currenClass) {
        cell.classList.add(currenClass)
}

function swapTurns() {
    circleTurn= !circleTurn
}

function setBoardHoverClass() {
 board.classList.remove(X_Class)
 board.classList.remove(CIRCLE_Class)
 if(circleTurn){
     board.classList.add(CIRCLE_Class)
 }else{
     board.classList.add(X_Class)
 }
}

function checkWin(currentClass) {
return WINNING_COMBINATION.some(combination => {
    return combination.every(index=> {
        return cellElements[index].classList.contains(currentClass)        
    })
})
}