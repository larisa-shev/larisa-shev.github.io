(function ($) {
  'use strict';

  $(document).ready(function () {

  	$("#btn_exchange").hover(
		  function() {
			$("#btn_exchange_i").addClass("lnr-spin");
		  }, function() {
			$("#btn_exchange_i").removeClass("lnr-spin");
		  }
		);

  	$("#section_exchange_from").find('label').each(function(index){
  		$(this).on('click', function(){
	  		$("#section_exchange_to").show();
				$("#section_exchange_ammount").hide();
				$("#section_exchange_detals").hide();
				$("#section_exchange_info").hide();
				$('html, body').animate({
	        scrollTop: $("#section_exchange_to").offset().top-100
	      }, 1000);
  		});
  	});

  	$("#section_exchange_to").find('label').each(function(index){
  		$(this).on('click', function(){
				$("#section_exchange_ammount").show();
				$("#section_exchange_detals").show();
				$("#section_exchange_info").show();
				$('html, body').animate({
	        scrollTop: $("#section_exchange_ammount").offset().top-100
	      }, 1000);
  		});
  	});

  }); //end ready

}(jQuery));

function goto_exchange(){
	$('#start_wrapper').animate({
		height: '0',
    opacity: '0.7'
	}, 2000).hide(3500);
	$('#obmen_wrapper').animate({
		top: '0',
		height: 'show',
		opacity: '1'
	}, 2000).show(2500);
	$('#exc_title').animate({
		width: '100%',
		opacity: '1'
	}, 2000).show(2000);
	$('#section_exchange_from').animate({
		top: '0',
		height: 'show',
		opacity: '1'
	}, 3000).show(3500);
	$('html, body').animate({
    scrollTop: $("#page_wrapper").offset().top-100
  }, 1500);
}