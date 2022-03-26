/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-24 14:50:36
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-24 15:01:18
 */
export default {
  data() {
    return {
      timer: null,
      show: true,
    }
  },
  onPageScroll(res) {
    clearTimeout(this.timer)
    this.show = false
    this.timer = setTimeout(() => {
      this.show = true
    }, 300)
  },
}
