<template>
	<div>
		<div class="flex control" v-bind:style="styleObject">
			<div class="flex-item">
				🚩{{ sweepers }} 
				<span class="div-btn" @click="openSettings" >⚒</span>
			</div>
			<div class="flex-item new">
				<div style="margin:0 auto" @click="newGame" class="div-btn">{{ status }}</div>
			</div>
			<div class="flex-item time">
				{{ time }}
			</div>
		</div>
		<Settings v-on:close="closeSettings" v-if="settingsOpen"/>
	</div>
</template>

<script>
	import { clockFormat } from '../lib/util'
	import { GameStatus } from '../vuex/model/status'
	import Settings from './Settings.vue'

	export default {
		data(){
			return {
				settingsOpen:false
			}
		},
		created(){
			this.setupGame()
		},
		methods: {
			newGame(){
				this.$store.commit('setupGame')
				this.$store.commit('startGame')
			},
			setupGame(){
				this.$store.commit('setupGame')
			},
			openSettings(){
				this.settingsOpen = true
			},
			closeSettings(){
				this.settingsOpen = false
			}
		},
		computed: {
			styleObject() {
				return {
					width:this.$store.state.mapWidth * 32 + 'px'
				}
			},
			status(){
				let status = this.$store.state.gameStatus
				if(status === GameStatus.Lose) {
					return '😲'
				} else if(status === GameStatus.Waiting) {
					return '😐'
				} else {
					return '😄'
				}
			},
			sweepers(){
				return this.$store.state.sweepers
			},
			time(){
				return clockFormat(this.$store.state.time)
			}
		},
		components:{
			Settings
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