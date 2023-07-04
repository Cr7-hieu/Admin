<template>
    <div>
        <div>
            <h2>User List</h2>
            <ul>
                <li v-for="(user, index) in filteredUsers" :key="index">
                    {{ user.name }}
                </li>
            </ul>           
            <h2>Add New User</h2>
            <form @submit.prevent="addUser">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="newUser.name" required />
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="newUser.email" required />
                </div>
                <div>
                    <label for="age">Age:</label>
                    <input type="number" id="age" v-model.number="newUser.age" required />
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
        <div>
            <h1>Lựa chọn danh sách người dùng mới</h1>
            <ul>
                <li v-for="(userName, name) in usersName" :key="name">
                {{ userName.name }}
                </li>
            </ul>
            <form @submit.prevent="addUsername">
                <label for="name">Tên:</label>
                <input type="text" id="name" v-model="newName">
                <button type="submit">Thêm người dùng</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';

//khai báo măng ban đầu chứa danh sách người dùng
const users = ref([
{ name: 'Alice', email: 'alice@example.com', age: 25 },
{ name: 'Bob', email: 'bob@example.com', age: 30 },
{ name: 'Charlie', email: 'charlie@example.com', age: 35 },
])
//khai báo một object reactive để lưu trữ dữ liệu chi người dùng mới
const newUser = ref({
    name:'',
    email:'',
    age:null
})
//khai báo 1 computed để lọc danh sách người dùng
const filteredUsers = computed(() =>{
return users.value.filter((users) => users.age >= 30)
})
//khai báo một watch để ghi sự thay đổi
watch(() => filteredUsers, (newVal, oldVal) =>{
    console.log('Filtered users changed:', newVal, oldVal)
})
//khai báo 1 method để thêm 1 người dùng mới vào danh sách
function addUser(){
    //thêm người dùg mới vào mảng user
    users.value.push({
        name: newUser.value.name,
        email: newUser.value.email,
        age: newUser.value.age
    })
    //đặt lại giá trị chi các input trong form
    newUser.value.name = '';
    newUser.value.email = '';
    newUser.value.age = null;
}

const usersName = ref([
    {name:'Nguyễn Văn A'},
    {name:'Nguyễn Văn A'},
    {name:'Nguyễn Văn A'}
])
//giá trị ban đầu của newName là rỗng
const newName = ref('')
//sử dụng computed để tính số lượng người dùng
const numberOfUsers = computed(() =>{
    return usersName.value.length
})
//sử dụng watch để theo dõi thay đổi của computed
watch(() =>numberOfUsers, (newVal, oldVal) =>{
    console.log(`Đã thay đổi số lượng người dùng từ ${oldVal} sang ${newVal}`)
    
})
//sử lý sự kiện thêm ngươgi dùng
function addUsername(){
    if(newName.value !== ''){
        usersName.value.push({name:newName.value})
        newName.value = ''
    }
}
</script>