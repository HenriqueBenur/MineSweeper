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
function game_easy() {
    let removeButton = document.getElementById("lastWill")
    removeButton.setAttribute("style","display: none")
    var grid = document.querySelector('.grid_ez')
    var height = 10
    var width = 8
    var bombAmount = 10
    var squares = []
    create_board(grid,height,width,squares,bombAmount)
}
function game_normal() {
    let removeButton = document.getElementById("lastWill")
    removeButton.setAttribute("style","display: none")
    var grid = document.querySelector('.grid_nm')
    var height = 18
    var width = 14
    var bombAmount = 40
    var squares = []
    create_board(grid,height,width,squares,bombAmount)
}
function game_hard() {
    let removeButton = document.getElementById("lastWill")
    removeButton.setAttribute("style","display: none")
    var grid = document.querySelector('.grid_hd')
    var height = 24
    var width = 20
    var bombAmount = 99
    var squares = []
    create_board(grid,height,width,squares,bombAmount)
}
function create_board(grid,height,width,squares,bombAmount) {
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
            click(square)
        })
    }
    for (let i = 0; i < squares.length; i++) {
        let total = 0
        const isLeftEdge = i % width ===0
        const isRightEdge = i === width -1

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
            console.log(squares[i])
        }
    }
}
function click(square) {
    if (square.classList.contains('bomb')) {
        console.log('game over! tente novamente')
    } else {
        let total = square.getAttribute('data')
        if (total != 0) {
            square.classList.add('checked')
            square.innerHTML = total
            return
        }
        square.classList.add('checked')
    }
}
