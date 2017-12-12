(function () {
    var ApiUrl = window.ApiUrl;
    $dataPick = $('#data-pick');
    $customerFname = $('#customer-fName');
    $customerLname = $('#customer-lName');
    $customerEmail = $('#customer-email');
    $customerPhone = $('#customer-phone');
    $confirm = $('.booking-summary');
    $detailsSide = $('.details-list-form');


    function takeData (time) {
        $('#select-date').delegate('#registerForm','click',function(){
            return $dataPick.val();
        });
    };

    $('#registerForm').on('click',function(){
        $detailsSide.append(
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
    });

    function bookingInfo(booking){
        $('#confirmationSection').on('click',function(){
            window.myStore.customerFname = $customerFname.val();
            window.myStore.customerLname = $customerLname.val();
            window.myStore.customerEmail = $customerEmail.val();
            window.myStore.customerPhone = $customerPhone.val();
        });
    };
    bookingInfo();

    $('#confirm').on('click',function(){    
        $.ajax({
            type: 'POST',
            url: ApiUrl + 'booking',
            data: window.myStore,
            success: function() {
                alert('You create a new booking with success');
                window.location ="../pages/index.html"
            },
            error: function(){
                alert('Error saving the booking');
            }
        });
    });
})();