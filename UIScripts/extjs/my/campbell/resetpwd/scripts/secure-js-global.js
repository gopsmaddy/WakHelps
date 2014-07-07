$(function() {
	// show text size controls
	$('#text-size').show();
	// set default body class
	$('body').addClass('medium');
	// add/remove classes on body to adjust text size
	$('#text-small').click(function() {
		$('body').removeClass().addClass('small');
	});
	$('#text-medium').click(function() {
		$('body').removeClass().addClass('medium');
	});
	$('#text-large').click(function() {
		$('body').removeClass().addClass('large');
	});
	
	// uniform
	if ($.fn.uniform) {
		$("select, input, textarea, input:checkbox, input:radio, input:file").uniform();
	}
	
	// jquery ui tabs
	if ($.fn.tabs) {
		$('.tabs').tabs();
	}

	// Forgot Password Dialog
			
           $('#forgot-password-dialog').dialog({
               autoOpen: false,
               width: 470,
               buttons: {
                      //"Submit": function() {
                      // make this submit form
                      //$(this).trigger('submit') 
                      //},
                     "Close": function() { 
                     $(this).dialog("close"); 
                     }
                 }
           });

           // Forgot Password Link
               $('#forgot-password').click(function(){
               $('#forgot-password-dialog').dialog('open');
               return false;
               });


// jquery ui datepickers
	if ($.fn.datepicker) {
		$( ".datepicker" ).datepicker();
	}
	
	// open 'culture wheel' image in modal dialog
	if ($.fn.dialog) {
		var $cw = $('#culture-wheel');
		var $dialog = $('<div></div>')
			.dialog({
				autoOpen: false,
				title: $cw.attr('title'),
				modal: true,
				draggable: false,
				resizable: false,
				width: 524
		});
		$cw.click(function() {
			$dialog.dialog('open');
			return false;
		});
	}
});