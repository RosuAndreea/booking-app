(function () {
    var ApiUrl = window.ApiUrl;
    $dataPick = $('#data-pick');
    $customerFname = $('#customer-fName');
    $customerLname = $('#customer-lName');
    $customerEmail = $('#customer-email');
    $customerPhone = $('#customer-phone');


    function takeData (time) {
        $('#select-date').delegate('#registerForm','click',function(){
            return $dataPick.val();
        });
    };

        $('#confirmationSection').on('click',function(){
               window.myStore.customerFname = $customerFname.val();
               window.myStore.customerLname = $customerLname.val();
               window.myStore.customerEmail = $customerEmail.val();
               window.myStore.customerPhone = $customerPhone.val();

        });

    $('#confirm').on('click',function(){
        
        $.ajax({
            type: 'POST',
            url: ApiUrl + 'booking',
            data: booking,
            success: function(newBooking) {
                alert('You create a new booking with success');
            },
            error: function(){
                alert('Error saving the booking');
            }
        });
    });
})();