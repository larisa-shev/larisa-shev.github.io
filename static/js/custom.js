(function ($) {
  'use strict';

  $(document).ready(function () {

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