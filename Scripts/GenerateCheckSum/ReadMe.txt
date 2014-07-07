Adding production of MD5 and SHA-1 checksums to the build controller for Affina artifacts:

NOTE : THIS SOLUTION ONLY WORKS ON WINDOWS ENVIRONMENT

---------------------------------------------------

1. Introduced C:\JDrive\modules\Affina\affina\build\executeBuildSignature.bat (This will generate md5 and sha-1 signature for given file/files)

@echo on

set BUILD_NAME=%1
set BUILD_PATH=%2
set SIGNATURE_PATH=%3

fciv.exe -add %BUILD_PATH%%BUILD_NAME% -both > %SIGNATURE_PATH%%BUILD_NAME%.signature

------------------------------------------------------

2. Updated C:\JDrive\modules\Affina\affina\build\build.xml (This will execure above bat file with given filename as parameter)

<target name="generateCheckSumSignature">
		<echo> generating check sum signature for : ${basedir}/../../R${affina.version}${was.version}.zip</echo>
		<exec dir="${basedir}" executable="cmd.exe">
			<arg value="/c" />
			<arg value="generateCheckSumSignature.bat" />
			<arg value="R${affina.version}${was.version}.zip" />	
			<arg value="../../" />
			<arg value="../../" />
		</exec>		
		<echo> generated check sum  signature for : ${basedir}/../../R${affina.version}${was.version}.zip</echo>
    </target>


-------------------------------------------------------------

3. pom.xml


<plugin>                
                <artifactId>maven-antrun-plugin</artifactId>
                <executions>
                    <execution>
                        <id>checksum-zip</id>
                        <phase>install</phase>
                        <configuration>
                            <target>
                                <property name="sourceDir" value="${project.build.directory}/"/>
                                <property name="destDir" value="${sourceDir}"/>
                                <echo>generating checksum</echo>
							   <echo>Base dir : ${basedir}</echo>
							   <echo>Source dir : ${sourceDir}</echo>
							   <echo>Dest dir : ${destDir}</echo>
							   <exec dir="${basedir}/../checksum" executable="cmd.exe">
									<arg value="/c" />
									<arg value="generateCheckSumSignature.bat" />
									<arg value="${artifactId}-${build.number}-bin.zip" />	
									<arg value="${sourceDir}" />
									<arg value="${destDir}" />
								</exec>	
                            </target>
                        </configuration>
                        <goals>
                            <goal>run</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>