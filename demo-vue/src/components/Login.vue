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
        <form @submit.prevent="guiYeuCauDangKy" v-if="showLogin">
                <label for="hoTen">Họ tên:</label>
                <input type="text" id="hoTen" v-model="thongTinDangKy.hoTen" required><br>               
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="thongTinDangKy.email" required><br>
                <label for="matKhau">Mật khẩu:</label>
                <input type="password" id="matKhau" v-model="thongTinDangKy.matKhau" required><br>
                <button type="submit">Đăng ký</button>
        </form>
        <button @click="showLoginForm" v-if="!showLogin">Đăng ký</button>
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

const thongTinDangKy = ref({
  hoTen: '',
  email: '',
  matKhau: ''
});

// Hàm xử lý khi khách hàng gửi yêu cầu đăng ký
const guiYeuCauDangKy = () => {
  // Xử lí thông tin đăng ký tại đây
  console.log('Thông tin đăng ký:', thongTinDangKy.value);
  // Gửi yêu cầu đăng ký thành công
  alert('Yêu cầu đăng ký của bạn đã được gửi thành công!');
  // Reset biến thông tin đăng ký
  thongTinDangKy.value = {
    hoTen: '',
    email: '',
    matKhau: ''
  };
};

const showLogin = ref(true)
function showLoginForm(){
    showLogin.value = true
}
</script>