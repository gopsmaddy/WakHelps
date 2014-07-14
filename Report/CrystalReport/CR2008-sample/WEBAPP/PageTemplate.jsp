<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="com.platform7.affina.operations.utils.CommonNavigation"%>
<%@ page import="java.util.ResourceBundle"%>
<%@ page import="java.util.*"%>

<% ResourceBundle rb = (ResourceBundle)session.getAttribute("ResourceBundle"); %>

<html>
    <head>
        <title>Affina Operations Console</title>
        <%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

        <link href="cascadingstylesheets/menu.css" rel="stylesheet" type="text/css" />
        <link href="cascadingstylesheets/DeliveryProgress.css" rel="stylesheet" type="text/css" />

        <script type="text/javascript">
            <%=CommonNavigation.initialiseSubMenus(rb)%>
        </script>
        <script type="text/javascript" src="javascripts/MainJavaScript.js"></script>
    </head>

    <body>
        <jsp:include page="Header.jsp" />
        <br />
          <form name="CommonForm" method="GET">
                  <input type="hidden" name="Query" value="<%=request.getParameter("Query").trim()%>" />
                  <input type="hidden" name="PAGE_ID" value="" />
                  <input type="hidden" name ="SCOPE_CHANGED" value ="false" />
                  <input type="hidden" name="LogSelected" value="" />

                  <jsp:include page="Navigation.jsp" />

                  <table align="center" cellpadding="0" cellspacing="0" border="0" style="text-align: left; width: 970px; height: 105px;">
                              <tbody>
                              <tr>
                  				<td style="vertical-align: top; background-color: rgb(0, 51, 102);" rowspan="1" colspan="3">
                  					<br>
                  				</td>
                  				<td></td>
                  				<td></td>
                              </tr>

                              <tr>

                              <td style="vertical-align: top; background-color: rgb(0, 51, 102);">
                  				&nbsp;&nbsp;&nbsp;&nbsp;
                              <br>
                              </td>
                              <td style="vertical-align: top; text-align: right;">
                  			    <img src="images/main_doggie.gif" title="" alt="Hi" style="height: 52px; width: 53px;">
                              </td>
                              <td style="vertical-align: top; background-color: rgb(0, 51, 102);">&nbsp;&nbsp;&nbsp;
                              <br>
                              </td>
                              </tr>

                              <tr>
                              <td style="vertical-align: top; background-color: rgb(0, 51, 102);">
                  				<br>
                              </td>

                              <td align=center style="vertical-align: top;">

                              <br /><br /><br />


										<!----- YOU GUI CODE GOES HERE ----->

                                      <br>
                              </td>
                              <td style="vertical-align: top; background-color: rgb(0, 51, 102);">
                  				<br>
                              </td>
                              </tr>

                              <tr>
                              <td style="vertical-align: top; background-color: rgb(0, 51, 102);" rowspan="1" colspan="3">
                  				<br>
                              </td>

                  			<td></td>

                  			<td></td>
                              </tr>
                              </tbody>
                             </table>

                  <input type ="hidden" name ="logoutExitPage" value ="/home.jsp">
              </form>
    </body>
</html>