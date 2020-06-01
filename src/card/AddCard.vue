<template>
    <div>
        <input type="text" v-model="title" placeholder="Enter title">
        <!-- <input type="text" v-model="imageSrc" placeholder="Enter img"> -->
        <div>
            <button @click="openLocalFile">Image</button>
            <input @change="onFileSelect" ref="fileInput" type="file" hidden>
        </div>
        <!-- <SelectLocalImg @image-onloaded = 'imageOnloaded'/> -->
        <!-- <input type="text" v-model="imageSrc" placeholder="Enter img"> -->
        <!-- <input type="text" v-model="title" placeholder="Enter content"> -->
        <textarea v-model="content" cols="30" rows="10" placeholder="Enter content"></textarea>
        <button @click="addCard">save</button>
        
    </div>
</template>
<script>
// import SelectLocalImg from './SelectLocalImg'
export default {
    // components:{
    //     SelectLocalImg
    // },
    data(){
        return{
            title:'',
            imageSrc:'',
            content:''
        }
    },
    methods:{
        addCard(){
            if(this.title.trim()){
              
              const newCard = {
                    id:Date.now(),
                    title:this.title,
                    image:this.imageSrc,
                    content:this.content
                }
                console.log(newCard)
                this.$emit('addCard',newCard);
                this.clearInputArea();
            }
            
        },
        clearInputArea(){
            this.title = "";
            this.content = ""
            this.imageSrc = ""
        },
        openLocalFile(){
            this.$refs.fileInput.click();
        },
        onFileSelect(event){
            const input = event.target.files[0];
        
            const fileReader = new FileReader();
                
                fileReader.onload = ()=>{
                const dataUrl = fileReader.result;
                console.log('dataurl');
                this.imageSrc = dataUrl;
            
            }

            fileReader.readAsDataURL(input);
            // this.reader(fileReader);
        },
      
    }
}
</script>