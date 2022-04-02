/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-02 17:10:08
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-02 18:56:43
 */
import axios from 'axios'
let apiRoot = `${window.location.protocol}//127.0.0.1:3000`

const getJobList = () => {
  return new Promise((resolve, reject) => {
    axios.get(apiRoot + '/getJobList').then(res => {
      resolve(res.data)
    })
  })
}
export { getJobList }
