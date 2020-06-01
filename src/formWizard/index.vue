<template>
  <div>
    <form>
      <section v-show="step == 1">
        <h1>step1</h1>
        <!-- <el-input style="width:20%"  placeholder="Enter Your Username" @input="removeErrorMsg();" v-model="form.name"></el-input> -->
        <Recaptcha :phone="form.phone" :email="form.email" />
      
      </section>
      <section v-show="step == 2">
        <h1>step2</h1>
        <div class="stepTwoInp">
          <!-- <el-input id = 'number'  ref="number" v-model="form.phone" type="text" placeholder="Enter Phone" @input="removeErrorMsg();"></el-input>
                <span style="color:red">{{warning}}</span>
          <el-input v-model="form.email" type="text" placeholder="Enter Email" @input="removeErrorMsg();"></el-input>-->

          <div>
            <el-input
              class="input"
              type="text"
              id="verificationCode"
              placeholder="Enter verification code"
              required
            ></el-input>
            <el-button class="btn" type="success" @click="codeverify();">Verify code</el-button>
          </div>
        </div>
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
import Recaptcha from "../firebase/Index";
export default {
  data() {
    return {
      step: 1,
      totalStep: 3,
      error: "",
      warning: "",
      form: {
        name: null,
        email: null,
        phone: null,
        message: null
      }
    };
  },
  components: {
    Recaptcha
  },
  mounted() {
    this.numberMask();
  },
  methods: {
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
        // if (!this.form.name) {
        //   this.errorMesage("name");
        //   return false;
        // }
      }
      if (this.step == 2) {
        if (!this.form.email) {
          this.errorMesage("email");
          return false;
        }
        if (!this.form.phone) {
          this.errorMesage("phone");
          return false;
        }
        if (this.form.phone.length < 17) {
          this.warning = "Fill number to the end";
          return false;
        }
        this.warning = "";
      }
      this.step++;
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
    // codeverify() {
    //   this.codeResult
    //     .confirm(this.code)
    //     .then(result => {
    //       console.log("success");
    //       console.log(result);
    //     })
    //     .catch(error => {
    //       console.log("error");
    //       console.log(error);
    //     });
    // }
  }
};
</script>

<style>
.stepTwoInp {
  margin: auto;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btn {
  position: relative;
  top: 10px;
  left: 110px;
}
</style>