var tickerwindow;
function poponload()
{  
    tickerwindow = window.open("../common/js/myticker.html", "mywindow", "location=1,status=1,scrollbars=1,width=950,height=700");
    tickerwindow.focus();
}

function mainpolling()
{
	(function poll() 
		{
			setTimeout(function () 
			{
				$.ajax(
				{
					type: 'POST',
					//dataType: 'json',
					data: { 'status': '0' },
					url: varTickerPollingUrl,
					success: function(data)
					{
						//console.info("data >>> "+data.message);
						
						var jsonResponse = data;
						if(jsonResponse.success)
						{
							//console.info("success >>> "+jsonResponse.message);
					   
							document.getElementById("idMyTickerWindowButton").style.color='#FF0000';
							document.getElementById("idMyTickerWindowButton").value='('+jsonResponse.totalCount+') New Alerts';	
						}
						else	
						{
							//console.info("failed >>> "+jsonResponse.message);
							document.getElementById("idMyTickerWindowButton").style.color='#000000';
							document.getElementById("idMyTickerWindowButton").value='('+jsonResponse.totalCount+') New Alerts';	
						}
                        
					},
					failure: function(data)
					{
					   var serverResponse = data;
					   //console.info("failure >>> "+serverResponse);			   
					},
					complete: poll
				});
			}, varPollingInterval);
		})();
}
