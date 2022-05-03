<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 16:07:55
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
        :fileList="fileList"
        uploadIcon="plus"
        @afterRead="afterRead"
        @delete="deletePic"
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
import { successToast } from '@/components/toast/index.js'

export default {
  data() {
    return {
      value: '',
      fileList: []
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  onLoad({ orderId, companyId }) {
    this.orderId = orderId
    this.companyId = companyId
  },
  methods: {
    submit() {
      addComplain({
        reporter: this.userInfo.id,
        worker_order_id: this.orderId,
        company_id: this.companyId,
        content: this.value,
        img: JSON.stringify(this.fileList),
        status: 0
      }).then(() => {
        successToast('投诉成功！')
      })
    },
    afterRead(file, lists, name) {
      this.fileList.push({ url: file.url })
      console.log(file)
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
