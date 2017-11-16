(function (){
   window.ApiUrl = "http://localhost:3000/";

    $('#selectOff').on('click', function() {
        $('#select-comp').addClass('hidden');
        $('#select-off').removeClass('hidden');
    });


   $('#selectDate').on('click', function() {  
       $('#select-off').hide();
       $('#details-cont').show();
   });

})();