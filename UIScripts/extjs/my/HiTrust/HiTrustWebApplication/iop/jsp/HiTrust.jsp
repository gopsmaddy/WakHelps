<%@ page language="java" import="java.io.*" %>
<%@ page language="java" import="java.util.*" %>
<%@ page language="java" import="oracle.xml.parser.v2.*" %>
<%@ page language="java" import="org.w3c.dom.*" %>
<%@ page language="java" import="com.kurtosys.tools.*" %>
<%@ page language="java" import="net.sf.json.*" %>
<%@ page language="java" import="net.sf.json.xml.*" %>

<%
		System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		
		String action = request.getParameter("action");
		
		if (StringUtils.isNullOrEmpty(action))
			action="BaPortSummaryDatas";
		
		String serverContextURL=AppUtils.getServerContextURL(request);		
		String xmlFileURL = serverContextURL+"iop/xml/"+action+".xml";
		String xslFileURL = serverContextURL+"iop/xsl/"+action+".xsl";
		
		System.out.println("xmlFileURL>"+xmlFileURL);
		System.out.println("xslFileURL>"+xslFileURL);
		
		//String xmlFileURL = "http://localhost:8080/HiTrustWebApplication/iop/xml/BaPortSummaryDatas.xml";
		//String xslFileURL = "http://localhost:8080/HiTrustWebApplication/iop/xsl/BaPortSummaryDatas.xsl";
		
			

		String mySortedresponse="";
			
		
		try
		{
			ParameterList paramList = new ParameterList();
			Enumeration en = request.getParameterNames();
	        
	    while (en.hasMoreElements()) 
	    {
	        
	        String paramName = (String) en.nextElement();	        
	        //paramList.add(new Parameter(paramName.toUpperCase(),request.getParameter(paramName)));
	        paramList.addParamValue(paramName.toUpperCase(), request.getParameter(paramName));
	        
	    }
			
							
		    String tempPayload = XMLUtils.getXMLDocumentAsString(XMLUtils.getXMLDocumentFromHttp(xmlFileURL));
		    
		    mySortedresponse=PageUtils.getXMLPaginated(tempPayload, xslFileURL, paramList);		
		    
		    String outputFormat=paramList.getParamValue("outputFormat");
		    
		    if (!StringUtils.isNullOrEmpty(outputFormat) && "json".equalsIgnoreCase(outputFormat))
				{
					XMLSerializer xmlSerializer = new XMLSerializer();
					JSON json = xmlSerializer.read(mySortedresponse);
					mySortedresponse = json.toString(2);
					response.setContentType("text/html");
				}	
				else
				{
				response.setContentType("text/xml");
				}
							
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		
		
		try
		{			
			out.print(mySortedresponse);			
			
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
