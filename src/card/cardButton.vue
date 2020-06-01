<template>
    <div class="footerButton">
        <div class="footerButtonChild">
            <button  class="edit">Edit</button>
            <button @click="Delete" class="delete">Delete</button>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        Delete(){
            
        }
    }
}
</script>
<style >
    .footerButton{
    display: flex;
    justify-content: flex-end;
   
}
.footerButton button{
    padding: 10px;
    margin:3px;
    border: none;
    border-radius: 5px;
    transition: ease-in-out .3s;
    margin-right: 10px;
    position: relative;
}
.footerButton button:hover{
    cursor: pointer;
    transform: translateY(-3px);
}
.footerButtonChild{
    position: absolute;
    bottom: -3%;
    right:0;
}
.edit{
    background-color: blue;
    color: #fff;
    background: linear-gradient(45deg,rgb(124, 124, 252),blue);
}
.delete {
    background-color: brown;
    color: #fff;
    background: linear-gradient( 45deg,rgb(228, 116, 116),brown);
}
</style>