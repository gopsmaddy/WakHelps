package sitest;

import org.apache.log4j.Logger;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.integration.channel.*;
import org.springframework.integration.message.ErrorMessage;

import sitest.service.ProductOrderingService;

/**
 * The main class that allows running of the application.
 */
public class Main
{

  /**
   * The logger to use.
   */
  private static Logger sLog = Logger.getLogger(Main.class);

  /**
   * Main method
   * 
   * @param args
   *          Takes no arguments or a single argument of "doFail". "doFail" will
   *          cause the transaction to rollback so the message won't be sent. No
   *          arguments will cause the transaction to commit as normal.
   */
  public static void main(String[] args) throws Exception
  {
    // Check the arguments
    boolean doFail = false;
    if (args != null && args.length > 0)
    {
      if (args.length == 1 && args[0].equals("doFail"))
      {
        doFail = true;
      }
      else
      {
        System.err.println("Use no arguments or just doFail as an "
            + "argument to cause the transaction to rollback");
        System.exit(1);
      }
    }

    sLog.info("Starting the application.  Kill it to stop early. (ctrl-c)");

    // Load the spring application context XML file.
    AbstractApplicationContext context =
        new ClassPathXmlApplicationContext("applicationContext.xml");

    // Get the Product Ordering Service from the context.
    ProductOrderingService orderingService =
        (ProductOrderingService) context.getBean("productOrderingService");

    // Order a product
    // Set the third parameter to true to simulate an error occurring in a
    // transaction.
    orderingService.orderProduct("1", "steve@macrosoft.com", doFail);

    // Load the default error channel and watch for messages just in case
    // something goes wrong.
    ChannelResolver channelResolver = new BeanFactoryChannelResolver(context);
    PollableChannel errorChannel =
        (PollableChannel) channelResolver.resolveChannelName("errorChannel");

    // Waits forever for a message until interrupted.
    ErrorMessage msg = (ErrorMessage) errorChannel.receive();

    while (msg != null)
    {
      // Get the exception from the error message
      Throwable throwable = msg.getPayload();

      sLog.error(throwable, throwable);
      throwable.printStackTrace();

      msg = (ErrorMessage) errorChannel.receive();
    }
  }
}
