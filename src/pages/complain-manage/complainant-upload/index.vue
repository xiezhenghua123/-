<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 16:06:32
-->
<template>
  <view class="m-10">
    <toast></toast>
    <view class="text-box">
      <view class="title">投诉原因：</view>
      <u--textarea
        v-model="value"
        placeholder="请输入投诉原因"
        count
        maxlength="1000"
        height="180"
        @confirm="submit"
      ></u--textarea>
    </view>
    <view class="upload">
      <view class="title">材料附件上传(仅限图片)：</view>
      <u-upload
        :fileList="previewFile"
        name="avatar"
        previewFullImage
        @delete="deletePic"
        @afterRead="afterRead"
        accept="image"
        uploadIcon="plus"
      >
      </u-upload>
    </view>
    <view class="button-bottom">
      <u-button type="primary" size="large" @click="submit"
        ><text class="size18">提交</text></u-button
      >
    </view>
  </view>
</template>

<script>
import { addComplain } from '@/api/complain.js'
import { mapState } from 'vuex'
import { successToast, errorToast } from '@/components/toast/index.js'

export default {
  data() {
    return {
      value: '',
      fileList: [],
      toData: {} //被投诉人信息
    }
  },
  computed: {
    ...mapState('appState', ['userInfo', 'identity']),
    previewFile() {
      return this.fileList.map(item => {
        return { url: item }
      })
    }
  },
  onLoad({ data }) {
    this.toData = JSON.parse(data)
  },
  methods: {
    submit() {
      if (!this.value) {
        errorToast('请输入投诉原因')
        return
      }
      addComplain({
        content: this.value,
        measure: '无',
        fromId: this.userInfo.id.toString(),
        formOpenid: this.userInfo.openid,
        fromName: this.userInfo.name,
        fromType: this.identity == 'student' ? '1' : '2',
        ...this.toData,
        img: JSON.stringify(this.fileList),
        status: '0'
      }).then(() => {
        successToast('投诉成功！')
      })
    },
    afterRead(file, lists, name) {
      const that = this
      uni.uploadFile({
        url: 'https://workfriend.jsky31.cn/api/image',
        filePath: file.file.url,
        name: 'image',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function ({ data }) {
          that.fileList.push(JSON.parse(data).data)
        }
      })
    },
    deletePic(file) {
      this.fileList.splice(file.index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-box {
  margin-bottom: 15px;
}
.title {
  font-size: 16px;
  margin-bottom: 8px;
}
.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f4f5f7;
  i {
    font-size: 30px;
  }
}
</style>
