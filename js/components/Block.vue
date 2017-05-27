<script>
	import { BlockStatus } from '../vuex/model/status'
	export default {
		functional: true,
		render: function (createElement, context) {
			let item = context.props.item
			let innerHTML = ''
			switch(item.status) {
				case BlockStatus.Sweeped:
					innerHTML = '🚩'
					break
				case BlockStatus.Safe:
					innerHTML = item.sround > 0 ? item.sround : '&nbsp;'
					break
				case BlockStatus.Boom:
					innerHTML = '💣'
					break

			}
			return createElement('div',{
				attrs:{
					class:item.status
				},
				domProps: {
    				innerHTML
  				},
			})
		},
		props:{
			item:{
				type:Object,
				required:true
			}
		}
	}
</script>

<style>
	.Safe,.Boom,.Sweeped,.Initial {
		cursor: default;
	}
	.Safe {
		background-color: #DFDFDF;
		height:100%;
		display: block;
	}
	.Boom {
		height:100%;
		display: block;
		cursor: default;
	}
</style>