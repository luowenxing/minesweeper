<template>
	<div class="flex control" v-bind:style="styleObject">
		<div class="flex-item">
			🚩{{ sweepers }}
		</div>
		<div class="flex-item new">
			<button @click="newGame" >新游戏</button>
		</div>
		<div class="flex-item time">
			{{ time }}
		</div>

	</div>

</template>

<script>
	export default {
		created (){
			this.newGame()
		},
		methods: {
			newGame(){
				this.$store.commit('newGame')
			},
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
				return this.$store.state.time
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

</style>