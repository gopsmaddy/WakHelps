<!-- ********************** -->
<!-- ***** error.jsp ***** -->
<!-- ********************** -->
<%@ page isErrorPage="true" %>

<!-- This error page demonstrates a JSP ErrorPage used for
     catching exceptions thrown in other JSP pages, it is
     used by the ThrowException.jsp page -->

<html>


<body bgcolor=#ffffff>

<h2><font color=#DB1260>JSP Error Page</font></h2>

<p> An exception was thrown: <b> <%= exception %> </b>

<p> With the following stack trace:
<pre>

<%
    


%>
</pre>

<p>
<hr width=80%>

</body>
</html>
<!-- ********************** -->
<!-- *** end error.jsp **** -->
<!-- ********************** -->


