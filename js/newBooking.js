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

    function takeCustomerInfo (info) {
        $('#confirmationSection').on('click',function(){
            var customerInfo = {
               customerFname: $customerFname.val(),
               customerLname: $customerLname.val(),
               customerEmail: $customerEmail.val(),
               customerPhone: $customerPhone.val()
            };
            console.log(info);
        });
    };

    $('#confirm').on('click',function(){
        var booking = {
            data: takeData(),
            customerInfo: takeCustomerInfo()
        };
        
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