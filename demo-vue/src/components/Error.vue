<template>
    <div>
        <div>
            <input type="number" v-model="quantity" min="0" step="1">
            <button @click="checkQuantity">Kiểm tra</button>
            <!-- <div v-if="error">{{ error }}</div>
            <div v-else>Không có lỗi</div> -->
            <div v-tooltip="error" :class="{ 'error': error }">
                {{ error ? '⚠️' : '✅' }}
            </div>
        </div>
        
    </div>
</template>
<script setup>
import {ref, onMounted, getCurrentInstance} from 'vue'
import 'v-tooltip/dist/v-tooltip.css'
import VTooltip from 'v-tooltip'


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

onMounted(() => {
  const app = getCurrentInstance().app
  app.directive('tooltip', VTooltip.directive)
})
</script>
<style scoped>
.error{
    color: red;
}
</style>