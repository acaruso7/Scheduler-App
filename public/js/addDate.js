(function($){
    $(document).ready(function() {
        var max_fields      = 10; 
        var wrapper   		= $(".input_date_fields_wrap"); 
        var add_button      = $(".add_date_field_button"); 

        var x = 1; 
        $(add_button).click(function(e){ 
            e.preventDefault();
            if(x < max_fields){ 
                x++;
                $(wrapper).append('<div><input id="datefield" type="date" name="dates" min="1899-01-01" required/><a href="#" class="remove_field">Remove</a></div>');
               
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1;
                var yyyy = today.getFullYear();
                if(dd<10) {
                    dd='0'+dd
                } 
                if(mm<10) {
                    mm='0'+mm
                } 
                today = yyyy+'-'+mm+'-'+dd;

                //prevent newly appended date selectors to have dates prior to today
                var datefields = document.querySelectorAll("#datefield");
                for (i=0; i<datefields.length; i++) {
                    datefields[i].setAttribute("min", today)
                }
            }
        });

        $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
            e.preventDefault(); $(this).parent('div').remove(); x--;
        })
    })
}(jQuery));