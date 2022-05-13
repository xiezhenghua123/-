<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-30 15:28:07
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 19:03:58
-->
<template>
  <view class="ml-10 mr-10">
    <u-toast ref="uToast"></u-toast>
    <view class="filter">
      <sl-filter
        :menuList="menuList"
        @result="result"
        :topFixed="true"
        themeColor="#3c9cff"
      ></sl-filter>
    </view>
    <view v-if="allData.length">
      <view
        v-for="(item, index) in allData"
        :key="index"
        @click="clickToDetails(item)"
      >
        <touch-hover>
          <view class="box">
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
                  item.user_type == '1' ? item.worker_name : item.company_name
                }}</text>
              </view>
            </view>
            <view class="flex">
              <view class="box_right mr-10">
                <view class="payment">{{ item.salary }}</view>
                <view class="button" @click.native.stop="apply(item)">
                  <u-button text="我要应聘" type="primary"></u-button>
                </view>
              </view>
              <view @click.native.stop="clickIcon(item, index)"
                ><u-icon
                  :name="item.isCollection == 1 ? 'star-fill' : 'star'"
                  size="22"
                  :index="index"
                  color="#ff9900"
                ></u-icon
              ></view>
            </view>
          </view>
        </touch-hover>
      </view>
    </view>
    <u-empty text="暂无数据" v-else></u-empty>
  </view>
</template>
<script>
import slFilter from '../../../../components/sl-filter/sl-filter.vue'
import touchHover from '@/components/touch-hover/touch-hover.vue'
import { cancelCollect, collect } from '@/api/recruit.js'
import { mapState } from 'vuex'
import { addApplyJob } from '@/api/applyJob.js'
export default {
  components: { slFilter, touchHover },
  props: {
    initData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  data() {
    return {
      allData: [],
      menuList: [
        {
          title: '学历要求',
          key: 'education',
          isMutiple: true,
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: ''
            },
            {
              title: '本科',
              value: '本科'
            },
            {
              title: '硕士',
              value: '硕士'
            },
            {
              title: '博士',
              value: '博士'
            },
            {
              title: '博士后',
              value: '博士后'
            }
          ]
        },

        {
          title: '薪资范围',
          key: 'salary',
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: ''
            },
            {
              title: '3k以下',
              value: { min: 1, max: 3 }
            },
            {
              title: '3k-5k',
              value: { min: 3, max: 5 }
            },
            {
              title: '5k-10k',
              value: { min: 5, max: 10 }
            },
            {
              title: '10k-20k',
              value: { min: 10, max: 20 }
            },
            {
              title: '20k以上',
              value: { min: 20, max: 999 }
            }
          ]
        }
      ]
    }
  },
  watch: {
    initData: {
      handler(val) {
        this.allData = [...val]
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    apply(item) {
      if (this.userInfo.credit_score < 80) {
        this.$refs.uToast.show({
          message: '您的信用分低于80分，暂不能应聘职位！',
          type: 'error'
        })
        return
      }
      addApplyJob({
        work_order_id: item.id,
        worker_id: this.userInfo.id,
        publisher: item.company_name,
        publisher_id: item.company_id,
        publisher_type: item.user_type,
        recipient: this.userInfo.name
      }).then(() => {
        this.$refs.uToast.show({
          message: '应聘成功！可到个人中心-订单管理查看',
          type: 'success'
        })
      })
    },
    result(val) {
      this.$emit('filter', { ...val, type: 'fullTime' })
    },
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/components/fullTime-details/index?id=${item.id}&key=myFavorite`
      })
    },
    clickIcon(item, index) {
      if (item.isCollection == 0) {
        collect({
          work_order_id: item.id.toString(),
          worker_id: this.userInfo.id.toString()
        }).then(({ data }) => {
          this.$refs.uToast.show({
            message: '收藏成功！可到个人中心-我的收藏查看',
            type: 'success'
          })
          this.$set(this.allData[index], 'isCollection', 1)
          this.$set(this.allData[index], 'collectionId', data.collectionId)
        })
      } else {
        cancelCollect(item.id.toString(), item.collectionId.toString()).then(
          () => {
            this.$refs.uToast.show({
              message: '取消收藏成功！',
              type: 'success'
            })
            this.$set(this.allData[index], 'isCollection', 0)
          }
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
</style>
