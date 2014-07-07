<%@page import=
	"java.net.*,
	java.io.*,
	java.util.*"
%><%
	HttpURLConnection con = null;
	try
	{
//		String host = "http://192.168.1.92:8080/HiTrustWebApplication/hitrust?operation=";
		String host = "http://localhost:8080/HiTrustWebApplication/hitrust?operation=";
		String action = request.getParameter("action");
		action = action != null ? action : "";
		String path = request.getParameter("path");
		path = path != null ? path : "";
		boolean throwError = request.getParameter("test") !=null;
		
		String requestParameters = "&";
		Map<String,String[]> parameters = request.getParameterMap();
		for(String paramKey: parameters.keySet())
		{
			String paramValue = URLEncoder.encode(request.getParameter(paramKey));
			if (paramKey != null && !"action".equals(paramKey) && !"path".equals(paramKey) && !"test".equals(paramKey))
				requestParameters += paramKey + "=" + paramValue + "&";
		}
		
		if (throwError)
		{
			System.out.println("In test block throwing fake error");
			response.setContentType("text/xml");
			out.print("<?xml version=\"1.0\" ?><response success=\"false\">This is a test</response>");
		}
		// Action is required
		else if (!"".equals(action))
		{
			// Build URL
			String reqUrl = host + action + requestParameters.substring(0, requestParameters.length()-1);
			
			System.out.println("About to call: " + reqUrl + " - " + request.getMethod());
			
			// Create connection
			URL url = new URL(reqUrl);
			con = (HttpURLConnection)url.openConnection();
			
			// Set output flag
			con.setDoOutput(true);
			// Set request method of new connection to same method as this request
			//con.setRequestMethod(request.getMethod());
			con.setRequestMethod("GET");
			
			// Get content of request to this page
			StringBuffer sbuf = new StringBuffer();
			String input;
			while ((input = request.getReader().readLine()) != null)
			{
				sbuf.append(input);
			}
			input = sbuf.toString();
			
//			if("POST".equalsIgnoreCase(request.getMethod()))
//				con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			
			// Set the content type of this
			response.setContentType(con.getContentType());
			
			// If content of request is not empty set as content of new request
			if(input != null && !"".equals(input))
				con.getOutputStream().write(input.getBytes());
			
			// Get content of new response and store in output
			StringBuffer outputBuffer = new StringBuffer();
			BufferedReader rd = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String line, output;
			while ((line = rd.readLine()) != null)
			{
				outputBuffer.append(line);
			}
			rd.close();
			output = outputBuffer.toString();
			
			output = output.replaceAll("<\\?xml version=\"1.0\" \\?>","");
			output = "<?xml version=\"1.0\" ?><response success=\"" + (output.indexOf("<error>")==-1) + "\">" + output + "</response>";
			out.print(output);
		}
	}
	catch(Exception e)
	{
		e.printStackTrace();
		response.setContentType("text/xml");
		out.print("<?xml version=\"1.0\" ?><response success=\"false\">" + e.getMessage() + "</response>");
	}
%>