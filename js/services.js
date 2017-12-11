(function (){
   var $serviceData = $('tbody');
   var $services = $('.services-data');
   var $servName = $('#add-serv-name');
   var $servPrice = $('#add-serv-price');
   var $servTime = $('#add-serv-time');
   var $servDescription = $('#add-serv-description');
   var $servWrapper = $('#service-panel');
   var $bookingData = $('.booking-service');
   var ApiUrl = window.ApiUrl;

// -----------------------Booking page -------------------------

    function bookingServices (service) {
        $servWrapper.append(
            '<div class="col-md-4">'
            +'<div class="card">'
            +'<div class="header-card">'
            +'<h4 class="card-title">' + service.serviceName + '</h4>'
            +'</div><div class="card-body"><span>'
            +'<p id="booking-price">' + service.servicePrice + '</p></span>'
            +'<div class="card-text">'
            +'<p id="service-detail-text">' + service.serviceDescription + '</p>'
            +'<button id="booking-time">' + service.serviceTime + '</button>'
            +'<button class="selectDate" onclick="selectService(\'' + service.id +'\',\'' + service.serviceName +'\',\'' + service.servicePrice + '\',\''+ service.serviceDescription  +'\',\'' + service.serviceTime + '\')">Select</button>'
            +'</div></div></div></div>'
        );
       
    };
    
    window.selectService = function(serviceId, serviceName, servicePrice, serviceDescription, serviceTime) {
        window.myStore.serviceId = serviceId;
        window.myStore.serviceName = serviceName; 
        window.myStore.servicePrice = servicePrice; 
        window.myStore.serviceDescription = serviceDescription; 
        window.myStore.serviceTime = serviceTime;
    };

    //Render booking details
    $('#select-off').delegate('#selectServ','click', function() {  

        $bookingData.append(
            '<div class = company-side>'
            +'<span class = "comp-left-side">Company name: </span>'
            +'<span class = "comp-right-side">'+ myStore.companyName + "</span>"
            +'<span class = "comp-left-side">Details: </span>'
            +'<span class = "comp-right-side">' + myStore.companyDetails + "</span>"
            +'</div>'
            +'<div class="service-side">'
            +'<span class = "serv-left-side">Email: </span>'
            +'<span class = "serv-right-side">' + myStore.officeEmail + "</span>"
            +'<span class = "serv-left-side">Address: </span>'
            +'<span class = "serv-right-side">' + myStore.officeAddress + '</span>'
            +'<span class = "serv-left-side">Phone: </span>'
            +'<span class = "serv-right-side">' + myStore.officePhone + '</span>'
            +'</div>'  
        );
    });
    
// take the data from db/services
    window.getServices = function(officeId){
        $.ajax({
            type: "GET",
            url: ApiUrl + 'services?officeId=' + officeId,
            success: function (services){
                console.log('services ', services)
                $.each(services, function (i, service){
                    bookingServices (service);
                });
            },
            error: function (err){
                console.log('Err ', err);
                //alert('Error loading services');
            }
        });
    }
   

    // ------------------Admin- services------------------

    function addService (service) {
        $serviceData.append(
            '<tr class="services-data">'
            +'<td class = "count"></td>'  
            +'<td><span class="noedit serv-name">' + service.serviceName + '</span><input class="edit-input serv-name"/></td>' 
            +'<td><span class="noedit price">' + service.servicePrice + '</span><input class="edit-input price"/></td>'
            +'<td><span class="noedit time">' + service.serviceTime + '</span><input class="edit-input time"/></td>'
            +'<td><span class="noedit description">' + service.serviceDescription + '</span><input class="edit-input description"/></td>'
            +'<td><i class="fa fa-pencil edit noedit edit-serv" aria-hiddesn="true"></i>'
            +'<i class="fa fa-trash edit remove-serv" aria-hidden="true" data-id="'+ service.id +'"></i>'
            +'<i class="fa fa-floppy-o edit-input edit save-serv" aria-hidden="true" data-id="'+ service.id +'"></i>'
            +'<i class="fa fa-times edit-input edit remove-edit" aria-hidden="true"></i></td>'
            +'</tr>'
        );
    };

    $.ajax({
        type: "GET",
        url: ApiUrl + 'services?officeId=' + localStorage.officeId,
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
            serviceTime: $servTime.val(),
            serviceDescription: $servDescription.val(),
            officeId: localStorage.officeId
        };

        $.ajax({
            type: "POST",
            url: ApiUrl + 'services?officeId=' + localStorage.officeId,
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
   $serviceData.delegate('.remove-serv','click', function(e){
        var $tr = $(this).closest('.service-data');
        var self = this;
        e.preventDefault();

        $.ajax({
            type: "DELETE",
            url: ApiUrl + 'services/' + $(this).attr('data-id'),
            success: function (){
                $(self);
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
            url: ApiUrl + 'services/' + $(this).attr('data-id'),
            type: 'PUT',
            contentType: "json",
            data: services,
            success: function () {
                $tr.find('span.serv-name').html(services.serviceName);
                $tr.find('span.price').html(services.servicePrice);
                $tr.find('span.time').html(services.serviceTime);
                $tr.find('span.description').html(services.serviceDescription);
                $tr.removeClass('edit-input');
            },
            error: function () {
                alert('Error updating service');
            }
        });
    });
})();