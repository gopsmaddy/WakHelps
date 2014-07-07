var SERVER_SESSION_TIMEOUT = 30*60; // 30 minuts

var KEEP_ALIVE_TIMER  = SERVER_SESSION_TIMEOUT-60; //  10 seconds before it fires
var TIME_OUT_TIMER  	= SERVER_SESSION_TIMEOUT-60; //  40 seconds before it fires

var MSG_WINDOW_TIMER 	= 30;  //message box wait for t time to get human interaction if not redirects to login page.
var MSG_TEXT = 'Please click OK to carry on working or Cancel to logout<br/>(you have 30 seconds until you are logged out)';
    
  
//varKeepAliveURL='ping.php';   
//varTimeoutURL='/Reporting/logout.aspx';	
	
	
var keepaliveHandler = new Ext.util.DelayedTask
(
	function()
	{
    Ext.Ajax.request
    (
	    {
        url : varKeepAliveURL,
        method : 'GET',        
        success: function(response, request)
        {
						//dummy server call 
            keepaliveHandler.delay(KEEP_ALIVE_TIMER*1000);
        },
        failure: function ( response, request )
		    {								    		
						alert('Ajax Error :'+ response.responseText);
		    }	
	    }
    );
	}
);

//Kick off the timer
keepaliveHandler.delay(KEEP_ALIVE_TIMER*1000);

var timeoutHandler = new Ext.util.DelayedTask
(
	function()
	{	 
		var wintimer = setTimeout(function(){window.location=varTimeoutURL},MSG_WINDOW_TIMER*1000);
			
		Ext.Msg.show
		(
			{
				title:'Inactivity',
				msg: MSG_TEXT,	
				buttons: Ext.Msg.OKCANCEL,
				icon: Ext.MessageBox.WARNING,
				fn: function(btn,text)
				{						
					if(btn=='ok')
					{
							clearTimeout(wintimer);							
							Ext.Ajax.request
					    (
						    {
						        url : varKeepAliveURL,
						        method : 'GET',
						        success: function(response, request)
						        {												
						            timeoutHandler.delay(TIME_OUT_TIMER*1000);						            
						        },
						        failure: function ( response, request )
								    {								    		
												alert('Ajax Error :'+ response.responseText);
								    }	
						    }
					    );
						}
						else
						{
							window.location=varTimeoutURL;
						}
					
					}
				}
			);
	}
);



Ext.getDoc().on('click', function()
{
	//alert('click>'+TIME_OUT_TIMER*1000);
	timeoutHandler.delay(TIME_OUT_TIMER*1000);
});

Ext.getDoc().on('keydown', function (e) 
{
	timeoutHandler.delay(TIME_OUT_TIMER*1000);
	//if (e.getKey() == e.ENTER) 
	//{Button1.fireEvent('click');}
});


//Kick off the timer
timeoutHandler.delay(TIME_OUT_TIMER*1000);