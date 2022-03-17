<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-16 19:28:00
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-16 20:30:43
-->
<template>
  <u-datetime-picker
    :title="title"
    ref="datetimePicker"
    v-model="time"
    :show="show"
    :formatter="formatter"
    mode="year-month"
    @confirm="timeConfirm"
    @close="close"
    @cancel="cancel"
  ></u-datetime-picker>
</template>
<script>
export default {
  name: 'custom-datetime-picker',
  props: {
    title: {
      type: String,
      default: '',
    },
    pickShow: {
      type: Boolean,
      default: false,
    },
    initTime: {
      type: String,
    },
  },
  watch: {
    pickShow: {
      handler(val) {
        this.show = val
      },
      immediate: true,
    },
    initTime: {
      handler(val) {
        this.time = val
      },
      immediate: true,
    },
  },
  data() {
    return {
      show: false,
      time: '',
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
    timeConfirm(e) {
      this.$emit('confirm', uni.$u.timeFormat(e.value, 'yyyy-mm'))
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
    },
  },
}
</script>
<style></style>
