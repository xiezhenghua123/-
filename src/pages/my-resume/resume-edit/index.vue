<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-13 18:51:08
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-17 22:52:58
-->
<template>
  <view>
    <fixed-button text="确认" @click="clickConfirm"></fixed-button>
    <view class="content-box size16">
      <view class="headline">基本信息</view>
      <u--form
        :model="basic"
        ref="basicRef"
        :rules="basicRules"
        labelWidth="auto"
      >
        <u-form-item prop="headPhoto" label="头像：" required>
          <u-upload
            maxCount="1"
            :fileList="basic.headPhoto"
            name="avatar"
            @delete="deletePic"
            @afterRead="afterRead"
          ></u-upload>
        </u-form-item>
        <u-form-item prop="name" label="姓名：" borderBottom required>
          <u--input v-model="basic.name" border="none"></u--input>
        </u-form-item>
        <u-form-item
          prop="sex"
          label="性别："
          borderBottom
          required
          @click="sexShow = true"
        >
          <u--input
            v-model="basic.sex"
            disabled
            placeholder="请选择性别"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
          <u-action-sheet
            :show="sexShow"
            :actions="sexArray"
            title="请选择性别"
            @close="sexShow = false"
            @select="sexSelect"
            closeOnClickOverlay
          >
          </u-action-sheet>
        </u-form-item>
        <u-form-item prop="age" label="年龄：" borderBottom required>
          <u--input v-model="basic.age" border="none"></u--input>
        </u-form-item>
        <u-form-item prop="tel" label="联系电话：" borderBottom required>
          <u--input v-model="basic.tel" border="none"></u--input>
        </u-form-item>
        <u-form-item
          prop="maxEducation"
          label="最高学历："
          borderBottom
          required
          @click="maxEducationShow = true"
        >
          <u--input
            v-model="basic.maxEducation"
            disabled
            placeholder="请选择最高学历"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
          <u-action-sheet
            :show="maxEducationShow"
            :actions="maxEducationArray"
            title="请选择最高学历"
            @close="maxEducationShow = false"
            @select="maxEducationSelect"
            closeOnClickOverlay
          >
          </u-action-sheet>
        </u-form-item>
      </u--form>
    </view>
    <view class="content-box size16">
      <view class="headline">基本信息</view>
      <u-form :model="jobExpectations" ref="basicRef" labelWidth="auto">
        <u-form-item prop="job" label="期望岗位：" borderBottom>
          <u--input v-model="jobExpectations.job" border="none"></u--input>
        </u-form-item>
        <u-form-item prop="salary" label="期望薪资：" borderBottom>
          <u--input v-model="jobExpectations.salary" border="none"></u--input>
        </u-form-item>
        <u-form-item prop="position" label="期望城市：" borderBottom>
          <u--input v-model="jobExpectations.position" border="none"></u--input>
        </u-form-item>
      </u-form>
    </view>
    <view class="content-box size16 experience">
      <view class="flex-box">
        <view class="headline"> 教育经历 </view>
        <add-button @click.native="addExperience('education')"></add-button>
      </view>
      <view v-for="(item, index) in educations" :key="index">
        <u-form
          :model="item"
          :ref="`educationsRef${index}`"
          labelWidth="auto"
          :rules="educationsRules"
        >
          <u-form-item prop="schoolName" label="学校名称：" required>
            <u--input v-model="item.schoolName" border="none"></u--input>
          </u-form-item>
          <u-form-item
            prop="start"
            label="入学时间："
            @click="clickShow(item, 'start')"
            required
          >
            <u--input
              v-model="item.start.time"
              disabled
              placeholder="请选择入学时间"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <custom-datetime-picker
              title="入学时间"
              :initTime="item.start.time"
              :pickShow.sync="item.start.show"
              @confirm="timeConfirm($event, 'start', item)"
            ></custom-datetime-picker>
          </u-form-item>
          <u-form-item
            prop="end"
            label="毕业时间："
            @click="clickShow(item, 'end')"
            required
          >
            <u--input
              v-model="item.end.time"
              disabled
              placeholder="请选择毕业时间"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <custom-datetime-picker
              title="毕业时间"
              :initTime="item.end.time"
              :pickShow.sync="item.end.show"
              @confirm="timeConfirm($event, 'end', item)"
            ></custom-datetime-picker>
          </u-form-item>
          <u-form-item prop="major" label="就读专业：" required>
            <u--input
              v-model="item.major"
              border="none"
              placeholder="请输入就读专业名称"
            ></u--input>
          </u-form-item>
          <u-form-item
            prop="rank"
            label="学历："
            required
            @click="clickShow(item, 'rank')"
          >
            <u--input
              v-model="item.rank.text"
              disabled
              placeholder="请选择学历"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <u-action-sheet
              :show="item.rank.show"
              :actions="maxEducationArray"
              title="请选择学历"
              @close="rankClose(item)"
              @select="res => rankSelect(res, index, item)"
            >
            </u-action-sheet>
          </u-form-item>
          <view class="details-box">
            <u-form-item prop="details" label="校园经历：">
              <u--textarea
                v-model="item.details"
                count
                maxlength="1000"
              ></u--textarea>
            </u-form-item>
          </view>
        </u-form>
        <view
          class="button--size"
          @click="removeExperience('education', index)"
        >
          <u-button text="删除" type="error"></u-button>
        </view>
      </view>
    </view>
    <view class="content-box size16 experience">
      <view class="flex-box">
        <view class="headline"> 实习经历 </view>
        <add-button
          @click.native="addExperience('internshipExperience')"
        ></add-button>
      </view>
      <view v-for="(item, index) in internshipExperiences" :key="index">
        <u-form
          :ref="'internshipExperienceRef' + index"
          :model="item"
          labelWidth="auto"
          :rules="internshipExperiencesRules"
        >
          <u-form-item prop="companyName" label="企业名称：" required>
            <u--input v-model="item.companyName" border="none"></u--input>
          </u-form-item>
          <u-form-item
            prop="start"
            label="开始时间："
            @click="clickShow(item, 'start')"
            required
          >
            <u--input
              v-model="item.start.time"
              disabled
              placeholder="请选择开始时间"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <custom-datetime-picker
              title="开始时间"
              :initTime="item.start.time"
              :pickShow.sync="item.start.show"
              @confirm="timeConfirm($event, 'start', item)"
            ></custom-datetime-picker>
          </u-form-item>
          <u-form-item
            prop="end"
            label="结束时间："
            @click="clickShow(item, 'end')"
            required
          >
            <u--input
              v-model="item.end.time"
              disabled
              placeholder="请选择结束时间"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <custom-datetime-picker
              title="结束时间"
              :initTime="item.end.time"
              :pickShow.sync="item.end.show"
              @confirm="timeConfirm($event, 'end', item)"
            ></custom-datetime-picker>
          </u-form-item>
          <u-form-item prop="job" label="实习岗位：" required>
            <u--input
              v-model="item.job"
              border="none"
              placeholder="请输入实习岗位名称"
            ></u--input>
          </u-form-item>
          <view class="details-box">
            <u-form-item prop="details" label="工作内容：">
              <u--textarea
                v-model="item.details"
                count
                maxlength="1000"
              ></u--textarea>
            </u-form-item>
          </view>
        </u-form>
        <view
          class="button--size"
          @click="removeExperience('internshipExperience', index)"
        >
          <u-button text="删除" type="error"></u-button>
        </view>
      </view>
    </view>
  </view>
</template>
<script src="./component.js"></script>
<style lang="scss" scoped>
@import 'style/form.scss';
::v-deep.content-box {
  .u-upload__wrap__preview__image {
    border-radius: 50%;
  }
  .u-form {
    margin: auto 10px;
  }
  .flex-box {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
}
::v-deep .experience {
  .details-box {
    .u-form-item__body {
      flex-direction: column !important;
      .u-form-item__body__right {
        margin-top: 8px;
      }
    }
  }
  .u-form-item__body {
    padding: 6px auto;
  }
}
</style>
