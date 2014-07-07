create or replace
FUNCTION         LITTLE2BIGENDIAN (h VARCHAR2) RETURN VARCHAR2 IS
outStr VARCHAR2(200) :='';
BEGIN
  IF(h IS NULL) THEN
    RETURN h;
  ELSE
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
  END IF;
END;