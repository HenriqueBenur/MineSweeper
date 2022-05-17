function start_game() {
    let diff_input = parseInt(document.getElementById("difficulty_input").value);
    switch (diff_input) {
        case 0: {
            window.location.href = 'game_ez.html'
        } break;
        case 1: {
            window.location.href = 'game_nm.html'
        } break;
        case 2: {
            window.location.href = 'game_hd.html'
        } break;
    }
}
var boardOn = false;
var squares = []
function game_easy() {
    let removeButton = document.getElementById("lastWill")
    removeButton.setAttribute("style","display: none")
    var grid = document.querySelector('.grid_ez')
    var height = 10
    var width = 8
    var bombAmount = 10
    let isGameOver = false
    let flags = 0
    
    if (!boardOn) {
        create_board(grid,height,width,squares,bombAmount,isGameOver,flags)
    } else {
        nanovisionEnabled(squares)
    }
}
function game_normal() {
    let removeButton = document.getElementById("lastWill")
    removeButton.setAttribute("style","display: none")
    var grid = document.querySelector('.grid_nm')
    var height = 18
    var width = 14
    var bombAmount = 40
    let isGameOver = false
    let flags = 0
    if (!boardOn) {
        create_board(grid,height,width,squares,bombAmount,isGameOver,flags)
    } else {
        nanovisionEnabled(squares)
    }
}
function game_hard() {
    let removeButton = document.getElementById("lastWill")
    removeButton.setAttribute("style","display: none")
    var grid = document.querySelector('.grid_hd')
    var height = 24
    var width = 20
    var bombAmount = 99
    let isGameOver = false
    let flags = 0
    if (!boardOn) {
        create_board(grid,height,width,squares,bombAmount,isGameOver,flags)
    } else {
        nanovisionEnabled(squares)
    }
}
function create_board(grid,height,width,squares,bombAmount,isGameOver,flags) {
    const bombsArray = Array(bombAmount).fill('bomb')
    const safeArray = Array(height*width - bombAmount).fill('safe')
    const gameArray = safeArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)

    for (let i = 0; i < height*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('id',i)
        square.classList.add(shuffledArray[i])
        grid.appendChild(square)
        squares.push(square)

        square.addEventListener('click',function(e) {
            click(square, squares, width, isGameOver,height)
        })
        square.oncontextmenu = function check(e) {
            e.preventDefault()
            addFlag(square,isGameOver,flags,bombAmount,squares)
        }
    }
    for (let i = 0; i < squares.length; i++) {
        let total = 0
        const isLeftEdge = (i % width ===0)
        const isRightEdge = (i % width === width-1)

        if (squares[i].classList.contains('safe')) {
            if (i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) {
                total++
            }
            if (i > (width-1) && !isRightEdge && squares[i+1-width].classList.contains('bomb')) {
                total++
            }
            if (i > width && squares[i-width].classList.contains('bomb')) {
                total++
            }
            if (i > (width+1) && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) {
                total++
            }
            if (i < (squares.length-1) && !isRightEdge && squares[i+1].classList.contains('bomb')) {
                total++
            }
            if (i < (squares.length-width) && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) {
                total++
            }
            if (i < (squares.length-width-1) && !isRightEdge && squares[i+1+width].classList.contains('bomb')) {
                total++
            }
            if (i < (squares.length-width) && squares[i+width].classList.contains('bomb')) {
                total++
            }
            squares[i].setAttribute('data',total)
        }
    }
    boardOn = true
}
function addFlag(square,isGameOver, flags,bombAmount,squares) {
    if (isGameOver) {
        return
    }
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
        if (!square.classList.contains('flag')) {
            square.classList.add('flag')
            square.innerHTML = '🚩'
            flags++
            checkForWin(squares,bombAmount,isGameOver)
        } else {
            square.classList.remove('flag')
            square.innerHTML = ''
            flags--
        }
    }
}
function click(square, squares, width,isGameOver,height,bombAmount) {
    let currentID = square.id
    if (isGameOver) {
        return
    }
    if (square.classList.contains('checked') || square.classList.contains('flag')) {
        return
    }
    if (square.classList.contains('bomb')) {
        gameOver(square,isGameOver,squares)
    } else {
        let total = square.getAttribute('data')
        if (total != 0) {
            square.classList.add('checked')
            square.innerHTML = total
            return
        }
        checkSquare(squares, width,isGameOver,height,currentID)
    }
    square.classList.add('checked')
    checkForWin(squares,bombAmount,isGameOver)
}
function checkSquare(squares,width,isGameOver,height,currentID) {
    
    const isLeftEdge = currentID % width === 0
    const isRightEdge = currentID % width === width-1

    setTimeout(() => {
        if (currentID > 0 && !isLeftEdge) {
            const newID = squares[parseInt(currentID)-1].id
            const newSquare = document.getElementById(newID)
            click(newSquare,squares,width,isGameOver)
        }
        if (currentID > (width-1) && !isRightEdge) {
            const newID = squares[parseInt(currentID)+1-width].id
            const newSquare = document.getElementById(newID)
            click(newSquare,squares,width,isGameOver)
        }
        if (currentID > width) {
            const newID = squares[parseInt(currentID)-width].id
            const newSquare = document.getElementById(newID)
            click(newSquare,squares,width,isGameOver)
        }
        if (currentID > (width+1) && !isLeftEdge) {
            const newID = squares[parseInt(currentID)-1-width].id
            const newSquare = document.getElementById(newID)
            click(newSquare,squares,width,isGameOver)
        }
        if (currentID < ((width*height)-1) && !isRightEdge) {
            const newID = squares[parseInt(currentID)+1].id
            const newSquare = document.getElementById(newID)
            click(newSquare,squares,width,isGameOver)
        }
        if (currentID < ((width*height)-width) && !isLeftEdge) {
            const newID = squares[parseInt(currentID)-1+width].id
            const newSquare = document.getElementById(newID)
            click(newSquare,squares,width,isGameOver)
        }
        if (currentID < ((width*height)-width-2) && !isRightEdge) {
            const newID = squares[parseInt(currentID)+1+width].id
            const newSquare = document.getElementById(newID)
            click(newSquare,squares,width,isGameOver)
        }
        if (currentID < ((width*height)-width-1) && !isLeftEdge) {
            const newID = squares[parseInt(currentID)+width].id
            const newSquare = document.getElementById(newID)
            click(newSquare,squares,width,isGameOver)
        }
    }, 10)
}
function gameOver(square, isGameOver,squares) {
    alert('Game Over, Você Perdeu')
    isGameOver = true

    squares.forEach(square => {
        if (square.classList.contains('bomb')) {
            square.innerHTML = '💣'
        }
    });
}
function checkForWin(squares,bombAmount,isGameOver) {
    let BombMatch = 0;
    let checkedSquares = 0;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
            BombMatch++
        }
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('cheat')) {
            BombMatch++
        }
        if (squares[i].classList.contains('checked')) {
            checkedSquares++
        }
        if (BombMatch === bombAmount && checkedSquares == (squares.length-bombAmount)) {
            alert('ganhou o jogo rapaz')
            isGameOver
        }
    }
}
function nanovisionEnabled(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('bomb')) {
            squares[i].classList.remove('bomb')
            squares[i].classList.add('cheat')
        }
    }
}
