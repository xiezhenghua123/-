/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-16 20:05:09
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-29 13:36:18
 */
const timestamp = value => {
  return value ? new Date(value).getTime() : new Date().getTime()
}
export default { timestamp }
