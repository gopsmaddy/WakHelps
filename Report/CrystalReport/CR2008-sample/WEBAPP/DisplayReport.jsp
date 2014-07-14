<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>

<%//Crystal Java Reporting Component (JRC) imports.%>
<%@page import="com.crystaldecisions.reports.sdk.*" %>
<%@page import="com.crystaldecisions.sdk.occa.report.lib.*" %>
<%//Crystal Report Viewer imports.%>
<%@page import="com.crystaldecisions.report.web.viewer.*"%>

<%@page import="com.platform7.affina.operations.view.reports.ReportHelper"%>

<%
	try
	{
		new ReportHelper().processReport(request, response);
	}
	catch(Exception e)
	{	
		out.print("Exception: " + e);
	}
%>







