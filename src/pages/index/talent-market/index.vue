<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 22:51:12
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
    <view v-if="resumeData.length">
      <view
        v-for="(item, index) in resumeData"
        :key="index"
        class="container m-10"
        @click="clickToDetails(item)"
      >
        <view class="box">
          <view class="box-left">
            <view class="flex mb-10">
              <u-avatar :src="item.avatar" size="24"></u-avatar>
              <view class="name ml-10">{{ item.name }} </view>
            </view>
            <view class="expect">
              <view class="job mr-10">
                <text>期望岗位：{{ item.position }}</text>
              </view>
              <view class="salary">
                <text>期望薪酬:{{ item.salary }}</text>
              </view>
            </view>
          </view>
          <view class="flex">
            <view class="box-right">
              <view class="maxEducation">{{ item.education }}</view>
              <view class="button" @click.stop="enterChat(item)">
                <u-button text="联系" type="primary"></u-button>
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
      </view>
      <u-loadmore :status="status" @loadmore="getMore" v-if="loadmoreShow" />
    </view>
    <u-empty v-else></u-empty>
  </view>
</template>

<script>
import { collect, cancelCollect } from '@/api/resume.js'
import { mapState } from 'vuex'
import { getResumeList } from '@/api/resume.js'
export default {
  data() {
    return {
      menuList: [
        {
          title: '性别',
          key: 'sex',
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: ''
            },
            {
              title: '男',
              value: '男'
            },
            {
              title: '女',
              value: '女'
            }
          ]
        },
        {
          title: '年龄',
          key: 'age',
          defaultSelectedIndex: 0,
          detailList: [
            {
              title: '不限',
              value: ''
            },
            {
              title: '18-23岁',
              value: { min: 18, max: 23 }
            },
            {
              title: '24-35岁',
              value: { min: 24, max: 35 }
            },
            {
              title: '35岁以上',
              value: { min: 35, max: 99 }
            }
          ]
        }
      ],
      resumeData: [],
      resumePage: 1,
      filter: {
        age: '',
        sex: ''
      },
      status: 'loadmore'
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  mounted() {
    this.init()
    uni.$on('reachBottom', type => {
      if (type) {
        this.getMore()
      }
    })
    uni.$on('pullDownRefresh', type => {
      if (type) {
        this.init()
      }
    })
  },

  methods: {
    getMore() {
      this.status = 'loading'
      this.getResumeData(++this.resumePage, this.filter).then(data => {
        if (data.length) {
          this.resumeData.push(...data)
          this.status = 'loadmore'
        } else {
          this.status = 'nomore'
        }
      })
    },
    getResumeData(page, filter) {
      return new Promise(async (res, rej) => {
        try {
          let data = (
            await getResumeList(page, {
              ...filter,
              companyId: this.userInfo.id
            })
          ).data.resumeList
          res(data)
        } catch (e) {
          rej(e)
        }
      })
    },
    async init() {
      this.resumePage = 1
      this.resumeData = await this.getResumeData(1, { sex: '', age: '' })
    },
    async result({ sex, age }) {
      if (!sex.length || (sex.length == 1 && sex[0] == '')) {
        sex = ''
      } else {
        if (sex[0] == '') {
          sex = [...sex.slice(1, sex.length)]
        } else {
          sex = [...sex]
        }
      }
      if (!age.length && Array.isArray(age)) {
        age = ''
      }
      this.filter = { age: age, sex: sex }
      this.resumePage = 1
      this.resumeData = await this.getResumeData(this.resumePage, this.filter)
    },
    clickIcon(item, index) {
      if (item.isCollection == 0) {
        collect({
          resume_id: item.id.toString(),
          company_id: this.userInfo.id.toString()
        }).then(({ data }) => {
          this.$refs.uToast.show({
            message: '收藏成功！可到个人中心-我的收藏查看',
            type: 'success'
          })
          this.$set(this.resumeData[index], 'isCollection', 1)
          this.$set(this.resumeData[index], 'collectionId', data.collectionId)
        })
      } else {
        cancelCollect(item.collectionId.toString(), item.id.toString()).then(
          () => {
            this.$set(this.resumeData[index], 'isCollection', 0)
            this.$refs.uToast.show({
              message: '取消收藏成功！',
              type: 'success'
            })
          }
        )
      }
    },
    enterChat(item) {
      this.$methods.chat.enterChat({
        uuid: item.openid + item.worker_id,
        name: item.name,
        avatar: item.avatar
      })
    },
    clickToDetails(item) {
      uni.navigateTo({
        url: `/pages/components/person-details/index?data=${JSON.stringify(
          item
        )}`
      })
    }
  }
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
