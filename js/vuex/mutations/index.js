import { GameStatus } from '../model/status'
import MineMap from '../model/map'
import { copy } from '../../lib/util'

export default {
	setupGame(store){
		clearInterval(store.clock)
		// generate a new map
		let mines = store.mines
		let width = store.mapWidth
		let height = store.mapHeight
		store.mineMap = new MineMap(width,height,mines)
		store.map = store.mineMap.map
		store.sweepers = mines
		store.gameStatus = GameStatus.Waiting
		store.time = 0
	},

	startGame(store) {
		store.gameStatus = GameStatus.Playing
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
						if(store.mineMap.checkWin()) {
							store.gameStatus = GameStatus.Win
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
					store.mineMap.showAllMines()
				} else {
					// caculate the mines around block
					// auto expand the safe block
					store.mineMap.caculateMine(block)
				}
			}
		}
	},
	modSettings(store,settings){
		copy(settings,store)
	}
}