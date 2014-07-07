--alter session set NLS_DATE_FORMAT='YYYY-MM-DD HH24:MI:SS';
--alter session set NLS_TIMESTAMP_FORMAT='YYYY-MM-DD HH24:MI:SS.FF';

--select TO_DATE('01/01/1970 00:00:00','DD/MM/YYYY HH24:MI:SS') + (1357214340000 /1000/60/60/24)  from dual


--GRANT "SDS_SCHEMA" TO PMA ;
/*

GRANT  ALTER SESSION, CREATE DATABASE LINK, CREATE PROCEDURE, CREATE SEQUENCE, 
	ALTER ANY SEQUENCE, DROP ANY SEQUENCE, SELECT ANY SEQUENCE, CREATE SESSION, 
	CREATE SYNONYM, CREATE TABLE, ALTER ANY TABLE, CREATE TRIGGER, CREATE VIEW, 
	CREATE JOB TO sds_schema;
	
GRANT SELECT, REFERENCES ON SDS.BUREAU_DELIVERY_BATCHES TO PMA;

*/

Select ADD_MONTHS(to_date('20'||'2302'||'01','yyyymmdd'),1)+ NUMTODSINTERVAL(-1/(24*25*60*1000),'HOUR') AS MYVALUE from dual


create or replace
FUNCTION  getTimeInMillis (h timestamp) RETURN number IS
out_result number;
BEGIN
  --select extract(day    from (systimestamp - timestamp '1970-01-01 00:00:00')) * 86400000  
   --  + extract(hour   from (systimestamp - timestamp '1970-01-01 00:00:00')) * 3600000  
   --  + extract(minute from (systimestamp - timestamp '1970-01-01 00:00:00')) * 60000  
   --  + extract(second from (systimestamp - timestamp '1970-01-01 00:00:00')) * 1000 
   
	 select extract(day    from (h - timestamp '1970-01-01 00:00:00')) * 86400000  
     + extract(hour   from (h - timestamp '1970-01-01 00:00:00')) * 3600000  
     + extract(minute from (h - timestamp '1970-01-01 00:00:00')) * 60000  
     + extract(second from (h - timestamp '1970-01-01 00:00:00')) * 1000 
     into out_result
  from dual; 
  RETURN out_result;   
END;

/*
 select  
  DECODE(getTimeInMillis(TO_DATE(TO_CHAR(issued, 'YYYY-MM-DD'),'YYYY-MM-DD')),0,null,issued) xx,
  getTimeInMillis(TO_DATE(TO_CHAR(issued, 'YYYY-MM-DD'),'YYYY-MM-DD')) issued,
  TO_DATE(TO_CHAR(issued, 'YYYY-MM-DD'),'YYYY-MM-DD') start_date
  from pma.issuance_records 
  where request_oid in (16551, 122351)
*/


create or replace
FUNCTION         LITTLE2BIGENDIAN (h VARCHAR2) RETURN VARCHAR2 IS
outStr VARCHAR2(200) :='';
BEGIN
    FOR i IN 1..LENGTH (h) LOOP
      IF MOD(i,2) = 0 THEN          
         IF (NVL(LENGTH (outStr),-1)>0) THEN
           outStr := substr(h, LENGTH (outStr)+1, 2)||outStr;
         ELSE
           outStr := substr(h, 1, 2);
         END IF;         
      END IF;     
   END LOOP; 
  RETURN outStr;   
END;


CREATE TABLE AABUREAU_STATUS AS SELECT * FROM BUREAU_STATUS_VIEW --WITH NO DATA;

--To reset system password 
--Alter user system identified by password;
--select username, expiry_date from dba_users;


--HOW to use Case statement in Oracle
select 
case string_value 
when 'SUCCESS' then 1
when 'FAIL' then 0
else -1
end
from simple_data_store_elements
where name='SUCCESS_INDICATOR'

--dense_rank() and row_number() over partition
select 
  sfcd.OID as SCOID ,
  sfcd.plastic_number as PAN,
  sfcd.pan_sequence_number as PSN,
  pdata.MYNAME as NAME,
  pdata.MYVALUE as VALUE, 
  pdata.BUSAPP as BUSAPP,
  dense_rank() over (partition by sfcd.plastic_number order by sfcd.pan_sequence_number,pdata.BUSAPP) as DenseRank,
  row_number() over (partition by sfcd.plastic_number order by sfcd.pan_sequence_number,pdata.BUSAPP) as RowNumber
FROM 
  pma.SOFTCARDS sfcd INNER JOIN
  ( 
    SELECT 
      upmf.SOFTCARD_OID AS SOFTCARD_OID, 
      pdse.String_Value AS MYVALUE,  
      pdse.NAME AS MYNAME, 
      rqpd.PMAPRODUCT_PART_ID as BUSAPP
    FROM 
    UPLOAD_MANIFEST_REQUESTS upmf inner join
    REQUEST_PART_DETAILS rqpd on  rqpd.request_part_oid=upmf.pmaproduct_part_data_oid inner join
    PERSONAL_DATA_STORE_ELEMENTS pdse on pdse.personal_data_store_oid=rqpd.personal_data_store_oid  
  ) pdata  ON sfcd.OID =pdata.SOFTCARD_OID 
WHERE sfcd.STATUS=1 
AND SFCD.CARD_ID is not null 
--AND sfcd.plastic_number=#pan AND pdata.BUSAPP=#baPartId
order by 2,6 asc