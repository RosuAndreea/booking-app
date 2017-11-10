$(function (){
   var $serviceData = $('tbody');
   var $servName = $('#add-serv-name');
   var $servPrice = $('#add-serv-price');
   var $servTime = $('#add-serv-time');

   console.log('hi');
   
// add service
    $('.add-btn').on('click',function (){
        var services = {
            serviceName: $servName.val(),
            servicePrice: $servPrice.val(),
            serviceTime: $servTime.val()
        };

        $.ajax({
            type: "POST",
            url: '/db/services',
            success: function () {
                alert('You create a new service with success!');
            },
            error: function () {
                alert('Error');
            }
        });
    });


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