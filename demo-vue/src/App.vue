<template>
  <div>
    <Trangchu></Trangchu>
    <Login></Login>
    <Tinhtien></Tinhtien>
    <Error></Error>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Tinhtien from './components/Tinhtien.vue'
import Trangchu from './components/Trangchu.vue'
import Error from './components/Error.vue'
export default {
  components: { Tinhtien, Trangchu, Login, Error }

}
</script>

<style>

</style>