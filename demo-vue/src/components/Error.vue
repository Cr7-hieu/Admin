<template>
    <div>
        <div>
            <input type="number" v-model="quantity" min="0" step="1">
            <button @click="checkQuantity">Kiểm tra</button>
            <!-- <div v-if="error">{{ error }}</div>
            <div v-else>Không có lỗi</div> -->
            <button v-floating-tooltip="error" :class="{ 'error': error }"> {{ error ? '⚠️' : '✅' }}</button>
        </div>   
        <div>
            <form @submit.prevent="submitForm">
                <div class="mb-3" :class="{ 'has-error': !isValidName }">
                    <label for="name">Tên:</label>
                    <input type="text" class="form-control" id="name" v-model="name">
                    <div class="invalid-feedback" v-if="!isValidName">
                        Vui lòng nhập tên.
                    </div>
                </div>
                <div class="mb-3" :class="{ 'has-error': !isValidEmail }">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" v-model="email">
                    <div class="invalid-feedback" v-if="!isValidEmail">
                        Vui lòng nhập email hợp lệ.
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Gửi</button>
            </form>
        </div>
        <div>
            <select v-model="userRole">
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="user">User</option>
            </select>
            <button @click="handleSave">Save</button>
        </div>
        <div>
            <div v-if="isLoading">Đang tải...</div>
            <div v-else-if="data">{{ data }}</div>
            <div v-else-if="errors">{{ errors }}</div>
            <button @click="fetchData">Tải dữ liệu</button>
        </div>
        <div>
            <label>Số 1:</label>
            <input type="number" v-model="number1">
            <label>Số 2:</label>
            <input type="number" v-model="number2">
            <label>Phép tính:</label>
            <select v-model="operation">
                <option value="+">Cộng</option>
                <option value="-">Trừ</option>
                <option value="*">Nhân</option>
                <option value="/">Chia</option>
            </select>
            <button  @click="calculate">Calculate</button>
            <div>Kết quả: {{ calculateResult }}</div>
        </div>
        <div>
            <label>Tuổi:</label>
            <input type="number" v-model="age">
            <label>Giấy phép lái xe:</label>
            <input type="checkbox" v-model="hasLicense">
            <button @click="checkDrivingEligibility">Kiểm tra</button>
            <div v-if="canDrive">Bạn có thể lái xe</div>
            <div v-else>Bạn không thể lái xe</div>
        </div>

    </div>
</template>
<script setup>
import { computed, ref } from 'vue';


const quantity =  ref(0)
const error = ref()
//kiểm tra số lượng
const checkQuantity = () =>{
    //kiểm tra nếu số lượng hàng hoá vượt quá mức qua định
    if (quantity.value > 100){
        //gán thông báo lỗi vào biến error
        error.value = 'Số lượng hàng hoá cượt quá mức cho phép!'
    }else{
        //nếu không có lỗi, gán giá trị rỗng cho biến
        error.value = ''
    }
}

const name = ref('');
const email = ref('');
const isValidName = computed(() => {
    return name.value !== '';
});
const isValidEmail = computed(() => {
    return email.value === '' || isValidEmailFormat(email.value);
});

function submitForm() {
    // Kiểm tra và xử lý logic khi submit form
    if (name.value === '') {
        isValidName.value = false;
    }
    if (email.value === '' || !isValidEmailFormat(email.value)) {
        isValidEmail.value = false;
    }
    // Xử lý logic khi form được submit
    if (isValidName.value && isValidEmail.value) {
        // Thực hiện các xử lý logic khác
        console.log('Form submitted');
    }
}

function isValidEmailFormat(email) {
    // Hàm kiểm tra định dạng email hợp lệ
    return email.includes('@');
}

const userRole = ref('admin')
const handleSave = () =>{
    //kiểm tra loại người dùng và thực hiện các hành động tương ứng
    if(userRole.value === 'admin'){
        console.log('Lưu dữ liệu với quyền admin')
    }else if (userRole.value === 'editor'){
        console.log('Lưu dữ liệu với quyền editor')
    }else{
        console.log('Không có quyền truy cập để lưu dữ liệu')
    }
}

const isLoading = ref()
const data = ref()
const errors = ref()
//hàm mô tả phỏng việc tải dữ liệu từ API
const fetchData = () =>{
    isLoading.value = true
    //giả lập một promise tải dữ liệu
    setTimeout(()=>{
        const randomNum = Math.random()
        if(randomNum <0.5){
            data.value = 'Dữ liệu đã được tải'
        }else{
            errors.value = 'Lỗi khi tải dữ liệu'
        }
        isLoading.value = false
    },2000)
}

const number1 = ref(0)
const number2 = ref(0)
const operation = ref('+')
const calculateResult = computed(() =>{
    let result 
    if(operation.value === '+'){
        result = number1.value + number2.value
    }else if(operation.value === '-'){
        result = number1.value - number2.value
    }else if(operation.value === '*'){
        result = number1.value * number2.value
    }else if(operation.value === '/'){
        result = number1.value / number2.value
    }
    return result
})

const age =  ref(25)
const hasLicense = ref(true)
const canDrive = ref(false)
//xác đinh xem người dùng có lái xe hay không
const checkDrivingEligibility =  () =>{
    if(age.value >= 18){
        if(hasLicense.value){
            canDrive.value = true
        }else{
            canDrive.value = false
            console.log('Bạn chưa có giấy phép lái xe')
        }
    }else{
        canDrive.value = false
        console.log('Bạn chưa đủ tuổi lái xe')
    }
}
</script>
<style scoped>
.error{
    color: red;
}
</style>