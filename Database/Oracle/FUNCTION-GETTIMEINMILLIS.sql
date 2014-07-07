CREATE OR REPLACE FUNCTION  PMA.getTimeInMillis (h timestamp) RETURN number IS
out_result number;
BEGIN
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