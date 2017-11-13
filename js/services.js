(function (){
   var $serviceData = $('tbody');
   var $services = $('.services-data');
   var $servName = $('#add-serv-name');
   var $servPrice = $('#add-serv-price');
   var $servTime = $('#add-serv-time');
   var ApiUrl = window.ApiUrl;


   function addService (service) {
    $services.append('<td><span>' + service.id + '</span><td>' 
                        +'<td><span class="noedit serv-name"' + service.serviceName + '</span><input class="edit-input serv-name"/></td>' 
                        +'<td><span class="noedit price"' + service.servicePrice + '</span><input class="edit-input price"/></td>'
                        +'<td><span class="noedit time"' + service.serviceTime + '</span><input class="edit-input time"/></td>'
                        +'<td><i class="fa fa-pencil edit noedit edit-serv" aria-hiddesn="true"></i>'
                        +'<i class="fa fa-trash edit remove-serv" aria-hidden="true" data-id="{{id}}"></i>'
                        +'<i class="fa fa-floppy-o edit-input edit save-serv" aria-hidden="true"></i>'
                        +'<i class="fa fa-times edit-input edit remove-edit" aria-hidden="true"></i>'
        );
   }

// take the data from db/services
    $.ajax({
        type: "GET",
        url: ApiUrl + 'services',
        // headers: {
        //     "Access-Control-Allow-Origin": "*"
        // },
        success: function (services){
            console.log('services ', services)
            $.each(services, function (i, service){
                addService(service);
            });
        },
        error: function (err){
            console.log('Err ', err);
            //alert('Error loading services');
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
            url: ApiUrl + 'services',
            data: services,
            success: function (newService) {
                addService(newService);
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
            url: ApiUrl + 'services' + $(this).attr('data-id'),
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
     
    // remove edit
    $services.delegate('.remove-edit','click', function(){
        $(this).closest('.services-data').removeClass('edit-input');
    });  

    // save edit
    $services.delegate('.save-serv', 'click', function () {
        var $td = $(this).closest('.services-data');
        var services = {
            serviceName: $td.find('input.serv-name').val(),
            servicePrice: $td.find('input.price').val(),
            serviceTime: $td.find('input.time').val()
        };
        $.ajax({
            type: "PUT",
            url: ApiUrl + 'services' + $td.attr('data-id'),
            data: services,
            success: function (newService) {
                $td.find('span.serv-name').html(service.serviceName);
                $td.find('span.price').html(service.servicePrice);
                $td.find('span.time').html(service.serviceTime);
                $td.removeClass('edit-input');
                alert('You create a new service with success!');
            },
            error: function () {
                alert('Error updating service');
            }
        });
    });
})();