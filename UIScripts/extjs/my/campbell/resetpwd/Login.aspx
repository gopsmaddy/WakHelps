
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
        <div id="main" class="left">
<p><strong>Financial Advisors: Click <a href="/Reporting/advisorapply.aspx">Here</a> to Apply For Access</strong></p>
<p>If you are an existing user and have forgotten your password, please <a href="#" id="forgot-password">click here</a></p>

<br><br><br>
<p><strong>Important Notice:</strong></p>
<p>
This site is intended only for the authorized use by the clients and employees of Campbell &amp; Company, Inc. Campbell &amp; Company protects the privacy of its clients and will vigorously pursue any unauthorized access to the information contained herein. All information contained herein is deemed strictly confidential. If you are not sure of your right to view this information, please do not attempt to access the site. 
</p>
<div id="forgot-password-dialog" title="Forgotten Password"><br>
	<form id="forgot-password-form">
	    <table border="0" cellpadding="0" cellspacing="12">
	      <tbody>
	      <tr>
	        <td colspan="2" align="left"><h4>If you have forgotten your Password, please enter your email address below.</h4></td>
	      </tr>
	      <tr>
	        <td align="left">Email Address:</td>
	        <td><input id="password-email" size="40" type="text"></td>
	      </tr>
	      <tr>
	        <td>&nbsp;</td>
	        <td><input name="Go" value="Submit" type="submit"></td>
	      </tr>
	    </tbody>
	  </table>
	</form>
</div>

		<script>
		$('#forgot-password-form').submit(function(){
			var email = $('#password-email').val();
			if(email != '')
			{
				try
				{
					$.ajax({
						url: varRequestResetPasswordURL+'&_dc='+new Date().getTime(),
						data: 'email='+email,
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
								else if(jqXHR.responseXML.documentElement.nodeName == 'fault')
								{
																		//alert('Form Submission Failed'+jqXHR.responseXML.find('fault faultstring:first'));
									var varMSG=jqXHR.responseXML.getElementsByTagName('faultstring')[0].text || jqXHR.responseXML.getElementsByTagName('faultstring')[0].textContent;
									if(varMSG=='nested exception is: Invalid Email information')
									  alert(EMAIL_INVALID);
									  else
									  	alert(varMSG);
								}
								else
								{
									alert(REQUEST_RESETPASSWORD_SUCCESS_MESSAGE+' '+email);
									$('#forgot-password-dialog').dialog("close"); 
									return true;
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
				alert(EMAIL_REQUIRED);
			}
			return false;
		});
	</script></div>
        <div id="sidebar" class="right"><h1>Login</h1>
<h3>Secure Portal Login:</h3><form name="aspnetForm" method="post" action="Login.aspx?ReturnUrl=%2fReporting%2fdefault.aspx" id="aspnetForm">
<div>
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMTYxNzMwNjk1MA9kFgICAQ9kFgJmD2QWCAIBDxYEHgRUZXh0BU1UaGVyZSBoYXMgYmVlbiBhbiBlcnJvciwgcGxlYXNlIGNvbnRhY3QgQ2FtcGJlbGwgJiBDb21wYW55IGF0IDEtODAwLTY5OC03MjM1Lh4HVmlzaWJsZWhkAgMPFgIfAAUIVXNlcm5hbWVkAgcPFgIfAAUIUGFzc3dvcmRkAgsPDxYCHwAFBUxvZ2luZGRkIL2TvY0fhPKBMau9qHnBUKWh0iI=" />
</div>

<div>

	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEWBAK0uc3qDwLp5s3wCQLWou3wDwKJnrefBm9cB6nDMMSJtz/jsFEfmf5CF04p" />
</div>
<div id="panel_login" class="panel">
    <div class="panelContent">
        <div id="welcome">
            
            <table>
                <tr>
                    <td>
                        Username
                    </td>
                    <td>
                        <input name="Kurtosys_Id_ab3729b590$TextboxUsername" type="text" id="Kurtosys_Id_ab3729b590_TextboxUsername" class="wide" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Password
                    </td>
                    <td>
                        <input name="Kurtosys_Id_ab3729b590$TextboxPassword" type="password" id="Kurtosys_Id_ab3729b590_TextboxPassword" class="wide" />
                    </td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <br />
                        <input type="submit" name="Kurtosys_Id_ab3729b590$ButtonAuthenticate" value="Login" id="Kurtosys_Id_ab3729b590_ButtonAuthenticate" class="button" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
</form></div>
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