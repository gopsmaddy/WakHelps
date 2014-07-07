<%@ page language="java" import="java.io.*" %>
<%@ page language="java" import="java.net.*" %>

<%
		System.out.println("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		
				
		String action = request.getParameter("action");
		
		String xstart = request.getParameter("start");
		String xlimit = request.getParameter("limit");
		String xpage = request.getParameter("page");
		String xsort = request.getParameter("sort");
		String xdir = request.getParameter("dir");
		
		
				
		// ///////////////////////////
		System.out.println("action>"+action);
		
		System.out.println("start>"+xstart);
		System.out.println("limit>"+xlimit);
		System.out.println("page>"+xpage);
		System.out.println("sort>"+xsort);
		System.out.println("dir>"+xdir);
				
		//String myjson="{'totalCount':'88','recordName':'mytests','records':[{'id':'111','name':'pinmailer','status':false,'command':'sdfsdf','seconds':'1','minutes':'22','hours':'17','dayofmonth':'*','month':'*','dayofweek':'?','year':'','lastrun':'1284645636','runonce':'N'}]}";
		String mySortedresponse="hello";
		
		String passfilter="";
		String passparam="?start="+xstart+"&limit="+xlimit+"&page="+xpage+"&sort="+xsort+"&dir="+xdir;
		String passcontext="admin/system/"+action;
		String passurl="http://localhost:8080/"+passcontext+passparam+passfilter;
		
		System.out.println("pass url>"+passurl);
		
		try 
		{
			URL url = new URL("http://modules.eurouwins.com/data/test.php");			
			//URL url=new URL("http://localhost:8080/RESTfulExample/json/product/get");
			
			//URL url = new URL(passurl);
			
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");

			if (conn.getResponseCode() != 200) 
			{
				throw new RuntimeException("Failed : HTTP error code : " + conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output;
			System.out.println("Output from Server .... \n");
			while ((output = br.readLine()) != null) 
			{
				mySortedresponse=output;
				System.out.println(output);
			}
			
			conn.disconnect();

		} 
		catch (MalformedURLException e) 
		{
			e.printStackTrace();
		} 
		catch (IOException e) 
		{
			e.printStackTrace();			
		}
		
		
		response.setContentType("application/json");
		try
		{			
			out.print(mySortedresponse);
			//out.flush();
			//out.close();
		} 
		catch (IOException e) 
		{
			// TODO Auto-generated catch block
			e.getMessage();
		} 
		
%>

<%
/*
try {

			URL url = new URL(
					"http://localhost:8080/RESTfulExample/json/product/post");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");

			String input = "{\"qty\":100,\"name\":\"iPad 4\"}";

			OutputStream os = conn.getOutputStream();
			os.write(input.getBytes());
			os.flush();

			if (conn.getResponseCode() != HttpURLConnection.HTTP_CREATED) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			}

			BufferedReader br = new BufferedReader(new InputStreamReader(
					(conn.getInputStream())));

			String output;
			System.out.println("Output from Server .... \n");
			while ((output = br.readLine()) != null) {

				System.out.println(output);
			}

			conn.disconnect();

		} catch (MalformedURLException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();

		}

*/
%>
