<template>
    <div>
        <div id="modal">            
            <div ref="myForm" style="display:none"  class="form-popup" id="myForm">
                <h1 v-if="method == 'add'">Create Card</h1>   
                <h1 v-if="method == 'edit'">Edit Card</h1>
                <div class="form-container">
                    
                    <label  for="title"><b>Title</b></label>
                    <input id="cardTitle" v-model='title'  type="text" placeholder="Enter title" name="title" required>
    
                    <label for="image"><b>Image</b></label>
                
                    <div id="selectFile">
                        <button id="selectFileBtn" @click="openLocalFile" class="selectFileBtn">Select Image</button>
                        <input id="cardFileInp" ref="fileInput" @change="onFileSelect" type="file"  hidden required>
                    </div>
        
                    <img v-if="image" :src="image" id="localPicture" width="300" height="150" >    

                    <label class="content" for="cardContent"><b>Content</b></label>
                    <textarea v-model="content" cols="40" rows="3" placeholder="Enter Content"></textarea>
                                      
                    <div class="footerbuttons">                          
                        <button type="button" @click="close" id="closeForm" class="btn cancel" >close Form</button>
                        <button type="submit" @click="handleSave" id="createCard" class="btn">save</button>
                    </div>
                </div>           
            </div>                                     
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default { 
    props:['user'],   
    data(){
        return{
            id: 0,
            title:'',
            image:'',
            content:'',
            method: 'add'
        }
    },
 
    methods:{    
        openLocalFile(){
            this.$refs.fileInput.click();
        },
        onFileSelect(event){
            const input = event.target.files[0];
            const fileReader = new FileReader();                
            fileReader.onload = () => {
                const dataUrl = fileReader.result;                
                this.image = dataUrl;
            }
            fileReader.readAsDataURL(input);            
        },
        handleSave() {
            if (this.method == 'add') {
                this.addCard();
            }else {                
                this.editCard();
            }
        },
        addCard(){
            if(this.title.trim()){              
                const newCard = {
                    authorId:this.user.id,
                    id: Date.now(),
                    title: this.title,
                    image: this.image,
                    content: this.content
                }                
                    this.$emit('addCard', newCard);
                    this.close();                
            }            
        },
        close(){             
            this.reset();

            const myForm = this.$refs['myForm'];
            myForm.style = "display: none";            
        },
        reset(){            
            this.id = 0;
            this.title = "";
            this.content = "";
            this.image = "";  
            this.method = 'add';
        },
        assignValue (item) {
            this.method = 'edit';
            this.id = item.id;
            this.content = item.content;
            this.title = item.title;
            this.image = item.image;
        }, 
        open(item){                                 
            if (item) {
                this.assignValue(item);
            }

            const myForm = this.$refs['myForm'];
            myForm.style = "display: block";                
        },
        editCard(){                        
            const cards = JSON.parse(localStorage.getItem('cards'));
            cards.forEach(element => {
                if(element.id == this.id){
                    element.title = this.title;
                    element.image = this.image;
                    element.content = this.content
                }
                
                Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: element.title+'   has been saved edditting',
                showConfirmButton: false,
                timer: 1000
            })  
            
            });
            
            localStorage.setItem('cards',JSON.stringify(cards));
               
            this.$emit('createCardEdiitted');            
            this.reset();
            this.close();
        }
    }
}
</script>
<style scoped>
*{
    color:#fff;
    font-weight: bold;
}
input{
    color:#333;
}
label b{
    text-align: start;
    color:#333;
}
textarea{
    color: #333;
    background-color: #ddd;
    max-width: 100%;
}   
.content b{
    /* background: red; */
    padding:10px 0 10px 0;
}

.form-popup {
    /* display: none; */
    z-index: 9;
    margin: 10px;
    border: 3px solid #f1f1f1;
    width: 350px;
    padding: 15px;
    position: fixed;
    top: 5%;
    left: 35%;
    z-index: 1;
    background-color: #33b5e5;
}
.form-popup h1{
    padding: 10px;
}

.form-container {
    text-align: start;
    width: 300px;
    padding: 10px;
    background-color: white;
    margin: auto;
    }
.form-container input{
    border: none;
    background-color:#f1f1f1 ;
    font-size:16px;
    
}    
.form-container input:focus{
    background-color: #ddd;
    outline: none;
}
.form-container .btn {
    background-color: #33b5e5;
    color:#fff;
    padding: 12px 25px;
    border: none;
    cursor: pointer;
    margin-bottom:10px;
    opacity: 0.8;
    text-align: center;
    font-size: 14px;
    }
.form-container input[type=text] {
        width: 87%;
        padding: 15px;
        margin: 5px 0 22px 0;
        border: none;
        background: #f1f1f1;     
}
#closeForm{
    margin-right: 3px;
}
#createCard{
    margin-right: 0;
}
#editCard{
      margin-right: 3px;
}
.form-container .cancel{
    background-color: #ff3547;
}

.selectFileBtn{
    width: 100%;
    border: none;
    padding: 12px 24px;
    background-color:  #33b5e5;
    font-size: 16px;    
    cursor: pointer;
}
#selectFile{
    margin: 4px 0 4px 0;
}
.footerbuttons{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}  

</style>