/*
Login Page javascript file to contain all the javascript functions that are written
for this page
*/






$(document).ready(function(){			
	//works IE/SAFARI/CHROME/FF
	//method to set the value of the labels on the page
	//so that internationalisation will work
	/*var language = window.navigator.userLanguage || window.navigator.language;
	jQuery.i18n.properties({
	  name: 'message', 
	  path:'resource/', 
	  language:language,
	  callback: function(){ 
		$('#username').text(username);
		$('#password').text(password);
		$('#btnSubmit').text(submit);					
					
		}
	});
       */
// ***this goes on the global scope
// get querystring as an array split on "&"
var querystring = location.search.replace( '?', '' ).split( '&' );
// declare object
var queryObj = {};
// loop through each name-value pair and populate object
for ( var i=0; i<querystring.length; i++ ) {
      // get name and value
      var name = querystring[i].split('=')[0];
      var value = querystring[i].split('=')[1];
      // populate object
      queryObj[name] = value;
}

// ***now you can use queryObj["<name>"] to get the value of a url
// ***variable
    if ( queryObj[ "login_error" ] === "t" ) {
         $("#errorMessage").text("Please check that your username/password are correct");
         $("#errorMessage").css('color', 'red');
    } else{
            $("#errorMessage").text("");
             $("#errorMessage").css('color', 'white');
    }
	//attaching the validate method onto the login form
	$("#loginform").validate({
		//submitHandler: function() { $("#loginform").submit();},
		highlight: function(element, errorClass, validClass) {
		//	$(element).addClass(errorClass).removeClass(validClass);
			},
		});

	jQuery.validator.addMethod("password", function(value,element) 
											{
											return this.optional(element) || /^(?=.*[a-z]).{7,20}$/i.test(value);
											}, 
		"Password must contain 7-20 characters.");
});			