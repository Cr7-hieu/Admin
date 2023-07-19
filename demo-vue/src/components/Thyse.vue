<template>
    <div>
        <div>
            <p>{{ message }}</p>
            <button @click="increment">Tăng</button>
            <button @click="decrement">Giảm</button>
        </div>
        <div>
            <p>{{ thongbao }}</p>
            <button @click="toggleMess">Đổi thông báo</button>
        </div>
        <div>
            <!-- Hiển thị sản phẩm -->
            <div v-if="products.length > 0">
                <h2>Danh sách sản phẩm:</h2>
                <ul>
                    <li v-for="(product, index) in products" :key="index">{{ product.name }} - {{ product.price }}</li>
                </ul>
            </div>
            <div v-else>
                <p>Không có sản phẩm nào.</p>
            </div>

    <!-- Tính tổng sản phẩm -->
            <div>
                <h2>Tổng sản phẩm:</h2>
                <p>{{ totalProducts }}</p>
            </div>

    <!-- Xử lí thanh toán -->
            <button @click="processPayment">Thanh toán</button>
            <div v-if="paymentStatus">
                <h2>Kết quả thanh toán:</h2>
                <p>{{ paymentStatus }}</p>
            </div>
        </div>
        <div>
            <h2>giỏ hàng</h2>
            <div v-if="cartItems.length > 0">
                <ul>
                    <li v-for="sanpham in cartItems" :key="sanpham.id">
                        {{ sanpham.name }} - {{ sanpham.price }}đ
                    </li>
                </ul>
                <p>tổng tiền:{{ getTotalPrice() }}đ</p>
                <button @click="checkOut">Thanh toán</button>
            </div>
            <div v-else>
                <p>giỏ hàng trống</p>                
            </div>
        </div>
        <div>
            <h2>Quan lí sản phẩm</h2>
            <form @submit.prevent="addProduct">
                    <input type="text" v-model="newProduct.name" placeholder="Tên sản phẩm">
                    <input type="number" v-model="newProduct.price" placeholder="Giá sản phẩm">
                    <button type="submit">Thêm sản phẩm</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Giá sản phẩm</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <button @click="deleteProduct(product.id)">Xoá</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const count = ref(0)
const maxLimit = 10

const increment = () =>{
    if (count.value < maxLimit){
        count.value ++
    }
}
const decrement = ()=>{
    if (count.value > 0){
        count.value --
    }
}
const message =  computed(() =>{
    if (count.value === 0){
        return 'Số lượng là 0'
    }else if (count.value === maxLimit){
        return 'Đã đạt giới hạn tối đa'
    }else{
        return `Số lượng hiện tại là ${count.value}`
    }
})
const showMess = ref(true)
const day = ref([
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
    'Chủ Nhật'
])
//xử lí sự kiện khi nhấn nút đổi thông báo
const toggleMess = () =>{
    showMess.value = !showMess.value
}
const thongbao = computed(() =>{
    if(showMess.value){
        //lấy ngấu nhiên một thông báo từ day
        const randomIndex = Math.floor(Math.random() * day.value.length)
        return `Hôm nay là ${day.value[randomIndex]}`

    }else{
        return ''
    }
})

const products = ref([
{ name: 'Sản phẩm A', price: 10 },
{ name: 'Sản phẩm B', price: 20 },
{ name: 'Sản phẩm C', price: 15 }    
])
const totalProducts = ref(products.value.length)
const paymentStatus = ref()
async function processPayment() {
try {
const response = await fetch('/api/payment', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
},
    body: JSON.stringify(products.value)
})
if (response.ok) {
    paymentStatus.value = 'Thanh toán thành công!';
} else {
    paymentStatus.value = 'Có lỗi xảy ra trong quá trình thanh toán.';
}
} catch (error) {
    console.error(error);
    paymentStatus.value = 'Có lỗi xảy ra. Vui lòng thử lại sau.';
}
}

const cartItems = ref([
{ id: 1, name: 'Sản phẩm A', price: 100 },
{ id: 2, name: 'Sản phẩm B', price: 150 },
{ id: 3, name: 'Sản phẩm C', price: 200 }    
])
const getTotalPrice = () =>{
    let total = 0
    for (let sanpham of cartItems.value){
        total += sanpham.price
    }
    return total
}
const checkOut = () => {
if (cartItems.value.length > 0) {
const order = {
    sanpham: cartItems.value,
    total: getTotalPrice()
    }

fetch('/checkOut', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
},
    body: JSON.stringify(order)
})
.then(response => {
        if (response.ok) {
        cartItems.value = [];
        alert('Thanh toán thành công!');
        } else {
        alert('Có lỗi xảy ra trong quá trình thanh toán.');
        }
})
    .catch(error => {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra trong quá trình thanh toán.');
    });
} else {
    alert('Giỏ hàng trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
}
}

const peoducts = ref([
{ id: 1, name: 'Sản phẩm 1', price: 10 },
{ id: 2, name: 'Sản phẩm 2', price: 20 },
])
const newProduct = ref({
    name:'',
    price:'null'
})
//hàm để thêm sản phẩm mới vào danh sách
const addProduct = () =>{
    if(newProduct.value.name && newProduct.value.price){
        const newId = products.value.length + 1
        const product = {
            id:newId,
            name:newProduct.value.name,
            price:newProduct.value.price
        }
        products.value.push(product)
        //reset giá trị của form sau khi thêm sản phẩm
        newProduct.value = {name:'',price:null}
    }
}
//hàm để xoá sản phẩm khỏi danh sách
const deleteProduct = (id) =>{
    const index = products.value.findIndex((product) => product.id === id)
    if(index !== -1){
        products.value.splice(index,1)
    }
}


</script>