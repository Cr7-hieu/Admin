<template>
    <div>
        <div>
            <div>
                <h1>Todo List</h1>

                <!-- Hiển thị danh sách các công việc -->
                <ul class="task-list">
                    <li v-for="(task, index) in tasks" :key="index"
                        :class="{ completed: task.completed }">
                        <span>{{ task.name }}</span>
                        <button @click="toggleTaskCompletion(task)">Hoàn thành</button>
                        <button @click="deleteTask(task)">Xóa</button>
                    </li>
                </ul>

                <!-- Hiển thị form để thêm công việc mới -->
                <form @submit.prevent="addTask">
                    <label for="new-task">Tên công việc:</label>
                    <input type="text" id="new-task" v-model="newTaskName">
                    <button type="submit">Thêm công việc</button>
                </form>
            </div>
        </div>    
        <div>
            <div>
                <input v-model="height" placeholder="Chiều cao (cm)" />
                <input v-model="weight" placeholder="Cân nặng (kg)" />
                <p>BMI: {{ bmi.toFixed(1) }}</p>
                <p>Tình trạng: {{ status }}</p>
            </div>
        </div>
        <div class="App">
            <h1>Cờ caro</h1>
            <div class="board">
                <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
                    <div class="square" v-for="(square, squareIndex) in row" :key="squareIndex"
                    @click="makeMove(rowIndex, squareIndex)"
                    :class="{'player1':square === 1, 'player2' : square === 2}"></div>
                </div>
            </div>
            <div>{{ message }}</div>
        </div>        
    </div>
</template>
<script setup>
import {computed, ref, watch} from 'vue'

const task = ref([
{ name: 'Mua sữa', completed: false },
{ name: 'Đi chợ', completed: true },
{ name: 'Học lập trình', completed: false }   
])
const newTaskName = ref()
function addTask(){
    if(newTaskName.value.trim() !== ''){
        task.value.push({name:newTaskName.value, completed:false})
        newTaskName.value = ''
    }
}
function toggleTaskCompletion(task){
    task.completed = !task.completed
}
function deleteTask(task){
    task.value.splice(tasks.value.indexOf(task), 1)
}


const height = ref(170)
const weight = ref(70)

const bmi = computed(() => {
      return weight.value / ((height.value / 100) ** 2)
})

const status = computed(() => {
    if (bmi.value < 18.5) {
        return 'Thiếu cân';
    } else if (bmi.value < 25) {
        return 'Bình thường';
    } else if (bmi.value < 30) {
        return 'Thừa cân';
    } else {
        return 'Béo phì';
    }
})

watch([height, weight], ([newHeight, newWeight], [oldHeight, oldWeight]) => {
    console.log(`Chiều cao mới: ${newHeight} cm, chiều cao cũ: ${oldHeight} cm`);
    console.log(`Cân nặng mới: ${newWeight} kg, cân nặng cũ: ${oldWeight} kg`);
})

//khai báo một biết board để lưu trữ cấc ô của bàn cờ
const board = ref([
    ['0','0','0'],
    ['0','0','0'],
    ['0','0','0']
])
//hàm kiểm tra  xem có ai đã thắng hay không
function checkWin(board){
    //kiểm tra hàng ngang
    for (let i = 0; i < 3; i++){
        if(board[i][0] !== 0 && board[i][0] === board[i][0] && board[i][1] === board[1][2]){
            return board[i][0]
        }
    }
    //kiểm tra hàng dọc
    for (let i = 0; i < 3; i++){
        if(board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]){
            return board[0][i]
        }
    }
    //kiểm tra đường chéo từ trấi sang phải
    if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0]
    }
    //kiểm tra đường chéo từ phải sang trái
    if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2]
    }
    //nếu khônbg có ai tháng, trả về không
    return 0
}
//computed để kiểm tra xem au đã thắng
const winner = computed(() =>{
    return checkWin(board.value)
})
//biến message dùng để hiển thhij kết quả
const message =  ref()
//hàm thực hiện nước đi của người chơi
function makeMove(row,square){
    //nếu ô đã được đánh hoặc có người chiến thắng, ko cho phép đánh tiếp
    if (board.value[row][square] || winner.value){
        return
    }
    //thực hiện nước đi cua người chơi
    board.value[row][square] = currenPlayer.value
    //kiểm tra xem người chơi hiện tại có thắng hay không
    const win = checkWin(board.value)
    if(win){
        message.value = `Người chơi ${win} đã thắng!`
        return
    }
    //chuyển lượt chi người chơi kế tiếp
    currenPlayer.value = currenPlayer.value === 1 ? 2 :1
}
//biến currenPlayer dùng để lưu trữ người chơi hiẹn tại
const currenPlayer = ref(1)
// Watch biến winner để hiển thị kết quả khi có ai đó chiến thắng
watch(() =>winner, (value) => {
if (value) {
    message.value = `Người chơi ${value} đã thắng!`
}else if (!board.value.flat().includes(0)){
    message.value = 'hoà'
}
})
</script>
<style scoped>
.App{
    display: flex;
flex-direction: column;
align-items: center;
margin-top: 20px;
}
.board {
display: flex;
flex-direction: column;
border: 1px solid black;
}
.row {
display: flex;
flex-direction: row;
}
.square {
width: 100px;
height: 100px;
border: 1px solid black;
}
.player1 {
background-color: lightblue;
}
.player2 {
background-color: pink;
}
.message {
font-size: 24px;
font-weight: bold;
margin-top: 20px;
}
</style>