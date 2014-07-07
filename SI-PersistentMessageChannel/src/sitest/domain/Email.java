package sitest.domain;

import java.io.Serializable;

/**
 * A regular Java bean that represents an email. The one requirement for this is
 * that it must be serializable.
 */
public class Email implements Serializable
{
  /**
   * Serialization id. Required to implement {@link Serializable}
   */
  private static final long serialVersionUID = 1L;

  /**
   * Address to send the email to.
   */
  private String mEmailAddress;

  /**
   * Subject of the email
   */
  private String mSubject;

  /**
   * Contents of the email.
   */
  private String mContents;

  /**
   * Gets the address to send the email to.
   * 
   * @return Returns the emailAddress.
   */
  public String getEmailAddress()
  {
    return mEmailAddress;
  }

  /**
   * Sets the address to send the email to.
   * 
   * @param emailAddress
   *          The emailAddress to set.
   */
  public void setEmailAddress(String emailAddress)
  {
    mEmailAddress = emailAddress;
  }

  /**
   * Gets the subject.
   * 
   * @return Returns the subject.
   */
  public String getSubject()
  {
    return mSubject;
  }

  /**
   * Sets the subject.
   * 
   * @param subject
   *          The subject to set.
   */
  public void setSubject(String subject)
  {
    mSubject = subject;
  }

  /**
   * Gets the email contents.
   * 
   * @return Returns the contents.
   */
  public String getContents()
  {
    return mContents;
  }

  /**
   * Sets the email contents.
   * 
   * @param contents
   *          The contents to set.
   */
  public void setContents(String contents)
  {
    mContents = contents;
  }

}
