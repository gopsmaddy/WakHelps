package sitest.dao;

import java.io.Serializable;
import java.sql.*;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.integration.core.Message;
import org.springframework.integration.message.MessageBuilder;
import org.springframework.jdbc.core.*;

/**
 * <p>
 * An implementation of the {@link MessageDao} that uses the Spring
 * {@link JdbcOperations} interface to retrieve and save messages.
 * </p>
 */
public class JdbcMessageDao implements MessageDao
{
  /**
   * A Spring class that makes it easier to do JDBC operations.
   */
  private JdbcOperations mJdbcOperations;

  /*
   * (non-Javadoc)
   * @see sitest.dao.MessageDao#delete(java.lang.String)
   */
  public void delete(final String messageId)
  {
    final String sql = "DELETE FROM MESSAGES WHERE MESSAGE_ID = ?";
    mJdbcOperations.execute(sql, new PreparedStatementCallback() {

      public Object doInPreparedStatement(PreparedStatement ps)
          throws SQLException, DataAccessException
      {
        ps.setString(1, messageId);
        ps.execute();
        return null;
      }
    });
  }

  /*
   * (non-Javadoc)
   * @see sitest.dao.MessageDao#getNextMessage(java.lang.String)
   */
  @SuppressWarnings("unchecked")
  public <T extends Serializable> Message<T> getNextMessage(String queue)
  {
    // Select the first message from the database ordering by creation date.
    // This will find the next message to process for the associated queue
    final String sql =
        "SELECT TOP 1 MESSAGE_ID, MESSAGE FROM MESSAGES WHERE QUEUE_NAME= ? "
            + "ORDER BY CREATION_DATE ASC";

    List<Message<T>> list =
        (List<Message<T>>) mJdbcOperations.query(sql, new Object[] { queue },
            new RowMapper() {
              public Object mapRow(ResultSet rs, int rowNum)
                  throws SQLException
              {
                String messageId = rs.getString(1);
                Message message = (Message) rs.getObject(2);

                // A MessageBuilder is used to create a new message to return.
                // Spring Integration's Messages are given a new id every time
                // they are created. We use the message headers to save the
                // original message id. This can later be used to delete the
                // message from the database.
                return MessageBuilder.fromMessage(message).setHeader(
                    SAVED_ID_HEADER, messageId).build();
              }
            });

    if (list.size() > 0)
    {
      return list.get(0);
    }
    else
    {
      return null;
    }
  }

  /*
   * (non-Javadoc)
   * @see
   * sitest.dao.MessageDao#save(org.springframework.integration.core.Message,
   * java.lang.String)
   */
  public <T extends Serializable> void save(final Message<T> message,
      final String queue)
  {
    final String sql =
        "INSERT INTO MESSAGES (MESSAGE_ID,MESSAGE,CREATION_DATE,QUEUE_NAME)"
            + "VALUES (?,?,?,?)";

    mJdbcOperations.execute(sql, new PreparedStatementCallback() {

      public Object doInPreparedStatement(PreparedStatement ps)
          throws SQLException, DataAccessException
      {
        // Save the messages original id here.
        ps.setString(1, message.getHeaders().getId().toString());
        // The message object is serialized to the database.
        ps.setObject(2, message);
        ps.setDate(3, new Date(System.currentTimeMillis()));
        ps.setString(4, queue);

        ps.execute();

        return null;
      }
    });
  }

  /**
   * Sets the JDBC Operations to use.
   * 
   * @param jdbcOperations
   *          The jdbcOperations to set.
   */
  public void setJdbcOperations(JdbcOperations jdbcOperations)
  {
    mJdbcOperations = jdbcOperations;
  }

}
