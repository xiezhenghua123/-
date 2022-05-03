<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-23 15:03:05
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 00:35:30
-->
<template>
  <view>
    <toast></toast>
    <view v-if="initData.length">
      <view
        v-for="(item, index) in initData"
        :key="index"
        class="container m-10"
      >
        <u-swipe-action>
          <view>
            <u-swipe-action-item
              :options="options"
              @click="cancelCollect(item)"
            >
              <touch-hover>
                <view class="box" @click.stop="clickToDetails(item)">
                  <view class="box_left">
                    <view class="content">{{ item.content }}</view>
                    <view class="flex">
                      <u-avatar
                        :src="
                          item.user_type == '1'
                            ? item.worker_avatar
                            : item.company_avatar
                        "
                        size="24"
                      ></u-avatar>
                      <text class="name ml-10">{{
                        item.user_type == '1'
                          ? item.worker_name
                          : item.company_name
                      }}</text>
                      <text class="type" style="margin-right: 25px">{{
                        item.order_type == 'partTime' ? '兼职' : '全职'
                      }}</text>
                    </view>
                  </view>
                  <view class="box_right">
                    <view class="payment">{{
                      item.order_type == 'partTime'
                        ? item.salary + '元'
                        : salary(item.salary)
                    }}</view>
                    <view class="button" @click.native.stop="apply(item)">
                      <u-button text="我要应聘" type="primary"></u-button>
                    </view>
                  </view>
                </view>
              </touch-hover>
            </u-swipe-action-item>
          </view>
        </u-swipe-action>
      </view>
    </view>
    <view v-else>
      <u-empty></u-empty>
    </view>
  </view>
</template>
<script>
import touchHover from '../../../components/touch-hover/touch-hover.vue'
import { getCollection, cancelCollect } from '@/api/recruit.js'
import { mapState } from 'vuex'
import { successToast } from '@/components/toast/index'
import { addApplyJob } from '@/api/applyJob.js'
export default {
  components: { touchHover },
  name: 'student-favorite',
  data() {
    return {
      options: [
        {
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ],
      initData: []
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    apply(item) {
      addApplyJob({
        work_order_id: item.id,
        worker_id: this.userInfo.id,
        publisher: item.user_type == '1' ? item.worker_name : item.company_name,
        recipient: this.userInfo.name
      }).then(() => {
        this.$refs.uToast.show({
          message: '应聘成功！可到个人中心-订单管理查看',
          type: 'success'
        })
      })
    },
    getData() {
      getCollection(this.userInfo.id).then(({ data }) => {
        this.initData = data
      })
    },
    cancelCollect(item) {
      cancelCollect(item.id, this.userInfo.id).then(() => {
        successToast('删除成功！')
        this.getData()
      })
    },
    salary(salary) {
      return `${JSON.parse(salary).min}k-${JSON.parse(salary).max}k`
    },
    relation() {},
    clickToDetails(item) {
      if (item.order_type === 'fullTime') {
        uni.navigateTo({
          url: `/pages/components/fullTime-details/index?id=${item.id}&key=myFavorite`
        })
      } else {
        uni.navigateTo({
          url: `/pages/components/partTime-details/index?id=${item.id}&key=myFavorite`
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
</style>
