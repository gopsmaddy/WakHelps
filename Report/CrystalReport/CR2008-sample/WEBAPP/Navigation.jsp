<%@ page import="java.util.ResourceBundle"%>
<%@ page import="com.platform7.affina.operations.utils.CommonNavigation"%>
<% ResourceBundle rb = (ResourceBundle)session.getAttribute("ResourceBundle"); %>

 <table cellspacing=0 cellpadding=0 border=0  align="center" width="970" height="28">
    <tbody>
        <tr>
            <td id="ip_1" width="11" background="images/tabs_border_leftside_light.gif"></td>

            <td NOWRAP id="ip_2" background="images/tabs_border_leftside_light.gif">
                <div align="center">
                    <font class="fixedfont" id="ip_f" face="Arial, Helvetica, sans-serif" size="2" color="#003366">
                        <label onClick="return clickreturnvalue()" onMouseover="dropdownmenu(this, event, inputFileTrackingMenu, '150px','ip_1','ip_2','ip_3','ip_f')" onMouseout="delayhidemenu('ip_1','ip_2','ip_3','ip_f')">
                            <b><%=rb.getString("Input.File")%></b>
                        </label>
                    </font>
                </div>
            </td>

            <td id="ip_3" background="images/tabs_border_righside_light.gif" width="11">&nbsp;</td>

            <td id="op_1" background="images/tabs_border_leftside_light.gif" width="11"></td>

            <td NOWRAP id="op_2" background="images/tabs_border_leftside_light.gif">
                <div align="center">
                    <font class="fixedfont" id="op_f" size="2" face="Arial, Helvetica, sans-serif" color="#003366">
                        <label onClick="return clickreturnval" onMouseover="dropdownmenu(this, event, outputFileTrackingMenu, '150px','op_1','op_2','op_3','op_f')" onMouseout="delayhidemenu('op_1','op_2','op_3','op_f')">
                            <b><%=rb.getString("Output.File")%></b>
                        </label>
                    </font>
                </div>
            </td>

            <td id="op_3" background="images/tabs_border_righside_light.gif" width="11">&nbsp;</td>

            <td id="rq_1" background="images/tabs_border_leftside_light.gif" width="11">&nbsp;</td>

            <td NOWRAP id="rq_2" background="images/tabs_border_leftside_light.gif">
                <font class="fixedfont" id="rq_f" size="2" face="Arial, Helvetica, sans-serif" color="#003366">
                    <label onClick="return clickreturnvalue()" onMouseOver="dropdownmenu(this, event, requestQueryMenu, '150px','rq_1','rq_2','rq_3','rq_f')" onmouseout="delayhidemenu('rq_1','rq_2','rq_3','rq_f')">
                        <b><%=rb.getString("Requests")%></b>
                    </label>
                </font>
            </td>

            <td id="rq_3" background="images/tabs_border_righside_light.gif" width="11">&nbsp;</td>

            <td id="sd_1" background="${SelectedMenu eq 'StagedDelivery' ? 'images/tabs_border_leftside_dark.gif' : 'images/tabs_border_leftside_light.gif' }" width="11">&nbsp;</td>

            <td NOWRAP id="sd_2" background="${SelectedMenu eq 'StagedDelivery' ? 'images/tabs_border_leftside_dark.gif' : 'images/tabs_border_leftside_light.gif'}">
                <font class="fixedfont" id="sd_f" size="2" face="Arial, Helvetica, sans-serif" color="${SelectedMenu eq 'StagedDelivery' ? '#FFFFFF' : '#003366'}">
                    <label onClick="return clickreturnvalue()" onMouseOver="dropdownmenu(this, event, stagedDeliveryMenu, '150px','sd_1','sd_2','sd_3','sd_f')" onmouseout="${SelectedMenu eq 'StagedDelivery' ? 'delayhidemenu1()' : 'delayhidemenu(\'sd_1\',\'sd_2\',\'sd_3\',\'sd_f\')'}">
                        <b><%=rb.getString("Staged.Delivery")%></b>
                    </label>
                </font>
            </td>

            <td id="sd_3" background="${SelectedMenu eq 'StagedDelivery' ? 'images/tabs_border_rightside_dark.gif' : 'images/tabs_border_righside_light.gif'}" width="11">&nbsp;</td>

            <td id="lb_1" background="images/tabs_border_leftside_light.gif" width="11">&nbsp;</td>

            <td NOWRAP id="lb_2" background="images/tabs_border_leftside_light.gif">
                <font class="fixedfont" id="lb_f" face="Arial, Helvetica, sans-serif" size="2" color="#003366">
                    <label onClick="return clickreturnvalue()" onMouseover="dropdownmenu(this, event, logBrowsingMenu, '150px','lb_1','lb_2','lb_3','lb_f')" onMouseout="delayhidemenu('lb_1','lb_2','lb_3','lb_f');">
                        <b><%=rb.getString("Log.Browsing")%></b>
                    </label>
                </font>
            </td>

            <td id="lb_3" background="images/tabs_border_righside_light.gif" width="11">&nbsp;</td>
            <td id="pc_1" background="images/tabs_border_leftside_light.gif" width="11">&nbsp;</td>

            <td NOWRAP id="pc_2" background="images/tabs_border_leftside_light.gif">
                <font class="fixedfont" id="pc_f" size="2" face="Arial, Helvetica, sans-serif" color="#003366">
                    <label onClick="return clickreturnvalue()" onMouseover="dropdownmenu(this, event, productConfigurationMenu, '150px','pc_1','pc_2','pc_3','pc_f')" onMouseout="delayhidemenu('pc_1','pc_2','pc_3','pc_f')">
                        <b><%=rb.getString("Product.Configuration")%></b>
                    </label>
                 </font>
            </td>

            <td id="pc_3" background="images/tabs_border_righside_light.gif" width="11">&nbsp;</td>
            <td id="wf_1" background="images/tabs_border_leftside_light.gif" width="11">&nbsp;</td>

            <td NOWRAP id="wf_2" background="images/tabs_border_leftside_light.gif">
                <font class="fixedfont" id="wf_f" size="2" face="Arial, Helvetica, sans-serif" color="#003366">
                    <label  onClick="return clickreturnvalue()" onMouseover="dropdownmenu(this, event, workflowControlMenu, '150px','wf_1','wf_2','wf_3','wf_f')" onMouseout="delayhidemenu('wf_1','wf_2','wf_3','wf_f')">
                        <b><%=rb.getString("Workflow")%></b>
                    </label>
                </font>
            </td>

            <td id="wf_3" background="images/tabs_border_righside_light.gif" width="11">&nbsp;</td>
            <td id="rp_1" background="images/tabs_border_leftside_light.gif" width="11">&nbsp;</td>

            <td NOWRAP id="rp_2" background="images/tabs_border_leftside_light.gif">
                <font class="fixedfont" id="rp_f" size="2" face="Arial, Helvetica, sans-serif" color="#003366">
                    <label onClick="return clickreturnvalue()" onMouseover="dropdownmenu(this, event, reportingMenu, '150px','rp_1','rp_2','rp_3','rp_f')" onMouseout="delayhidemenu('rp_1','rp_2','rp_3','rp_f')">
                        <b><%=rb.getString("Report")%></b>
                    </label>
                </font>
            </td>

            <td id="rp_3" background="images/tabs_border_righside_light.gif" width="11">&nbsp;</td>
            <td id="db_1" background="images/tabs_border_leftside_light.gif" width="11">&nbsp;</td>

            <td NOWRAP id="db_2" background="images/tabs_border_leftside_light.gif">
                <font class="fixedfont" id="db_f" size="2" face="Arial, Helvetica, sans-serif" color="#003366">
                    <label  onClick="return clickreturnvalue()" onMouseover="dropdownmenu(this, event, dataBaseMenu, '150px','db_1','db_2','db_3','db_f')" onMouseout="delayhidemenu('db_1','db_2','db_3','db_f')">
                        <b><%=rb.getString("Database")%></b>
                    </label>
                </font>
            </td>

            <td id="db_3" background="images/tabs_border_righside_light.gif" width="11">&nbsp;</td>
            <td id="rw_1" background="images/tabs_border_leftside_light.gif" width="11">&nbsp;</td>

            <td NOWRAP id="rw_2" background="images/tabs_border_leftside_light.gif">
                <font class="fixedfont" id="rw_f" size="2" face="Arial, Helvetica, sans-serif" color="#003366">
                    <label  onClick="return clickreturnvalue()" onMouseover="dropdownmenu(this, event, recoveryMenu, '150px','rw_1','rw_2','rw_3','rw_f')" onMouseout="delayhidemenu('rw_1','rw_2','rw_3','rw_f')">
                        <b><%=rb.getString("Recovery")%></b>
                    </label>
                </font>
            </td>

            <td id="rw_3" background="images/tabs_border_righside_light.gif" width="11">&nbsp;</td>
            <td width="5"></td>

            <td width="30">
                <a href = "javascript:history.back()" STYLE="TEXT-DECORATION: NONE">
                    <IMG height=14 alt="" src="images/button_arrow_back.gif" width=16 align=middle border=0>
                </a>
            </td>

            <td >
                <a href = "javascript:history.back()" STYLE="TEXT-DECORATION: NONE">
                    <font class="fixedfont" size="2" face="Arial, Helvetica, sans-serif" color="#0000ff">
                        <b><%=rb.getString("Back")%></b>
                    </font>
                </a>
             </td>
        </tr>
    </tbody>
 </table>
