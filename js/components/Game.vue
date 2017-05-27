<template>
	<div>
		<MineMap></MineMap>
		<Control></Control>
	</div>
</template>
<script>
	import MineMap from './Map.vue'
	import Control from './Control.vue'
	import { GameStatus } from '../vuex/model/status'
	export default {
		computed:{
			gameStatus(){
				return this.$store.state.gameStatus
			},
			showResult(){
				return this.gameStatus === GameStatus.Win || this.gameStatus === GameStatus.Lose
			}
		},
		watch:{
			showResult(val){
				if(val) {
					setTimeout(alert.bind(window,'You ' + this.gameStatus + '!'),0)
				}
			}
		},
		components:{
			MineMap,
			Control
		}
	}

</script>