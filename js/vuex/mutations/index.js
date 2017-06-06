import Block from '../model/block'
import { GameStatus } from '../model/status'
import { shuffle,deepEach } from '../../lib/util'

function caculateMine(block,store) {
	if(block.isSafe()) {
		return
	}
	block.setSafe()
	let arr = []
	let mines = 0
	let x = block.x
	let y = block.y
	let xMin = x - 1 > 0 ? x - 1 : 0
	let xMax = x + 1 < store.mapWidth ? x + 1 : x
	let yMin = y - 1 > 0 ? y - 1 : 0
	let yMax = y + 1 < store.mapHeight ? y + 1 : y
	// search blocks around
	for(let x = xMin;x <= xMax;x++) {
		for(let y = yMin;y <= yMax;y++) {
			store.map[x][y].isMine ? mines ++ : mines
			if(store.map[x][y].isInitial() ) {
				// push no step on blocks
				arr.push(store.map[x][y])
			}
		}
	}
	block.sround = mines
	if(mines == 0 ) {
		// no mines around ,auto expand block around
		arr.forEach( (block) => {
			caculateMine(block,store)
		})
	}
}

function checkWin(store) {
	let sweeped = 0
	deepEach(store.map,function(block){
		if(block.isMineSweeped()) {
			sweeped++
		}
	})
	// if all the mines are sweeped
	return sweeped === store.mines
}

function showAllMines(store) {
	deepEach(store.map,function(block){
		if(block.isMine) {
			block.setBoom()
		}
	})
}


export default {
	newGame(store) {
		// generate a new map
		let mines = store.mines
		let width = store.mapWidth
		let height = store.mapHeight
		let map = new Array(height)
		let mineCount = 0
		for(let x = 0; x < height; x ++) {
			map[x] = new Array(width)
			for(let y = 0; y < width; y ++) {
				map[x][y] = new Block(mineCount++ < mines,x,y)
			}
		}
		shuffle(map)
		store.map = map
		store.gameStatus = GameStatus.Playing
		store.time = 0
		store.sweepers = store.mines
		clearInterval(store.clock)
		store.clock = setInterval(() => {
			store.time ++
		},1000)
	},
	sweep(store,block) {
		if(store.gameStatus === GameStatus.Playing ) {
			// block which is already safe could not be sweeped
			if(!block.isSafe()) {
				if(block.isSweeped()) {
					// unsweep a block
					store.sweepers++
					block.setInitial()
				} else if(block.isInitial()) {
					if(store.sweepers === 0) { // no more sweepers
						return 
					}
					// sweep a block
					store.sweepers--
					block.setSweeped()
					if(store.sweepers === 0) { 
						// sweepers are all used,check if you win
						if(checkWin(store)) {
							store.gameStatus = GameStatus.Win
							clearInterval(store.clock)
						}
					}
				}
			}
			console.log('sweep one')
		}
	},
	stepOn(store,block){
		if(store.gameStatus === GameStatus.Playing ) {
			// onlu initial status block could be marked
			if(block.isInitial()) {
				if(block.isMine) { // step on a mine!!!
					// you lose and show all the mines
					store.gameStatus = GameStatus.Lose
					clearInterval(store.clock)
					showAllMines(store)
				} else {
					// caculate the mines around block
					// auto expand the safe block
					caculateMine(block,store)
				}
			}
		}
	}
}