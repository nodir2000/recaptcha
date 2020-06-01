function ecode(string){
    let resultInEcode = '';
    for (let index = 0; index < string.length; index++) {
        const element = string.charCodeAt(index) + 2 + ' ' ;
        resultInEcode += element ;
    }
    
    return resultInEcode;

}
 
function decode(ascii){
    let resultInDecode = '';
    let array = ascii.split(' ');

     array = array.filter(function(item){
           return item!=='';
        
    })
    console.log('array');
    for (let index = 0; index < array.length; index++) {
        const element = String.fromCharCode(array[index] - 2);
        resultInDecode += element; 
    }

    return resultInDecode;
} 

