<template>
    <div>
        <div>
            <h2>Đăng ký</h2>
            <form @submit.prevent="guiYeuCauDangKy">
                <label for="hoTen">Họ tên:</label>
                <input type="text" id="hoTen" v-model="thongTinDangKy.hoTen" required><br>               
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="thongTinDangKy.email" required><br>
                <label for="matKhau">Mật khẩu:</label>
                <input type="password" id="matKhau" v-model="thongTinDangKy.matKhau" required><br>
                <button type="submit">Đăng ký</button>
            </form>
        </div>
        
    </div>
</template>
<script setup>
import {ref} from 'vue'
// Biến lưu trữ thông tin đăng ký
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
</script>