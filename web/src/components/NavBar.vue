<template>
    <div class="footer">
        <div class="footer-item" v-for='(item,index) of items' 
        :key="index"
        @click="change(item,index)">
            <img :src="index===idx?item.iconSelect:item.icon">
        </div>
    </div>
</template>
  <style lang="scss">
    .footer{    
    position:fixed;    
    z-index :100;    
    left :0px;    
    right :0;    
    bottom:0;    
    background-color:#fff;    
    padding:5px 0 0 25px;
    width:100%;    
    height:50px;    
    display:flex;
    box-shadow: 0 0 5px #eee7e7;
    }
    div{
        flex: 1;
        font-size: 30px;
    }
    div img{
        width: 30px;
        height: 42px;
    }
   
  </style>
<script type="text/javascript">

    export default{
        props:{
            idx: {
				type: Number,
				default: 0,
			},
       items: {
				type: Array,
				default: function(){
					return ([])
            
        }},
       },
      data(){
			return {
			}
		},
		methods: {
			change(item,index) {
				this.$router.push(item.push);
				this.$emit("change",index)
			}
		}
    }
  
</script>