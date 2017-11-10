$(function (){
   var $serviceData = $('tbody');
   var $sevices = $('.services-data');
   var $servName = $('#add-serv-name');
   var $servPrice = $('#add-serv-price');
   var $servTime = $('#add-serv-time');

   function addService (service) {
        $services.append('<td><span>' + services.serviceName + '<span></td>'
                        +'<td>' + services.servicePrice + '</td>'
                        +'<td>' + services.serviceTime + '</td>'
        );
   }

// take the data from db/services
    $.ajax({
        type: "GET",
        url: 'db/services',
        success: function (services){
            $.each(services, function (i, service){
                addOrder(order);
            });
        },
        error: function (){
            alert('Error loading services');
        }

    });

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
            data: services,
            success: function (newService) {
                addOrder(newService);
                alert('You create a new service with success!');
            },
            error: function () {
                alert('Error saving the service');
            }
        });
    });


//    delete services
    $services.delegate('.remove-serv','click', function(){
        var $td = $(this).closest('.service-data');
        var self = this;
        console.log('fer');

        $.ajax({
            type: 'DELETE',
            url: '/db/services/' + $(this).attr('data-id'),
            success: function (){
                $(self);
                $td.fadeOut(300, function(){
                    $(this).remove();
                });
            }
        });

    });   
    
    // edit services
    $services.delegate('.edit-serv','click', function(){
        var $td = $(this).closest('.services-data');
        $td.find('input.serv-name').val( $td.find('span.serv-name').html() );
        $td.find('input.price').val( $td.find('span.price').html() );
        $td.find('input.time').val( $td.find('span.time').html() );
        $td.addClass('edit-input');
        console.log('hi');
        
    });   
    

});