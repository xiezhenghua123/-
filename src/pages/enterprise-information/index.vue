<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-01 17:43:03
-->
<template>
  <view>
    <view v-if="editShow">
      <fixed-button
        text="编辑"
        type="primary"
        shape="circle"
        @click="clickEdit"
        v-show="show"
      ></fixed-button>
    </view>
    <view class="content-box size16">
      <view class="every">
        <view class="every_title"> 企业名称：</view>
        <view class="every_content">{{ companyData.name }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 所属行业：</view>
        <view class="every_content">{{ companyData.industry }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 统一社会信用代码：</view>
        <view class="every_content">{{ companyData.code }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 法定代表人：</view>
        <view class="every_content">{{ companyData.legal_person }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 联系方式：</view>
        <view class="every_content">{{ companyData.phone }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 公司地址：</view>
        <view class="every_content">{{ companyData.address }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 公司规模：</view>
        <view class="every_content">{{ companyData.company_size }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 注册资本：</view>
        <view class="every_content">{{ companyData.registered_capital }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 成立日期：</view>
        <view class="every_content">{{ companyData.incorporation }}</view>
      </view>
      <view class="flex-column every">
        <view class="every_title"> 公司介绍：</view>
        <view
          class="every_content size14"
          style="text-indent: 2em; text-align: justify"
          >{{ companyData.introduce }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import minix from '../minix/index.js'
import { getCompanyConfirmData } from '@/api/user.js'
export default {
  mixins: [minix],
  data() {
    return {
      companyData: {},
      type: 'mySelf',
      id: '',
      editShow: true
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  onLoad({ type, id }) {
    this.id = id
    if (type != 'releaseOrder') {
      this.editShow = false
    }
    console.log(this.id, this.userInfo.id)
    getCompanyConfirmData(this.id).then(({ data }) => {
      this.companyData = data
    })
  },
  methods: {
    clickEdit() {
      uni.navigateTo({
        url: `/pages/enterprise-information/edit/index?id=${this.userInfo.id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style/form.scss';
</style>
