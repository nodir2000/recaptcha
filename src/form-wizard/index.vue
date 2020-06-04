<template>
  <div>
      <router-link to = './login'>login</router-link>
      <h2>Step 1</h2>
       
      <div class="sendCodeForm">
        <div id="recaptcha-container"></div>
     
        <div v-show="step == 1" class="phoneSendCode">
          <el-input maxlength="13" @input="removeErrorMsg();"  v-model="user.phone" id="number" class="input" type="text" placeholder="Enter Phone"></el-input>
          <span style="color:red">{{error}}</span>
          <!-- <el-input v-model="user.email" class="input"  type="text" placeholder="Enter Email"></el-input> -->
         {{this.user.phone}}
          <div class="button">
            <button class="sendCodeBtn" type="primary" @click="phoneAuth();">SendCode</button>
          </div>

         
      </div>
          <div v-show="step == 2">
            <h2>VerifyCode</h2>
            <el-input v-model="auth.codeverify" type="text" placeholder="enter-verify-code"></el-input>
            <div class="button">
                <el-button style="margin:5px" type="danger" @click="prevStep();">prev-step</el-button>
            <el-button style="margin:5px" type="success" @click="codeVerify();">verify code</el-button>
            
            </div>
          </div>


    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import IMask from "imask";
export default {
  data(){
    return{
      step:1,
      error:"",
      user:{
        phone:null,
        email:null,
      },
      auth:{
        phoneAuth:null,
        acceptedCode:'',
        codeverify:null
      },
    }
  },
  mounted(){
    this.auth.phoneAuth = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.auth.phoneAuth.render();
    this.numberMask();
  },
  methods:{
    prevStep(){
      this.step--
    },
    phoneAuth(){
      if(this.user.phone.length < 13){
        this.error = 'Fill Out The Number To The End!!!';
        return;
      }
      // this.step++;
      // localStorage.setItem('userPhoneNumber',this.user.phone);
      firebase.auth().signInWithPhoneNumber(this.user.phone,this.auth.phoneAuth)
      .then(function(confirmationResult){
        console.log('confirmationResult',confirmationResult)
        this.step++;
        this.auth.acceptedCode = confirmationResult;
        
        
      })
      .catch(function(error){
        console.log('Error',error);
      })
    },
    numberMask() {
      const element = document.getElementById("number");
      const maskOptions = {
        mask: "+{998}000000000"
      };
      IMask(element, maskOptions);
    },
    removeErrorMsg(){
      this.error = ''
    },
    codeVerify () {
     
    let code = this.auth.codeverify;
    // console.log(code)
    
    
    // this.$router.push({ path:'/card'});
    this.auth.acceptedCode.confirm(code)
        .then(result => {
            console.log("SUCECS")
            localStorage.setItem('allowedRegister','true');
            localStorage.setItem('userPhoneNumber',this.user.phone);
            this.$router.push({ path:'/register'});
            console.log(result);
        })
        .catch(error => {
            console.log("FAIL")    ;
            console.log(error)
        })
    }
  }
}
</script>

<style>
.sendCodeForm{
  width:22.4%;
  margin: auto;
  padding:20px 8px;
  -webkit-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
  -moz-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
}

.button{
  text-align:right;
}
.sendCodeBtn{
  background: #0099cc;
  padding: 12px 20px;
  color: #fff;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.input{
  margin:5px 0
}
</style>