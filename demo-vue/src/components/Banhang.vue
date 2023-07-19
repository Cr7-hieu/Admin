<template>
    <div>
        <div>
            <h2>Danh sách bài viết</h2>
            <!-- Hiển thị danh sách bài viết -->
            <ul>
                <li v-for="post in filteredPosts" :key="post.id">
                    {{ post.title }}
                    <p>{{ post.content }}</p>
                    <p>Thẻ: {{ post.tags.join(', ') }}</p>
                </li>
            </ul>

            <!-- Form tạo mới bài viết -->
            <form @submit.prevent="createPost">
                <label for="title">Tiêu đề:</label>
                <input type="text" id="title" v-model="newPost.title">

                <label for="content">Nội dung:</label>
                <textarea id="content" v-model="newPost.content"></textarea>

                <label for="tags">Thẻ:</label>
                <input type="text" id="tags" v-model="newPost.tagsString">

                <button type="submit">Tạo mới bài viết</button>
            </form>
        </div>
        <div>
            <ul>
                <li v-for="product in filteredProducts" :key="product.id">
                    {{ product.name }}
                </li>
            </ul>
            <div>
                <h2>Giỏ hàng</h2>
                <ul>
                    <li v-for="item in cartItem" :key="item.id">
                        {{ item.product.name }} - {{ item.quantity }}
                    </li>
                </ul>
                <button @click="checkout">Thanh toán</button>
            </div>
        </div>
        <div>
            <!-- nhập thông tin người dùng mới -->
            <input type="text" v-model="newUser.name" placeholder="Tên người dùng">
            <input type="email" v-model="newUser.email" placeholder="Email">
            <button @click="addUser">Thêm người dùng</button>
            <!-- danh sách người dùng -->
            <ul>
                <li v-for="user in users" :key="user.id">
                    {{ user.name }} - {{ user.email }}
                    <button @click="editUser(user)">Sửa</button>
                    <button @click="deleteUser">Xoá</button>
                </li>
            </ul>
            <!-- Modal sửa người dùng -->
            <div v-if="editingUser">
                <h2>Sửa người dùng</h2>
                <input type="text" v-model="editedUser.name">
                <input type="email" v-model="editedUser.email">
                <button @click="updateUser">Lưu</button>
                <button @click="cancelEdit">Huỷ</button>
            </div>
        </div>
        <div>
            <input type="text" v-model="searchTerm" placeholder="Tìm kiếm phim">
            <ul>
                <li v-for="movie in filteredMovies" :key="movie.id">
                    {{ movie.title }}
                    <button @click="toggleFavorite(movie)">
                        {{ isFavorite(movie) }} ? "Bỏ yêu thích" : "Yêu thích"
                    </button>
                </li>
            </ul>
            <h2>Danh sách phim yêu thích:</h2>
            <ul>
                <li v-for="favoriteMovie in favoriteMovies" :key="favoriteMovie.defineExpose">
                    {{ favoriteMovie.title }}
                </li>
            </ul>
        </div>
        <div>
            <input type="text" v-model="newTask" placeholder="Thêm công việc">
            <button @click="addTask">Thêm</button>
            <ul>
                <li v-for="task in tasks" :key="task.id">
                    {{ task.title }}
                    <button @click="editTask(task)">Sửa</button>
                    <button @click="deleteTask(task)">Xoá</button>
                </li>
            </ul>
            <!-- sửa công việc  -->
            <div v-if="editingTask">
                <h2>Sửa công việc</h2>
                <input type="text" v-model="editedTask.title">
                <button @click="updateTask">Lưu</button>
                <button @click="cancelEdits">Huỷ</button>
            </div>
        </div>
    </div>
</template>
<script setup>

import { ref, computed, watch } from 'vue';

// Danh sách bài viết
const posts = ref([
{ id: 1, title: 'Bài viết 1', content: 'Nội dung bài viết 1', tags: ['tag1', 'tag2'] },
{ id: 2, title: 'Bài viết 2', content: 'Nội dung bài viết 2', tags: ['tag2', 'tag3'] },
{ id: 3, title: 'Bài viết 3', content: 'Nội dung bài viết 3', tags: ['tag1', 'tag3'] },
]);
// Bài viết mới
const newPost = ref({
    title: '',
    content: '',
    tagsString: '',
});
// Tạo mới bài viết
const createPost = () => {
  // Tách các thẻ từ chuỗi tagsString
const tags = newPost.value.tagsString.split(',');
  // Tạo bài viết mới và thêm vào danh sách bài viết
posts.value.push({
    id: posts.value.length + 1,
    title: newPost.value.title,
    content: newPost.value.content,
    tags: tags.map(tag => tag.trim()),
})
    // Xóa dữ liệu trong form
    newPost.value.title = '';
    newPost.value.content = '';
    newPost.value.tagsString = '';
};
// Từ khóa tìm kiếm
const searchKeyword = ref('');
// Lọc bài viết dựa trên từ khóa
const filteredPosts = computed(() => {
    return posts.value.filter(post =>
        post.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
        || post.content.toLowerCase().includes(searchKeyword.value.toLowerCase())
        || post.tags.some(tag => tag.toLowerCase().includes(searchKeyword.value.toLowerCase()))
)
})


const products = ref([
{ id: 1, name: 'Sản phẩm A', price: 10 },
{ id: 2, name: 'Sản phẩm B', price: 20 },
{ id: 3, name: 'Sản phẩm C', price: 30 }
])
//giỏ hàng
const cartItem = ref([])
//từ khoá tìm kiếm
const keyWord = ref('')
//thêm sản phẩm vào giỏ hàng
const addtocart = (product) =>{
    //kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingItem = cartItem.value.find((item) => item.product.id === product.id)
    if(existingItem){
        //nếu sản phẩm đã tồn tại, tăng số lượng lên1
        existingItem.quantity ++
    }else{
        //nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
        cartItem.value.push({product,quantity:1})
    }
}
//tính tổng số lượng sản phẩm trong giỏ hàng
const totalQuantity = computed(() =>{
    return cartItem.value.reduce((total,item) => total + item.quantity,0)
})
//lọc tìm kiếm sản phẩm dựa trên từ khoá
const filteredProducts = computed(() =>{
    return products.value.filter((products)=>
    products.name.toLocaleLowerCase().includes(keyWord.value.toLocaleLowerCase())
    )
})
//theo dõi sự thay đổi từ khoá tìm kiếm
watch(()=>keyWord,()=>{
    console.log('Từ khóa tìm kiếm đã thay đổi:',keyWord.value)
})
//xư lí thanh toán
const checkout = () =>{
    //xử lí logic thanh toán

    //xoá các sản phẩm trong giỏ hàng sau khi thanh toán
    cartItem.value = []
    //hiển thị thông báo thành công
    alert("Thanh toán thành công!")
}

//danh sách người dùng
const users = ref ([
{ id: 1, name: 'Người dùng 1', email: 'user1@example.com' },
{ id: 2, name: 'Người dùng 2', email: 'user2@example.com' },
{ id: 3, name: 'Người dùng 3', email: 'user3@example.com' }   
])
//người dùng mới
const newUser = ref({
    name:'',
    email:''
})
//người dùng đang được sửa đổi
const editingUser = ref()
const editedUser = ref({
    id:null, name:'', email:''
})
//thêm mguowif dùng mới vào danh sách
function addUser(){
    if(newUser.value.name && newUser.value.email){
        const user = {id:users.value.length + 1, ...newUser.value}
        users.value.push(user)
        newUser.value.name = ''
        newUser.value.email = ''
    }
}
//sửa thông tin người dùng
function editUser(user){
    editingUser.value = user;
    editedUser.value.id = user.id;
    editedUser.value.name = user.name;
    editedUser.value.email = user.email;
}
//cập nhật thông tin người dùng mới
function updateUser(){
    const index = users.value.findIndex(user => user.id === editedUser.value.id)
    if (index !== -1){
        users.value[index].name = editedUser.value.name
        users.value[index].email = editedUser.value.email
        cancelEdit()
    }
}
//huỷ sử thông tu=in người dùng
function cancelEdit (){
    editingUser.value = null
    editedUser.value.id = null
    editedUser.value.name = ''
    editedUser.value.email = ''
}
//xoá người dùng khỏi danh sách
function deleteUser(user){
    const index = users.value.findIndex(u => u.id == user.id)
    if(index !== -1){
        users.value.splice(index,1)
    }
}

//dánh sách phim
const movies = ref([
{ id: 1, title: 'Phim 1', isFavorite: false },
{ id: 2, title: 'Phim 2', isFavorite: false },
{ id: 3, title: 'Phim 3', isFavorite: false }   
])
//từ khoá tìm kiếm
const searchTerm = ref('')
//lọc dnah sách phim dự trên từ khoá tìm kiếm
const filteredMovies = computed(() => {
  return movies.value.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})
//danh sách phim yêu thích
const favoriteMovies = computed(() =>{
    return movies.value.filter(movie => movie.isFavorite)
})
//kiểm tra phim có trong danh sách yêu thích hay không
function isFavorite(movie){
    return movie.isFavorite
}
//chuyển đổi trạng thái yêu thích của phim
function toggleFavorite(movie){
    movie.isFavorite = !movie.isFavorite
}
watch(searchTerm,() =>{
    console.log('Từ khóa tìm kiếm đã thay đổi:', searchTerm.value)
})


const tasks = ref([
    { id: 1, title: 'Công việc 1' },
    { id: 2, title: 'Công việc 2' },
    { id: 3, title: 'Công việc 3' },
])
const newTask = ref()
//công việc đang được sủa
const editingTask = ref(null)
const editedTask = ref({id: null, title: '' })
//thêm công việc mới vào danh sách
function addTask(){
    if(newTask.value){
        const task = {id:tasks.value.length + 1, title:newTask.value}
        tasks.value.push(task)
        newTask.value = ''
    }
}
//sửa công việc
function editTask(task){
    editingTask.value = task;
    editedTask.value.id = task.id;
    editedTask.value.title = task.title
}
//cập nhạt công việc được sửa
function updateTask(){
    const index = tasks.value.findIndex(task => task.id === editedTask.value.id);
        if (index !== -1) {
            tasks.value[index].title = editedTask.value.title;
            cancelEdits()
    }
}
//huỷ sủa công việc
function cancelEdits(){
    editingTask.value = null;
    editedTask.value.id = null;
    editedTask.value.title = ''
}
//xoá công việc khỏi danh sách
function deleteTask(task){
    const index = tasks.value.findIndex(t => t.id === task.id)
    if(index !== -1){
        tasks.value.splice(index, 1)
    }
}
</script>