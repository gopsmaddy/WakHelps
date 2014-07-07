package sitest.service;

import org.apache.log4j.Logger;

import sitest.domain.Email;

/**
 * A simple implementation of the {@link MailService} that prints the email
 * contents to the console.
 */
public class MailServiceImpl implements MailService
{

  /**
   * The logger to use.
   */
  private static Logger sLog = Logger.getLogger(MailServiceImpl.class);

  /*
   * (non-Javadoc)
   * @see sitest.service.MailService#sendEmail(sitest.domain.Email)
   */
  public void sendEmail(Email email)
  {
    StringBuilder builder = new StringBuilder();

    // In a real application this would contain real code for sending emails.
    builder.append("Sending email to " + email.getEmailAddress()).append("\n");
    builder.append("Subject: " + email.getSubject()).append("\n");
    builder.append(email.getContents()).append("\n");
    sLog.info(builder.toString());
  }
}
