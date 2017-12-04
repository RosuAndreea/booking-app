(function(){
    var ApiUrl = window.ApiUrl;
    var $data = $('#data-pick');
    var $bookingCalendar = $('.booking-calendar');

    $('input[name="daterange"]').daterangepicker();

    $('#registerForm').on('click',function(){
        window.myStore.data = $('#data-pick').val();
    });

    $('#select-serv').delegate('.selectDate','click', function() {
        $bookingCalendar.append(
            '<div class = company-side>'
            +'<span class = "comp-left-side">Company name: </span>'
            +'<span class = "comp-right-side">'+ myStore.companyName + "</span>"
            +'<span class = "comp-left-side">Email: </span>'
            +'<span class = "comp-right-side">' + myStore.officeEmail + "</span>"
            +'<span class = "comp-left-side">Address: </span>'
            +'<span class = "comp-right-side">' + myStore.officeAddress + '</span>'
            +'<span class = "comp-left-side">Phone: </span>'
            +'<span class = "comp-right-side">' + myStore.officePhone + '</span>'
            +'</div>'
            +'<div class="service-side">'
            +'<span class = "serv-left-side">Service name: </span>'
            +'<span class = "serv-right-side">' + myStore.serviceName + '</span>'
            +'<span class = "serv-left-side">Service Price: </span>'
            +'<span class = "serv-right-side">' + myStore.servicePrice + '</span>'
            +'<span class = "serv-left-side">Service time: </span>'
            +'<span class = "serv-right-side">' + myStore.serviceTime + '</span>' 
            +'</div>'
        );
    });

})();
    
