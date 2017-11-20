(function (){
    window.ApiUrl = "http://localhost:3000/";
    
    // Back to companies list
    $('#select-off').delegate('#selectCompany','click', function() {  
        $('#select-off').hide();
        $('#select-comp').removeClass('hidden');
    });

    // Select an office
    $('#select-comp').delegate('#selectOff','click', function() {
        $('#select-comp').addClass('hidden');
        $('#select-off').removeClass('hidden');
    });

    $('#select-serv').delegate('#backSelectOff','click', function() {
        $('#select-serv').hide();
        $('#select-off').show();
    });

    // Select services
    $('#select-off').delegate('#selectServ','click', function() {  
        $('#select-off').hide();
        $('#select-serv').removeClass('hidden');
    });

    $('#select-date').delegate('#backToService','click',function() {
        $('#select-date').addClass('hidden');
        $('#select-serv').removeClass('hidden');
    })

    // Select a date
    $('#select-serv').delegate('.selectDate','click', function() {
        $('#select-serv').addClass('hidden');
        $('#select-date').removeClass('hidden');
    });

    //Complete the register form
    $('#select-date').delegate('#registerForm','click',function() {
        $('#select-date').addClass('hidden');
        $('#register-form').removeClass('hidden');
    });
})();