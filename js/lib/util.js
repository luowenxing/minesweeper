export default function shuffle(arr) {
	let height = arr.length
	let width = arr[0].length
	var randX = 0,randY = 0,temp
	for(let x = 0;x < height; x ++) {
		for(let y = 0;y < width; y ++) {
			randX = Math.floor(Math.random() * height)
			randY = Math.floor(Math.random() * width)
			temp = arr[x][y]
			arr[x][y] = arr[randX][randY]
			arr[randX][randY] = temp
		}
	}
}
