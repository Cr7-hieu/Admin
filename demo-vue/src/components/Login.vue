<template>
    <div>
        <form @submit.prevent="submitForm" v-if="!checkLogin">
            <p>Email</p>
            <input type="text" v-model="form.email">
            <div v-if="error.requiredEmail">{{ error.requiredEmail }}</div>
            <div v-if="error.invalidEmail">{{ error.invalidEmail }}</div>
            <p>Password</p>
            <input type="password" v-model="form.password">
            <div v-if="error.requiredPassword">{{ error.requiredPassword }}</div>
            <div v-if="error.invalidPassword">{{ error.invalidPassword }}</div>
            <button type="submit" @click="login">Login</button>
            <p v-if="checkLogin">Đăng nhập thành công</p>
        </form>
    </div>
</template>
<script setup>
import { reactive,ref } from "vue";


const form = reactive({
    email:'',
    password:''
})
const checkLogin = ref(false)
function login(){
    checkLogin.value = true
}
const error = reactive({
    requiredEmail:'',
    invalidEmail:'',
    requiredPassword:'',
    invalidPassword:''
})
function submitFrom(){
    error.requiredEmail = "";
    error.invalidEmail = "";
    error.requiredPassword = "",
    error.invalidPassword = "";
    if (!form.email){
        error.requiredEmail = 'Vui lòng nhập email';
    }else if (!isValidemail(form.email)){
        error.invalidEmail = 'vui lòng nhập địa chỉ email hợp lệ';
    }else{}
    if(!form.password){
        error.requiredPassword = 'Vui lòng nhập mật khẩu';
    }else if(!isValidPasswork(form.password)){
        error.invalidPassword = ' vui lòng nhập mật khẩu hợp lệ';
    }else{
        login()
    }
}
function isValidemail(email){
    const regex = /^\S+@[a-zA-Z0-9-]+\.\S+$/;

    return regex.test(email)
}
function isValidPassword(password){
    return password.length >=8
}

</script>