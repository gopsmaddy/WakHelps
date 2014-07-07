<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>

<%-- Defines the Page Footer sub-view. --%>
<f:subview id="pageFooter">

<%-- Forces column span and enables view definition using included JSP fragments. --%>
<f:verbatim></td></tr><tr><td colspan="2"></f:verbatim>

<%-- Positions the features. --%>
<h:panelGrid columns="1"
             styleClass="panel-features-surround-justified"
             columnClasses="panel-feature"
             border="0" cellpadding="0" cellspacing="0">

    <%-- Positions the footer rule spacing above features. --%>
    <h:panelGrid columns="1"
                 styleClass="panel-features-surround-justified"
                 columnClasses="panel-feature-footer-rule-spacing-above"
                 border="0" cellpadding="0" cellspacing="0">

        <%-- Applies padding above the footer rule. --%>
        <h:graphicImage url="../img/util/blank.gif" width="1" height="1"/>

    </h:panelGrid>
    <%-- /Positions the footer rule spacing above features. --%>

    <%-- Positions the footer rule features. --%>
    <h:panelGrid columns="1"
                 styleClass="panel-features-surround-justified"
                 columnClasses="panel-feature-footer-rule"
                 border="0" cellpadding="0" cellspacing="0">

        <%-- Applies padding above the footer rule. --%>
        <h:graphicImage url="../img/util/blank.gif" width="1" height="1"/>

    </h:panelGrid>
    <%-- /Positions the footer rule features. --%>

    <%-- Positions the footer rule spacing below features. --%>
    <h:panelGrid columns="1"
                 styleClass="panel-features-surround-justified"
                 columnClasses="panel-feature-footer-rule-spacing-below"
                 border="0" cellpadding="0" cellspacing="0">

        <%-- Applies padding above the footer rule. --%>
        <h:graphicImage url="../img/util/blank.gif" width="1" height="1"/>

    </h:panelGrid>
    <%-- /Positions the footer rule spacing below features. --%>

    <%-- Positions the footer features. --%>
    <h:panelGrid columns="3"
                 styleClass="panel-features-surround-justified"
                 columnClasses="panel-feature-justified-50pc, panel-feature-footer-surround, panel-feature-justified-50pc"
                 border="0" cellpadding="0" cellspacing="0">

        <%-- Centers the features. --%>
        <f:verbatim></f:verbatim>

        <%-- Positions the features. --%>
        <h:panelGrid columns="1"
                     styleClass="panel-features-surround"
                     columnClasses="panel-feature-footer"
                     border="0" cellpadding="0" cellspacing="0">

            <%-- Displays the copyright message. --%>
            <h:outputText
                    value="&copy;2010 Aconite Technology Ltd. All rights reserved"
                    escape="false"
                    styleClass="text-footer text-nowrap"/>

            <%-- Positions the features. --%>
            <h:panelGrid columns="3"
                         styleClass="panel-features-surround"
                         columnClasses="panel-feature, panel-feature-footer-spacing, panel-feature"
                         border="0" cellpadding="0" cellspacing="0">

                <%-- Displays the aconite footer logo. --%>
                <h:graphicImage url="../img/footer/logo.gif" width="61"
                                height="18"
                                styleClass="image-borderless"/>

                <%-- Applies padding between the logo and copyright message. --%>
                <f:verbatim></f:verbatim>

                <%-- Displays the copyright message. --%>
                <h:outputText
                        value=" Business Innovation Through Technology"
                        styleClass="text-footer text-nowrap"/>

            </h:panelGrid>
            <%-- /Positions the features. --%>

        </h:panelGrid>
        <%-- /Positions the features. --%>

        <%-- Centers the features. --%>
        <f:verbatim></f:verbatim>

    </h:panelGrid>
    <%-- /Positions the footer features. --%>

</h:panelGrid>
<%-- /Positions the features. --%>

<%-- Forces column span and enables view definition using included JSP fragments. --%>
<f:verbatim></td></tr></table></f:verbatim>

</f:subview>
<%-- /Defines the Page Footer sub-view. --%>