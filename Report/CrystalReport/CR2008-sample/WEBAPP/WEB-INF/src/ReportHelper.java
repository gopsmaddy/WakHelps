package com.platform7.affina.operations.view.reports;

import com.crystaldecisions.reports.reportengineinterface.JPEReportSourceFactory;

import com.crystaldecisions.sdk.occa.report.data.Fields;
import com.crystaldecisions.sdk.occa.report.data.ParameterField;
import com.crystaldecisions.sdk.occa.report.data.ParameterFieldDiscreteValue;
import com.crystaldecisions.sdk.occa.report.data.Values;

import com.crystaldecisions.reports.sdk.*;
import com.crystaldecisions.sdk.occa.report.lib.*;
import com.crystaldecisions.report.web.viewer.*;

import com.crystaldecisions.sdk.occa.report.reportsource.IReportSource;
import com.platform7.affina.operations.utils.OpsHelper;
import com.platform7.standardinfrastructure.passwordencrypter.PasswordEncrypter;
import com.platform7.affina.operations.utils.OpsConstants;

import org.apache.log4j.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;


public class ReportHelper
{

    private static final Logger log = Logger.getLogger(ReportHelper.class);

    /**
     * Process crystal report dynamically
     * @param request - HttpServletRequest
     * @param response - HttpServletResponse
     * @throws ServletException - throws an exception
     * @throws IOException - throws an exception
     */
    public  void processReport(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        String reportName = (String)request.getSession().getAttribute(OpsConstants.REPORT_NAME);
        log.trace("ReportName: " + reportName);

        try
        {

            //Open report.
            ReportClientDocument reportClientDoc = new ReportClientDocument();
            reportClientDoc.open(reportName, 0);

            //Extract request parameter passed by user
            log.trace("Extracting request parameter...");
            Map<String,String> parameters = new HashMap<String,String>();
            parameters = getReportParameters(request, reportName, parameters);
            log.trace("After getReportParameters ("+reportName+") : "+parameters);

            //Set report parameters if any
            log.trace("Setting up parameter fields...");
            Fields fields = new Fields();
            fields = setParameters(request, reportName, parameters, fields);

            //Store the report source in session, will be used by the CrystalReportViewer.
            request.getSession().setAttribute("reportSource", reportClientDoc.getReportSource());

            //Launch CrystalReportViewer page that contains the report viewer.
            //response.sendRedirect("CrystalReportViewer.jsp");

            CrystalReportViewer viewer = new CrystalReportViewer();
            viewer.setOwnPage(true);
            viewer.setOwnForm(true);
            viewer.setPrintMode(CrPrintMode.ACTIVEX);
            viewer.setEnableLogonPrompt(false);
            viewer.setHasRefreshButton(false);
            viewer.setEnableParameterPrompt(false);
            viewer.setReuseParameterValuesOnRefresh(true);
            viewer.setParameterFields(fields);

            //Get the report source object that this viewer will be displaying.
            Object reportSource = request.getSession().getAttribute("reportSource");
            viewer.setReportSource(reportSource);

            //Render the report.
            viewer.processHttpRequest(request, response, request.getSession().getServletContext(), null);
            viewer.dispose();

        }
        catch(ReportSDKException ex)
        {
            log.error("ReportSDKException: " + ex);
        }
        catch(Exception ex)
        {
            log.error("Exception: " + ex);
        }
    }

    /**
     * Extract request parameter passed by user
     * @param request - HttpServletRequest
     * @param reportName - report name
     * @param parameters - parameters
     * @return - parameter map
     */
    private  Map<String,String> getReportParameters(HttpServletRequest request, String reportName, Map<String,String> parameters){

        String repBureauName = request.getParameter(OpsConstants.PARAMETER_BUREAU);

        String fromTimeStamp = request.getParameter(OpsConstants.PARAMETER_START_DATE);
        if(fromTimeStamp != null && !fromTimeStamp.equalsIgnoreCase("null"))
        {
            fromTimeStamp = OpsHelper.convertUSDateFormat(fromTimeStamp);
        }

        String toTimeStamp = request.getParameter(OpsConstants.PARAMETER_END_DATE);
        if(toTimeStamp != null && !toTimeStamp.equalsIgnoreCase("null"))
        {
            toTimeStamp = OpsHelper.convertUSDateFormat(toTimeStamp);
        }

        String reportGenerator = (String)request.getSession().getAttribute(OpsConstants.PARAMETER_USER_NAME);
        if(reportGenerator == null || reportGenerator.equals(OpsConstants.NULL))
        {
            reportGenerator = OpsConstants.EMPTY;
        }

        log.trace("Parameters=["+OpsConstants.PARAMETER_BUREAU + ": " + repBureauName
                + "; " + OpsConstants.PARAMETER_START_DATE + " : " + fromTimeStamp
                + "; " + OpsConstants.PARAMETER_END_DATE + " : " + toTimeStamp
                + "; " + OpsConstants.PARAMETER_USER_NAME + " : " + reportGenerator+"]");

        parameters.put(OpsConstants.CR_ARG_USER_NAME, reportGenerator);

        //if(!reportName.equals(OpsConstants.CR_PRODUCT_CARD_STATUS_REPORT) && !reportName.equals(OpsConstants.CR_HOT_CARD_REPORT))
        if(reportName.equals(OpsConstants.CR_PRODUCT_CARD_STATUS_REPORT) || reportName.equals(OpsConstants.CR_HOT_CARD_REPORT) || reportName.equals(OpsConstants.CR_NKAM_BLACKLISTED_APPLICATION_REPORT) ||  reportName.equals(OpsConstants.CR_NKAM_ALL_SAMS_REPORT))
        {
            //These reports do not have any input parameters
        }
        else
        {
            parameters.put(OpsConstants.CR_ARG_START_DATE, fromTimeStamp);
            parameters.put(OpsConstants.CR_ARG_END_DATE, toTimeStamp);

            if(reportName.equals(OpsConstants.CR_BUREAU_STATUS_REPORT))
            {
                parameters.put(OpsConstants.CR_ARG_BUREAU, repBureauName);
            }
        }

        return parameters;
    }

    /**
     * Set parameter for report
     * @param request - HttpServletRequest
     * @param reportName - name of the report
     * @param parameters - parameter list
     * @param fields - parameter list
     * @throws ServletException - throws ServletException
     * @throws IOException - throws IOException
     * @return - fields - Fields
     */
    private  Fields setParameters(HttpServletRequest request, String reportName, Map<String,String> parameters, Fields fields) throws ServletException, IOException
    {

        Object localFields = getParameterFields(request, parameters, reportName);

        if(localFields == null)
        {
            ParameterFieldDiscreteValue parameterFieldDisValue;
            ParameterField parameterField;
            Values values;
            SimpleDateFormat sdf = new SimpleDateFormat(OpsConstants.CR_DATE_FORMAT);
            Calendar cal = Calendar.getInstance();
            //Set the main report parameters
            for(String key : parameters.keySet())
            {
                parameterField = new ParameterField();
                values = new Values();
                parameterFieldDisValue = new ParameterFieldDiscreteValue();
                parameterField.setName(key);
                parameterField.setReportName(OpsConstants.EMPTY);

                if( (key.equalsIgnoreCase(OpsConstants.CR_ARG_START_DATE) || key.equalsIgnoreCase(OpsConstants.CR_ARG_END_DATE))
                        && parameters.get(key) != null && !parameters.get(key).equalsIgnoreCase("null"))
                {

                    try
                    {
                        Date myDate = sdf.parse(parameters.get(key));
                        cal.setTime (myDate);
                        //Add a day - one minute
                        if(key.equalsIgnoreCase(OpsConstants.CR_ARG_END_DATE))
                        {
                            //cal.add(Calendar.MINUTE, 719);
                            cal.add(Calendar.DATE, 1);
                            cal.add(Calendar.MILLISECOND, -1);
                        }
                        parameterFieldDisValue.setValue(cal.getTime());
                    }
                    catch(ParseException pe)
                    {
                        log.trace(pe);
                    }
                }
                else
                {

                    parameterFieldDisValue.setValue(parameters.get(key));
                }
                values.add(parameterFieldDisValue);
                parameterField.setCurrentValues(values);
                fields.add(parameterField);
            }
        }
        else
        {
            fields = (Fields) localFields;
        }

        log.trace("Setting field values into the session {Report:"+reportName+", SessionKey:"+reportName+"_fields}");
        //Save the parameter fields in the session
        //request.getSession().setAttribute("fields", fields);
        request.getSession().setAttribute(reportName+"_fields", fields);
        request.getSession().setAttribute(OpsConstants.PREV_PARAMETER_MAP, parameters);
        request.getSession().setAttribute(OpsConstants.PREV_REPORT_NAME, reportName);

        return fields;
    }

    /**
     * Determine whether need to replace with new parameters or report is being refreshed
     * @param request - HttpServletRequest
     * @param parameters - parameter list
     * @param reportName - current report name
     * @return - return parameter values
     */
    private  Object getParameterFields(HttpServletRequest request, Map<String,String> parameters, String reportName)
    {

        //Object localFields = request.getSession().getAttribute("fields");
        Object localFields = request.getSession().getAttribute(reportName+"_fields");
        log.trace("Getting field values from the session {Report:"+reportName+", SessionKey:"+reportName+"_fields}");
        Map<String,String> oldParameters = null;
        Object temp = request.getSession().getAttribute(OpsConstants.PREV_PARAMETER_MAP);
        if(temp != null)
        {
            oldParameters = (Map<String,String>)temp;
        }
        String prevReportName = (String)request.getSession().getAttribute(OpsConstants.PREV_REPORT_NAME);

        if(prevReportName == null || !prevReportName.equals(reportName))
        {
            localFields = null;
        }
        else if(localFields != null && oldParameters != null)
        {
            for(String key : parameters.keySet())
            {
                for(String oldKey : oldParameters.keySet())
                {
                    if(key.equals(oldKey) && parameters.get(key) != null && !parameters.get(key).equalsIgnoreCase(oldParameters.get(oldKey)))
                    //if(key.equals(oldKey) && oldParameters.get(oldKey) != null && !oldParameters.get(oldKey).equalsIgnoreCase(parameters.get(key)))
                    {
                        localFields = null;
                        break;
                    }
                }
            }
        }
        if(localFields == null)
        {
            log.trace("Parameters need to be set...");
        }
        else
        {
            log.trace("Parameters need not to be set");
        }
        return localFields;
    }

    /*
    public  void xprocessReport(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        String reportName = (String)request.getSession().getAttribute(OpsConstants.REPORT_NAME);
        log.trace("ReportName: " + reportName);

        try
        {
            IReportSource reportSource = (IReportSource) new JPEReportSourceFactory().createReportSource(reportName, request.getLocale());
            ReportClientDocument reportClientDocument = new ReportClientDocument();

            if(reportSource == null)
            {
                 reportClientDocument = new ReportClientDocument();
            }

            log.trace("Going to open ReportClientDocument...");
            reportClientDocument.open(reportName, 0);                       

            //Extract request parameter passed by user
            log.trace("Extracting request parameter...");
            Map<String,String> parameters = new HashMap<String,String>();
            parameters = getReportParameters(request, reportName, parameters);
            log.trace("After getReportParameters ("+reportName+") : "+parameters);

            //Set report parameters if any
            log.trace("Setting up parameter fields...");
            Fields fields = new Fields();
            fields = setParameters(request, reportName, parameters, fields);

            request.getSession().setAttribute("reportSource", reportSource);
            reportSource = (IReportSource)request.getSession().getAttribute("reportSource");

            CrystalReportViewer crystalReportViewer = new CrystalReportViewer();
            crystalReportViewer.setReportSource(reportSource);
            crystalReportViewer.setParameterFields(fields);
            crystalReportViewer.setOwnPage(OpsConstants.BOOLEAN_TRUE);
            crystalReportViewer.setOwnForm(OpsConstants.BOOLEAN_TRUE);
            crystalReportViewer.setPrintMode(CrPrintMode.ACTIVEX);

            if (request.getSession().getAttribute("refreshed") == null)
            {
                crystalReportViewer.refresh();
                request.getSession().setAttribute("refreshed", OpsConstants.STR_TRUE);
            }

            crystalReportViewer.setEnableLogonPrompt(OpsConstants.BOOLEAN_FALSE);
            crystalReportViewer.setHasRefreshButton(OpsConstants.BOOLEAN_FALSE);
            crystalReportViewer.refresh();
            crystalReportViewer.setEnableParameterPrompt(OpsConstants.BOOLEAN_FALSE);
            crystalReportViewer.setReuseParameterValuesOnRefresh(OpsConstants.BOOLEAN_TRUE);

            log.trace("Display report...");
            crystalReportViewer.processHttpRequest(request, response, request.getSession().getServletContext(), response.getWriter());
            crystalReportViewer.dispose();

        }
        catch(ReportSDKException e)
        {
            log.error("ReportSDKException: " + e);
        }
        catch(Exception e)
        {
            log.error("Exception: " + e);
        }
    }
    */
    /**
     * Set up database properties
     * @param reportClientDocument - ReportClientDocument
     * @param finalURL - URL to connect
     * @param repUserName - user name
     * @param repPassWord - encrypted password
     * @throws ReportSDKException - throws an exception
     */
    /*
    private  void setDatabaseProperties(ReportClientDocument reportClientDocument, String finalURL, String repUserName, String repPassWord) throws ReportSDKException{

        log.trace("Enter - setDatabaseProperties()...");

        Tables tablesCollection = reportClientDocument.getDatabaseController().getDatabase().getTables();

        if(tablesCollection != null && !tablesCollection.isEmpty())
        {
            PropertyBag innerPropertyBagObj;
            PropertyBag outerPropertyBagObj;
            ITable originalTable;
            ITable changedTable;
            IConnectionInfo changedTableConnectionInfo;

            for(int i = 0; i < tablesCollection.size(); i++)
            {
                innerPropertyBagObj = tablesCollection.getTable(i).getConnectionInfo().getAttributes();
                //innerPropertyBagObj.putStringValue("URI", "!oracle.jdbc.driver.OracleDriver!jdbc:oracle:oci8:{userid}/{password}@pmateng!ServerType=27!QuoteChar=\"");
                innerPropertyBagObj.putStringValue("URI", finalURL);
                //trial
                innerPropertyBagObj.put("Server Type", OpsConstants.JDBC_JNDI);
                innerPropertyBagObj.put("Use JDBC", OpsConstants.STR_TRUE);
                innerPropertyBagObj.put("Database DLL", OpsConstants.DATABASE_DLL);
                innerPropertyBagObj.put("Initial Context Factory", OpsConstants.INITIAL_CONTEXT_FACTORY);

                originalTable = tablesCollection.getTable(i);
                changedTable  = tablesCollection.getTable(i);
                changedTableConnectionInfo = changedTable.getConnectionInfo();

                outerPropertyBagObj = changedTableConnectionInfo.getAttributes();
                changedTableConnectionInfo.setAttributes(outerPropertyBagObj);
                changedTableConnectionInfo.setUserName(repUserName);
                changedTableConnectionInfo.setPassword(repPassWord);
                changedTable.setConnectionInfo(changedTableConnectionInfo);

                reportClientDocument.getDatabaseController().setTableLocation(originalTable, changedTable);
            }
        }

        log.trace("Exit -setDatabaseProperties()...");
    }
    */


    /**
     * Set sub reports for main report
     * @param reportClientDocument - ReportClientDocument
     * @param reportName - report name
     * @param finalURL - database url
     * @param repUserName - user name
     * @param repPassWord - encrypted password
     * @throws ReportSDKException - throws ReportSDKException
     * @return - ReportClientDocument - return ReportClientDocument
     */
    /*
    private  ReportClientDocument setSubReport(ReportClientDocument reportClientDocument, String reportName, String finalURL, String repUserName, String repPassWord) throws ReportSDKException
    {

        log.trace("Setting up Sub Reports...");

        if(reportName.equals(OpsConstants.CR_BUREAU_STATUS_REPORT))
        {

            String[] subReports = {OpsConstants.CR_SUB_REPORT_STATISTICS, OpsConstants.CR_SUB_REPORT_UNDELIVERED,
                                    OpsConstants.CR_SUB_REPORT_AT_BUREAU, OpsConstants.CR_SUB_REPORT_FAILED};

            for (int j = 0; j < subReports.length; j++)
            {
                ISubreportClientDocument subReportClientDoc = reportClientDocument.getSubreportController().getSubreport(subReports[j]);
                com.crystaldecisions.reports.sdk.DatabaseController databaseController = subReportClientDoc.getDatabaseController();

                Tables tables = databaseController.getDatabase().getTables();

                for (int a = 0; a < tables.size(); a++)
                {
                    ITable table = tables.getTable(a);
                    table.setName(table.getName());
                    table.setAlias(table.getAlias());
                    table.setQualifiedName(table.getName());
                    IConnectionInfo connectionInfo = table.getConnectionInfo();
                    PropertyBag innerProp = connectionInfo.getAttributes();
                    innerProp.clear();
                    //Set new table connection property attributes.
                    PropertyBag propertyBag = new PropertyBag();
                    propertyBag.putStringValue("URI", finalURL);
                    propertyBag.put("Server Type", OpsConstants.JDBC_JNDI);
                    propertyBag.put("Use JDBC", OpsConstants.STR_TRUE);
                    propertyBag.put("Database DLL", OpsConstants.DATABASE_DLL);
                    propertyBag.put("Initial Context Factory", OpsConstants.INITIAL_CONTEXT_FACTORY);

                    connectionInfo.setAttributes(propertyBag);
                    connectionInfo.setUserName(repUserName);
                    connectionInfo.setPassword(repPassWord);

                    table.setConnectionInfo(connectionInfo);
                    databaseController.setTableLocation(table, tables.getTable(a));
                }
            }
        }

        return reportClientDocument;
    }
    */
    /**
     * Finally display crystal report
     * @param request - HttpServletRequest
     * @param response - HttpServletResponse
     * @param reportClientDocument - ReportClientDocument
     * @param reportSource - IReportSource
     * @param fields - Fields
     * @throws ReportSDKExceptionBase - throws an ReportSDKExceptionBase
     * @throws IOException - throws an IOException
     */
    /*
    private  void displayReport(HttpServletRequest request, HttpServletResponse response, ReportClientDocument reportClientDocument,
        IReportSource reportSource, Fields fields) throws ReportSDKExceptionBase, IOException{

        reportSource = reportClientDocument.getReportSource();
        request.getSession().setAttribute("reportSource", reportSource);
        reportSource = (IReportSource)request.getSession().getAttribute("reportSource");

        CrystalReportViewer crystalReportViewer = new CrystalReportViewer();
        crystalReportViewer.setReportSource(reportSource);
        crystalReportViewer.setParameterFields(fields);
        crystalReportViewer.setOwnPage(OpsConstants.BOOLEAN_TRUE);
        crystalReportViewer.setOwnForm(OpsConstants.BOOLEAN_TRUE);
        crystalReportViewer.setPrintMode(CrPrintMode.ACTIVEX);

        if (request.getSession().getAttribute("refreshed") == null){
            crystalReportViewer.refresh();
            request.getSession().setAttribute("refreshed", OpsConstants.STR_TRUE);
        }

        crystalReportViewer.setEnableLogonPrompt(OpsConstants.BOOLEAN_FALSE);
        crystalReportViewer.setHasRefreshButton(OpsConstants.BOOLEAN_TRUE);
        crystalReportViewer.refresh();
        crystalReportViewer.setEnableParameterPrompt(OpsConstants.BOOLEAN_FALSE);
        crystalReportViewer.setReuseParameterValuesOnRefresh(OpsConstants.BOOLEAN_TRUE);
        crystalReportViewer.processHttpRequest(request, response, request.getSession().getServletContext(), response.getWriter());
        crystalReportViewer.dispose();
    }
    */
    /**
     * Process crystal report dynamically
     * @param request - HttpServletRequest
     * @param response - HttpServletResponse
     * @throws ServletException - throws an exception
     * @throws IOException - throws an exception
     */
    /*
    public  void processReport_old(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        String reportName = (String)request.getSession().getAttribute(OpsConstants.REPORT_NAME);
        log.trace("ReportName: " + reportName);

        try
        {
            String repUserName = System.getProperty(OpsConstants.REPORT_USER_NAME);
            String repPassWord = System.getProperty(OpsConstants.REPORT_PASSWORD);
            repPassWord = new PasswordEncrypter().decryptPassword(repPassWord);

            String dataBaseConnection = System.getProperty(OpsConstants.DATABASE_CONNECTION);

            StringTokenizer st = new StringTokenizer(dataBaseConnection,"@");
            String url1 = st.nextToken();
            String url2 = null;
            while (st.hasMoreTokens()) {
                url2 = st.nextToken(",");
            }

            String finalURL = "!oracle.jdbc.driver.OracleDriver!" + url1 + "{userid}/{password}" + url2 + "!ServerType=5!QuoteChar=\"";

            IReportSource reportSource = (IReportSource) new JPEReportSourceFactory().createReportSource(reportName, request.getLocale());
            ReportClientDocument reportClientDocument = new ReportClientDocument();

            if(reportSource == null){
                 reportClientDocument = new ReportClientDocument();
            }

            log.trace("Going to open ReportClientDocument...");
            reportClientDocument.open(reportName, 0);

            //Step - 1. Extract request parameter passed by user
            log.trace("Extracting request parameter...");
            Map<String,String> parameters = new HashMap<String,String>();
            parameters = getReportParameters(request, reportName, parameters);

            //Step - 2. Set up database properties
            log.trace("Setting up database properties...");
            setDatabaseProperties(reportClientDocument, finalURL, repUserName, repPassWord);

            //Step - 3. Set report parameters if any
            log.trace("Setting up parameter fields...");
            Fields fields = new Fields();
            fields = setParameters(request, reportName, parameters, fields);
            //Step - 4. Set sub reports for main report if any
            reportClientDocument = setSubReport(reportClientDocument, reportName, finalURL, repUserName, repPassWord);

            //Step - 5. Finally display report
            displayReport(request, response, reportClientDocument, reportSource,  fields);

        }catch(ReportSDKException e){
            log.error("ReportSDKException: " + e);
        }catch(Exception e){
            log.error("Exception: " + e);
        }
    }
    */
}
