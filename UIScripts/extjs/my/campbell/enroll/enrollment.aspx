
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
        <div id="sidebar" class="right"><h1>Enrollment</h1>
<div>
<form id="Enrolment" method="post" action="#">
    <h2>Please create your password to become active in the site</h2>
    <div style="float:left;">
	    <input name="auto" id="auto" size="32" type="hidden">
	    <input name="sessionid" id="sessionid" size="32" type="hidden">
	    <fieldset>
	        <label for="newpassword">Password</label>
	        <input name="newpassword" id="newpassword" size="22" class="required password" type="password">
	    </fieldset>
	    <fieldset>
	        <label for="confirm-password">Confirm Password</label>
	        <input name="confirm-password" id="confirm-password" size="22" class="required passwordmatch" type="password">
	    </fieldset>
	    
	    <br>
	    <fieldset>
	        <input value="Submit" type="submit">
	    </fieldset>	    
    </div>
	  <div style="float:right;">
	  	<ul>
	  		<strong>Password Requirements:</strong>
	  		<li>Minimum of 7 characters</li>
	  		<li>Maximum of 20 characters</li>
	  		<li>Must contain at least one upper case AND one lowercase letter.</li>
	  		<li>Must contain at least one number.</li>	  		
	  	</ul>
	  </div>
</form>
</div>

<script>
	
	
		     
	  $('#auto').val(getUrlVars()["auto"]); 
	  $('#sessionid').val(getUrlVars()["sessionid"]); 
	  
	         
	
		$('#Enrolment').submit(function(){			
			var subscriberId = $('#auto').val();
			var enrolmentGuid = $('#sessionid').val();
			var newPassword = $('#newpassword').val();
			var confirmPassword = $('#confirm-password').val();
			
			
			if(newPassword != '' && confirmPassword!='')
			{
				if(newPassword == confirmPassword)
				{
					try
					{
						$.ajax({
							url: varCompleteEnrollmentURL+'&_dc='+new Date().getTime(),
							data: 'subscriberId='+subscriberId+'&enrolmentGuid='+enrolmentGuid+'&newPassword='+newPassword,
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
									else if(jqXHR.responseXML.documentElement && jqXHR.responseXML.documentElement.nodeName == 'fault')
									{
										var varMSG=jqXHR.responseXML.getElementsByTagName('faultstring')[0].text || jqXHR.responseXML.getElementsByTagName('faultstring')[0].textContent;
										//if(varMSG=='nested exception is: error.password.exists')
										if (varMSG.indexOf("error.password.exists") !=-1) 
											alert(ENROLLMENT_EXPIRED_MESSAGE);
										//else if(varMSG=='nested exception is: invalid.old.password')
										else if (varMSG.indexOf("invalid.old.password") !=-1) 
											alert(ENROLLMENT_EXPIRED_MESSAGE);
										else if (varMSG.indexOf("Password expired") !=-1) 
											alert(ENROLLMENT_EXPIRED_MESSAGE);
									  else
									  	alert(varMSG);
									  	
									  	
									}
									else
									{
										alert(AJAX_SUCCESS_MESSAGE);
										setCookie(enrolmentGuid+'_auto', subscriberId, varCookieTimeout); //key, value, expiry time in minutes
										setCookie(enrolmentGuid+'_pass', newPassword, varCookieTimeout); //key, value, expiry time in minutes
										
										//document.location.replace('/Reporting');
										document.location.replace('/Reporting/changeuserlogin.aspx?sessionid='+enrolmentGuid);
										
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
				else
				{
					alert(PASSWORD_DONOT_MATCH);
				}
				return false;
			}
			else
			{
				alert(PASSWORD_REQUIRED);
			}
			return false;
			
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