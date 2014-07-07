Ext.QuickTips.init();

Ext.apply
(
	Ext.form.VTypes,
	{
	    daterange : function(val, field) 
	    {
	        var date = field.parseDate(val);
	
	        if(!date)
	        {
	            return false;
	        }
	        if (field.startDateField) 
	        {
	            var start = Ext.getCmp(field.startDateField);
	            if (!start.maxValue || (date.getTime() != start.maxValue.getTime())) 
	            {
	                start.setMaxValue(date);
	                start.validate();
	            }
	        }
	        else if (field.endDateField) 
	        	{
	            var end = Ext.getCmp(field.endDateField);
	            if (!end.minValue || (date.getTime() != end.minValue.getTime())) 
	            {
	                end.setMinValue(date);
	                end.validate();
	            }
	        }
	        /*
	         * Always return true since we're only using this vtype to set the
	         * min/max allowed values (these are tested for after the vtype test)
	         */
	        return true;
	    },
	
	    password : function(val, field) 
	    {
	        if (field.initialPassField) 
	        {
	            var pwd = Ext.getCmp(field.initialPassField);
	            return (val == pwd.getValue());
	        }
	        return true;
	    },	
	    passwordText : 'Passwords do not match',
	    
	    hyphen:function(x)
	    {
	    	return this.hyphenRe.test(x);
	    },   
      //hyphenText : "Only numbers and hyphen.",
      //hyphenMask:/[0-9-]/,
      //hyphenRe: /^\d+-\d{1,2}$/  //This is the check
      
      //hyphenText : "Password must be at least 8 characters long and start and end with a letter",
      //hyphenRe:/^[A-Za-z]\w{6,}[A-Za-z]$/
      
      //hyphenText 	: "Password must contain at least 1 number, at least 1 lower case letter, and at least 1 upper case letter and minimum of 7 characters",
      //hyphenRe		:/^\w*(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w{7,}\w*$/
      
      hyphenText		: "Password must contain 7-20 characters with uppercase letters, lowercase letters and at least one number.",
      hyphenRe			: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/

	}
);