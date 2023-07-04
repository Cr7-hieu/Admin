<template>
    <div>
        <!-- <div>
            <h2>Thông tin người dùng</h2>
            <p>Họ tên: {{ user.fullName }}</p>
            <p>Email: {{ user.email }}</p>
            <button @click="loadUser">Tải thông tin</button>
            </div>
        <div>
            <h1>Products</h1>
            <ul>
                <li v-for="product in products" :key="product.id">
                    {{ product.name }} ({{ product.price }}) - Quantity: {{ product.quantity }}
                    <button @click="incrementQuantity(product)">+</button>
                    <button @click="decrementQuantity(product)">-</button>
                </li>
            </ul>
            <input v-model="discountCode" placeholder="Discount code...">
            <button @click="applyDiscount">Apply discount</button>
            <h1>Total: ${{ total }}</h1>
        </div>
        <div>
            <p>Loại thiết bị: {{ deviceType }}</p>
        </div>
        <div>
            <h2>{{ currentTime }}</h2>
        </div> -->
        <div>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, reactive } from 'vue';

const user = reactive({
    fullName:'',
    email:''
})
async function loadUser(){
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    const data = await response.json()
    user.fullName = data.name
    user.email = data.email
}
const discountCode = ref('');
const products = ref([
{ id: 1, name: 'Product A', price: 10, quantity: 2 },
{ id: 2, name: 'Product B', price: 20, quantity: 1 },
{ id: 3, name: 'Product C', price: 30, quantity: 3 },
]);

function incrementQuantity(product){
    product.quantity++
}
function decrementQuantity(product){
    if(product.quantity > 1){
        product.quantity--
    }
}
const subtotal = computed(() =>{
    return products.value.reduce((sum,product) =>  sum + product.price * product.quantity, 0)
})
const total = computed(() =>{
    let discountedTotal = subtotal.value;
    if(discountCode.value === 'SUMMER'){
        discountedTotal *= 0.8;
    }else if (discountCode.value === 'WINTER'){
        discountedTotal *= 0.9
    }
    return Math.round(discountedTotal *100) / 100
})
function applyDiscount(discountCode, totalAmount){
//kiểm tra xem mã giảm giá hợp lệ hay không
if(discountCode == 'SUMMER'){
    //kiểm tra xem mã giảm giá có hết hạn hay không
    const expirationDate =  new Date('2023-05-10')
    const currenDate = new Date()

    if(currenDate > expirationDate){
        //mã giảm giá đã hết hạn
        return totalAmount;
    }else{
        //áp dụng giảm giá 10% cho đơn hàng
        const discountAmount = totalAmount * 0.1
        const discountedTotal = totalAmount - discountAmount
        return discountedTotal
    }
}else{
    //không có giảm giá nào được áp dụng
    return totalAmount
}
}

//kiểm tra user agent để xác định loại thiết bị
const isMobile = /phone|iPad|iPod|Android/i.test(navigator.userAgent)
const isTablet = /iPad/i.test(navigator.userAgent)

//xác định loại thiết bị sử dụng
const deviceType = computed(() =>{
    if(isMobile){
        return 'Mobile'
    }else if(isTablet){
        return 'Tabblet'
    }else {
        return 'Desktop'
    }
})

//lấy thời gian hiện tại
function getCurrentTime(){
    const date = new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
//thời gina hiện tại
const currentTime = ref(getCurrentTime())
//cập nhật thời gian mỗi giây
setInterval(() =>{
    currentTime.value = getCurrentTime()
}, 1000)
</script>