CREATE OR REPLACE FORCE VIEW "PMA"."BUREAU_UNDELIVERED_VIEW" ("REQUEST_ID", "TRACKING_ID", "ISSUER", "BUREAU", "PRODUCT", "CREATED", "REQUEST_TYPE", "ISSUED", "BATCH_FILE_NAME", "DATE_DELIVERED", "STATE")
AS
  SELECT request_id,
    tracking_id,
    issuer,
    bureau,
    product,
    created,
    request_type,
    issued,
    batch_file_name,
    date_delivered,
    state
  FROM bureau_status_view
  WHERE state = 100
  ORDER BY created,
    tracking_id;
 /
 
 CREATE OR REPLACE FORCE VIEW "PMA"."BUREAU_ATBUREAU_VIEW" ("REQUEST_ID", "TRACKING_ID", "ISSUER", "BUREAU", "PRODUCT", "CREATED", "REQUEST_TYPE", "ISSUED", "BATCH_FILE_NAME", "DATE_DELIVERED", "STATE")
AS
  SELECT request_id,
    tracking_id,
    issuer,
    bureau,
    product,
    created,
    request_type,
    issued,
    batch_file_name,
    date_delivered,
    state
  FROM bureau_status_view
  WHERE state = 110
  ORDER BY created,
    tracking_id;
/

CREATE OR REPLACE FORCE VIEW "PMA"."BUREAU_FAILED_VIEW" ("REQUEST_ID", "TRACKING_ID", "ISSUER", "BUREAU", "PRODUCT", "CREATED", "REQUEST_TYPE", "ISSUED", "BATCH_FILE_NAME", "DATE_DELIVERED", "STATE")
AS
select 
  request_id,
  tracking_id,
  issuer,
  bureau,
  product,
  created,
  request_type,
  issued,
  batch_file_name,
  date_delivered,
  state
from bureau_status_view
where state = 200
order by created, tracking_id
/

CREATE OR REPLACE VIEW "BUREAU_STATISTICS_VIEW" ("REQUEST_TYPE","DATE_CREATED","BUREAU", "TOTAL_RECEIVED_REQUEST", "UN_DELIVERED_REQUEST", "AT_BUREAU_REQUEST", "COMPLETED_REQUEST", "FAILED_REQUEST")
AS
  SELECT
  myGrp.REQUEST_TYPE           AS REQUEST_TYPE,
  myGrp.DATE_CREATED           AS DATE_CREATED, 
  myGrp.BUREAU                 AS BUREAU, 
  myGrp.TOTAL_RECEIVED_REQUEST AS TOTAL_RECEIVED_REQUEST,
  myGrp.UN_DELIVERED_REQUEST   AS UN_DELIVERED_REQUEST,
  myGrp.AT_BUREAU_REQUEST      AS AT_BUREAU_REQUEST,
  myGrp.COMPLETED_REQUEST      AS COMPLETED_REQUEST,
  myGrp.FAILED_REQUEST         AS FAILED_REQUEST
  FROM
  (
    SELECT 
      vbs.REQUEST_TYPE                   AS REQUEST_TYPE,
      vbs.CREATED                        AS DATE_CREATED, 
      vbs.BUREAU                         AS BUREAU, 
      SUM(DECODE(vbs.STATE, NULL, 0, 1)) AS TOTAL_RECEIVED_REQUEST,
      SUM(DECODE(vbs.STATE, 100, 1, 0))  AS UN_DELIVERED_REQUEST,
      SUM(DECODE(vbs.STATE, 110, 1, 0))  AS AT_BUREAU_REQUEST,
      SUM(DECODE(vbs.STATE, 140, 1, 0))  AS COMPLETED_REQUEST,
      SUM(DECODE(vbs.STATE, 200, 1, 0))  AS FAILED_REQUEST
   FROM BUREAU_STATUS_VIEW vbs  
    GROUP BY vbs.REQUEST_TYPE, vbs.CREATED, vbs.BUREAU
    union all    
   SELECT 'CreateRequest' AS REQUEST_TYPE, date '1970-01-01' as DATE_CREATED,'x' as BUREAU,0 as TOTAL_RECEIVED_REQUEST, 0 as UN_DELIVERED_REQUEST,0 as AT_BUREAU_REQUEST,0 as COMPLETED_REQUEST,0 as FAILED_REQUEST  FROM dual UNION ALL
   SELECT 'RenewRequest' AS REQUEST_TYPE, date '1970-01-01' as DATE_CREATED,'x' as BUREAU,0 as TOTAL_RECEIVED_REQUEST, 0 as UN_DELIVERED_REQUEST,0 as AT_BUREAU_REQUEST,0 as COMPLETED_REQUEST,0 as FAILED_REQUEST  FROM dual UNION ALL
   SELECT 'ReplaceRequest' AS REQUEST_TYPE, date '1970-01-01' as DATE_CREATED,'x' as BUREAU,0 as TOTAL_RECEIVED_REQUEST, 0 as UN_DELIVERED_REQUEST,0 as AT_BUREAU_REQUEST,0 as COMPLETED_REQUEST,0 as FAILED_REQUEST  FROM dual UNION ALL
   SELECT 'UploadRequest' AS REQUEST_TYPE, date '1970-01-01' as DATE_CREATED,'x' as BUREAU,0 as TOTAL_RECEIVED_REQUEST, 0 as UN_DELIVERED_REQUEST,0 as AT_BUREAU_REQUEST,0 as COMPLETED_REQUEST,0 as FAILED_REQUEST  FROM dual
  ) myGrp 
  /

----------------------------------------------------------------

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




