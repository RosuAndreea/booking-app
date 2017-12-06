(function(){
    var ApiUrl = window.ApiUrl;

    $('#data-table').DataTable({
        "processing": true,
        "ajax" : ApiUrl,
        "columns": [
            { data: "booking.officeName" },
            { data: "booking.data" },
            { data: "booking.data" },
            { data: "booking.data" },
            { data: "booking.data" }
        ]
    }); 
})();