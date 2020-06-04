<template>
  <div>
    <form>
      <section v-show="step == 1">
        <h1>step1</h1>
        <div class="stepTwoInp">
          <div>
            <div id="recaptcha-container"></div>
            <el-input id="number" class="input" type="text" placeholder="Enter Phone" v-model="form.phone"></el-input>
            <el-input class="input" v-model="form.email" type="text" placeholder="Enter Email"></el-input>
            <el-button class="btn" type="primary" @click="phoneAuth();">SendCode</el-button>
          </div>
        </div>

      </section>
      <section v-show="step == 2">
        <h1>step2</h1>
        <input type="text" v-model="form.name" placeholder="Enter name" id="">
        
         <!-- <el-input class="input" v-model="form.name" type="text" placeholder="Enter Email"></el-input> -->
       <!-- <div  id="verifyCode">
            <h1>Verification code</h1>
            <div class="stepTwoInp">
              <el-input class="input" v-model="code" type="text" id="verificationCode" placeholder="Enter verification code" required></el-input>
              <el-button class="btn" v-model="code" type="success" @click="codeverify();">Verify code</el-button>
            </div>
          </div> -->
      </section>
      <section v-show="step == 3">
        <h1>step3</h1>
        <textarea v-model="form.message" placeholder="type your message" @input="removeErrorMsg();"></textarea>
      </section>
      <span style="color:red">{{error}}</span>

      <br />
      <el-button type="success" v-if="step != 1" @click.prevent="prevStep();">prevStep</el-button>
      <el-button v-if="step != totalStep" @click="nextStep();">nextStep</el-button>
      <el-button v-if="step == 3" @click.prevent="nextEnquiry();">nextEnquiry</el-button>
    </form>
  </div>
</template>

<script>
// import Recaptcha from "../firebase/Index";
// import IMask from "imask";
import * as firebase from "firebase";
export default {
  data() {
    return {
      step: 1,
      totalStep: 3,
      error: "",
      warning: "",
      codeResult:null,
      code:null,
      auth:null,
      form: {
        name: null,
        email: null,
        phone: null,
        message: null
      }
    };
  },
  components: {
    // Recaptcha
  },
  mounted() {
    this.auth = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    this.auth.render();
    // this.numberMask();
  },
  methods: {
    codeverify() {
        this.codeResult.confirm(this.code)
        .then(result => {
          console.log("success");
          console.log(result);
          this.$router.push({ path:'/card'});
        })
        .catch(error => {
          console.log("error");
          console.log(error);
        });
    }, 
    phoneAuth() {
      firebase.auth().signInWithPhoneNumber(this.form.phone, this.auth)
      .then(function(confirmationResult) {
          console.log(confirmationResult)
          this.codeResult = confirmationResult;
          console.log("confirmationResult", this.codeResult);
          this.nextStep();
        })
        .catch(function(error) {
          console.log("error", error);
        });
    }, 
    removeErrorMsg() {
      this.error = "";
      if (this.form.phone.length == 17) {
        this.warning = "";
      }
    },
    errorMesage(input) {
      this.error = "Please fill out your " + input;
    },
    nextStep() {
      if (this.step == 1) {
        if (!this.form.phone) {
          this.errorMesage("phone");
          return false;
        }
        if(!this.form.email){
           this.errorMesage("email");
          return false;
        }
      }

      if (this.step == 2) {
        if (!this.form.name) {
          this.errorMesage("email");
          return false;
        }
        if (this.form.phone.length < 17) {
          this.warning = "Fill number to the end";
          return false;
        }
        this.warning = "";
      }
      console.log(this.form.name)
      this.step++;
      console.log(this.step)
      this.removeErrorMsg();
    },
    prevStep() {
      this.step--;
    },
    nextEnquiry() {
      if (!this.form.message) {
        this.error = "Please fill out are!";
        return false;
      }
      this.error = "";
      alert("this has been sent");

      for (let key in this.form) {
        this.form[key] = "";
      }
      this.removeErrorMsg();
      // this.step = 1
    },
    // numberMask() {
    //   const element = document.getElementById("number");
    //   const maskOptions = {
    //     mask: "+{998}(00)000-00-00"
    //   };
    //   IMask(element, maskOptions);
    // },
  }
};
</script>

<style>
.stepTwoInp {
  margin: auto;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
input{
  padding: 10px;
  border: 1px solid #555;
  width: 80%;
}
.input {
  margin-top: 10px;
}
.btn {
  position: relative;
  top: 10px;
  left: 110px;
}
</style>