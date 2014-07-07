/*
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (50,'63FFFF','NSAM Operator','DP1','NSAM',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('21-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),140);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (52,'63FAFF','NSAM Operator','DP1','NSAM',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('21-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),200);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (53,'63AFFF','NSAM Operator','DP1','NSAM',to_timestamp('07-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('27-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('07-FEB-13','DD-MON-RR HH24.MI.SSXFF'),110);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (54,'63FFFF','NSAM Operator','DP1','NSAM',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('27-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('07-FEB-13','DD-MON-RR HH24.MI.SSXFF'),110);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (55,'63FFAF','NSAM Operator','DP1','NSAM',to_timestamp('07-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('28-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),110);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (56,'63FFFA','NSAM Operator','DP1','NSAM',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('20-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),100);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (57,'63AAFF','NSAM Operator','DP2','NSAM',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('27-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),100);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (58,'63FAAF','NSAM Operator','DP2','NSAM',to_timestamp('06-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('20-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('06-FEB-13','DD-MON-RR HH24.MI.SSXFF'),100);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (59,'61FFFF','NSAM Operator','DP2','NSAM',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('20-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('06-FEB-13','DD-MON-RR HH24.MI.SSXFF'),140);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (60,'66FFFF','NSAM Operator','DP2','NSAM',to_timestamp('06-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('27-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),100);
insert into AABUREAU_STATUS(REQUEST_ID,TRACKING_ID,ISSUER,BUREAU,PRODUCT,CREATED,REQUEST_TYPE,ISSUED,BATCH_FILE_NAME,DATE_DELIVERED,STATE) VALUES (61,'66FFFF','NSAM Operator','DP1','NSAM',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),'CreateRequest',to_timestamp('27-APR-12','DD-MON-RR HH24.MI.SSXFF'),'nanananan.xml',to_timestamp('08-FEB-13','DD-MON-RR HH24.MI.SSXFF'),200);
*/

--CREATE TABLE AABUREAU_STATUS AS SELECT * FROM BUREAU_STATUS_VIEW --WITH NO DATA;

SELECT
  myType.requestType as REQUEST_TYPE,
  sum(decode(vbs.STATE, null, 0, 1)) as TOTAL_RECEIVED_REQUEST,
  sum(decode(vbs.STATE, 100, 1, 0))  as UN_DELIVERED_REQUEST,
  sum(decode(vbs.STATE, 110, 1, 0))  as AT_BUREAU_REQUEST,
  sum(decode(vbs.STATE, 140, 1, 0))  as COMPLETED_REQUEST,
  sum(decode(vbs.STATE, 200, 1, 0))  as FAILED_REQUEST
FROM
  AABUREAU_STATUS vbs right outer join    
  ( 
    SELECT 'CreateRequest' AS requestType FROM dual
    UNION ALL SELECT 'RenewRequest' AS requestType FROM dual
    UNION ALL SELECT 'ReplaceRequest' AS requestType FROM dual
    UNION ALL SELECT 'UploadRequest' AS requestType FROM dual    
   ) myType on myType.requestType=vbs.REQUEST_TYPE
GROUP BY myType.requestType
    
  /*  
	WHERE
		CREATED group by vbs.REQUEST_TYPE BETWEEN {?startDate} AND {?endDate}
		AND BUREAU = '{?bureauName}'
    */
    
    
select * from bureau_status_view  
select * from AABUREAU_STATUS 

CREATE OR REPLACE PACKAGE PMA.BUREAU_STATISTICS_PACKAGE
AS TYPE BUREAU_STATISTICS_TYPE IS REF CURSOR RETURN PMA.BUREAU_STATISTICS_VIEW%ROWTYPE;
PROCEDURE BUREAU_STATISTICS_PROCEDURE (
My_Cursor IN OUT BUREAU_STATISTICS_TYPE,
startDate IN date,
endDate IN date,
bureauName IN varchar2
);
END BUREAU_STATISTICS_PACKAGE;  
/

--DROP PROCEDURE PMA.BUREAU_STATISTICS_PROCEDURE
CREATE OR REPLACE PROCEDURE PMA.BUREAU_STATISTICS_PROCEDURE(My_Cursor IN OUT PMA.BUREAU_STATISTICS_PACKAGE.BUREAU_STATISTICS_TYPE,startDate IN date,endDate IN date,bureauName IN varchar2)
AS
BEGIN
OPEN My_Cursor FOR
 SELECT
  myType.requestType as REQUEST_TYPE,
  sum(decode(vbs.STATE, null, 0, 1)) as TOTAL_RECEIVED_REQUEST,
  sum(decode(vbs.STATE, 100, 1, 0))  as UN_DELIVERED_REQUEST,
  sum(decode(vbs.STATE, 110, 1, 0))  as AT_BUREAU_REQUEST,
  sum(decode(vbs.STATE, 140, 1, 0))  as COMPLETED_REQUEST,
  sum(decode(vbs.STATE, 200, 1, 0))  as FAILED_REQUEST
 FROM
  PMA.AABUREAU_STATUS vbs right outer join    
  ( 
    SELECT 'CreateRequest' AS requestType FROM dual
    UNION ALL SELECT 'RenewRequest' AS requestType FROM dual
    UNION ALL SELECT 'ReplaceRequest' AS requestType FROM dual
    UNION ALL SELECT 'UploadRequest' AS requestType FROM dual    
   ) myType on myType.requestType=vbs.REQUEST_TYPE
  WHERE vbs.BUREAU = bureauName 
  AND CREATED BETWEEN startDate AND endDate
  GROUP BY myType.requestType;
END BUREAU_STATISTICS_PROCEDURE;
/


SET SERVEROUTPUT ON
declare
My_Cursor BUREAU_STATISTICS_PACKAGE.BUREAU_STATISTICS_TYPE;
resultset My_Cursor%rowtype;
begin
BUREAU_STATISTICS_PROCEDURE(My_Cursor, '08-FEB-13','08-FEB-13','DP1');
if not My_Cursor%isopen then
dbms_output.put_line('the cursor is not open');
else
dbms_output.put_line('the cursor is open');
end if;
fetch My_Cursor into resultset;
while My_Cursor%found loop
dbms_output.put_line(resultset.TOTAL_RECEIVED_REQUEST||' '|| resultset.UN_DELIVERED_REQUEST||' '|| resultset.AT_BUREAU_REQUEST||' '|| resultset.COMPLETED_REQUEST||' '|| resultset.FAILED_REQUEST||' '||resultset.REQUEST_TYPE);
fetch My_Cursor into resultset;
end loop;
end;





/*    
CREATE OR REPLACE PACKAGE Test_Package
AS TYPE Test_Type IS REF CURSOR RETURN bureau_status_view%ROWTYPE;
PROCEDURE Test_Procedure (
Test_Cursor IN OUT Test_Type,
Test_Parameter IN bureau_status_view.BUREAU%TYPE
);
END Test_Package;    
/

CREATE OR REPLACE PROCEDURE Test_Procedure(Test_Cursor IN OUT Test_Package.Test_Type,Test_Parameter IN AABUREAU_STATUS.BUREAU%TYPE)
AS
BEGIN
OPEN Test_Cursor FOR
  SELECT *
  FROM AABUREAU_STATUS aa
  WHERE aa.BUREAU = Test_Parameter;
END Test_Procedure;
/ 



--drop PROCEDURE Test_Procedure;


/



SET SERVEROUTPUT ON
declare
test_cursor test_package.test_type;
resultset test_cursor%rowtype;
begin
test_procedure(test_cursor, 'DP2');
if not test_cursor%isopen then
dbms_output.put_line('the cursor is not open');
else
dbms_output.put_line('the cursor is open');
end if;
fetch test_cursor into resultset;
while test_cursor%found loop
dbms_output.put_line(resultset.REQUEST_TYPE);
dbms_output.put_line(resultset.TOTAL_RECEIVED_REQUEST);
--dbms_output.put_line(resultset.UN_DELIVERED_REQUEST);
--dbms_output.put_line(resultset.AT_BUREAU_REQUEST);
fetch test_cursor into resultset;
end loop;
end;

*/

