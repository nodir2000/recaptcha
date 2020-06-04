<template>
  <div class="stepTwoInp">
    <div>
      <div id="recaptcha-container"></div>
      <el-input id="number" class="input" type="text" placeholder="Enter Phone" v-model="phone"></el-input>
      <el-input class="input" v-model="email" type="text" placeholder="Enter Email"></el-input>
      <el-button class="btn" type="primary" @click="phoneAuth();">SendCode</el-button>
    </div>
      <div style="display:none" id = "verifyCode">
          <h1>Verification code</h1>

          <div>
            <input
              class="input"
              type="text"
              id="verificationCode"
              placeholder="Enter verification code"
              required
            >
            <el-button class="btn" v-model="code" type="success" @click="codeverify();">Verify code</el-button>
          </div>
      </div>
  </div>
</template>

<script>
import IMask from "imask";
import * as firebase from "firebase";
export default {
  props: ["phone", "email"],
  data() {
    return {
      code: "",
      auth: null,
      codeResult: null
    };
  },
  mounted() {
    this.auth = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    this.auth.render();
    this.numberMask();
  },
  methods: {
    numberMask() {
      const element = document.getElementById("number");
      const maskOptions = {
        mask: "+{998}(00)000-00-00"
      };
      IMask(element, maskOptions);
    },
    phoneAuth() {
      firebase
        .auth()
        .signInWithPhoneNumber(this.number, this.auth)
        .then(function(confirmationResult) {
          this.codeResult = confirmationResult;
          console.log("confirmationResult", this.codeResult);
          document.getElementById('verifyCode').style = 'display:block'
        })
        .catch(function(error) {
          console.log("error", error);
        });
    },
    codeverify() {
      this.codeResult
        .confirm(this.code)
        .then(result => {
          console.log("success");
          console.log(result);
        })
        .catch(error => {
          console.log("error");
          console.log(error);
        });
    }
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