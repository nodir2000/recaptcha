<template>
    <form v-on:submit.prevent = "onSubmit">
        <input type="text" v-model="title">
        <button type="submit">Create</button>
    </form>
</template>
<script>
export default {
    data(){
        return{
            title:''
        }
    },
    methods:{
        onSubmit(){
            this.checking();
            console.log('submit',this.title);
        },
        checking(){
                if(this.title.trim()){
                const newTodo ={
                    id:Date.now(),
                    title:this.title,
                    complated:false
                }
                this.$emit('add-todo',newTodo);
                this.title = ''
            }
        }
    }
}
</script>