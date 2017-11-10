$(function (){
    $.ajax({
        type:'GET',
        url: 'db',
        success: function(data){
            console.log("main.js file", data);
        }
    });

});