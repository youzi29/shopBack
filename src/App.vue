<template>
  <div id="app">
	<router-view/>
  </div>
</template>
<script>
	import { check , getProduct} from "./api/index.js"
  export default {
	 mounted() {
	 	
	 	 let data = {
	 	 	
	 	 }
	 	  check().then(res => {
			  if(res.data.msg == 'success'){
				  localStorage.setItem('bsid' , res.data.backid)
				 // localStorage.setItem('bsname' , res.data.backname)
				  this.$store.commit('setName' , res.data.backname)
				 //console.log(localStorage.getItem('bsid'))
				  // console.log(localStorage.getItem('bsname'))
			  }else{
				 // this.$router.push({path:'login'})
			  }
	 	  	console.log(res)
	 	  }).catch(err => {
	 	  	console.log(err);
	 	  });
	 	
	 },
    data() {
      return {
        
      };
    },
    methods: {
    
    }
  }
</script>
<style lang="scss" scoped>
   @import "./assets/css/main.css";
   @import "./assets/css/color-dark.css";     /*深色主题*/
  
  
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
	.sidebar{
		position: fixed;
	    z-index: 9999;
	}
	iframe{
		width: 100%;
		height: 1000px;
	}
</style>



