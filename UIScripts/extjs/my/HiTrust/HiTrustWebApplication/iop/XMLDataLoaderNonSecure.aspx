<%@ Page language="C#" ContentType="text/xml"  Inherits="System.Web.UI.Page" %>

<%@ IMPORT namespace="System" %> 
<%@ IMPORT namespace="System.IO" %>
<%@ IMPORT namespace="System.Net" %>
<%@ IMPORT namespace="System.Text" %>

<script runat="server"> 
 protected void Page_Load(object sender, EventArgs e)
{ 	
	try
	{
		string userRequestType = Request.QueryString["userRequestType"];
		string user = "0000";
		string pass = "0000";
		
		string host = "http://192.168.1.92:8080/HiTrustWebApplication/hitrust?operation=";
		string path = Request.QueryString["path"];

        string action = Request.QueryString["action"];
        string profileRelNo = Request.QueryString["profileRelNo"];
        string profileKey = Request.QueryString["profileKey"];
        string sessionId = Session.SessionID;
        string sessionTimeout = Session.Timeout.ToString();

        string portfolioNumber = Request.QueryString["portfolioNumber"];
        string accountNumber = Request.QueryString["accountNumber"];
        string fundKey = Request.QueryString["fundKey"];
        string sortOrderDateFrom = Request.QueryString["sortOrderDateFrom"];
        string sortOrderDateTo = Request.QueryString["sortOrderDateTo"];
        string unitClassKey = Request.QueryString["unitClassKey"];

        string settleInsType = Request.QueryString["settleInsType"];
        string portfolioKey = Request.QueryString["portfolioKey"];
        string transactionType = Request.QueryString["transactionType"];
        string contractNumber = Request.QueryString["contractNumber"];
        string fundCode = Request.QueryString["fundCode"];
        string sEffDateFrom = Request.QueryString["sEffDateFrom"];
        string sEffDateTo = Request.QueryString["sEffDateTo"];
        string exDate = Request.QueryString["exDate"];
        string paymentDate = Request.QueryString["paymentDate"];
        string entitlementNo = Request.QueryString["entitlementNo"];

        string start = Request.QueryString["start"];
        string limit = Request.QueryString["limit"];
        string sort = Request.QueryString["sort"];
        string dir = Request.QueryString["dir"];
        string stype = Request.QueryString["type"];
        string key = Request.QueryString["key"];
        string companyKey = Request.QueryString["companyKey"];
        string profileCompanyKey = Request.QueryString["profileCompanyKey"];//Alessio's addings
        string firstName = Request.QueryString["firstName"];
        string lastName = Request.QueryString["lastName"];
        string investorNumber = Request.QueryString["investorNumber"];
        string activeProfile = Request.QueryString["activeProfile"];
        string subAgentKey = Request.QueryString["subAgentKey"];
        string currencyCode = Request.QueryString["currencyCode"];
        string activePortfolio = Request.QueryString["activePortfolio"];
        string paymentKey = Request.QueryString["paymentKey"];
        string agentPayKey = Request.QueryString["agentPayKey"];

		string loginID = Request.QueryString["loginID"];
		string emailAddress = Request.QueryString["emailAddress"];
		string significantDate = Request.QueryString["significantDate"];
		string secretIdWord = Request.QueryString["secretIdWord"];
		string hyperlink = Request.QueryString["hyperlink"];
		string oldPassword = Request.QueryString["oldPassword"];
		string newPassword = Request.QueryString["newPassword"];
		string confirmPassword = Request.QueryString["confirmPassword"];
		string authenticationCode = Request.QueryString["authenticationCode"];

        if (path == null) path = "";

        if (!string.IsNullOrEmpty(action))
        {
			string url = host + action +
			"&user=" + user +
			"&pass=" + pass +
			"&profileRelNo=" + profileRelNo +
			"&profileKey=" + profileKey +
			"&companyKey=" + companyKey +
			"&sessionId=" + sessionId +
			"&sessionTimeout=" + sessionTimeout +
			"&portfolioNumber=" + portfolioNumber +
			"&accountNumber=" + accountNumber +
			"&fundKey=" + fundKey +
			"&sortOrderDateFrom=" + sortOrderDateFrom +
			"&sortOrderDateTo=" + sortOrderDateTo +
			"&unitClassKey=" + unitClassKey +
			"&settleInsType=" + settleInsType +
			"&portfolioKey=" + portfolioKey +
			"&transactionType=" + transactionType +
			"&contractNumber=" + contractNumber +
			"&fundCode=" + fundCode +
			"&sEffDateFrom=" + sEffDateFrom +
			"&sEffDateTo=" + sEffDateTo +
			"&exDate=" + exDate +
			"&paymentDate=" + paymentDate +
			"&entitlementNo=" + entitlementNo +
			"&start=" + start +
			"&limit=" + limit +
			"&sort=" + sort +
			"&dir=" + dir +
			"&type=" + stype +
			"&key=" + key +
			"&profileCompanyKey=" + profileCompanyKey + //Alessio's addings
			"&firstName=" + firstName +
			"&lastName=" + lastName +
			"&investorNumber=" + investorNumber +
			"&activeProfile=" + activeProfile +
			"&subAgentKey=" + subAgentKey +
			"&currencyCode=" + currencyCode +
			"&activePortfolio=" + activePortfolio +
			"&paymentKey=" + paymentKey +
			"&agentPayKey=" + agentPayKey +
			"&userRequestType=" + userRequestType +
			"&loginID=" + loginID +
			"&emailAddress=" + emailAddress +
			"&significantDate=" + significantDate +
			"&secretIdWord=" + secretIdWord +
			"&hyperlink=" + hyperlink +
			"&oldPassword=" + oldPassword +
			"&newPassword=" + newPassword +
			"&confirmPassword=" + confirmPassword +
			"&authenticationCode=" + authenticationCode;
			
            HttpWebRequest webRequest;
            HttpWebResponse webResponse;
			webRequest = (HttpWebRequest)WebRequest.Create(url);
			string c = Request.Headers.Get("Cookie");

			if(c != null)  		
			{ 		
				webRequest.Headers.Set("Cookie", c); 	
			}
			
			webRequest.Method = Request.RequestType;
			string content = string.Empty;
			using (StreamReader readContent = new StreamReader(Page.Request.InputStream))
			{ 
				content = readContent.ReadToEnd();
		 
				if (!string.IsNullOrEmpty(content))
				{ 
					ASCIIEncoding encoding = new ASCIIEncoding();
					byte[] bytes = encoding.GetBytes(content);
					webRequest.ContentLength = bytes.Length;
					using (Stream st = webRequest.GetRequestStream())
					{ 
						st.Write(bytes, 0, bytes.Length); 
					}
				}  				
		
				webResponse = (HttpWebResponse)webRequest.GetResponse();
				string test = webResponse.GetResponseHeader("Set-Cookie");
		
				if(test != null) 
				{
					Response.AddHeader("Set-Cookie", test.Replace("HiTrustWebApplication", path)); 
				}

				using (StreamReader sr = new StreamReader (webResponse.GetResponseStream()))
				{ 		
					string html = sr.ReadToEnd(); 	
					Response.Write(html); 			
				} 	
			}
		}
	}
	catch (Exception ex) 
	{
		Response.Write(ex.ToString()); 		
		Response.Status = "500 Internal Server Error"; 
	}
}
    
</script>