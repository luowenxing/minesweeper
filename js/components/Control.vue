<template>
	<div class="flex control" v-bind:style="styleObject">
		<div class="flex-item">
			🚩{{ sweepers }} 
			<span class="div-btn" @click="settings" >⚒</span>
		</div>
		<div class="flex-item new">
			<div style="margin:0 auto" @click="newGame(false)" class="div-btn">{{ status }}</div>
		</div>
		<div class="flex-item time">
			{{ time }}
		</div>

	</div>

</template>

<script>
	import { clockFormat } from '../lib/util'
	import { GameStatus } from '../vuex/model/status'
	export default {
		created (){
			this.newGame(true)
		},
		methods: {
			newGame(isCreate){
				this.$store.commit('newGame',isCreate)
			},
			settings(){

			}
		},
		computed: {
			styleObject() {
				return {
					width:this.$store.state.mapWidth * 32 + 'px'
				}
			},
			sweepers() {
				return this.$store.state.sweepers
			},
			time() {
				return clockFormat(this.$store.state.time)
			},
			status(){
				let status = this.$store.state.gameStatus
				if(status === GameStatus.Lose) {
					return '🙁'
				} else  {
					return '😄'
				}
			}
		}
	}

</script>
<style scoped>
	.control {
		margin:0 auto;
		margin-top:10px;
		line-height: 30px;
	}
	.flex {
		display:flex;
		-webkit-display:flex;
	}
	.flex-item {
		flex:1;
	}
	.sweepers {
		background-color:white;
		text-align: right;
	}
	.new {
		text-align: center;
	}
	.time {
		text-align: right;
	}
	.div-btn {
		cursor:pointer;
		width:30px;
	}

</style>