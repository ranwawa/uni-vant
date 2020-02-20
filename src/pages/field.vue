<template>
  <view class="container">
    <view class="uv-doc">
      <uv-section title="基础用法">
        <uv-field
          clearable
          v-model="userName"
          placeholder="请输入文本"
          :border="false"
        ></uv-field>
      </uv-section>
      <uv-section title="自定义类型">
        <uv-cell-group>
          <uv-field
            v-model="userName"
            required
            clearable
            label="用户名"
            icon="question-o"
            placeholder="请输入用户名"
            @click-icon="handleClickIcon"
          />

          <uv-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
            :border="false"
          />
        </uv-cell-group>
      </uv-section>
      <uv-section title="禁用输入框">
        <uv-cell-group>
          <uv-field
            value="输入框已禁用"
            label="用户名"
            left-icon="contact"
            disabled
            :border="false"
          />
        </uv-cell-group>
      </uv-section>
      <uv-section title="错误提示">
        <uv-cell-group>
          <uv-field
            v-model="userName"
            label="用户名"
            placeholder="请输入用户名"
            error
          />
          <uv-field
            v-model="phone"
            label="手机号"
            placeholder="请输入手机号"
            error-message="手机号格式错误"
            :border="false"
          />
        </uv-cell-group>
      </uv-section>
      <uv-section title="内容对齐方式">
        <uv-cell-group>
          <uv-field
            v-model="userName"
            label="用户名"
            placeholder="请输入用户名"
            input-align="right"
          />
        </uv-cell-group>

      </uv-section>
      <uv-section title="高度自适应">
        <uv-cell-group>
          <uv-field
            v-model="message"
            label="留言"
            type="textarea"
            placeholder="请输入留言"
            autosize
            :border="false"
          />
        </uv-cell-group>
      </uv-section>
      <uv-section title="插入按钮">
        <uv-cell-group>
          <uv-field
            v-model="message"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
            border="false"
            use-button-slot
          >
            <uv-button slot="button" size="small" type="primary">发送验证码</uv-button>
          </uv-field>
        </uv-cell-group>
      </uv-section>
    </view>
  </view>
</template>

<script>
import uvCellGroup from '@/components/cell-group.vue';
import uvButton from '@/components/button.vue';
import uvField from '@/components/field.vue';

export default {
  name: 'uv-field-page',
  components: {
    uvCellGroup,
    uvButton,
    uvField,
  },
  data() {
    return {
      userName: '',
      password: '',
      phone: '',
      message: '',
    };
  },
  methods: {
    handleClickIcon() {
      console.log('handleClickIcon');
    },
  },
};
</script>

<style
  scoped
  lang="scss"
>
  .container {
    background-color: #f5f5f5 !important;
  }

  .uv-doc {
    padding: 0;

    /deep/ &-section_title {
      padding: 0 16px;
    }
  }

  .test {
    border: 1px solid #000;
  }

  .test:empty {
    display: none;
  }
</style>
