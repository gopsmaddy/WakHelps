CREATE OR REPLACE PACKAGE BUREAU_STATISTICS_PACKAGE
AS TYPE BUREAU_STATISTICS_TYPE IS REF CURSOR RETURN BUREAU_STATISTICS_VIEW%ROWTYPE;
PROCEDURE BUREAU_STATISTICS_PROCEDURE (
My_Cursor IN OUT BUREAU_STATISTICS_TYPE,
startDate IN date,
endDate IN date,
bureauName IN varchar2
);
END BUREAU_STATISTICS_PACKAGE;   
/

CREATE OR REPLACE PROCEDURE BUREAU_STATISTICS_PROCEDURE(My_Cursor IN OUT BUREAU_STATISTICS_PACKAGE.BUREAU_STATISTICS_TYPE,startDate IN date,endDate IN date,bureauName IN varchar2)
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
  bureau_status_view vbs right outer join    
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