<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-30 15:28:22
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-30 19:10:35
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

    <view
      v-for="(item, index) in allData"
      :key="index"
      @click="clickToDetails(item)"
    >
      <touch-hover>
        <view class="box">
          <view class="box_left">
            <view class="content">{{ item.content }}</view>
            <text class="name">{{ item.employer }}</text>
          </view>
          <view class="flex">
            <view class="box_right mr-10">
              <view class="payment">{{ item.payMent }}</view>
              <view class="button" @click.native.stop="relation">
                <u-button text="我要应聘" type="primary"></u-button>
              </view>
            </view>
            <view @click.native.stop="clickIcon(index)"
              ><u-icon
                :name="item.favorite ? 'star-fill' : 'star'"
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
</template>
<script>
import slFilter from '../../../../components/sl-filter/sl-filter.vue'
import touchHover from '@/components/touch-hover/touch-hover.vue'
export default {
  components: { slFilter, touchHover },
  data() {
    return {
      allData: [
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          status: '招聘中',
          favorite: false,
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          status: '招聘中',
          favorite: false,
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          status: '招聘中',
          favorite: false,
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          status: '招聘中',
          favorite: false,
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          status: '招聘中',
          favorite: false,
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          status: '招聘中',
          favorite: false,
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          status: '招聘中',
          favorite: false,
        },
        {
          content: '琴湖快递拿到北青',
          employer: '张三',
          type: '兼职',
          details: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
          position: '湘潭大学',
          payMent: '10元',
          start: '2022年3月1日',
          end: '2022年3月1日',
          status: '招聘中',
          favorite: false,
        },
      ],
      menuList: [
        {
          title: '学历要求',
          key: 'education',
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: 'all',
            },
            {
              title: '本科',
              value: 'undergraduate',
            },
            {
              title: '硕士',
              value: 'master',
            },
            {
              title: '博士',
              value: 'doctor',
            },
            {
              title: '博士后',
              value: 'postdoctor',
            },
          ],
        },

        {
          title: '薪资范围',
          key: 'salary',
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: 'all',
            },
            {
              title: '0-9元',
              value: 'ten',
            },
            {
              title: '10-49元',
              value: 'fiften',
            },
            {
              title: '50-99元',
              value: 'hundred',
            },
            {
              title: '100元以上',
              value: 'hundredMore',
            },
          ],
        },
      ],
    }
  },
  methods: {
    clickIcon(index) {
      this.allData[index].favorite = !this.allData[index].favorite
      if (this.allData[index].favorite) {
        this.$refs.uToast.show({
          message: '收藏成功！可到个人中心-我的收藏查看',
          type: 'success',
        })
      } else {
        this.$refs.uToast.show({
          message: '取消收藏成功！',
          type: 'success',
        })
      }
    },
    result(data) {},
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/components/partTime-details/index?data=${JSON.stringify(
          item
        )}&key=myFavorite`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
</style>
