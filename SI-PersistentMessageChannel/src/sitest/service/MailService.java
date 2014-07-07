package sitest.service;

import sitest.domain.Email;

/**
 * The Mail Service sends emails. Defining interfaces for services is a good
 * programming practice that increases testability and lowers coupling among
 * services.
 */
public interface MailService
{

  /**
   * Sends the email to the address indicated in the email.
   * 
   * @param email
   *          email to send.
   */
  public void sendEmail(Email email);

}
