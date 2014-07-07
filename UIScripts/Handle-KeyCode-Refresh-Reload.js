
var isClicked=0; 
var timer;
var comForm=document.forms["IdCommonForm"];



function stoper()
{
	//alert('calling stoper');
	clearTimeout(timer);
}
		

function isDigit(num) 
{
	if (num.length>1)
	{
		return false;
	}
	var string='1234567890';
	if (string.indexOf(num)!=-1)
	{
		return true;
	}
	return false;
}


function isInteger(val)
{
	for(var i=0;i<val.length;i++)
	{
		if(!isDigit(val.charAt(i)))
		{
			return false;
		}
	}
	return true;
}

/*
function viewStagedDeliveries()
{
	if(comForm["BureauName"].selectedIndex == 0) 
	{
		alert('[Select Bureau]');
	}
	else
	{
		document.body.style.cursor='wait';
		comForm["action"].value='/Operations/controllerMain';
		comForm.submit();
	}
}
*/

function DeliverPackage(frmname, rowNum)
{
	//alert ('clicked :'+frmname+' : '+ rowNum);
	var totRows = document.getElementById("TotRows").value
	for (i=1; i<=totRows; i++)
	{
		document.getElementById("deliverButton" + i).disabled = true
	}
	document.getElementById("BureauName").value = document.getElementById("BureauName" + rowNum).value;
	document.getElementById("disableButtons" + rowNum).value = "disabled";
	document.getElementById("clickedButton" + rowNum).value = rowNum;
	document.getElementById("deliverButton" + rowNum).value = "Delivering";
	document.getElementById(frmname).Query.value="DeliverStagedDeliveries";
	document.getElementById(frmname).action.value='/Operations/controllerMain';
	
	var milliseconds = new Date().getTime();
	
	document.getElementById(frmname).pkgDeliveredTime.value = document.getElementById("pkgDeliveredTime" + rowNum).value;
	document.getElementById(frmname).pkgClickedTime.value = milliseconds;
	document.getElementById("pkgDeliveredTime" + rowNum).value=milliseconds;
	
	
	document.getElementById(frmname).submit();
	
	//timer=setTimeout('loadAgain()',5000);
	
}


function loadAgain() 
{
	//alert ('loadAgain...');
	var totRows = document.getElementById("TotRows").value
	var clikButtonPkgVal = -1;
	for (x=1; x<=totRows; x++)
	{
		var clikButtonVal = document.getElementById("clickedButton" + x).value
		if(clikButtonVal != "null") 
		{
			clikButtonPkgVal = document.getElementById("packageCount" + clikButtonVal).value 
		}
	}
	
	for (i=1; i<=totRows; i++)
	{
		var pCount = document.getElementById("packageCount" + i).value
		var delButtonVal = document.getElementById("deliverButton" + i).value
		if(	pCount > 0 
					&& document.getElementById("clickedButton" + i).value == i 
					&& (	delButtonVal == "Delivering" 
							|| (	delButtonVal == "Deliver" 
									&& document.getElementById("deliverButton" + i).disabled == true
								)
						)
		  ) 
		{ 
			//alert ('loadAgain...Delivering '+i);
			document.getElementById("deliverButton" + i).value = "Delivering"
			window.location.reload(); 
			return;
		} 
		else 
		{
			//alert ('loadAgain...else '+i);
			
			if(pCount > 0 && clikButtonPkgVal == 0) 
			{				
				//alert ('loadAgain...else '+i);
			}
		}
	}
	
	window.status ="";
}

/*
function fetchPrevDps()
{
	document.body.style.cursor='wait';
	comForm["PAGE_ID"].value="Previous_DeliveryPackages";
	comForm["Query"].value="Staged_Delivery";
	comForm["action"].value='/Operations/controllerMain';
	comForm.submit();
}

function fetchNextDps()
{
	document.body.style.cursor='wait'; document.getElementById("IdCommonForm")
	comForm["PAGE_ID"].value="Next_DeliveryPackages";
	comForm["Query"].value="Staged_Delivery";
	comForm["action"].value='/Operations/controllerMain';
	comForm.submit();
}
*/

//prompts.tab_modal.enabled=false;
timer=setTimeout('loadAgain()',5000);

//this code handles the F5/Ctrl+F5/Ctrl+R
document.onkeydown = checkKeycode
function checkKeycode(e) 
{
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
		
	// Mozilla firefox
	if ($.browser.mozilla) 
	{
	
		if (keycode == 116 ||(keycode == 82)) 
		{
			if (e.preventDefault)
			{
				e.preventDefault();
				e.stopPropagation();
				alert ('Please use the Stage Delivery menu to refesh the panel');	
				//AutoDeliveryBlocker();
			}
		}
	} 
	// IE
	else if ($.browser.msie) 
	{
		if (keycode == 116 || (keycode == 82) ) 
		{
			window.event.returnValue = false;
			window.event.keyCode = 0;
			window.status = "Refresh is disabled";
			
			alert ('Please use the Stage Delivery menu to refesh the panel');	
			//AutoDeliveryBlocker();
		}
	}
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function AutoDeliveryBlocker()
{
    var isLoading=GetURLParameter('isLoading');
    //alert('Yes IsRefresh>'+isLoading);
	if (isLoading != 1) 	
	{
		//window.location.href='controllerMain?PAGE_ID=&Query=Staged_Delivery&isLoading=1';
		//stoper();
	}
}

$(window).load(function () 
{
	AutoDeliveryBlocker();	
})

$('#clickTarget').mousedown(function() 
{
	alert('clickTarget Handler for .mousedown() called.');
});