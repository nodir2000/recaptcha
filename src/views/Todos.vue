<template>
   
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Loading v-if="loading"/>
    <router-link to='./'>Home</router-link>
    <router-link to='./A'>A</router-link>

    <AddTodo @add-todo="addTodo"/>

    <select v-model="filter">
        <option value="all">All</option>
        <option value="complated">Complated</option>
        <option value="notComplated">NotComplated</option>
    </select>
    <hr>
    <TodoList
        v-if="todos.length"
     v-bind:todos='todos' v-on:remove-todo = "removeTodo"/>
     <p v-else>No result</p>
    <!-- <input type="text" v-model="todos"> -->
  </div>


</template>
<script>
// import HelloWorld from './components/HelloWorld.vue'
import AddTodo from '@/components/AddTodo.vue'
import TodoList from '@/components/TodoList.vue'
import Loading from '@/components/Loading.vue'
export default {
  name: 'Todos',
  // computed:{
  //     filteredTodos(){
         
  //         if(this.filter == 'complated'){
  //             return this.todos.filter(function(item){
  //                 item.complated = true
  //             });
  //         }
  //         if(this.filter == 'notComplated'){
  //             return  this.todos.filter(function(item){
  //                 item.complated = false
  //             });
  //         }
  //          if(this.filter == 'all'){
  //             return this.todos;
  //         }
  //     }
  // },
    data(){
        return{
            todos:[
                { id:1,title:'to buy bread',complated:false },
                { id:2,title:'to buy book',complated:false },
                { id:3,title:'to buy fruit',complated:false },
                { id:4,title:'to buy vegetable',complated:false }
            ],
        loading:true,
        filter:'all'
        }
    },

  components: {
    // HelloWorld
    TodoList,AddTodo,
    Loading
  },

  methods:{
    
    removeTodo(id){
      console.log(id);
      console.log(this.todos)
      this.todos = this.todos.filter(function(item){
        return item.id !== id;
      })
      console.log(this.todos)
    },
      addTodo(todo){
        this.todos.push(todo);
      }
  }
}
</script>