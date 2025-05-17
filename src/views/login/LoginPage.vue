<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form" v-if="!isRegister">
      <el-form :rules="rules" :model="formModel" ref="form" size="large" autocomplete="off">
        <el-form-item>
          <h3>Login</h3>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            maxlength="18"
            minlength="5"
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="User Account"
            onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="PassWord"
            maxlength="15"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="formModel.code"
            style="width: 180px"
            name="code"
            placeholder="Code"
            maxlength="4"
          ></el-input>
          <img
            style="width: 180px; height: 40px; padding-left: 20px"
            :src="captchaValue.img"
            @click="getCaptcha"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="loginIn(form)" class="button" type="primary" auto-insert-space>
            login
          </el-button>
          <el-button
            @click="goToRegister()"
            type="primary"
            link
            style="border: none; margin-left: 0px"
            >no have account? register
          </el-button>
        </el-form-item>
        <!--        <el-form-item class="flex">-->
        <!--          <el-link type="info" :underline="false" @click="isRegister = true">-->
        <!--            注册 →-->
        <!--          </el-link>-->
        <!--        </el-form-item>-->
      </el-form>
    </el-col>
    <el-col :span="6" :offset="3" class="form" v-if="isRegister">
      <el-form
        :rules="registerRules"
        :model="registerFormModel"
        ref="form"
        size="large"
        autocomplete="off"
      >
        <el-form-item>
          <h3>Register</h3>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            maxlength="18"
            minlength="5"
            v-model="registerFormModel.username"
            :prefix-icon="User"
            onkeyup="this.value=this.value.replace(/[^\w_]/g,'');"
            placeholder="UserName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerFormModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="PassWord"
            maxlength="15"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerFormModel.passwordAgain"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="PassWord Again"
            maxlength="15"
            minlength="6"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="formModel.code"
            style="width: 180px"
            name="code"
            placeholder="Code"
            maxlength="4"
          ></el-input>
          <img
            style="width: 180px; height: 40px; padding-left: 20px"
            :src="captchaValue.img"
            @click="getCaptcha"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="registerIn(form)" class="button" type="primary" auto-insert-space>
            register
          </el-button>
          <el-button @click="goToLogin()" type="primary" link style="border: none; margin-left: 0px"
            >have account? login
          </el-button>
        </el-form-item>
        <!--        <el-form-item class="flex">-->
        <!--          <el-link type="info" :underline="false" @click="isRegister = true">-->
        <!--            注册 →-->
        <!--          </el-link>-->
        <!--        </el-form-item>-->
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import type { SysUserLoginRequest, SysUserRegisterRequest } from '@/types/Users'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { getCaptchaAPI } from '@/service/CaptchaController'
import type { captcha } from '@/types/Captcha'

import { useRouter } from 'vue-router'
import router from '@/router'
import { userStore } from '@/stores'
import { SysUserLoginAPi, SysUserRegisterAPi } from '@/service/UsersController'

//pinia存储用户信息
const userMessageStore = userStore()
//获取图片和验证码信息
const captchaValue = ref<captcha>({})
//路由跳转
const route = useRouter()

const isRegister = ref(false)
//获取验证码
const getCaptcha = async () => {
  // this.codeUrl = 'data:image/gif;base64,' + res.img
  const res = await getCaptchaAPI()
  captchaValue.value.img = res.data.img
  captchaValue.value.uuid = res.data.uuid
}

//登录表单校验
const formModel = ref<SysUserLoginRequest>({
  username: 'qaqbattle',
  password: '123456',
  code: '',
  uuid: ''
})
//表单校验规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    {
      min: 5,
      max: 18,
      message: '用户名必须是5-18位',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    {
      pattern: /^\S{6,15}/,
      min: 6,
      max: 15,
      message: '密码必须6-15位'
    }
  ]
}

//登录前的校验
const form = ref< FormInstance>()

//设置登录的请求方法 并在成功获取请求后存储token
const login = async () => {
  const res = await SysUserLoginAPi({
    username: formModel.value.username,
    password: formModel.value.password,
    code: formModel.value.code,
    uuid: captchaValue.value.uuid
  })
  if (res.code === 0) {
    console.log(res.data)
    userMessageStore.setUser(res.data)
      router.push({
        path: '/',
        replace: true
      })
  } else {
    getCaptcha()
  }
}

//登录
const loginIn = async (formE: FormInstance | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在验证登录信息',
        type: 'success'
      })
      login()
      //成功开始执行请求登录请求信息 并将信息存储到pinia
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

//注册表单校验
const registerFormModel = ref<SysUserRegisterRequest>({
  username: '',
  password: '',
  passwordAgain: '',
  code: ''
})
//表单校验规则
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    {
      min: 5,
      max: 18,
      message: '用户名必须是5-18位',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    {
      pattern: /^\S{6,15}/,
      min: 6,
      max: 15,
      message: '密码必须6-15位'
    }
  ],
  passwordAgain: [
    { required: true, message: '请再次输入密码', trigger: 'change' },
    {
      pattern: /^\S{6,15}/,
      min: 6,
      max: 15,
      message: '密码必须6-15位'
    },
    {
      required: registerFormModel.value.passwordAgain == registerFormModel.value.password,
      message: '输入的两次密码不一致！',
      trigger: 'change'
    }
  ]
}

//设置注册的请求方法 并在成功获取请求后存储token
const register = async () => {
  const res = await SysUserRegisterAPi({
    username: registerFormModel.value.username,
    password: registerFormModel.value.password,
    passwordAgain: registerFormModel.value.passwordAgain,
    code: formModel.value.code,
    uuid: captchaValue.value.uuid
  })
  if (res.code === 0) {
    // 注册成功 去登录
    ElMessage.success('注册成功去登陆吧！')
    formModel.value.code = ""
    goToLogin()
  } else {
    // 否则刷新验证码
    getCaptcha()
  }
}

//注册
const registerIn = async (formE:  FormInstance | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在验证注册信息',
        type: 'success'
      })
      register()
      //成功开始执行请求登录请求信息 并将信息存储到pinia
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

/**
 * 点击注册
 */
const goToRegister = () => {
  if (!isRegister.value) {
    isRegister.value = !isRegister.value
    getCaptcha()
  }
}
/**
 * 点击注册
 */
const goToLogin = () => {
  if (isRegister.value) {
    isRegister.value = !isRegister.value
    getCaptcha()
  }
}

onMounted(() => {
  getCaptcha()
})
</script>

<style lang="less" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: //url('@/assets/login-logo3.png') no-repeat 60% center / 500px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}

.el-form {
  h3 {
    font-size: xx-large;
  }
}
</style>
