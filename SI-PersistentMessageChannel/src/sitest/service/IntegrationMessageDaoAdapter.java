package sitest.service;

import java.io.Serializable;

import org.springframework.integration.core.Message;
import org.springframework.integration.message.MessageHandlingException;

import sitest.dao.MessageDao;

/**
 * The IntegrationMessageDaoAdapter is a service that handles saving a
 * retrieving messages from a {@link MessageDao}. It offers a single method for
 * saving messages and a single method for removing and returning the next
 * message. It also has a method for handling messages that failed.
 */
public interface IntegrationMessageDaoAdapter
{
  /**
   * Saves the message using the {@link MessageDao}.
   * 
   * @param message
   *          message to save.
   */
  public <T extends Serializable> void save(Message<T> message);

  /**
   * Removes and returns the next message. Messages are returned in the order
   * they are added.
   * 
   * @return the next message to process.
   */
  public <T extends Serializable> Message<T> removeNext();

  /**
   * Handles a message that failed during processing. Different behaviors could
   * occur here such as incrementing a counter in the message for a number of
   * retries or sending the message to a different destination.
   * 
   * @param message
   *          message to be handled.
   */
  public void handleFailedMessage(Message<MessageHandlingException> message);
}
