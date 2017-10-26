$('.calendar').datepicker({
   onSelect: function(dateText, inst) { 
      var date = dateText; // the selected date from calendar
      window.mySelection.selected_date = date;
      window.renderSelectedDate();
   }});