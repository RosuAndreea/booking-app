(function (){
    window.ApiUrl = "http://localhost:3000/";

    $('#selectOff').on('click', function() {
        $('#select-comp').addClass('hidden');
        $('#select-off').removeClass('hidden');
    });


    $('#selectServ').on('click', function() {  
        $('#select-off').hide();
        $('#select-serv').removeClass('hidden');
    });

    $('#selectCompany').on('click', function() {  
        $('#select-off').hide();
        $('#select-comp').removeClass('hidden');
    });
})();