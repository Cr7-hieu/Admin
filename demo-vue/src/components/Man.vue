<template>
    <div>
        <div>
            <h1>Quản lí nhân sự</h1>
            <form @submit.prevent="addEmploye">
                <input type="text" v-model="newEmployeName" placeholder="Tên nhân sự">
                <button type="submit">thêm nhân sự</button>
            </form>
            <ul>
                <li v-for="(employe, index) in employes" :key="index">
                    {{ employe.name }}
                    <button @click="removeEmploye(index)">Xoá</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { computed, watch, ref } from "vue"


const employes = ref([
{ name: 'Nguyễn Văn A' },
{ name: 'Trần Thị B' }    
])
//biến lưu trữ tên nhân sự mới
const newEmployeName = ref()
//thêm nhân sự mới vào danh sách
const addEmploye = () =>{
    if(newEmployeName.value !== ''){
        employes.value.push({name:newEmployeName.value})
        newEmployeName.value = ''
    }
}
//xoá nhân sự khỏi danh sách
const removeEmploye = (index) =>{
    employes.value.splice(index,1)
}
//tính toán số lượng nhân sự
const employeCount = computed(() =>{
    return employes.value.length
})
watch(employeCount, (newCount) => {
    console.log(`Số lượng nhân sự: ${newCount}`);
})
</script>