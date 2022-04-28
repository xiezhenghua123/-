<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-16 19:28:00
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-28 12:14:50
-->
<template>
  <u-datetime-picker
    :title="title"
    ref="datetimePicker"
    v-model="time"
    :show="show"
    :minDate="minDate"
    :formatter="formatter"
    @confirm="timeConfirm"
    @close="close"
    @cancel="cancel"
    :mode="mode"
  ></u-datetime-picker>
</template>
<script>
export default {
  name: 'custom-datetime-picker',
  props: {
    minDate: {
      type: String
    },
    mode: {
      type: String,
      default: 'year-month'
    },
    title: {
      type: String,
      default: ''
    },
    pickShow: {
      type: Boolean,
      default: false
    },
    initTime: {
      type: String,
      dafault: '-'
    }
  },
  watch: {
    pickShow: {
      handler(val) {
        this.show = val
      },
      immediate: true
    },
    initTime: {
      handler(val) {
        this.time = val
      },
      immediate: true
    }
  },
  data() {
    return {
      show: false,
      time: ''
    }
  },
  onReady() {
    this.$refs.datetimePicker.setFormatter(this.formatter())
  },
  methods: {
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      }
      if (type === 'month') {
        return `${value}月`
      }
      if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    getTimeFormat(type) {
      switch (type) {
        case 'year-month':
          return 'yyyy-mm'
          break
        case 'date':
          return 'yyyy-mm-dd'
          break
      }
    },
    timeConfirm(e) {
      this.$emit(
        'confirm',
        uni.$u.timeFormat(e.value, this.getTimeFormat(this.mode))
      )
      this.show = false
      this.$emit('update:pickShow', this.show)
    },
    close() {
      this.show = false
      this.$emit('update:pickShow', this.show)
    },
    cancel() {
      this.show = false
      this.$emit('update:pickShow', this.show)
    }
  }
}
</script>
<style></style>
