/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-22 20:27:06
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-01 14:17:17
 */
export default {
  methods: {
    clickToDetails(item, type) {
      console.log(JSON.stringify(item))
      uni.navigateTo({
        url: `/pages/complain-manage/details/index?object=${JSON.stringify(
          item
        )}&type=${type}`,
      })
    },
    getColor(item) {
      if (item === 'pending') {
        return 'primary'
      } else if (item === 'resolve') {
        return 'success'
      } else {
        return 'error'
      }
    },
    getStatus(item) {
      if (item === 'pending') {
        return '审核中'
      } else if (item === 'resolve') {
        return '成功'
      } else {
        return '失败'
      }
    },
  },
}
