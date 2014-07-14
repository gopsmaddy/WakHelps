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
        <script type="text/javascript" src="javascripts/deliveryProgress.js"></script>
    </head>

    <body>
        <jsp:include page="Header.jsp" />
        <br />

         <form name="CommonForm" method="GET">

                 <input type="hidden" name="Query" value="Delivery_Progress" />
                 <input type="hidden" name="PAGE_ID" value="" />
                 <input type="hidden" name ="SCOPE_CHANGED" value ="false" />
                 <input type="hidden" name="LogSelected" value="" />

                <jsp:include page="Navigation.jsp" />
				<input type ="hidden" name ="logoutExitPage" value ="/home.jsp">
        </form>

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
                                    <br />
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

                              <br /><br />
                              <c:set var="recordList" scope="page" value="${theresult}" />

                                <c:choose>

                                    <c:when test="${not empty recordList}">

                                        <table id="dptable" class="deliveryprogress">
                                            <thead id="dphead" class="dpheadclass">
                                                <tr>
                                                    <th>OID</th>
                                                    <th>Scope Name</th>
                                                    <th>Area Name</th>
                                                    <th>Destination Id</th>
                                                    <th>Parked</th>
                                                    <th>Suspended</th>
                                                    <th>State</th>
                                                </tr>
                                            </thead>

                                            <tbody id="dpbody" class="dpbodyclass">
                                                <c:forEach var="record" items="${recordList}" varStatus="recSts">
                                                    <c:choose>
                                                        <c:when test="${(recSts.count) % 2 == 0}">
                                                    		    <tr class="even">
                                                    	</c:when>
                                                    	<c:otherwise>
                                                    	    <tr class="odd">
                                                    	</c:otherwise>
                                                    </c:choose>


                                                        <td class="dpdata">${record.OID}</td>
                                                        <td class="dpdata">${record.SCOPE_NAME}</td>
                                                        <td class="dpdata">${record.AREA_NAME}</td>
                                                        <td class="dpdata">${record.DESTINATION_ID}</td>
                                                        <td class="dpdata">
                                                           <c:choose>
                                                                <c:when test="${record.PARKED eq '1'}">
                                                                    Yes
                                                                </c:when>
                                                                <c:otherwise>
                                                                    No
                                                                </c:otherwise>
                                                           </c:choose>
                                                        </td>

                                                        <td class="dpdata">
                                                            <c:choose>
                                                                <c:when test="${record.SUSPENDED eq '1'}">
                                                                    Yes
                                                                </c:when>
                                                                <c:otherwise>
                                                                    No
                                                                </c:otherwise>
                                                            </c:choose>
                                                        </td>
                                                        <td class="dpdata">${record.STATE}</td>

                                                        <td class="buttontd">
                                                            <button ${record.SUSPENDED eq '1' ? 'Disabled="Disabled"' : ''} name="theAction" type="button" onClick="suspenResume('Suspend', '${record.OID}', '${record.SERVICE_NAME}');">
                                                                Suspend
                                                            </button>
                                                        </td>
                                                        <td class="buttontd">
                                                            <button ${record.SUSPENDED eq '0' ? 'Disabled="Disabled"' : ''} name="theAction" type="button" onClick="suspenResume('Resume', '${record.OID}', '${record.SERVICE_NAME}');">
                                                                Resume
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </c:forEach>

                                            </tbody>
                                        </table>

                                    </c:when>

                                     <c:otherwise>
                                        <span id="noProgress">There are no delivery requests currently being processed.</span>
                                        <br />
                                     </c:otherwise>

                                </c:choose>

                                      <br />
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