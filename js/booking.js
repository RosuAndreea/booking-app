(function(){
    var ApiUrl = window.ApiUrl;
    var $bookingData = $('tbody');

    function renderBooking (item) {
        $bookingData.append(
            '<tr class="book-data">'
            +'<td class = "count"></td>' 
            +'<td><span class="book-office">' + item.officeName + '</span></td>' 
            +'<td><span class="book-service">' + item.serviceName + '</span></td>'
            +'<td><span class="book-date">' + item.data + '</span></td>'
            +'<td><span class="book-client">' + item.customerFname + "  " + item.customerLname + '</span></td>'
            +'<td><span class="book-customer-phone">' + item.customerPhone + '</span></td>'
            +'</tr>'
        );
    }
    $.ajax({
        type: "GET",
        url: ApiUrl + 'booking?companyId=' + localStorage.companyId,
        success: function (bookings){
            console.log('bookings ', bookings)
            $.each(bookings, function (i, item){
               renderBooking(item);
            });
            
        },
        error: function (err){
            console.log('Err ', err);
            //alert('Error loading services');
        }

    });
})();