package sitest.dao;

import java.io.Serializable;

import org.springframework.integration.core.Message;

/**
 * This interface defines a Data Access Object (DAO) for saving, retrieving, and
 * deleting Spring Integration {@link Message}s. This DAO saves each message
 * with a queue name. This allows a single table and DAO to be used to persist
 * messages for different queues or purposes.
 */
public interface MessageDao
{
  /**
   * This is the id of the message saved in the database. After retrieving a
   * message to delete it the header will contain a property with this name.
   */
  public static final String SAVED_ID_HEADER = "SavedId";

  /**
   * Saves the message to the database
   * 
   * @param <T>
   *          Message payload type. This can save a message with any payload
   *          type as long as the payload type can be serialized.
   * @param message
   *          message to save
   * @param queue
   *          queue name to associate the message with
   */
  public <T extends Serializable> void save(Message<T> message, String queue);

  /**
   * Deletes the message with the specified id from the database. This must be
   * the id the message was originally saved with.
   * 
   * @param messageId
   *          id of the message to delete.
   */
  public void delete(String messageId);

  /**
   * Gets the next message to process.
   * 
   * @param <T>
   *          message payload type
   * @param queue
   *          queue name the message is associated with
   * @return next message to process.
   */
  public <T extends Serializable> Message<T> getNextMessage(String queue);
}
