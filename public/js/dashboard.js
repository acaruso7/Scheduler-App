$(function () {  
    $('.createdSchedule').addClass("hidden");
    $('#scheduleCreate').on('click',function(event){
      event.preventDefault();
      $('.invitedSchedule').addClass("hidden");
      $('.createdSchedule').removeClass("hidden");
    })
    $('#scheduleInvited').on('click',function(event){
      event.preventDefault();
      $('.createdSchedule').addClass("hidden");
      $('.invitedSchedule').removeClass("hidden");
    })
    $('.navbar-toggler').on('click', function(event) {
		event.preventDefault();
		$(this).closest('.navbar-minimal').toggleClass('open');
	})
  $('.hoverable-css').on('click', function(e) {
		e.preventDefault();
		console.log($(this)[0].value);
        let a = document.getElementById($(this)[0].value);
        a.submit();
        console.log(a);
	})
});