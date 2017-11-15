(function(){
    var $name = $('#signup-name');
    var $email = $('#signup-email');
    var $password = $('#signup-psw');
    var $pwsRepeat = $('#psw-repeat');
    var $description = $('#signup-description');

    $('.signupbtn').on('click', function (){
        var companies = {
            name: $name.val(),
            email: $email.val(),
            password: $password.val(),
            description: $description.val()
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

})();