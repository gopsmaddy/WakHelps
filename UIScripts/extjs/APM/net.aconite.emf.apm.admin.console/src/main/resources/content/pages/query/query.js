 $(function() {
		$( "#datepicker" ).datepicker({
			showOn: "button",
			buttonImage: "img/calendar.png",
			buttonImageOnly: true
		});
	});
$(function() {
		$( "#datepicker2" ).datepicker({
			showOn: "button",
			buttonImage: "img/calendar.png",
			buttonImageOnly: true
		});
	});
	
	
	
 $(document).ready(function() {
    

				
	$("#grid-example").hide();
	populateInstitutions();
    
	var startDateVal = localStorage.getItem("startdate");
    $("#datepicker").val(startDateVal);
	
	$("select#tokenProduct").change(function(){
		var options = '<option value="1">Transaction Type 1</option><option value="2">Transaction Type 2</option><option value="3">Transaction Type 3</option><option value="4">Transaction Type 4</option>';																																
		var options2 = '<option value="1">TT 1</option><option value="2">TT2</option><option value="3">TT3</option><option value="4">TT4</option>';	
		var options3 = '<option value="1">Transaction Type 1</option><option value="2">TT2</option><option value="3">Transaction Type 3</option><option value="4">TT4</option>';	
		var options4 = '<option value="1">TT 1</option><option value="2">Transaction Type 2</option><option value="3">TT3</option><option value="4">Transaction Type 4</option>';																																																																	
		
		var chosenVal = $("select#tokenProduct").val();
		switch(chosenVal){
		  case 'tt2':
			options = options2
			$("select#transactionTypes").html(options2);
			break;
		  case 'tt3':
			$("select#transactionTypes").html(options3);
			break;
		  case 'tt4':
			$("select#transactionTypes").html(options4);
			break;
		default:
			$("select#transactionTypes").html(options);			
	   }

		
  })
  
  
  //populate the institions
  
  
	jQuery.validator.messages.required = "";
  	//attaching the validate method onto the form
	$("#searchform").validate({
		invalidHandler: function(e, validator) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				var message = errors == 1
					? 'You missed 1 field. It has been highlighted below'
					: 'You missed ' + errors + ' fields.  They have been highlighted below';
				$("div.errorBox span").html(message);
				$("div.errorBox").show();
			} else {
				$("div.errorBox").hide();
			}
		},
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass).removeClass(validClass);
			},
		submitHandler: function() { 
		
			$("div.errorBox").hide();
			 $("#grid-example").show();
		}
		});
  
  });

  
  function submitTheForm(){
	  //Setting the local storage of date fields
	  //localStorage.setItem("startdate", $("#datepicker").val()) 
	 
  }
  
  function populateInstitutions(){
  
  $.ajax({
  url: 'http://localhost:8080/testgui/scheduler.json',
  dataType:'json',
  type:'POST',
  data: name,
  success: function(mydata){
    alert("Success");
  // $('#target_element').html(mydata);
  },
  error: function(){
    alert("Error");
  }
});
  
  
  
  }


  