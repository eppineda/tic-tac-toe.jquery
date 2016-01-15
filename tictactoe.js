var constants = { 
    "ready":"ready", "playing":"playing", "winner":"winner", "draw":"draw" 
}

var TicTacToe = function() {
    this.status = constants.ready
    this.next = 'X'
    this.turns = 0
    this.coords = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ]
    this.coordsWinning = []
}

TicTacToe.prototype.constants = constants

TicTacToe.prototype.move = function(cell) {
    if (' ' !== this.coords[cell])
        return // invalid move
    if (constants.winner == this.status || constants.draw == this.status)
        return // game over

// still playing

    this.status = constants.playing
    this.coords[cell] = this.next
    if ('X' === this.next)
        this.next = 'O'
    else this.next = 'X'

// record-keeping

    ++this.turns
    if (this.isItAWin(this.coords)) {
        this.status = constants.winner
        return
    }
    if (this.turns > 8) {
        this.status = constants.draw
        return
    }
} // move

TicTacToe.prototype.isItAWin = function(coords) {
    if (constants.ready === this.status || constants.draw === this.status)
        return false
    if (constants.winner === this.status)
        return true

// game in progress

    var tests = []
    var row1win = [ 0, 1, 2 ]; tests.push(row1win)
    var row2win = [ 3, 4, 5 ]; tests.push(row2win)
    var row3win = [ 6, 7, 8 ]; tests.push(row3win) 
    var col1win = [ 0, 3, 6 ]; tests.push(col1win) 
    var col2win = [ 1, 4, 7 ]; tests.push(col2win) 
    var col3win = [ 2, 5, 8 ]; tests.push(col3win) 
    var dia1win = [ 0, 4, 8 ]; tests.push(dia1win) 
    var dia2win = [ 2, 4, 6 ]; tests.push(dia2win) 
    var win = function(cells, coords) {
        if (3 !== cells.length)
            throw { name:'GameException', msg:'not evaluating 3 cells in a row' }
        if (' ' == coords[cells[0]] || ' ' == coords[cells[1]] || ' ' == coords[cells[2]])
            return false
        if (coords[cells[0]] === coords[cells[1]] && coords[cells[0]] === coords[cells[2]])
            return true
        return false
    }
   
    for (var t in tests) {
        if (win(tests[t], coords)) {
            this.coordsWinning = tests[t]
            return true
        }
    }
    return false
} // isItAWin

TicTacToe.prototype.statusColor = function(cell) {
    if (constants.winner === this.status) {
        if (!this.coordsWinning.toString().match(cell))
            return constants.ready
    }
    return this.status
}
