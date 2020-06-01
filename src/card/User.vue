<template>
  <div>
      <div  id="activeUser">
        <img class="userImg"  :src="(user && user.image ? user.image :'/pictures/1.jpg')" alt="">
        <span class="userName">
          {{user.username}}
        </span>
        <span class="userEmail">
          {{user.email}}
        </span>
      </div>
  </div>
</template>

<script>
export default {
  props:['user'],
}
</script>

<style>
  
#activeUser{
    text-align: center;
    font-size: 16px;
    position: absolute; 
    top: .7em; right: 4em;
}
#activeUser span{
    display: block;
    line-height: 1.4    ;
}
.userName{
    font-size: 14px;

}
.userEmail{
    font-weight: 200;
    font-size: 12px;
    color: #666;
}
.userImg{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    cursor: pointer;
}
</style>