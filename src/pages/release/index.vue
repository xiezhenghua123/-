<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-29 19:55:32
-->
<template>
  <view class="m-10">
    <view v-if="identity && isLogin">
      <view>
        <view class="title"> 职位类型 </view>
        <view class="select">
          <u-radio-group v-model="current">
            <u-radio
              v-for="item in radioList"
              :key="item.key"
              :name="item.key"
              :label="item.name"
              @change="change"
              labelSize="16"
              :disabled="item.key === 'fullTime' && identity === 'student'"
            ></u-radio>
          </u-radio-group>
        </view>
      </view>
      <full-time v-if="current === 'fullTime'"></full-time>
      <part-time v-else-if="current === 'partTime'"></part-time>
    </view>
    <confirm v-else></confirm>
  </view>
</template>

<script>
import confirm from '@/components/confirm/index.vue'
import { mapState } from 'vuex'
import fullTime from './fullTime/index.vue'
import partTime from './partTime/index.vue'

export default {
  components: {
    fullTime,
    partTime,
    confirm,
  },
  data() {
    return {
      current: 'partTime',
      radioList: [
        {
          name: '兼职',
          key: 'partTime',
        },
        {
          name: '全职',
          key: 'fullTime',
        },
      ],
    }
  },
  computed: {
    ...mapState('appState', ['identity', 'isLogin']),
  },
  onLoad() {},
  methods: {
    change(data) {},
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
}
::v-deep .select {
  margin-top: 10px;
  .u-radio {
    margin-left: 20px;
  }
}
</style>
