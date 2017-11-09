$(function (){

    $('.remove-serv').on('click', function(){

        $.ajax({
            type: 'DELETE',
            url: '/db/services/' + $(this).attr('data-id'),

        });

    });    

});