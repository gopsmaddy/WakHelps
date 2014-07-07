package sitest.service;

import org.apache.log4j.Logger;
import org.springframework.transaction.*;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import sitest.domain.Email;

/**
 * The implementation of the product ordering service.
 */
public class ProductOrderingServiceImpl implements ProductOrderingService
{

  /**
   * The logger to use.
   */
  private static Logger sLog =
      Logger.getLogger(ProductOrderingServiceImpl.class);

  /**
   * A Spring class that is used for managing transactions.
   */
  private PlatformTransactionManager mPlatformTransactionManager;

  /**
   * An instance of a service that allows mail to be sent. This is currently
   * configured to be a Spring Integration proxy that will send the email as a
   * message.
   */
  private MailService mMailService;

  /*
   * (non-Javadoc)
   * @see sitest.service.ProductOrderingService#orderProduct(java.lang.String,
   * java.lang.String, boolean)
   */
  public void orderProduct(String productId, String userEmailAddress,
      boolean doFail)
  {
    // Start the transaction
    TransactionDefinition transaction = new DefaultTransactionDefinition();
    TransactionStatus status =
        mPlatformTransactionManager.getTransaction(transaction);
    sLog.debug("Transaction started.");

    try
    {
      // Ordering code would normally go here.
      sLog.debug("Ordering logic occurs here");

      // Once the product is marked as ordered the user will be notified through
      // email.
      sLog.debug("Sending email to notify user");
      Email email = new Email();
      email.setEmailAddress(userEmailAddress);
      email.setSubject("Product: " + productId + " ordered!");
      email.setContents("Your product of id " + productId +
          " has been ordered.  Thank You");

      mMailService.sendEmail(email);

      if (doFail)
      {
        // Simulates an error occurring after the message has been sent. Because
        // it was written to the database in a transaction the sending of the
        // message will be rolled back.
        throw new RuntimeException("doFail was set to true.");
      }

      // Commit the transaction. Until this statement succeeds the transaction
      // could still fail.
      mPlatformTransactionManager.commit(status);
      sLog.debug("Transaction committed.");
    }
    catch (Exception e)
    {
      sLog.error(e, e);
      // If an exception occurs we'll rollback the transaction.
      mPlatformTransactionManager.rollback(status);
      sLog.debug("Transaction rolledback.");
    }
  }

  /**
   * Sets the transaction manager to use.
   * 
   * @param platformTransactionManager
   *          The platformTransactionManager to set.
   */
  public void setPlatformTransactionManager(
      PlatformTransactionManager platformTransactionManager)
  {
    mPlatformTransactionManager = platformTransactionManager;
  }

  /**
   * Sets the mail service to use.
   * 
   * @param mailService
   *          The mailService to set.
   */
  public void setMailService(MailService mailService)
  {
    mMailService = mailService;
  }

}
