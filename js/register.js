(function(){
    var $name = $('#signup-name');
    var $email = $('#signup-email');
    var $password = $('#signup-psw');
    var $pwsRepeat = $('#psw-repeat');
    var $description = $('#signup-description');

    
    // Sign Up

    $('.signupbtn').on('click', function (){
        var companies = {
            name: $name.val(),
            email: $email.val(),
            password: $password.val(),
            details: $description.val()
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
    $('.login').on('click', function(){
        var $email = $('.uname').val();
        var $password = $('.psw').val();
        var error = true;

        $.ajax({
            type: "GET",
            url: ApiUrl +'companies',
            dataType: "json",
            success: function(data){
                
                $.each(data, function(key, value){
                    
                    if($email == value.email && $password == value.password){
                        console.log('dfs');
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