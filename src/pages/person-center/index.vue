<template>
	<view class="container">
		<view class="top">
			<view class="message">
				<u-avatar :src="src" size="60"></u-avatar>
				<view class="m_right" v-if="isLogin">
					<view class="message_name">{{name}}</view>
					<view class="message_identity">{{getIdentity()}}</view>
				</view>
				<view v-else class="m_right">
					<view class="message_name">请登录</view>
				</view>
			</view>
			<view class="change-identity" @click="changeIdentity">
				<i class="iconfont icon-jiantou_zuoyouqiehuan"></i>
				<text class="text">切换身份</text>
			</view>
		</view>
		<u-divider class="divider"></u-divider>
		<view class="content" v-if="identity">
			<template v-for="(item,index) in feature_data">
				<view :key="item.key" @click="clickFeature(item.key)" class="content_every">
					<view class="feature">
						<view class="left">
							<i class="iconfont" :style="{'color':item.iconColor,'font-style':'normal'}"
								:class="[item.icon,'feature_logo']"></i>
							<text class="feature_name">{{item.name}}</text>
						</view>
						<view class="right">
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
					<view>
						<u-line margin="10rpx 0 10rpx 5%" length="94%"></u-line>
					</view>
				</view>
			</template>
		</view>
		<confirm v-else></confirm>
		<u-notify ref="uNotify" message="请登录"></u-notify>
		<!-- 身份切换 -->
		<u-modal :show="confirmAnother" showCancelButton @cancel="confirmAnotherCancel"
			@confirm="confirmAnotherConfirm">
			<view>
				您暂未进行<text class="f-bold">{{getAnotherName()}}</text>认证，是否进行认证？
			</view>
		</u-modal>
		<company :companyShow="companyShow"></company>
		<student :studentShow="studentShow"></student>
	</view>
</template>

<script>
	import feature_data from './data.js'
	import confirm from '@/components/confirm/index.vue'
	import company from '@/components/confirm/company/index.vue'
	import student from '@/components/confirm/student/index.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			confirm: confirm,
			student: student,
			company: company
		},
		data() {
			return {
				companyShow: false,
				studentShow: false,
				confirmAnother: false,
				src: '/static/logo.png',
				name: '黄汉雄',
				feature_data:[],
			}
		},
		watch:{
			identity:{
				handler(val){
					if(this.identity === 'company'){
						this.feature_data=feature_data.company
					}else{
						this.feature_data=feature_data.student
					}
				},
				immediate:true
			}
		},
		computed: {
			...mapState('appState', ['isLogin', 'identity', 'identityArray'])
		},
		onLoad() {

		},
		methods: {
			...mapMutations('appState', ['changeIdentity']),
			confirmAnotherCancel() {
				this.confirmAnother = false
			},
			confirmAnotherConfirm() {
				this.confirmAnother = false
				if (this.identity === 'student') {
					this.companyShow = true
				} else {
					this.studentShow = true
				}
			},
			getAnotherName() {
				if (this.identity === 'student') {
					return '企业'
				} else if (this.identity === 'company') {
					return '学生'
				}
			},
			getIdentity() {
				if (!this.identity) {
					return '请认证'
				} else {
					return this.identityArray.map((item) => {
						if (item.key === this.identity) {
							return item.name
						}
					})[0]
				}
			},
			changeIdentity() {
				if (!this.isLogin) {
					uni.showToast({
						title:'请先登录',
						duration: 2000,
						icon: 'error'
					})
					return false
				}
				if (!this.identityArray.length) {
					uni.showToast({
						title:'请先进行身份认证',
						duration: 2000,
						icon: 'error'
					})
				} else if (this.identityArray.length < 2) {
					this.confirmAnother = true
				} else {
					this.changeIdentity()
				}


			},
			clickFeature(key) {
				uni.navigateTo({
					url:`/pages/${key}/index`
				})
			}
		}
	}
</script>

<style lang="scss" src="./index.scss" scoped></style>
