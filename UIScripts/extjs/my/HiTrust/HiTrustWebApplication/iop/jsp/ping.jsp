<%@ page language="java" import="java.io.*" %>
<%@ page language="java" import="java.util.*" %>
<%@ page language="java" import="oracle.xml.parser.v2.*" %>
<%@ page language="java" import="org.w3c.dom.*" %>
<%@ page language="java" import="com.kurtosys.tools.*" %>
<%@ page language="java" import="net.sf.json.*" %>
<%@ page language="java" import="net.sf.json.xml.*" %>

<%		
					
		
		try
		{			
			out.print("{success:true}");		
			//out.print("{success:false}");	
			
		} 
		catch (IOException e) 
		{
			// TODO Auto-generated catch block
			e.getMessage();
		} 		
		finally
		{
			try
			{
						
				if (out != null)
				{
					out.flush();	
					//out.close();
				}
			}
			catch (IOException e)
			{
				//e.printStackTrace();
			}
		}
		
%>
