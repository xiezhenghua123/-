<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-12 15:06:12
-->
<template>
  <view>
    <view class="text-box">
      <u--textarea
        v-model="value"
        placeholder="请输入您的建议"
        count
        maxlength="500"
        height="300"
        @confirm="submit"
      ></u--textarea>
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
    }
  },
  methods: {
    submit() {
      console.log('提交了建议')
    },
  },
}
</script>

<style lang="scss" scoped>
.text-box {
  margin: 15px;
}
</style>
