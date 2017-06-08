export function shuffle(arr) {
	let height = arr.length
	let width = arr[0].length
	var randX = 0,randY = 0,temp
	deepEach(arr,(obj,x,y) => {
		randX = Math.floor(Math.random() * height)
		randY = Math.floor(Math.random() * width)
		arr[x][y].x = arr[randX][randY].x
		arr[x][y].y = arr[randX][randY].y
		arr[randX][randY].x = x
		arr[randX][randY].y = y

		temp = arr[x][y]
		arr[x][y] = arr[randX][randY]
		arr[randX][randY] = temp
	})
}

export function deepEach(arr,fn) {
	let args = Array.prototype.slice.call(arguments)
	let length = arr.length
	for(var index=0;index<length;index++) {
		let obj = arr[index]
		if(obj instanceof Array) {
			args[0] = obj
			deepEach.apply(this,args.concat([index]))
		} else {
			fn.apply(this,[obj,...args.slice(2),index])
		}
	}
}

export function clockFormat(seconds) {
	function addZero(num) {
		return num < 10 ? '0' + num : num
	}
	let sec = seconds % 60
	let hours = Math.floor(seconds / 60)
	return addZero(hours) + ':' + addZero(sec)

}

export function copy(src,dest) {
	for(var item in src) {
		if(src.hasOwnProperty(item)) {
			dest[item] = src[item]
		}
	}
}