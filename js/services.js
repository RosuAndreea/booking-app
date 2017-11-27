(function (){
   var $serviceData = $('tbody');
   var $services = $('.services-data');
   var $servName = $('#add-serv-name');
   var $servPrice = $('#add-serv-price');
   var $servTime = $('#add-serv-time');
   var $servDescription = $('#add-serv-description');
   var $servWrapper = $('#service-panel');
   var ApiUrl = window.ApiUrl;

   //Admin- services
   function addService (service) {
        $serviceData.append('<tr class="services-data" data-id="{{id}}">'
                        +'<td class = "count"></td>'  
                        +'<td><span class="noedit serv-name">' + service.serviceName + '</span><input class="edit-input serv-name"/></td>' 
                        +'<td><span class="noedit price">' + service.servicePrice + '</span><input class="edit-input price"/></td>'
                        +'<td><span class="noedit time">' + service.serviceTime + '</span><input class="edit-input time"/></td>'
                        +'<td><span class="noedit description">' + service.serviceDescription + '</span><input class="edit-input description"/></td>'
                        +'<td><i class="fa fa-pencil edit noedit edit-serv" aria-hiddesn="true"></i>'
                        +'<i class="fa fa-trash edit remove-serv" aria-hidden="true" data-id="{{id}}"></i>'
                        +'<i class="fa fa-floppy-o edit-input edit save-serv" aria-hidden="true"></i>'
                        +'<i class="fa fa-times edit-input edit remove-edit" data-id="{{id}}" aria-hidden="true"></i></td>'
                        +'</tr>'
        );
    };

    function bookingServices (service) {
        $('#selectServ').on('click', function (){
            $servWrapper.append('<div class="col-md-4">'
                                +'<div class="card">'
                                +'<div class="header-card">'
                                +'<h4 class="card-title">' + service.serviceName + '</h4>'
                                +'</div><div class="card-body"><span>'
                                +'<p id="booking-price">' + service.servicePrice + '</p></span>'
                                +'<div class="card-text">'
                                +'<p id="service-detail-text">' + service.serviceDescription + '</p>'
                                +'<button id="booking-time">' + service.serviceTime + '</button>'
                                +'<button class="selectDate">Select</button>'
                                +'</div></div></div></div>'
            );
        });
    };
        
    
// take the data from db/services
    $.ajax({
        type: "GET",
        url: ApiUrl + 'services',
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        success: function (services){
            console.log('services ', services)
            $.each(services, function (i, service){
                addService(service);
                bookingServices (service);
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
            serviceTime: $servTime.val(),
            serviceDescription: $servDescription.val()
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
   $serviceData.delegate('.remove-serv','click', function(){
        var $tr = $(this).closest('.service-data');
        var self = this;
        console.log('fer');

        $.ajax({
            url: ApiUrl + 'services' + $(this).attr('data-id'),
            type: "DELETE",
            contentType: "application/json",
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
        $tr.find('input.description').val( $tr.find('span.description').html() );
        $tr.addClass('edit-input');
        console.log('hi');
        
    });   
     
    // remove edit
    $serviceData.delegate('.remove-edit','click', function(){
        $(this).closest('.services-data').removeClass('edit-input');
    });  

    // save edit
    $serviceData.delegate('.save-serv', 'click', function () {
        var $tr = $(this).closest('.services-data');
        var services = {
            serviceName: $tr.find('input.serv-name').val(),
            servicePrice: $tr.find('input.price').val(),
            serviceTime: $tr.find('input.time').val(),
            serviceDescription: $tr.find('input.description').val()
        };
        $.ajax({
            url: ApiUrl + 'services' + $tr.attr('data-id'),
            type: 'PUT',
            contentType: "json",
            data: services,
            success: function () {
                $tr.find('span.serv-name').html(services.serviceName);
                $tr.find('span.price').html(services.servicePrice);
                $tr.find('span.time').html(services.serviceTime);
                $tr.find('span.description').html(services.serviceDescription);
                $tr.removeClass('edit-input');
                alert('You create a new service with success!');
            },
            error: function () {
                alert('Error updating service');
            }
        });
    });
})();