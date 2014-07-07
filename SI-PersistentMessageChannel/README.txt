Spring Integration - Persistent Message Channel Example Project

by Jason Gilman and Michael Pilone

-------------------------------------------------------------------------------
ABOUT
-------------------------------------------------------------------------------

This is an example project of how to create a basic message passing 
application with the Spring Integration framework using a custom channel 
adapter and data access object for persistent messaging.

-------------------------------------------------------------------------------
RUNNING THE EXAMPLE
-------------------------------------------------------------------------------

1. Download dependencies.  See DEPENDENCIES section.

2. Build the project.  See BUILDING section.

3. Start database
At a command prompt navigate to the support/database directory. Run the command
start_database.bat for Windows environments or  
start_database.sh for UNIX like environments. 

4. Start the example.
Start a new console and in the project's main directory run the following command

ant run

Hit ctrl-c to stop the example.

The program can also be started using: 
ant run-fail

This will cause the transaction to rollback after the message has been sent.  
This demonstrates that a transaction rolling back will not allow a message to 
be sent.


-------------------------------------------------------------------------------
BUILDING
-------------------------------------------------------------------------------
Get the dependent libraries (See DEPENDENCIES) and then navigate to the project
 home directory. Use the following command to build and generate documentation.

ant dist

Building this project requires Java version 1.5 or later Apache Ant (recommended
 version 1.7). Apache Ant is available from http://ant.apache.org


-------------------------------------------------------------------------------
DEPENDENCIES
-------------------------------------------------------------------------------
All dependent libraries should be downloaded and placed in a directory called 
"libraries" one directory above the project main directory.  Here is an example
tree.

+workspace
    +libraries
        +spring-framework-2.5.6
        +spring-integration-1.0.1.RELEASE
    +SI-PersistentMessageChannel
        +src
        +support
        build.xml
        README.txt


Spring Framework
Built with version 2.5.6
http://www.springsource.org/download
It is recommended that you download version 2.5.6 that comes WITH dependencies.
This is a larger download but includes other libraries necessary for Spring.  

Spring Integration
Built with version 1.0.1
http://www.springsource.org/spring-integration

-------------------------------------------------------------------------------
ISSUES
-------------------------------------------------------------------------------
HSQL prints the following message when the example is run. This error doesn't
affect the execution of the demonstration and can be safely ignored.

Exception in thread "HSQLDB Connection @b61fd1" java.lang.NullPointerException
        at org.hsqldb.ServerConnection.close(Unknown Source)
        at org.hsqldb.ServerConnection.run(Unknown Source)
        at java.lang.Thread.run(Thread.java:595)
        