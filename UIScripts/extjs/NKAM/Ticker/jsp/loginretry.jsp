  <%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
  <%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
  <%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>

  <f:view>

  <jsp:include page="/jsp/documentHeader.jsp"/>

      <%-- Positions the work area features. --%>
      <h:panelGrid columns="3"
                   styleClass="panel-features-surround-justified"
                   columnClasses="panel-feature-justified-50pc, panel-feature-workarea, panel-feature-justified-50pc"
                   border="0" cellpadding="0" cellspacing="0">

          <%-- Centers the work area features. --%>
          <f:verbatim></f:verbatim>

          <%-- Positions the login sideline features. --%>
          <h:panelGrid columns="1"
                       styleClass="panel-features-surround"
                       columnClasses="panel-feature-login-sideline"
                       border="0" cellpadding="0" cellspacing="0">

              <%-- Positions the features. --%>
              <h:panelGrid columns="1"
                           styleClass="panel-features-surround"
                           columnClasses="panel-feature"
                           border="0" cellpadding="0" cellspacing="0">

                  <%-- Positions the login banner sideline features. --%>
                  <h:panelGrid columns="1"
                               styleClass="panel-feature-login-banner-sideline"
                               border="0" cellpadding="0" cellspacing="0">

                      <%-- Applies padding inside the banner. --%>
                      <h:graphicImage url="../img/util/blank.gif" width="1" height="1"/>

                  </h:panelGrid>

                  <%-- Positions the login banner features. --%>
                  <h:panelGrid columns="3"
                               styleClass="panel-features-surround-justified"
                               columnClasses="panel-feature-justified-50pc, panel-feature panel-feature-login-banner, panel-feature-justified-50pc"
                               border="0" cellpadding="0" cellspacing="0">

                      <%-- Centers the product name. --%>
                      <f:verbatim></f:verbatim>

                      <%-- Displays the product name message. --%>
                      <h:outputText value="NSAM Operator Interface"
                                    styleClass="text-header-productName text-nowrap"/>

                      <%-- Centers the product name. --%>
                      <f:verbatim></f:verbatim>

                  </h:panelGrid>
                  <%-- /Positions the login banner features. --%>

                  <%-- Positions the login banner sideline features. --%>
                  <h:panelGrid columns="1"
                               styleClass="panel-feature-login-banner-sideline"
                               border="0" cellpadding="0" cellspacing="0">

                      <%-- Applies padding inside the banner. --%>
                      <h:graphicImage url="../img/util/blank.gif" width="1" height="1"/>

                  </h:panelGrid>
                  <%-- /Positions the login banner sideline features. --%>

              </h:panelGrid>

              <%-- Positions the login form. --%>
              <h:panelGrid columns="3"
                           styleClass="panel-features-surround"
                           columnClasses="panel-feature-justified-50pc, panel-feature-login-form, panel-feature-justified-50pc"
                           border="0" cellpadding="0" cellspacing="0">

                  <%-- Padding. --%>
                  <f:verbatim></f:verbatim>

                      <h:panelGrid columns="1"
                                   styleClass="panel-features-surround"
                                   columnClasses="panel-feature-workarea-element text-centered"
                                   border="0" cellpadding="0" cellspacing="0">

                          <h:outputText value="Please enter your username and password to logon:"
                                        styleClass="text text-centered text-nowrap"/>

                          <%-- Login form --%>
                          <h:panelGroup>

                              <f:verbatim><table class="panel-features-surround-justified"
                                  border="0" cellpadding="0" cellspacing="0"></f:verbatim>

                              <f:verbatim><form method="POST" action="j_security_check"></f:verbatim>

                              <%-- Hides the login form construct. --%>
                              <f:verbatim><tr><td class="panel-feature"></f:verbatim>

                              <%-- Positions the features. --%>
                              <h:panelGrid columns="3"
                                           styleClass="panel-features-surround"
                                           columnClasses="panel-feature-justified-40pc, panel-feature, panel-feature-justified-60pc"
                                           border="0" cellpadding="0" cellspacing="0">

                                  <%-- Centers the form features. --%>
                                  <f:verbatim></f:verbatim>

                                  <%-- Positions the form features. --%>
                                  <h:panelGrid columns="2"
                                               styleClass="panel-features-surround"
                                               columnClasses="panel-feature-justified panel-feature-form-field-name, panel-feature-form-field-value"
                                               border="0" cellpadding="0" cellspacing="0">

                                      <h:outputText value="username:" styleClass="text-form-field"/>

                                      <f:verbatim><input type="text" name="j_username" value=""
                                                         class="form-input-text text-form-field"/></f:verbatim>

                                      <h:outputText value="password:" styleClass="text-form-field"/>

                                      <f:verbatim><input type="password" name="j_password" value=""
                                                         class="form-input-text text-form-field"/></f:verbatim>

                                  </h:panelGrid>

                                  <%-- Centers the form features. --%>
                                  <f:verbatim></f:verbatim>

                                  <%-- Centers the form features. --%>
                                  <f:verbatim></f:verbatim>

                                  <%-- Positions the features. --%>
                                  <h:panelGrid columns="3"
                                               styleClass="panel-features-surround-justified"
                                               columnClasses="panel-feature-justified-50pc, panel-feature panel-feature-form-field-name, panel-feature-justified-50pc"
                                               border="0" cellpadding="0" cellspacing="0">

                                      <f:verbatim>
                                           <tr align="center">
                                                <td colspan="3" class="text-warning"><font color="red">Login incorrect.  Please try again.</font></td>
                                           </tr>
                                      </f:verbatim>

                                      <%-- Centers the button. --%>
                                      <f:verbatim></f:verbatim>

                                      <%-- Displays the login button. --%>
                                      <f:verbatim><input type="submit" value="Logon"/></f:verbatim>

                                      <%-- Centers the button. --%>
                                      <f:verbatim></f:verbatim>

                                  </h:panelGrid>

                                  <%-- Centers the form features. --%>
                                  <f:verbatim></f:verbatim>

                              </h:panelGrid>

                              <%-- Hides the login form construct. --%>
                              <f:verbatim></td></tr></f:verbatim>

                              <f:verbatim></form></f:verbatim>

                              <%-- Hides the login form construct. --%>
                              <f:verbatim></table></f:verbatim>

                          </h:panelGroup>

                          <h:outputText value="Please login to access NSAM Operator Interface" escape="false" styleClass="text text-italic text-nowrap"/>

                      </h:panelGrid>

                  <%-- Padding. --%>
                  <f:verbatim></f:verbatim>

              </h:panelGrid>

              <%-- Positions the features. --%>
              <h:panelGrid columns="1"
                           styleClass="panel-features-surround"
                           columnClasses="panel-feature"
                           border="0" cellpadding="0" cellspacing="0">

                  <%-- Positions the login banner sideline features. --%>
                  <h:panelGrid columns="1"
                               styleClass="panel-feature-login-banner-sideline"
                               border="0" cellpadding="0" cellspacing="0">

                      <%-- Applies padding inside the banner. --%>
                      <h:graphicImage url="../img/util/blank.gif" width="1" height="1"/>

                  </h:panelGrid>

                  <%-- Positions the login banner features. --%>
                  <h:panelGrid columns="3"
                               styleClass="panel-features-surround-justified"
                               columnClasses="panel-feature-justified-50pc, panel-feature panel-feature-login-banner, panel-feature-justified-50pc"
                               border="0" cellpadding="0" cellspacing="0">

                      <%-- Centers the product name. --%>
                      <f:verbatim></f:verbatim>

                      <%-- Displays the aconite logo. --%>
                      <h:graphicImage url="../img/header/logo.jpg"
                                      width="200"
                                      height="55"
                                      styleClass="image-borderless"/>

                      <%-- Centers the product name. --%>
                      <f:verbatim></f:verbatim>

                  </h:panelGrid>

                  <%-- Positions the login banner sideline features. --%>
                  <h:panelGrid columns="1"
                               styleClass="panel-feature-login-banner-sideline"
                               border="0" cellpadding="0" cellspacing="0">

                      <%-- Applies padding inside the banner. --%>
                      <h:graphicImage url="../img/util/blank.gif" width="1" height="1"/>

                  </h:panelGrid>

              </h:panelGrid>

              <%-- Displays any global messages. --%>
              <h:messages globalOnly="true" layout="table" styleClass="warn"
                          infoClass="info" warnClass="warn" errorClass="warn" fatalClass="warn"/>

          </h:panelGrid>

          <%-- Centers the work area features. --%>
          <f:verbatim></f:verbatim>

      </h:panelGrid>

  <jsp:include page="/jsp/documentFooter.jsp"/>

  </f:view>
