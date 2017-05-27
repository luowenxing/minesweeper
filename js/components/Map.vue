<template>
	<table class="map">
		<tr v-for="mapRow in map">
			<td v-for="mapCol in mapRow" @click="mark(mapCol)" @contextmenu="sweep($event,mapCol)">
				<Block :item="mapCol"></Block>
			</td>
		</tr>
	</table>
</template>
<script>
	import Block from './Block.vue'
	export default {
		methods:{
			mark(block){
				this.$store.commit('stepOn',block)
			},
			sweep(event,block){
				event.preventDefault()
				this.$store.commit('sweep',block)
			}
		},
		computed: {
			map(){
				return this.$store.state.map
			}
		},
		components:{
			Block
		}
	}

</script>
<style scoped>
	table.map {
		border-collapse: collapse;
		margin:0 auto;
		line-height: 29px;
	}
	table.map tr{
		height:32px;
	}
	table.map tr td{
		width:29px;
		border:1px solid #DFDFDF;
		text-align: center;
	}
</style>