const BlockStatus = {
    Initial: 'Initial',
    Safe: 'Safe',
    Boom: 'Boom',
    Sweeped:'Sweeped'
};
class Block {
	constructor(isMine,x,y){
		this.x = x
		this.y = y
		this.isSweeped = false
		this.isMine = isMine
		this.sround = 0
		this.status = BlockStatus.Initial
	}
}

export {
	Block,
	BlockStatus
}
export default Block