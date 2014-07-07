
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>Campbell &amp; Company, Inc. - Secure Portal</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="/Reporting/_styles/css-uniform.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="/Reporting/_styles/css-print.css" rel="stylesheet" type="text/css" media="print" />
    <link href="/Reporting/_styles/secure-css-screen.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="/Reporting/_styles/secure-css-smoothness-ui.css" rel="stylesheet" type="text/css" media="screen" />
    <script src="/Reporting/_scripts/jquery.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/secure-js-global.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/jquery-ui.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/js-uniform.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/head-appends.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/secure-js-cookie.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/secure-myAppProperties.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/secure-propNonSecure.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/secure-ExternalURL.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/secure-tools.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/js-validate.js" type="text/javascript"></script>
    <script src="/Reporting/_scripts/secure-jqueryValidation.js" type="text/javascript"></script>
  </head>
  <body id="reporting">
    <div id="wrapper">
      <div id="header">
		<a href="/" title="Campbell & Company, Inc." id="logo"><img src="/_images/campbell_logo.gif" alt="Campbell & Company, Inc. logo" /></a>
		<ul id="topnav">
			<li><a href="/Reporting/_documents/Disclosure Document--November 28 2011--FINAL.pdf" target="_blank" >Disclosure Document</a></li>
			<li><a href="/Reporting/_documents/Website Terms and Conditions of Use_Final Combined_May 2011.pdf" target="_blank" >Terms &amp; Conditions</a></li>
			<li><a href="/privacy-policy.aspx">Privacy Policy</a></li>
			<li id="text-size"><a href="#" id="text-small">A</a><a href="#" id="text-medium">A</a><a href="#" id="text-large">A</a></li>
		</ul></div>
      <div id="nav">
            <ul>
                <li><a href="../">Home</a></li>
                <li><a href="../about-campbell/">About Campbell</a></li>
                <li><a href="../portfolio-performance">Portfolio Performance</a></li>
                <li><a href="../why-invest">Why Invest</a></li>
                <li><a href="../contact-us">Contact us</a></li>
                <li class="current"><a href="../reporting">My Account</a></li>
            </ul>
        </div>
      <div id="content">
        <div id="main" class="left"><h1>Campbell &amp; Company's Secure Portal</h1>

<p>We are pleased to announce the launch of our online communication tool with the goal of facilitating an enhanced relationship with each of our clients. This portal will contain all necessary client information, fund performance and news, marketing materials and the most recent forms in one place. We hope the portal includes everything you need, however, please do not hesitate to contact us if you require any additional information.</p>

<p>Thank you</p>

<p>Our Goal is to continue to provide ease of access to your account information. If at any time you would need support, please call 1.800.698.7235 or email <a href="mailto:fundsupport@campbell.com">fundsupport@campbell.com</a></p></div>
        <div id="sidebar" class="right"><h1>Enrollment: Step2</h1>
<div>
<form id="Enrolment2" method="post" action="#">
    <h2>You have 20 minutes to change your userlogin name</h2>
    <div style="float:left;">
	    <input name="sessionid" id="sessionid" size="32" type="hidden">
	     <fieldset>
	        <label for="newuserlogin">New User Login</label>
	        <input name="newuserlogin" id="newuserlogin" size="32" class="required">
	     </fieldset>
	    
	    
	    <br>
	    <fieldset>
	        <input value="Continue" id="continue" type="button">
	        <input value="Skip" id="skip" type="button">
	    </fieldset>	    
    </div>	  
</form>
</div>

<script>
	
	
	
	
	
	$('#sessionid').val(getUrlVars()["sessionid"]);
	
	
	$(document).ready(function(){		
		
					
		
		$("#skip").click(function()		
		  {	
		  	document.location.replace('/Reporting');	
			});      
			
		$("#continue").click(function()
	  {	
	  	var sessionkey=$('#sessionid').val();		
	  	var newuserlogin = $('#newuserlogin').val();	
			  	
			
			if(newuserlogin != '')
			{
				var subscriberId=getCookie(sessionkey+'_auto');
				var password=getCookie(sessionkey+'_pass');
					
				
				//alert('show subscriberIdinCookie>'+subscriberId);
				//alert('show passwordinCookie>'+password);
				
				if(subscriberId==null || subscriberId == '')
				{				
					alert(SESSION_EXPIRED_MESSAGE);
					deleteCookie(sessionkey+'_auto');
					deleteCookie(sessionkey+'_pass');
					document.location.replace('/Reporting');	
				}
				else
				{
					try
					{
						var auto = subscriberId;	
						
						//alert('auto>'+auto);
						
						$.ajax({
							url: varChangeUserLoginURL+'&_dc='+new Date().getTime(),
							data: 'subscriberId='+auto+'&newUserName='+newuserlogin+'&pass='+password,
							complete: function(jqXHR, textStatus)
							{
								if(textStatus == 'error')
									alert(AJAX_ERROR_MESSAGE);
								else
								{
									if(!jqXHR.responseXML)
									{
										alert(AJAX_ERROR_MESSAGE);
									}
									else if(jqXHR.responseXML.documentElement && jqXHR.responseXML.documentElement.nodeName == 'ChangeUserName')
									{
										var varMSGSuccess=jqXHR.responseXML.getElementsByTagName('success')[0].text || jqXHR.responseXML.getElementsByTagName('success')[0].textContent;
																				
										if(varMSGSuccess=='true')
										{
											//alert(AJAX_SUCCESS_MESSAGE);
											deleteCookie(sessionkey+'_auto');
											deleteCookie(sessionkey+'_pass');
											document.location.replace('/Reporting');	
										}
										else 
										{
											var varMSGErrorCode=jqXHR.responseXML.getElementsByTagName('errorCode')[0].text || jqXHR.responseXML.getElementsByTagName('errorCode')[0].textContent;
											var varMSGMessage=jqXHR.responseXML.getElementsByTagName('message')[0].text || jqXHR.responseXML.getElementsByTagName('message')[0].textContent;
									
											if(varMSGErrorCode=='1')
											{
												alert(USERNAME_EXISTS+' '+varMSGMessage)
											}
											else
											{
												alert(varMSGMessage);	
											}
									  }
							  	
									}
									else
									{
										alert(AJAX_ERROR_MESSAGE);															
									}
								}
							}
						});
					}
					catch (e)
					{
						alert(AJAX_ERROR_MESSAGE);
					}
					return false;
				}
				
				
			}
			else
			{
				alert(USERNAME_REQUIRED);
			}
			return false;
			
		});  	
	});
	
		     
	            
	         

</script></div>
      </div>
      <div id="footer"><p>Copyright © 2011, <a href="/" title="Campbell &amp; Company, Inc.">Campbell &amp; Company, Inc.</a> All Rights Reserved.</p>
<ul>
	<li><a href="/benchmark-index.aspx">Benchmark Index</a></li>
	<li><a href="/glossary.aspx">Glossary</a></li>
	<li><a href="/sitemap.aspx">Sitemap</a></li>
</ul></div>
    </div>
    <div id="sub-footer"><p>2850 Quarry Lake Drive, Baltimore, MD 21209</p>
<p>Phone: 1.800.698.7235<br/>
Fax: 410.413.2700<br/>
Email: <a href="mailto:information@campbell.com">information@campbell.com</a><br/>
<a href="mailto:jobs@campbell.com">jobs@campbell.com</a><br/>
<a href="mailto:k1@campbell.com">k1@campbell.com</a></p></div>
  </body>
</html>