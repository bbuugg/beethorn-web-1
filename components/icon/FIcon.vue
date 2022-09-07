<template>
  <FIcon 
  :style="{fontSize:size+'px',color:color}" 
  :type="type" />
</template>

<script>
import { Icon } from 'ant-design-vue';

const FIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3173508_wido4uw0a6m.js',
});
export default {
  props:{ 
    type:{
      type: String, //指定传入的类型
      default: "" //这样可以指定默认的值
    },
    size:{
      type: Number, //指定传入的类型
      default: 20 //这样可以指定默认的值
    },
    color:{
      type: String, //指定传入的类型
      default: "rgb(255, 255, 255)" //这样可以指定默认的值
    },
  },
  components:{
    FIcon
  }
}
</script>