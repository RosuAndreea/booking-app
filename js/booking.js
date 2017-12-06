(function(){
    var ApiUrl = window.ApiUrl;
    
    $('#data-table').DataTable({
        "processing": true,
        "ajax" : ApiUrl,
        "columns": [
            { "booking": "officeName" },
            { "booking": "data" },
            { "booking": "data" },
            { "booking": "data" },
            { "booking": "data" }
        ]
    }); 
})();