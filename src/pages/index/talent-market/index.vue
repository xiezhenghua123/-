<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-31 20:07:22
-->
<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <view>
      <sl-filter
        :menuList="menuList"
        @result="result"
        :topFixed="true"
        themeColor="#3c9cff"
      ></sl-filter>
    </view>
    <view
      v-for="(item, index) in initData"
      :key="index"
      class="container m-10"
      @click="clickToDetails(item)"
    >
      <view class="box">
        <view class="box-left">
          <view class="name">{{ item.name }} </view>
          <view class="expect">
            <view class="job mr-10">
              <text>{{ item.job }}</text>
            </view>
            <view class="salary">
              <text>{{ item.salary }}</text>
            </view>
          </view>
        </view>
        <view class="flex">
          <view class="box-right">
            <view class="maxEducation">{{ item.maxEducation }}</view>
            <view class="button">
              <u-button text="联系" type="primary"></u-button>
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
    </view>
  </view>
</template>

<script>
import data from '../../my-resume/data.js'
export default {
  data() {
    return {
      menuList: [
        {
          title: '期望薪资',
          key: 'salary',
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: 'all',
            },
            {
              title: '0-3k',
              value: '0-3k',
            },
            {
              title: '3k-5k',
              value: '3k-5k',
            },
            {
              title: '5k-10k',
              value: '5k-10k',
            },
            {
              title: '10k-20k',
              value: '10k-20k',
            },
            {
              title: '20k以上',
              value: '20k以上',
            },
          ],
        },

        {
          title: '性别',
          key: 'sex',
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: 'all',
            },
            {
              title: '男',
              value: 'man',
            },
            {
              title: '女',
              value: 'women',
            },
          ],
        },
        {
          title: '年龄',
          key: 'age',
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: 'all',
            },
            {
              title: '18-23岁',
              value: '18-25',
            },
            {
              title: '24-35岁',
              value: '24-35',
            },
            {
              title: '35岁以上',
              value: '35岁以上',
            },
          ],
        },
      ],
      initData: [
        {
          name: '张三',
          job: '产品经理',
          maxEducation: '本科',
          salary: '10k-15k',
          favorite: false,
        },
        {
          name: '李四',
          job: '前端开发',
          maxEducation: '硕士',
          salary: '10k-20k',
          favorite: false,
        },
      ],
    }
  },
  onLoad() {},
  methods: {
    result() {},
    clickIcon(index) {
      this.initData[index].favorite = !this.initData[index].favorite
      if (this.initData[index].favorite) {
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
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/components/person-details/index?data=${JSON.stringify(
          data
        )}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../style.scss';
.flex-column {
  flex-direction: column;
}
.box {
  display: flex;
  justify-content: space-between;
  padding: 15rpx 30rpx;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  &-left {
    display: flex;
    flex-direction: column;
    margin-bottom: 20rpx;
    .name {
      font-size: 16px;
      font-weight: bold;
      color: $uni-text-color;
      margin-bottom: 15px;
    }
    .expect {
      display: flex;
    }
  }
  &-right {
    display: flex;
    font-size: 16px;
    flex-direction: column;
    align-items: center;
    margin-right: 8px;
    .maxEducation {
      font-weight: bold;
      color: #02a7f0;
      margin-bottom: 8px;
    }
  }
}
</style>
