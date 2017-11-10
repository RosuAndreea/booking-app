$(function (){
   var $serviceData = $('tbody');
   console.log('hi');

//    delete services
    $serviceData.delegate('.remove-serv','click', function(){
        var $tr = $(this).closest('.service-data');
        var self = this;
        console.log('fer');

        $.ajax({
            type: 'DELETE',
            url: '/db/services/' + $(this).attr('data-id'),
            success: function (){
                $tr.fadeOut(300, function(){
                    $(this).remove();
                });
            }
        });

    });   
    
    // edit services
    $serviceData.delegate('.edit-serv','click', function(){
        var $tr = $(this).closest('.services-data');
        $tr.find('input.serv-name').val( $tr.find('span.serv-name').html() );
        $tr.find('input.price').val( $tr.find('span.price').html() );
        $tr.find('input.time').val( $tr.find('span.time').html() );
        $tr.addClass('edit-input');
        console.log('hi');
        
    });   
    

});