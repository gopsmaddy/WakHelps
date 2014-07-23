To lookup the Java version a class was compiled with. (error: java.lang.UnsupportedClassVersionError: (JavaClassName) bad major version at offset=6)

javap -verbose <JavaClassName>

The major version tells the Java version used. Here are some example values:

* Java 1.2 uses major version 46
* Java 1.3 uses major version 47
* Java 1.4 uses major version 48
* Java 5 uses major version 49
* Java 6 uses major version 50
* Java 7 uses major version 51
* Java 8 uses major version 52 

==================

Eventhough Affina and EspInterface codes compiled with java 1.5 the third party libraries could be compiled in other java versions. if so there will be major minor class error. There are two ways to resolve this problem.

1. Use thrid party jars which compiled with expected java versions (in this case java 1.5)
2. Backport higher java version bytecode into lower version bytecode using available tools (e.g. retrolambda, Retrotranslator, Retroweaver and JBossRetro )

http://stackoverflow.com/questions/1011706/backport-java-5-6-features-to-java-1-4


===================
http://retrotranslator.sourceforge.net/

>java -jar retrotranslator-transformer-1.2.9.jar -srcjar <SourceJarName.jar>  -destjar <DestJarName.jar> -target 1.5