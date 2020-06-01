<template>
  <div>
    <div v-if="step == 0">
      <h2>NaME</h2>
      <el-input  placeholder="name" v-model="name"></el-input>
    </div>

    <div  v-if="step == 1">  
      <h2>SURNAMENaME</h2>
      <el-input placeholder="surname" v-model="surname"></el-input>
    </div>

    <div  v-if="step == 2">
      <h2>PHONE</h2>
      <el-input placeholder="phone" id="phone-mask" v-model="phone"></el-input>
    </div>        

    <button @click="prev">prev</button>
    <button @click="next">next</button>
  </div>
</template>

<script>
import IMask from 'imask'
export default {
  data () {
    return {
      name: '',
      surname: '',
      phone: '',
      step: 2
    }
  },

  mounted () {
      IMask(
          document.getElementById('phone-mask'), {
            mask: '+{7}(000)000-00-00'
          });
  },

  methods: {
    prev () {
      this.step--;
    },

    next () {
      this.step++;
    }
  }
}
</script>

<style>
  
</style>