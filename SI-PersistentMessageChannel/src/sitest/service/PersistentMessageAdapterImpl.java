package sitest.service;

import java.io.Serializable;

import org.apache.log4j.Logger;
import org.springframework.integration.core.Message;
import org.springframework.integration.message.MessageHandlingException;

import sitest.dao.MessageDao;

/**
 * This is the implementation of the {@link PersistentMessageAdapter}. This
 * handles a single configured queue of messages.
 */
public class PersistentMessageAdapterImpl implements PersistentMessageAdapter
{

  /**
   * The logger to use.
   */
  private static Logger sLog =
      Logger.getLogger(PersistentMessageAdapterImpl.class);

  /**
   * Message DAO that is used to save and retrieve messages.
   */
  private MessageDao mMessageDao;

  /**
   * The name of the queue that messages will be associated with.
   */
  private String mQueueName;

  /*
   * (non-Javadoc)
   * @see
   * sitest.service.PersistentMessageAdapter#save(org.springframework.integration
   * .core.Message)
   */
  public <T extends Serializable> void save(Message<T> message)
  {
    // Uses the Message DAO to save the message with the configured queue name.
    sLog.info("Saving message " + message.getHeaders().getId());
    mMessageDao.save(message, mQueueName);
  }

  /*
   * (non-Javadoc)
   * @see sitest.service.PersistentMessageAdapter#removeNext()
   */
  public <T extends Serializable> Message<T> removeNext()
  {
    // Get the next message to process. This may return null if there aren't any
    // messages in the indicated queue.
    Message<T> message = mMessageDao.getNextMessage(mQueueName);

    if (message != null)
    {
      // If we retrieved a message delete it from the database. If the
      // transaction rolls back then the message will not be deleted.
      sLog.debug("Retrieved message " +
          message.getHeaders().get(MessageDao.SAVED_ID_HEADER));

      // We used the id of the message that it was saved with since the message
      // id is reset when it is retrieved from the database.
      mMessageDao.delete(message.getHeaders().get(MessageDao.SAVED_ID_HEADER)
          .toString());
    }
    else
    {
      sLog.debug("No messages found in database.");
    }
    return message;
  }

  /*
   * (non-Javadoc)
   * @see
   * sitest.service.PersistentMessageAdapter#handleFailedMessage(org.springframework
   * .integration.core.Message)
   */
  public void handleFailedMessage(Message<MessageHandlingException> message)
  {
    // This will be called for messages that fail during email sending. We just
    // log the error and delete the message that failed. If we don't delete the
    // message it will remain in the database and be continually redelivered
    // until it succeeds (which could be never). The actions taken here in a
    // real application will depend on the requirements of the application.

    // The payload of this message is an exception.
    MessageHandlingException exception = message.getPayload();

    // Log the exception
    sLog.error(exception, exception);

    // Get the original message from the exception
    Message<?> originalMessage = (Message<?>) exception.getFailedMessage();

    Object messageId =
        originalMessage.getHeaders().get(MessageDao.SAVED_ID_HEADER);

    // Delete the message from the database.
    sLog.info("Deleting failed message [" + messageId + "]");
    mMessageDao.delete(messageId.toString());
  }

  /**
   * Sets the message dao to use.
   * 
   * @param messageDao
   *          The messageDao to set.
   */
  public void setMessageDao(MessageDao messageDao)
  {
    mMessageDao = messageDao;
  }

  /**
   * Sets the queue name to use.
   * 
   * @param queueName
   *          The queueName to set.
   */
  public void setQueueName(String queueName)
  {
    mQueueName = queueName;
  }

}
