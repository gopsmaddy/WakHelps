package com.wakkir.test2;

import org.apache.activemq.broker.BrokerService;
import org.springframework.context.support.FileSystemXmlApplicationContext;

/**
 * Created with IntelliJ IDEA.
 * User: wakkir
 * Date: 11/11/12
 * Time: 20:09
 * To change this template use File | Settings | File Templates.
 */
public class TestSpringClient
{
    public static void main(String[] args)
    {
        try
        {
            //BrokerService broker = new BrokerService();

            //broker.addConnector("tcp://localhost:61616");

            //broker.setPersistent(false);

            //broker.start();

            FileSystemXmlApplicationContext context = new FileSystemXmlApplicationContext("src/main/resources/spring-context.xml");
            SpringPublisher publisher = (SpringPublisher)context.getBean("stockPublisher");
            publisher.start();
        }
        catch (Exception e)
        {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
}
