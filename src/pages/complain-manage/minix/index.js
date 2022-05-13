/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-22 20:27:06
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-11 17:00:40
 */
export default {
  methods: {
    getColor(item) {
      if (item == '2' || item == '4') {
        return 'primary'
      } else if (item == '3') {
        return 'success'
      } else {
        return 'error'
      }
    },
    getStatus(item) {
      if (item == '2') {
        return '审核中'
      } else if (item == '3') {
        return '成功'
      } else if (item == '4') {
        return '失败'
      } else {
        return '已撤销'
      }
    }
  }
}
