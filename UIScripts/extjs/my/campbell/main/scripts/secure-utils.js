function renderIcon(val) 
{	
    return '<img src="../_images/' + val.replace('/','') + '.png">';
}

function render2LocalTimeZone(val) 
{	
		var localDate = new Date()
		var localInMilli= -1*localDate.getTimezoneOffset()*60*1000;
					
		var freeFormDate=formatDate(new Date(getDateFromFormat(val,'dd-MMM-yyyy hh:mm:ss')),'MMM dd, yyyy hh:mm:ss')										
		var remoteDate = new Date(freeFormDate);
		
		var adjustedTimeInMilli=	remoteDate.getTime()+localInMilli;	
		
		var adjustedDate=new Date(adjustedTimeInMilli);			
		
		return formatDate(adjustedDate,'dd-MMM-yyyy hh:mm:ss');
}

function getDefaultDate(val) 
{	
		var localDate = new Date()
		var localInMilli= val*24*60*60*1000;
					
		
		var adjustedTimeInMilli=	localDate.getTime()+localInMilli;	
		
		var adjustedDate=new Date(adjustedTimeInMilli);			
		
		return formatDate(adjustedDate,'yyyy-MM-dd');
}

function render2DateFormat(val) //2011-01-01T00:00:00
{	
		//return  val.replace('T00:00:00','');
		return  val.substring(0,10);
}


Ext.form.XmlErrorReader = function()
{
    Ext.form.XmlErrorReader.superclass.constructor.call(this, {
            record : 'field',
            success: '@success'
        }, [
            'id', 'msg'
        ]
    );
};
Ext.extend(Ext.form.XmlErrorReader, Ext.data.XmlReader);

