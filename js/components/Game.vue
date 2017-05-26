<template>
	<div>
		<table class="map">
			<tr v-for="mapRow in map">
				<td v-for="mapCol in mapRow" @click="mark(mapCol)">
					{{ showMapCol(mapCol) }}
				</td>
			</tr>
		</table>
		<button @click="newGame" >新游戏</button>
	</div>
</template>
<script>
	import { BlockStatus } from '../vuex/model/block'
	export default {
		created (){
			this.newGame()
		},
		data () {
			return {
				message: "Hello World"
			}
		},
		methods: {
			newGame(){
				this.$store.commit('newGame')
			},
			mark(block){
				this.$store.commit('mark',block)
			},
			sweep(){

			},
			showMapCol(mapCol){
				if(mapCol.isMine) {
					return 'M'
				}
				switch(mapCol.status) {
					case BlockStatus.Inistal :
						return ''
					case BlockStatus.Safe:
						return mapCol.sround
					case BlockStatus.Boom:
						return 'X'
					case BlockStatus.Sweeped:
						return '4'
				}
			}
		},
		computed: {
			map(){
				return this.$store.state.map
			}
		}
	}

</script>
<style>
	table.map {
		border-collapse: collapse;
	}
	table.map tr{
		height:40px;
	}
	table.map tr td{
		width:40px;
		border:1px solid #DFDFDF;
		text-align: center;
	}

</style>