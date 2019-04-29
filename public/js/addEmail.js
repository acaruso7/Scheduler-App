(function($){
    $(document).ready(function() {
        var max_fields      = 10; 
        var wrapper   		= $(".input_email_fields_wrap"); 
        var add_button      = $(".add_email_field_button"); 

        var x = 1; 
        $(add_button).click(function(e){ 
            e.preventDefault();
            if(x < max_fields){ 
                x++;
                $(wrapper).append('<div><input type="email" name="emails"/><a href="#" class="remove_field">Remove</a></div>');
            }
        });

        $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
            e.preventDefault(); $(this).parent('div').remove(); x--;
        })
    })
}(jQuery));