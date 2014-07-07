
// password restrictions
jQuery.validator.addMethod("password", function(value,element) 
{
	return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/i.test(value);
}, "Password must contain 7-20 characters with uppercase letters, lowercase letters and at least one number.");

/*
jQuery.validator.addMethod("password", function(value,element) 
{
	return this.optional(element) || /^\w*(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w{7,10}\w*$/i.test(value);
}, "Password must contain at least 1 number, at least 1 lower case letter, and at least 1 upper case letter and minimum of 7 characters.");
*/
jQuery.validator.addMethod("passwordmatch", function(value,element) 
{
	return this.optional(element) || value == $('#newpassword').val();
}, "Passwords must match.");

$(function() 
{
	// form validation
	$('#reset_password, #Enrolment').validate();
});