<%@ page language="java" import="java.io.IOException" %>
<%@ page language="java" import="oracle.xml.parser.v2.*" %>
<%@ page language="java" import="org.w3c.dom.*" %>
<%@ page language="java" import="com.kurtosys.sdk.tools.XMLDocumentProducer"%>

<%
System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		String xml = "C:\\Sun\\AppServer\\domains\\hitrust\\applications\\j2ee-apps\\HiTrust\\HiTrustWebApplication_war\\iop\\xml\\t-hitrust-transaction.xml";
		
		int start = Integer.parseInt(request.getParameter("start"));
		int limit = Integer.parseInt(request.getParameter("limit"));
		
		XMLDocument paginatedXML = new XMLDocumentProducer().getXMLDocument(xml);
		
			//paginatedXML.print(System.out);
			NodeList list = null;
			NodeList totalRecords = null;
			try {
				XMLNode responseNode = (XMLNode)paginatedXML.selectSingleNode("//response");
				list = responseNode.selectNodes("//List");
					if (list != null) 
					{
						totalRecords = responseNode.selectNodes("//totalRecords");
						if(totalRecords.getLength()>0)
						{
						}
						else
						{
							XMLElement totalRecordsNode = (XMLElement) paginatedXML.createElement("totalRecords");
							totalRecordsNode.addText(String.valueOf(list.getLength()));
							responseNode.appendChild(totalRecordsNode);
						}
		
						for (int i = 0; i < list.getLength(); i++) {
							if (i < (start) || i >= start + limit) {
								Node node = list.item(i);
								responseNode.removeChild(node);
							}
		
						}
					}	
			} catch (XSLException e) {
				e.printStackTrace();
			}
		
			response.setContentType("text/xml");
			try{
			//ServletOutputStream out = response.getOutputStream();
			//out.write(new XMLDocumentProducer().getXMLDocumentAsString(paginatedXML), 0, l);
			out.print(new XMLDocumentProducer().getXMLDocumentAsString(paginatedXML));
			out.flush();
			out.close();
			} 
			catch (IOException e) 
			{
				// TODO Auto-generated catch block
				e.getMessage();
			} 
%>
