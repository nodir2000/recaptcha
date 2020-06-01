<template>
    <div>
        <!-- <router-link to = '/Card'>Card</router-link> -->
        
          <div class="login">
              <h1>Login To Card </h1>
              <form v-on:submit.prevent='submitUsers' class="form-input">
                
                    <label for="username" >Username</label>
                    <input v-model="user.username" type="text" id="username" required placeholder="Enter UserName">
                
                    <label for="password">Password</label>
                    <input v-model="user.password" type="password" id="password" required placeholder="Enter Password">
            
                    <button type="submit" class="btn succes" >Login</button>
              </form>
              <p>Not Registrated? <span><router-link to = '/Register'>Register</router-link></span></p>
          </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    data(){
        return{
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        submitUsers(){
            const users = JSON.parse(localStorage.getItem('users'));
            if(!users){
                Swal.fire({
                    title: 'Oops...',
                    text: 'You Should Register!!!',
                });  
                return;
            }

            for (const user of users) {
                
                if((this.user.username == user.username)&&(this.user.password == this.decode(user.password))){
                    console.log('kaz')
                    localStorage.setItem('user',JSON.stringify(user));
                    localStorage.setItem('isUserLoggedIn','userLoggedIn');
                    this.$router.push({ path:'/card'});
                    this.reset();
                    return;
                }
                
            }
                 Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Incorrect Username Or Password!!!',
                });  
                return;
        },
        reset(){
            this.user.username = '';
            this.user.password = ''
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
            });
            
            for (let index = 0; index < array.length; index++) {
                const element = String.fromCharCode((array[index] - 13)/2);
                resultInDecode += element; 
            }

            return resultInDecode;
        },
    }
}
</script>
<style scoped>
    *{
        padding: 0;
        margin:0;
    }
    .login{
        margin:auto;
        width: 30%;
        height: 400px;
        border:1px solid grey;
        text-align: center;
        background: #4A9C8C ;
        background: linear-gradient(45deg, #4D9C4A ,#4A9C8C,#C481D2 );
    }
    h1{
        padding: 35px;

    }
    label{
        color: #333;
    }
    input{
        outline-style: none;
        border: none;
        padding: 10px;
        width: 80%;
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
        width: 85%;
        margin: auto;
        margin-top:25px;
        padding: 8px;
        border-radius: 35px;
        border: none;
    }
    p{
        margin-top: 10px;
    }
</style>