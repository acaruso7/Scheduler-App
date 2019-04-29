// (function($){
//     $(document).ready(function() {
//         var max_fields      = 10; 
//         var wrapper   		= $(".input_time_fields_wrap"); 
//         var add_button      = $(".add_time_field_button"); 

//         var x = 1; 
//         $(add_button).click(function(e){ 
//             e.preventDefault();
//             if(x < max_fields){ 
//                 x++;
//                 $(wrapper).append('<div><fieldset><select name="times"><option value="1PM">1 PM<option/><option value="2PM">2 PM<option/> </select></fieldset><a href="#" class="remove_field">Remove</a></div>');
//             }
//         });

//         $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
//             e.preventDefault(); $(this).parent('div').remove(); x--;
//         })
//     })
// }(jQuery));