import Block from '../model/block'
import { shuffle,deepEach } from '../../lib/util'
export default class MineMap {
	constructor(width,height,mines){
		let map = new Array(height)
		let mineCount = 0
		for(let x = 0; x < height; x ++) {
			map[x] = new Array(width)
			for(let y = 0; y < width; y ++) {
				map[x][y] = new Block(mineCount++ < mines,x,y)
			}
		}
		shuffle(map)
		this.map = map
		this.width = width
		this.height = height
		this.mines = mines
	}

	caculateMine(block) {
		if(block.isSafe()) {
			return
		}
		block.setSafe()
		let arr = []
		let mines = 0
		// caculate sround area
		let x = block.x
		let y = block.y
		let xMin = x - 1 > 0 ? x - 1 : 0
		let xMax = x + 1 < this.height ? x + 1 : x
		let yMin = y - 1 > 0 ? y - 1 : 0
		let yMax = y + 1 < this.width ? y + 1 : y
		// search blocks around
		for(let x = xMin;x <= xMax;x++) {
			for(let y = yMin;y <= yMax;y++) {
				this.map[x][y].isMine ? mines ++ : mines
				if(this.map[x][y].isInitial() ) {
					// push no step on blocks
					arr.push(this.map[x][y])
				}
			}
		}
		block.sround = mines
		if(mines == 0 ) {
			// no mines around ,auto expand block around
			arr.forEach( (block) => {
				this.caculateMine(block)
			})
		}
	}

	checkWin() {
		let sweeped = 0
		deepEach(this.map,function(block){
			if(block.isMineSweeped()) {
				sweeped++
			}
		})
		// if all the mines are sweeped
		return sweeped === this.mines
	}

	showAllMines() {
		deepEach(this.map,function(block){
			if(block.isMine) {
				block.setBoom()
			}
		})
	}





}
