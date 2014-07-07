$(function(){
					   
				//jump menu
			$('#menu').hide().find('li a').hover(
				function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				}
			).click(function(){$('a#trigger').trigger('click');  return false;});
			$('a#trigger').click(function(){$($(this).attr('href')).slideToggle(); $(this).toggleClass('ui-state-active'); return false;});
			$(document).click(function(){if($('#menu').is(':visible')) $('a#trigger').trigger('click');});

				// Accordion
				$("#accordion").accordion({ header: "h3" });
	
				// Tabs
				$('#tabs, #tabs-popup, #holdings-tabs, #transaction-tabs').tabs();
	

				// Dialog			
				$('#dialog').dialog({
					autoOpen: false,
					width: 600,
					buttons: {
						"Ok": function() { 
							$(this).dialog("close"); 
						}, 
						//"Cancel": function() { 
//						$(this).dialog("close"); 
//						} 
					}
				});
				
				//Holdings
				$('#holdings').dialog({
					autoOpen: false,
					width: 820,
					buttons: {
						"Ok": function() { 
							$(this).dialog("close"); 
						}, 
						//"Cancel": function() { 
//						$(this).dialog("close"); 
//						} 
					}
				});
				
				// Transaction			
				$('#transaction').dialog({
					autoOpen: false,
					width: 700,
					buttons: {
						"Ok": function() { 
							$(this).dialog("close"); 
						}, 
						//"Cancel": function() { 
//						$(this).dialog("close"); 
//						} 
					}
				});
				
				 // Transaction Dialog			
				$('#transaction-details').dialog({
					autoOpen: false,
					width: 600,
					buttons: {
						"Back": function() { 
							$(this).dialog("close"); 
						} 
					}
				});

                               // Distribution Dialog			
				$('#distribution-details').dialog({
					autoOpen: false,
					width: 900,
					buttons: {
						"Back": function() { 
							$(this).dialog("close"); 
						} 
					}
				});

                                // Forgot Password Dialog			
				$('#forgot-password-dialog').dialog({
					autoOpen: false,
					width: 600,
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

                                // Dialog Link
				$('#dialog_link').click(function(){
					$('#dialog').dialog('open');
					return false;
				});

                                // Forgot Password Link
				$('#forgot-password').click(function(){
					$('#forgot-password-dialog').dialog('open');
					return false;
				});
				
				// Holdings dialog link
				$('tr.holdings').click(function(){
					$('#holdings').dialog('open');
					return false;
				});

                                // Transaction Link
				$('tr.transaction').click(function(){
					$('#transaction').dialog('open');
					return false;
				});

				// Transaction Details dialog link
				// live() handler needed as table data added to DOM from XML source by flexigrid
				$('#flex1 tr').live('click', function() {
					$('#transaction-details').dialog('open');
					return false;
				});

                                // Distribution Details dialog link
				// live() handler needed as table data added to DOM from XML source by flexigrid
				$('#flex1 tr').live('click', function() {
					$('#distribution-details').dialog('open');
					return false;
				});

                                // My Account			
				$('#Account').dialog({
					autoOpen: false,
					width: 600,
					buttons: {
						"Close": function() { 
							$(this).dialog("close"); 
						}, 
						//"Cancel": function() { 
//							$(this).dialog("close"); 
//						} 
					}
				});
				
				// Account Link
				$('#account_link').click(function(){
					$('#Account').dialog('open');
					return false;
				});

                                // Datepicker
				$('#datepicker').datepicker({
					inline: true
				});
				
				// Slider
				$('#slider').slider({
					range: true,
					values: [17, 67]
				});
				
				// Progressbar
				$("#progressbar").progressbar({
					value: 20 
				});
				
				//hover states on the static widgets
				$('#dialog_link, ul#icons li').hover(
					function() { $(this).addClass('ui-state-hover'); }, 
					function() { $(this).removeClass('ui-state-hover'); }
				);
				
			});
	
		$(function(){
			//ui states
			$('.ui-state-default').hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				}
			);
		});

		$(function(){
			$("input, textarea, select, button").uniform();
		});
		
		$(function() {
			$( "#datepicker1,#datepicker2,#datepicker3,#datepicker4" ).datepicker();
		});