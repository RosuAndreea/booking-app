(function(){
    var $name = $('#signup-name');
    var $email = $('#signup-email');
    var $password = $('#signup-psw');
    var $pwsRepeat = $('#psw-repeat');
    var $description = $('#signup-description');

    // Validation
    $("#name_error_message").hide();
    $("#email_error_message").hide();
    $("#password_error_message").hide();
    $("#confirmPsw_error_message").hide();
    $("#description_error_message").hide();

    var error_name = false;
    var error_email = false;
    var error_password = false;
    var error_confirmPsw = false;
    var error_description = false;

    $('#signup-name').focusout(function(){
        check_name();
    });
    $('#signup-email').focusout(function(){
        check_email();
    });
    $('#signup-psw').focusout(function(){
        check_psw();
    });
    $('#psw-repeat').focusout(function(){
        check_repeat();
    });
    $('#signup-description').focusout(function(){
        check_description();
    });

    function check_name() {
        var name_length = $('#signup-name').val().length;
        if(name_length < 5) {
            $('#name_error_message').html('Too short');
            $('#name_error_message').show();
            error_name = true;
        }else{
            $('#name_error_message').hide();
        }
    }

    function check_psw() {
        var psw_length = $('#signup-psw').val().length;
        if(psw_length < 5) {
            $('#password_error_message').html('Too short');
            $('#password_error_message').show();
            error_password = true;
        }else{
            $('#password_error_message').hide();
        }
    }

    function check_repeat() {
        var password = $('#signup-psw').val();
        var confirmPsw = $('#psw-repeat').val();
        if(password != confirmPsw) {
            $('#confirmPsw_error_message').html("Doesn't match!");
            $('#confirmPsw_error_message').show();
            error_confirmPsw = true;
        }else{
            $('#confirmPsw_error_message').hide();
        }
    }

    function check_description() {
        var description_length = $('#signup-description').val().length;
        if(description_length < 20) {
            $('#description_error_message').html('Too short');
            $('#description_error_message').show();
            error_description = true;
        }else{
            $('#description_error_message').hide();
        }
    }

    function check_email() {
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

        if(pattern.test($('#signup-email').val())) {
            $('#email_error_message').hide();
        } else {
            $('#email_error_message').html('Invalid email address');
            $('#email_error_message').show();
            error_email = true;
        }
    }

    $('#signup-modal').submit(function(){
        console.log('nu');
        error_name = false;
        error_email = false;
        error_password = false;
        error_confirmPsw = false;
        error_description = false;

        check_name();
        check_email();
        check_psw();
        check_repeat();
        check_description();

        if(error_name == false && error_email == false && error_confirmPsw == false && error_description == false && error_password == false) {
            return true;
        } else {
            return false;
        }
    });
    
    // Sign Up

    $('.signupbtn').on('click', function (){
        var companies = {
            name: $name.val(),
            email: $email.val(),
            password: $password.val(),
            details: $description.val(),
            address:"",
            phone:'',
            logo:''
        };

        $.ajax({
            type: "POST",
            url: ApiUrl + 'companies',
            data: companies,
            success: function (){
                alert('V-ati inregistrat cu succes!');
                alert('Va rugam sa va logati!');
                window.location = 'file:///home/assist/workspace/booking-app/pages/index.html';
            },
            error: function (){
               alert('Eroare'); 
            }
        });
    });

    // SignIn
    $('.login').on('click', function(id){
        var $email = $('#login-uname').val();
        var $password = $('#login-psw').val();
        var error = true;

        $.ajax({
            type: "GET",
            url: ApiUrl +'companies?id=' + id,
            dataType: "json",
            success: function(data){
                
                $.each(data, function(key, value){
                    
                    if($email == value.email && $password == value.password){
                        error = false;
                    }
                });
                if(error == false){
                    document.location = 'profile.html'
                } else {
                    $('.uname').val('');
                    $('.psw').val("");
                    alert('Error');
                }
            }
        });
        return false;
    });
})();