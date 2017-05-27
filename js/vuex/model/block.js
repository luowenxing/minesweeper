import { BlockStatus } from './status'

// TODO: move code about Block in mutations here
export default class Block {
	constructor(isMine,x,y){
		this.x = x
		this.y = y
		this.isSweeped = false
		this.isMine = isMine
		this.sround = 0
		this.status = BlockStatus.Initial
	}
}