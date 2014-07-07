function getXMLObject()  //XML OBJECT
{
   var xmlHttp = false;
   try
   {
     xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")  // For Old Microsoft Browsers
   }
   catch (e)
   {
     try {
       xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")  // For Microsoft IE 6.0+
     }
     catch (e2)
	 {
       xmlHttp = false   // No Browser accepts the XMLHTTP Object then false
     }
   }
   if (!xmlHttp && typeof XMLHttpRequest != 'undefined')
   {
     xmlHttp = new XMLHttpRequest();        //For Mozilla, Opera Browsers
   }
   return xmlHttp;  // Mandatory Statement returning the ajax object created
}

var xmlhttp = new getXMLObject(); //xmlhttp holds the ajax object

function ajaxFunction(log,code,msg,desc)
{
  if(xmlhttp)
  {
    //var txtname = 'hellooooo';//document.getElementById("txtname");
    xmlhttp.open("POST","../../UIErrorLogger",true); //getname will be the servlet name
    xmlhttp.onreadystatechange  = handleServerResponse;
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send("log="+log+"&code="+code+"&msg=" + msg+"&desc="+desc);//.value); //Posting txtname to Servlet
  }

}

function handleServerResponse()
{
   document.getElementById("idGlobalMessage").style.display = 'block';
   if (xmlhttp.readyState == 4)
   {
	 document.getElementById("idGlobalMessage").style.display = 'none';
     if(xmlhttp.status == 200)
	 {

       document.getElementById("idUIErrorLogger").innerHTML=xmlhttp.responseText; //Update the HTML Form element
     }
     else
	 {
        document.getElementById("idUIErrorLogger").innerHTML="Error during AJAX call. Please try again";
     }
   }
}