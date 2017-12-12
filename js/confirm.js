(function(){
    var ApiUrl = window.ApiUrl;
    var $bookingConfirm = $('.booking-summary');
    var $customerConfirm = $('.customer-details');

    $('#confirmationSection').on('click', function(){
        $bookingConfirm.append(
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
            +'<span class = "serv-left-side">Data: </span>'
            +'<span class = "serv-right-side">' + myStore.data + '</span>'
            +'</div>'
        );
        $customerConfirm.append(
            '<span class = "serv-book-left">Name: </span>'
            +'<span class = "serv-book-right">'+ myStore.customerFname + " " + myStore.customerLname + "</span>"
            +'<span class = "serv-book-left">Email: </span>'
            +'<span class = "serv-book-right">' + myStore.customerEmail + "</span>"
            +'<span class = "serv-book-left">Phone: </span>'
            +'<span class = "serv-book-right">' + myStore.customerPhone + "</span>" 
        );
    });;
})();