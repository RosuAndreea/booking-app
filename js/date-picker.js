(function(){
    var ApiUrl = window.ApiUrl;
    var $data = $('#data-pick');

    $('input[name="daterange"]').daterangepicker();

    $('#registerForm').on('click',function(){
        window.myStore.data = $('#data-pick').val();
    });

})();
    
