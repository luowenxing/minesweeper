import { BlockStatus } from './status'

// TODO: move code about Block in mutations here
export default class Block {
	constructor(isMine,x,y){
		this.x = x
		this.y = y
		this.isMine = isMine
		this.sround = 0
		this.status = BlockStatus.Initial
	}
	isSafe(){
		return this.status === BlockStatus.Safe
	}
	isInitial(){
		return this.status === BlockStatus.Initial
	}
	isMineSweeped(){
		return this.status === BlockStatus.Sweeped && this.isMine
	}
	isSweeped(){
		return this.status === BlockStatus.Sweeped
	}
	isBoom(){
		return this.status === BlockStatus.Boom
	}
	setSafe(){
		this.status = BlockStatus.Safe
	}
	setBoom(){
		this.status = BlockStatus.Boom
	}
	setInitial(){
		this.status = BlockStatus.Initial
	}
	setSweeped(){
		this.status = BlockStatus.Sweeped
	}
}  