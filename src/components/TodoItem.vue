<template>
<div>
 <ul>
     <!-- <li>TodoItem 1</li> -->
     <span class="rm">
         <input type="checkbox" v-on:change = "todo.complated = !todo.complated">
         <strong>{{index + 1}}</strong>
         <span v-bind:class="{done: todo.complated}">{{todo.title}}</span>
        <button v-on:click="removeTodo(todo.id)" >&times;</button>
     </span>
 </ul>
</div>
</template>
<script>
export default {
   
    props:{
        // todos:{
        //     type:Object,
        //     required:true
        // },
        todo:{
            type:Object,
            required:true
        },
        index:Number
        
    },
    filters:{
        uppercase(value){
            console.log(value);
            return value.toUppercase();
        }
    },
    methods:{
        removeTodo(id) {
            return this.$emit('remove-todo',id)  
        }
    }
}
</script>
<style scoped>
/* .rm{
    background-color: red;
} */
 .done{
     text-decoration: line-through;
    /* background: red; */
 }
</style>