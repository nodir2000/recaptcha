<template>
    <div>
        <button @click="openModal(null)" class="open-button">Add Card</button>               
        <button @click="logout" class="logout">Log Out</button>
    <Modal ref="modal" :user="user" @createCardEdiitted='createCardEdiitted'  @addCard="addCard"/>
    <User :user='user' ref="user"/>
      <div class="container" >
                 
        <div  class="card" v-for="card of cards" :card="card" :key="card.id">
            <div class="title">
                <span>{{card.title}}</span>
            </div>
            <div class="image">                
                <img :src="(card && card.image ? card.image :'/pictures/' + img)" alt="">
            </div>
            <div class="content">
                 <p>{{card.content}}</p>
            </div>
            <div class="footerButton">
                <div class="footerButtonChild">
                    <button @click="edit(card)" class="edit">Edit</button>
                    <button @click="deleteCard(card)" class="delete">Delete</button>
                </div>
            </div>
        </div>

      </div>
 </div>
</template>
<script>
// import Cardbutton from './cardButton'

import Modal from './Modal'
import Swal from 'sweetalert2'
import User from './User'
export default {
    name:'card',
    components:{
        // Cardbutton,
        // AddCard,
        Modal,
        User
    },
    data(){
        return{
            cards: [], 
            isUserLoggedIn:undefined,
            user:undefined,
            img: "1.jpg"
        }
    },
    mounted(){
        
        this.isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
        this.user = JSON.parse(localStorage.getItem('user'));        
        if((this.isUserLoggedIn&&this.user)){
            this.createCardsFromLS();
        }
        else{
            this.$router.push({ path:'/'});
        }
        
    },
    
    methods:{
        openModal (item){   
            this.$refs['modal'].open(item);
        },
       
        createCardEdiitted(){
              this.createCardsFromLS();
        },

        logout(){            
            this.$router.push({ path:'/'});
            localStorage.removeItem('isUserLoggedIn');
            localStorage.removeItem('user')
        },
        addCard(cardInfo){

            let allCards = this.getCardsFromLS();
            
            if(cardInfo.image == ''){
                cardInfo.image = '/pictures/1.jpg';
            }

            this.cards.push(cardInfo);

            allCards.push(cardInfo);
           
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: cardInfo.title +' has been saved',
                showConfirmButton: false,
                timer: 1000
            });

            this.localStorageSetItem('cards', allCards);
        },

        getCardsFromLS(){
            let cards = JSON.parse(localStorage.getItem('cards')) || [];
            return cards;
        },

        createCardsFromLS(){
            const allCards = this.getCardsFromLS();
            
            const authorCards = allCards.filter(item =>{
                return item.authorId == this.user.id;
            })
            
            this.cards = authorCards;            
        },

        deleteCard(card){
            let allCards = this.getCardsFromLS();
           
            let deleteSure = confirm("Are You Sure You Want To Remove "+card.title+" !");
            if(deleteSure){
                allCards = allCards.filter(function(item){
                    return item.id !== card.id
                })    

                this.localStorageSetItem('cards', allCards);

                this.createCardsFromLS();
            }                                          
        },

        localStorageSetItem(key,item){
            localStorage.setItem(key,JSON.stringify(item));
        },

        edit(card){   
                
            let cards = this.getCardsFromLS();
                        
            const foundCard = cards.find(item => {
                return item.id == card.id;
            });
            
            this.openModal(foundCard);
        }
    }
}
</script>
<style >
    .container{
        display: flex;
        flex-wrap:wrap;
    }
   .card{
    width: 400px;
    transition: .3s;
    -webkit-box-shadow: 0px 0px 7px 1px rgba(172,174,196,1);
    -moz-box-shadow: 0px 0px 7px 1px rgba(172,174,196,1);
    box-shadow: 0px 0px 7px 1px rgba(172,174,196,1);
    border-radius: 5px;
    margin:  20px;
    position: relative;
    cursor:pointer;
    text-align: start;
    position: relative;
    }
    .image{
        overflow: hidden;
    }
    .card .title{
    padding: 18px;
    font-size: 24px;
    color:grey;
    height: 50px;
    line-height: 1.3;

}
.image img{
    width: 100%;
    height: 300px;
    overflow: hidden;
    transition: .8s;
    /* background-attachment: fixed; */
}
.image img:hover{
    transform: scale(1.3);
   /* overflow: hidden; */
}
.content{
    padding: 10px;
    min-height: 70px;
}
.content p{
    font-size: 13px;
    line-height: 1.5;
    color:grey;
    padding-bottom: 40px;
}
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
.open-button {
    background-color: #555;
    color: white;
    padding: 16px 20px;
    margin: 10px;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    position: absolute;
    left: 15px;
    top: 50px;
    width: 150px;
   
}
.logout{
    background-color: #555;
    color: white;
    padding: 8px 10px;
    margin: 10px;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    width: 80px;
    position: absolute;
    left: 15px;
    top: 10px;
}
</style>