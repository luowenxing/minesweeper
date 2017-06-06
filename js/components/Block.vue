<script>
	export default {
		functional: true,
		render: function (createElement, context) {
			let item = context.props.item
			let innerHTML = ''
			if(item.isSweeped()){
				innerHTML = '🚩'
			} else if(item.isSafe()){
				innerHTML = item.sround > 0 ? item.sround : '&nbsp;'
			} else if(item.isBoom()){
				innerHTML = '💣'
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