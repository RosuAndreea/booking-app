(function (){
    window.ApiUrl = "http://localhost:3000/";

    $('#select-comp').delegate('#selectOff','click', function() {
        $('#select-comp').addClass('hidden');
        $('#select-off').removeClass('hidden');
    });


    $('#select-off').delegate('#selectServ','click', function() {  
        $('#select-off').hide();
        $('#select-serv').removeClass('hidden');
    });

    $('#select-off').delegate('#selectCompany','click', function() {  
        $('#select-off').hide();
        $('#select-comp').removeClass('hidden');
    });

    $('#select-serv').delegate('#backSelectOff','click', function() {
        $('#select-serv').hide();
        $('#select-off').show();
    });

    $('#select-serv').delegate('.selectDate','click', function() {
        $('#select-serv').addClass('hidden');
        $('#select-date').removeClass('hidden');
    });
})();