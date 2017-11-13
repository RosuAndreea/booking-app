(function(){

    var $email = $('#email');
    var $psw = $('#psw');
    var $pwsRepeat = $('#psw-repeat');

    $('.signupbtn').on('click', function (){
        if($psw.val() !== $pswRepeat.val()){
            alert("This two passwords doesn't match!");
        }
        var users = {
            email: $email.val(),
            psw: $psw.val()
        };

        $.ajax({
            type: "POST",
            url: '/db/users',
            data: users,
            success: function (){
                alert('V-ati inregistrat cu succes');
                window.location = 'http:\\www.google.com';
                // $(location).attr('href','http:\\www.google.com'); with jQuery
            },
            error: function (){
               alert('Eroare'); 
            }
        });
    });

})();