<template>
    <div>
        <div>
            <button @click="openLocalFile">Image</button>
            <input @input="onFileSelect" ref="fileInput" type="file" hidden>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
          openLocalFile(){
            this.$refs.fileInput.click();
        },
        onFileSelect(event){
            const input = event.target.files[0];
        
           const fileReader = new FileReader();
                
                fileReader.onload = ()=>{
                const dataUrl = fileReader.result;
                console.log('dataurl');
                this.$emit('image-onloaded',dataUrl);
            }

            fileReader.readAsDataURL(input);
            // this.reader(fileReader);
        },
        //  reader(fileReader){
      
        // }
    }
}
</script>