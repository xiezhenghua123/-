<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-05-05 23:50:27
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-06 01:04:41
-->
<template>
  <web-view :src="src"></web-view>
</template>
<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  onLoad({ src }) {
    console.log(src)
    this.src = src
  }
}
</script>
