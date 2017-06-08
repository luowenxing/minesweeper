<template>
	<div class="modal">
		<div class="modal-content" >
			<div class="form-item form-action">
				<div class="close" @click="close">×</div>
			</div>
			<div class="form-item">
				<span class="label">width :</span>
				<input class="field" type="number" v-model="width" @keyup.enter="handleSubmit"/>
			</div>
			<div class="form-item">
				<span class="label">height :</span>
				<input class="field" type="number" v-model="height" @keyup.enter="handleSubmit"/>
			</div>
			<div class="form-item">
				<span class="label">mines :</span>
				<input class="field" type="number" v-model="mines" @keyup.enter="handleSubmit"/>
			</div>
			<div class="form-item form-action">
				<button class="btn" @click="handleSubmit">submit</button>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		data(){
			let state = this.$store.state
			return {
				width:state.mapWidth,
				height:state.mapHeight,
				mines:state.mines
			}
		},
		methods:{
			handleSubmit(){
				this.$store.commit('modSettings',{
					mapWidth:this.width,
					mapHeight:this.height,
					mines:this.mines
				})
				this.$store.commit('setupGame')
				this.close()
			},
			close(e){
				this.$emit('close')
			},
			stopPropagation(e){
				e.stopPropagation()
			}
		}
	}

</script>
<style scoped>
	.modal {
		width: 100%;
		height:100%;
		position: fixed;
		z-index:999;
		overflow: hidden;
		top:0;
		left:0;

	}
	.modal-content {
		margin:5% auto;
		padding:20px;
		padding-top:0px;
		border:1px solid #DFDFDF;
		width:250px;
		background-color:white;
		box-shadow: 0px 0px 10px #DFDFDF;
		border-radius:5px;

	}
	.form-item {
		display:flex;
		-webkit-display:flex;
		margin-top:10px;
	}
	.form-item .label {
		flex:1;
		text-align: right;
	}
	.form-item .field {
		flex:3;
		border-radius:4px;
		border:1px solid #DFDFDF;
	}
	.form-item .field,.form-item .label {
		padding:4px;
	}
	.form-action {
		text-align: right;
		justify-content:flex-end;
	}
	.close {
		width:20px;
		height:20px;
		cursor:pointer;
		line-height: 20px;
		font-weight:bold;
	}
	.btn {
		background-color:white;
		line-height:20px;
		border-radius:4px;
		border:1px solid #DFDFDF;
		cursor:pointer;
	}
</style>