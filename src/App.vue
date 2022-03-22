<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:34:01
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-22 16:51:24
-->
<script>
export default {
  onLaunch: function () {
    document.body.addEventListener('touchstart', function () {})
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import 'style/iconfont.css';
@import 'uview-ui/index.scss';
@import 'style/common.scss';
</style>
