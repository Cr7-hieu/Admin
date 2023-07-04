<template>
    <div>
        <div>
            <h2>Danh sách sản phẩm</h2>
            <ul>
                <li v-for="(product, index) in productList" :key="index">
                    {{ product.name }} - {{ product.price }}đ
                    <button @click="removeProduct(index)">Xoá</button>
                </li>
            </ul>
            <p>Tổng giá trị: {{ totalPrice }}đ</p>
            <form @submit.prevent="addProduct">
                <label>
                    Tên sản phẩm:
                    <input type="text" v-model="newProduct.name" required />
                </label>
                <label>
                    Giá:
                    <input type="number" v-model="newProduct.price" required />
                </label>
                <button type="submit">Thêm sản phẩm</button>
            </form>
        </div>
        <div>
            <label for="sort-by">Sắp xếp theo:</label>
            <select id="sort-by" v-model="sortBy">
                <option value="name">Tên</option>
                <option value="year">Năm sản xuất</option>
                <option value="rating">Điểm đánh giá</option>
            </select>
            <ul>
                <li v-for="(movie, index) in sortedMovies" :key="index">{{ movie.name }} ({{ movie.year }})</li>
            </ul>
        </div>
        <div>
            <h2>Đặt hằng</h2>
            <form @submit.prevent="guiYeucaudathang">
                <label for="tenSAnpham">Tên sản phẩm:</label>
                <input type="text" id="tenSanpham" v-model="thongTindathang.tenSanpam" required>
                <label for="soLuong">Số lượng:</label>
                <input type="number" id="soLuong" v-model="thongTindathang.soLuong" required>
                <label for="diaChigiaohang">Địa chỉ giao hàng:</label>
                <textarea id="diaChigiaohang" v-model="thongTindathang.diaChigiaohang" required></textarea>
                <button type="submit">Đặt hàng</button>
            </form>
        </div>
        <div>
            <h1>Kiểm tra hàng hoá</h1>
            <input v-model="trackingCode" placeholder="Nhập mã theo dõi" />
            <button @click="checkStatus">Kiểm tra</button>
            <p v-if="status !== null">
                {{ status ? 'Hàng hoá đã được gửi đi' : 'Hàng hoá chưa được gửi đi' }}
            </p>
        </div>

    </div>
</template>
<script setup>
import { computed, reactive, watch , ref} from 'vue'

const productList = reactive([
{ name: 'Sách Văn', price: 10000 },
{ name: 'Bút bi', price: 5000 },
{ name: 'Giấy A4', price: 2000 }    
])
const newProduct = reactive({
    name:'',
    price:''
})
//tính tổng giá trị của danh sách sản phẩm
const totalPrice = computed(() =>{
    return productList.reduce((total,product) => total + product.price,0)
})

//thêm sản phẩm mới vào danh sách
function addProduct(){
    if(!newProduct.name || !newProduct.price){
        alert('Vui lòng nhập đầy đủ thông tin sản phẩm')
        return
    }
    productList.push({
        name:newProduct.name,
        price:Number(newProduct.price)
    })
    newProduct.name = '';
    newProduct.price = 0
}

//xoá sản phẩm khỏi danh sách
function removeProduct(index){
    productList.splice(index,1)
}

//theo dỗi thay đổi của danh sách
watch(productList, () => {
    console.log('Danh sách sản phẩm đã được cập nhật');
    })


// Khai báo một mảng các phim sử dụng ref
const movies = ref([
{  name: 'The Shawshank Redemption',
  year: 1994,
  rating: 9.3
},
{
  name: 'The Godfather',
  year: 1972,
  rating: 9.2
},
{
  name: 'The Dark Knight',
  year: 2008,
  rating: 9.0
},
{
  name: '12 Angry Men',
  year: 1957,
  rating: 8.9
},
{
  name: 'Schindler\'s List',
  year: 1993,
  rating: 8.9
}
])
// Khai báo biến sortBy để lưu trữ giá trị của option được chọn trong select
const sortBy = ref('name')

// Hàm sắp xếp mảng movies dựa trên giá trị của biến sortBy
function sortMovies(movies, sortBy) {
return movies.sort((a, b) => {
if (a[sortBy] < b[sortBy]) {
return -1
} else if (a[sortBy] > b[sortBy]) {
return 1
} else {
return 0
}
})
}

// Computed property để sắp xếp mảng movies theo giá trị của biến sortBy
const sortedMovies = computed(() => {
return sortMovies(movies.value, sortBy.value)
})

const thongTindathang = ref({
    tenSanpam:'',
    soLuong:0,
    diaChigiaohang:''
})
//hàm xủa lí khi khách hàng gửi yêu cầu đặt hàng
const guiYeucaudathang = () =>{
    //xử lí thông tin đặt hàng
    console.log(`Thoong tin đặt hàng:`, thongTindathang.value)
    //gửi yêu cầu đặt hàng thành công
    alert('Yêu cầu đặt hàng của bạn đã được gửi thành công')
    //reset biến đặt hàng
    thongTindathang.value = {
        tenSanpam:'',
        soLuong:0,
        diaChigiaohang:''
    }
}

const trackingCode = ref()
//lưu trữ trạng thái của hàng hoá
const status = ref(null)
// function checkStatus(){
//     //thực hiện kiẻm tra trạng thái của hàng hoá dựa trên mã theo dõi
//     //ở đây bạn có thể gọi API hoặc xử lí kiểm tra khác

//     status.value = false
// }
async function checkStatus(){
    try{
        //gọi API để kiểm tra trạng thái của hàng hoá dựa trê mã theo dõi
        const response = await fetch(`https://api.example.com/track?code=${trackingCode.value}`)
        if(Response.ok){
            const data = await response.json()
            status.value =  data.status
        }else{
            throw new Error('Không thể kiểm tra trạng thái hàng hoá')
        }
    }catch (error){
        console.error(error)
    }
}
</script>