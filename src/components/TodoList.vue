<template>
    <div>
                <!-- <input type="text" v-model="todos"> -->
        <li>
                Todo List 1
                <TodoItem v-for="(todo,i) of todos" 
                v-bind:todo="todo" :key="todo.id"
                v-bind:index="i"
                v-on:remove-todo="removeTodo"/>
                {{todos}}
        </li>
            <!-- {{salom}}
            <input type="text" v-model="salom"> -->
     </div>
</template>
<script>
import TodoItem from '@/components/TodoItem'
export default {
    name:'TodoList',
    props:['todos'],
    data(){
        return{
            salom:'salom'
        }
    },
    components : {
        TodoItem
    },
    methods:{
        removeTodo(id){
            console.log(id);
            this.$emit('remove-todo',id);
        }
    }
}
</script>