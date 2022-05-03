<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-30 15:28:22
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 00:23:36
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
                <view class="payment">{{ item.salary + '元' }}</view>
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
import { addApplyJob } from '@/api/applyJob.js'
import { mapState } from 'vuex'
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
  data() {
    return {
      allData: [],
      menuList: [
        {
          title: '学历要求',
          key: 'education',
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: 'all'
            },
            {
              title: '本科',
              value: 'undergraduate'
            },
            {
              title: '硕士',
              value: 'master'
            },
            {
              title: '博士',
              value: 'doctor'
            },
            {
              title: '博士后',
              value: 'postdoctor'
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
              value: 'all'
            },
            {
              title: '0-9元',
              value: 'ten'
            },
            {
              title: '10-49元',
              value: 'fiften'
            },
            {
              title: '50-99元',
              value: 'hundred'
            },
            {
              title: '100元以上',
              value: 'hundredMore'
            }
          ]
        }
      ]
    }
  },
  watch: {
    initData: {
      handler(val) {
        if (val.length) {
          this.allData = val
        }
      },
      immediate: true,
      deep: true
    }
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
    clickIcon(item, index) {
      if (item.isCollection == 0) {
        collect({
          work_order_id: item.id.toString(),
          worker_id: this.userInfo.id.toString()
        }).then(() => {
          this.$refs.uToast.show({
            message: '收藏成功！可到个人中心-我的收藏查看',
            type: 'success'
          })
          this.$set(this.allData[index], 'isCollection', 1)
        })
      } else {
        cancelCollect(item.id.toString(), this.userInfo.id.toString()).then(
          () => {
            this.$refs.uToast.show({
              message: '取消收藏成功！',
              type: 'success'
            })
            this.$set(this.allData[index], 'isCollection', 0)
          }
        )
      }
    },
    result(data) {},
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/components/partTime-details/index?id=${item.id}&key=myFavorite`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
</style>
