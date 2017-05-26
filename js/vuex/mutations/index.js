import { BlockStatus,Block } from '../model/block'
import shuffle from '../../lib/util'

function notEdge(x,y,xMax,yMax) {
	return !((x == 0 && y == 0)||(x == 0 && y == yMax - 1)||(x == xMax - 1 && y == 0)||(x == xMax - 1 && y == yMax - 1))
}

function caculateMine(block,store) {
	block.status = BlockStatus.Safe
	let arr = []
	let mines = 0
	let x = block.x
	let y = block.y
	let xMin = x - 1 > 0 ? x - 1 : 0
	let xMax = x + 1 < store.mapWidth ? x + 1 : x
	let yMin = y - 1 > 0 ? y - 1 : 0
	let yMax = y + 1 < store.mapHeight ? y + 1 : y
	for(let x = xMin;x <= xMax;x++) {
		for(let y = yMin;y <= yMax;y++) {
			store.map[x][y].isMine ? mines ++ : mines
			if(x != block.x && y != block.y && notEdge(x,y,store.mapWidth,store.mapHeight)) {
				arr.push(store.map[x][y])
			}
		}
	}
	block.sround = mines
	if(mines == 0 ) {
		arr.forEach( (block) => {
			caculateMine(block,store)
		})
	}
}


export default {
	newGame(store) {
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
	},
	mine(store,block) {

	},
	mark(store,block){
		if(block.isMine) {
			block.status = BlockStatus.Boom
		} else {
			caculateMine(block,store)
		}
	}
}