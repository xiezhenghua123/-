/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-05 22:07:22
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 17:01:58
 */

import IMService from '@/goEasy/lib/imservice'

const chat = function () {}

chat.enterChat = item => {
  //进入私聊
  let path = `/pages/chat/privateChat/privateChat?data=${JSON.stringify(item)}`
  uni.navigateTo({
    url: path
  })
}

chat.connect = (self, userInfo, isConnect) => {
  getApp().globalData.imService = new IMService(self.goEasy, self.GoEasy)
  if (isConnect) {
    getApp().globalData.imService.disconnect()
  }
  getApp().globalData.imService.connect(userInfo)
}

export default chat
