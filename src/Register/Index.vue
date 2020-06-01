<template>
    <div>
          <div class="register">
              <h1>Sign Up</h1>
              <form v-on:submit.prevent='register' class="form-input">
                
                    <label for="username" >Username</label>
                    <input v-model="user.username"  type="text" id="username" required placeholder="Enter UserName">
                    
                    <label for="email">Email</label>
                    <input v-model="user.email"   type="text" id="email" required placeholder="Enter Email">

                    <label for="password">Password</label>
                    <input v-model="user.password"   type="text" id="password" required placeholder="Enter Password">
                    
                    <img v-if="user.image" :src="user.image" id="localPicture" width="300" height="150" >
                  
                    <div id="selectFile">
                        <button id="selectFileBtn" @click="openLocalFile" class="selectFileBtn">Select Image</button>
                        <input id="cardFileInp" ref="fileInput" @change="onFileSelect" type="file"  hidden required>
                    </div>
                  
                    <button type="submit" class="btn succes" >Craete Account</button>

              </form>
              <p>Already Registrated? <span><router-link to = '/'>Login</router-link></span></p>
          </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    data(){
        return{
            user:{
                id:0,
                username:'',
                email:'',
                password:'',
                image:''
            }
        }
    },
    methods:{
        register(){

            const users = this.getAllUsers();
            for (const user of users) {
                if(this.user.username == user.username){
                    alert('You Have Already Registrated!!!');
                    return;
                }
            }
            this.user.password = this.ecode(this.user.password);

            if((this.user.username)&&(this.user.email)&&(this.user.password)){
                this.user.id = Date.now();
                users.push(this.user);
                localStorage.setItem('users',JSON.stringify(users));
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: this.user.username + ' has been registrated!!!',
                    showConfirmButton: false,
                    timer: 1500
                });
                this.reset();
            }
        },
        openLocalFile(){
            this.$refs.fileInput.click();
        },
        onFileSelect(event){
            const input = event.target.files[0];
            const fileReader = new FileReader();                
            fileReader.onload = () => {
                const dataUrl = fileReader.result;                
                this.user.image = dataUrl;
            }
            fileReader.readAsDataURL(input);            
        },
        reset(){
            this.user.id = 0;
            this.user.username = '';
            this.user.email = '';
            this.user.password = '';
            this.user.image = '';
        },
        ecode(string){
            let resultInEcode = '';
            for (let index = 0; index < string.length; index++) {
                const element = string.charCodeAt(index) * 2 + 13 + ' ' ;
                resultInEcode += element ;
            }
            return resultInEcode;
        },
        decode(ascii){
            let resultInDecode = '';
            let array = ascii.split(' ');

            array = array.filter(function(item){
                return item!=='';
            })

            console.log('array');
            for (let index = 0; index < array.length; index++) {
                const element = String.fromCharCode((array[index] - 13)/2);
                resultInDecode += element; 
            }

            return resultInDecode;
        },
        getAllUsers(){
            const users = JSON.parse(localStorage.getItem('users'));
            return users || []
        }
    }
}
</script>
<style scoped>
    *{
        padding: 0;
        margin:0;
    }
    .register{
        margin:auto;
        width: 30%;
        /* height: 400px; */
        border:1px solid grey;
        text-align: center;
        background: #4A9C8C ;
        background: linear-gradient(45deg, #4D9C4A ,#4A9C8C,#C481D2 );
    }
    h1{
        padding: 25px;

    }
    label{
        color: #333;
    }
    input{
        outline-style: none;
        border: none;
        padding: 10px;
        width: 88%;
        margin: auto;
        background:#CACECE;
        border-radius: 35px;
        margin: 10px 0;
    }
    .btn{
        cursor: pointer;
        font-size: 16px;
        color:#333;
        font-weight: bold;
        outline-style: none;
        background: #69D75E ;
        width: 93%;
        margin: auto;
        margin-top:25px;
        padding: 8px;
        border-radius: 35px;
        border: none;
    }
    p{
        margin-top: 10px;
        padding-bottom: 10px;
    }
    .selectFileBtn{
        width: 93%;
        border: none;
        padding: 8px;
        background-color:  #CACECE;
        font-size: 16px;    
        cursor: pointer;
        border-radius: 35px;
    }
    #selectFile{
        margin: 4px 0 4px 0;
    }
</style>