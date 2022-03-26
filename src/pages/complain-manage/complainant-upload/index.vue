<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-26 23:03:09
-->
<template>
  <view class="m-10">
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
      <view class="title">材料附件上传：</view>
      <u-upload
        accept="all"
        :fileList="fileList"
        uploadIcon="plus"
        @afterRead="afterRead"
        multiple
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
export default {
  data() {
    return {
      value: '',
      fileList: [],
    }
  },
  methods: {
    submit() {
      console.log('提交了建议')
    },
    afterRead(file, lists, name) {
      this.fileList.push({ url: file.url })
    },
  },
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
