(function () {
    var ApiUrl = window.ApiUrl;
    $dataPick = $('#data-pick');
    $customerFname = $('#customer-fName');
    $customerLname = $('#customer-lName');
    $customerEmail = $('#customer-email');
    $customerPhone = $('#customer-phone');
    $confirm = $('.booking-summary');


    function takeData (time) {
        $('#select-date').delegate('#registerForm','click',function(){
            return $dataPick.val();
        });
    };

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
            },
            error: function(){
                alert('Error saving the booking');
            }
        });
    });
})();