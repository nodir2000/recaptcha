<template>
    <div class="stepTwoInp">
       <!-- <h1>step2</h1> -->
             <div>
               <div id="recaptcha-container"></div>
                <el-input type="text" placeholder="Enter Phone" v-model="number"></el-input>
                <el-input type="text" placeholder="Enter Email"></el-input>
                <el-button type="primary" @click="phoneAuth();">SendCode</el-button>
             </div>
           <h1>Verification code</h1>
          <el-input type="text" id="verificationCode" placeholder="Enter verification code" required></el-input>
          <el-button type="success" @click="codeverify();">Verify code</el-button>  
    </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  data(){
    return{
      number:'',
      code:'',
      auth: null,
      codeResult:null
    }
  },
  mounted () {    
    this.auth = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.auth.render();
  },
  methods:{
    phoneAuth(){      
      firebase.auth().signInWithPhoneNumber(this.number, this.auth)
        .then(function(confirmationResult){
            this.codeResult = confirmationResult;
            console.log('confirmationResult',this.codeResult)
        }).catch(function(error){
            console.log('error',error)
        })
    },
    codeverify(){
      this.codeResult.confirm(this.code)
      .then(result =>{
        console.log('success');
        console.log(result)
      })
      .catch(error =>{
        console.log('error');
        console.log(error);
      })
    }
  }
}
</script>

<style>
.stepTwoInp{
   margin:auto;
  width:25%;display:flex;
  flex-direction:column;
  justify-content:space-between
}
</style>