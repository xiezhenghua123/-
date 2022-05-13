<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 23:30:36
-->
<template>
  <view>
    <toast></toast>
    <view class="text-box">
      <u--textarea
        v-model="value"
        placeholder="请输入意见"
        count
        maxlength="500"
        height="300"
        @confirm="submit"
      ></u--textarea>
    </view>
    <view class="button-bottom">
      <u-button
        type="primary"
        size="large"
        @click="submit"
        text="提交"
      ></u-button>
    </view>
  </view>
</template>

<script>
import { addTip } from '@/api/tip.js'
import { mapState } from 'vuex'
import { successToast } from '../../components/toast'

export default {
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    submit() {
      addTip({
        user_id: this.userInfo.openid,
        user_name: this.userInfo.name,
        title: 'xxx',
        content: this.value,
        status: '0'
      }).then(() => {
        successToast('提交成功！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text-box {
  margin: 15px;
}
</style>
