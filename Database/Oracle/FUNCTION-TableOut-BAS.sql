--drop TYPE NKAM_BA_TABLE;
--drop TYPE NKAM_BA_TYPE;


create or replace TYPE     NKAM_BA_TYPE AS OBJECT
(
  CHIP_ID       VARCHAR2(20),
  MSA           NUMBER(1),
  S9            NUMBER(1),
  S2            NUMBER(1),
  TKF           NUMBER(1),
  ISIN          VARCHAR2(8),
  MSA_VERSION   VARCHAR2(4),
  S9_VERSION    VARCHAR2(4),
  S2_VERSION    VARCHAR2(4),
  TKF_VERSION   VARCHAR2(4),
  CHIP_STATUS   NUMBER(2),
  MSA_STATUS    NUMBER(2),
  S9_STATUS     NUMBER(2),
  S2_STATUS     NUMBER(2),
  TKF_STATUS    NUMBER(2)
);

create or replace TYPE     NKAM_BA_TABLE AS TABLE OF NKAM_BA_TYPE;

---------------------------------
/*
public class ManifestApplicationStatus
{
  public static final int created        = 0;               QAO=NotExists | QCM=Exists 
  public static final int pendingInstall = 1;               QAO=Exists    | QCM=Exists
  public static final int installed      = 2;               QAO=Exists    | QCM=Exists
  public static final int pendingRemove  = 3;               QAO=NotExists | QCM=Exists
  public static final int pendingInstallPendingRemove = 4;  QAO=NotExists | QCM=Exists
  public static final int removed        = 5;               QAO=NotExists | QCM=NotExists

  public static final int failureUnknown = 10;
}
*/

create or replace
FUNCTION         GET_NKAM_BAS_QAO
 RETURN pma.NKAM_BA_TABLE  is
      outTable  pma.NKAM_BA_TABLE;
  BEGIN
    select cast(
    multiset(  SELECT
      sfcd.Card_ID          AS CHIP_ID,      
      NVL2(msa.NAME,1,0)    AS MSA,
      NVL2(s9.NAME,1,0)     AS S9,
      NVL2(s2.NAME,1,0)     AS S2,
      NVL2(tkf.NAME,1,0)    AS TKF,
      NVL(isin.MYVALUE,'-') AS ISIN,
      NVL(msa.VERSION,'-')  AS MSA_VERSION,
      NVL(s9.VERSION,'-')   AS S9_VERSION,
      NVL(s2.VERSION,'-')   AS S2_VERSION,
      NVL(tkf.VERSION,'-')  AS TKF_VERSION,
      sfcd.Status           AS CHIP_STATUS,
      NVL(msa.STATUS,-1)    AS MSA_STATUS,
      NVL(s9.STATUS,-1)     AS S9_STATUS,
      NVL(s2.STATUS,-1)     AS S2_STATUS,
      NVL(tkf.STATUS,-1)    AS TKF_STATUS
    FROM pma.SOFTCARDS sfcd
    LEFT OUTER JOIN
      (select * from
        ( select
          bapp.ID,
          bapp.NAME ,
          bapp.VERSION,
          mfap.SOFTCARD_OID,
          mfap.STATUS,
          row_number() over(partition by mfap.SOFTCARD_OID order by bapp.ID,bapp.VERSION desc) as IDX
          FROM
          pma.MANIFEST_APPLICATIONS mfap INNER JOIN
          pma.APPLICATIONS bapp ON bapp.OID=mfap.APPLICATION_OID
          AND bapp.ID='MSA' --and mfap.STATUS in (2,3)
        ) temp
       WHERE temp.IDX =1 and temp.STATUS in (1,2)
      ) msa ON msa.SOFTCARD_OID=sfcd.OID
    LEFT OUTER JOIN
      (select * from
        ( select
          bapp.ID,
          bapp.NAME ,
          bapp.VERSION,
          mfap.SOFTCARD_OID,
          mfap.STATUS,
          row_number() over(partition by mfap.SOFTCARD_OID order by bapp.ID,bapp.VERSION desc) as IDX
          FROM
          pma.MANIFEST_APPLICATIONS mfap INNER JOIN
          pma.APPLICATIONS bapp ON bapp.OID=mfap.APPLICATION_OID
          AND bapp.ID='S2' --and mfap.STATUS in (2,3)
        ) temp
       WHERE temp.IDX =1 and temp.STATUS in (1,2)
      ) s2 ON s2.SOFTCARD_OID=sfcd.OID
    LEFT OUTER JOIN
      (select * from
        ( select
          bapp.ID,
          bapp.NAME ,
          bapp.VERSION,
          mfap.SOFTCARD_OID,
          mfap.STATUS,
          row_number() over(partition by mfap.SOFTCARD_OID order by bapp.ID,bapp.VERSION desc) as IDX          
          FROM
          pma.MANIFEST_APPLICATIONS mfap INNER JOIN
          pma.APPLICATIONS bapp ON bapp.OID=mfap.APPLICATION_OID
          AND bapp.ID='S9' --and mfap.STATUS in (2,3)
        ) temp
        WHERE temp.IDX =1 and temp.STATUS in (1,2)
      ) s9 ON s9.SOFTCARD_OID=sfcd.OID
    LEFT OUTER JOIN
    (select * from
        ( select
          bapp.ID,
          bapp.NAME ,
          bapp.VERSION,
          mfap.SOFTCARD_OID,
          mfap.STATUS,
          row_number() over(partition by mfap.SOFTCARD_OID order by bapp.ID,bapp.VERSION desc) as IDX
          FROM
          pma.MANIFEST_APPLICATIONS mfap INNER JOIN
          pma.APPLICATIONS bapp ON bapp.OID=mfap.APPLICATION_OID
          AND bapp.ID='TKF' --and mfap.STATUS in (2,3)
        ) temp
        WHERE temp.IDX =1 and temp.STATUS in (1,2)
      ) tkf ON tkf.SOFTCARD_OID=sfcd.OID
     LEFT OUTER JOIN
      (
	  /*
        SELECT icrq.SOFTCARD_OID AS SOFTCARD_OID,
        pdse.String_Value       AS MYVALUE
        FROM 
        pma.ISSUER_CARD_REQUESTS icrq INNER JOIN 
        pma.PERSONAL_DATA_STORE_ELEMENTS pdse ON pdse.PERSONAL_DATA_STORE_OID= icrq.CARD_PERSO_DATA_STORE_OID
        WHERE pdse.NAME= 'ISIN'
		*/
		
		 SELECT 
        a.SOFTCARD_OID as SOFTCARD_OID,
        NVL2(a.MYVALUE1,a.MYVALUE1,b.MYVALUE2) as MYVALUE
        FROM
        (
        SELECT 
          mnf.SOFTCARD_OID AS SOFTCARD_OID,
          bom.STRING_VALUE AS MYVALUE1
        FROM 
          MANIFEST_APPLICATIONS mnf inner join 
          BOM_DATA_STORE_ELEMENTS bom on bom.bom_data_store_oid=mnf.bill_of_materials_oid
        WHERE bom.NAME = 'MSA Update ISIN'
        ) a inner join 
        (
        SELECT 
          mnf.SOFTCARD_OID AS SOFTCARD_OID,
          bom.STRING_VALUE AS MYVALUE2
        FROM 
          MANIFEST_APPLICATIONS mnf inner join 
          BOM_DATA_STORE_ELEMENTS bom on bom.bom_data_store_oid=mnf.bill_of_materials_oid
        WHERE bom.NAME='MSAISIN'
        ) b on a.SOFTCARD_OID=b.SOFTCARD_OID
		
      ) isin ON isin.SOFTCARD_OID    =sfcd.OID
    WHERE 1                          =1
    AND sfcd.CARD_ID                IS NOT NULL
    ) as pma.NKAM_BA_TABLE)
    into outTable
    from dual;
    RETURN outTable;
  END;
   
   
select * from table(GET_NKAM_BAS_QAO);
   
   
Select 
  ROWNUM as MYROWNUM,
  sc.OID as OID,
  sc.CARD_ID as CHIP_ID,
  sc.STATUS as CHIP_STATUS,
  ns.DEVICE_ID as DEVICE_ID,
  ns.BE_ID as BE_ID,
  ns.NCRS_ID as NCRS_ID,
  ns.READER_VENDOR_ID as READER_VENDOR_ID,
  ns.EQUIPMENT_VENDOR_ID as EQUIPMENT_VENDOR_ID, 
  be.CVMK_PREFERENCE as CVMK_PREFERENCE,
  bas.MSA,
  bas.S2,
  bas.S9,
  bas.TKF,
  bas.ISIN,
  bas.MSA_VERSION,
  bas.S9_VERSION,
  bas.S2_VERSION,
  bas.TKF_VERSION,
  bas.CHIP_STATUS,
  bas.MSA_STATUS,
  bas.S9_STATUS,
  bas.S2_STATUS,
  bas.TKF_STATUS
from 
  SOFTCARDS sc inner join
  ACCOUNTS ac on ac.OID=SC.ACCOUNT_OID inner join
  REQUESTED_NSAM_DEVICES ns on ns.DEVICE_ID=ac.ACCOUNT_NUMBER inner join
  BUSINESS_ENTITIES be on be.BE_ID=ns.BE_ID inner join
  table(GET_NKAM_BAS_QAO) bas on sc.CARD_ID=bas.CHIP_ID
WHERE 1=1


--=====================================================

create or replace
FUNCTION         GET_NKAM_BAS_QCM
 RETURN pma.NKAM_BA_TABLE  is
      outTable  pma.NKAM_BA_TABLE;
  BEGIN
    select cast(
    multiset(  SELECT
      sfcd.Card_ID          AS CHIP_ID,      
      NVL2(msa.NAME,1,0)    AS MSA,
      NVL2(s9.NAME,1,0)     AS S9,
      NVL2(s2.NAME,1,0)     AS S2,
      NVL2(tkf.NAME,1,0)    AS TKF,
      NVL(isin.MYVALUE,'-') AS ISIN,
      NVL(msa.VERSION,'-')  AS MSA_VERSION,
      NVL(s9.VERSION,'-')   AS S9_VERSION,
      NVL(s2.VERSION,'-')   AS S2_VERSION,
      NVL(tkf.VERSION,'-')  AS TKF_VERSION,
      sfcd.Status           AS CHIP_STATUS,
      NVL(msa.STATUS,-1)    AS MSA_STATUS,
      NVL(s9.STATUS,-1)     AS S9_STATUS,
      NVL(s2.STATUS,-1)     AS S2_STATUS,
      NVL(tkf.STATUS,-1)    AS TKF_STATUS
    FROM pma.SOFTCARDS sfcd
    LEFT OUTER JOIN
      (select * from
        ( select
          bapp.ID,
          bapp.NAME ,
          bapp.VERSION,
          mfap.SOFTCARD_OID,
          mfap.STATUS,
          row_number() over(partition by mfap.SOFTCARD_OID order by bapp.ID,bapp.VERSION desc) as IDX
          FROM
          pma.MANIFEST_APPLICATIONS mfap INNER JOIN
          pma.APPLICATIONS bapp ON bapp.OID=mfap.APPLICATION_OID
          AND bapp.ID='MSA' --and mfap.STATUS in (2,3)
        ) temp
       WHERE temp.IDX =1 and temp.STATUS in (2,3)
      ) msa ON msa.SOFTCARD_OID=sfcd.OID
    LEFT OUTER JOIN
      (select * from
        ( select
          bapp.ID,
          bapp.NAME ,
          bapp.VERSION,
          mfap.SOFTCARD_OID,
          mfap.STATUS,
          row_number() over(partition by mfap.SOFTCARD_OID order by bapp.ID,bapp.VERSION desc) as IDX
          FROM
          pma.MANIFEST_APPLICATIONS mfap INNER JOIN
          pma.APPLICATIONS bapp ON bapp.OID=mfap.APPLICATION_OID
          AND bapp.ID='S2' --and mfap.STATUS in (2,3)
        ) temp
       WHERE temp.IDX =1 and temp.STATUS in (2,3)
      ) s2 ON s2.SOFTCARD_OID=sfcd.OID
    LEFT OUTER JOIN
      (select * from
        ( select
          bapp.ID,
          bapp.NAME ,
          bapp.VERSION,
          mfap.SOFTCARD_OID,
          mfap.STATUS,
          row_number() over(partition by mfap.SOFTCARD_OID order by bapp.ID,bapp.VERSION desc) as IDX          
          FROM
          pma.MANIFEST_APPLICATIONS mfap INNER JOIN
          pma.APPLICATIONS bapp ON bapp.OID=mfap.APPLICATION_OID
          AND bapp.ID='S9' --and mfap.STATUS in (2,3)
        ) temp
        WHERE temp.IDX =1 and temp.STATUS in (2,3)
      ) s9 ON s9.SOFTCARD_OID=sfcd.OID
    LEFT OUTER JOIN
    (select * from
        ( select
          bapp.ID,
          bapp.NAME ,
          bapp.VERSION,
          mfap.SOFTCARD_OID,
          mfap.STATUS,
          row_number() over(partition by mfap.SOFTCARD_OID order by bapp.ID,bapp.VERSION desc) as IDX
          FROM
          pma.MANIFEST_APPLICATIONS mfap INNER JOIN
          pma.APPLICATIONS bapp ON bapp.OID=mfap.APPLICATION_OID
          AND bapp.ID='TKF' --and mfap.STATUS in (2,3)
        ) temp
        WHERE temp.IDX =1 and temp.STATUS in (2,3)
      ) tkf ON tkf.SOFTCARD_OID=sfcd.OID
     LEFT OUTER JOIN
      (
	  /*
        SELECT icrq.SOFTCARD_OID AS SOFTCARD_OID,
        pdse.String_Value       AS MYVALUE
        FROM 
        pma.ISSUER_CARD_REQUESTS icrq INNER JOIN 
        pma.PERSONAL_DATA_STORE_ELEMENTS pdse ON pdse.PERSONAL_DATA_STORE_OID= icrq.CARD_PERSO_DATA_STORE_OID
        WHERE pdse.NAME= 'ISIN'
		*/
		
		 SELECT 
        a.SOFTCARD_OID as SOFTCARD_OID,
        NVL2(a.MYVALUE1,a.MYVALUE1,b.MYVALUE2) as MYVALUE
        FROM
        (
        SELECT 
          mnf.SOFTCARD_OID AS SOFTCARD_OID,
          bom.STRING_VALUE AS MYVALUE1
        FROM 
          MANIFEST_APPLICATIONS mnf inner join 
          BOM_DATA_STORE_ELEMENTS bom on bom.bom_data_store_oid=mnf.bill_of_materials_oid
        WHERE bom.NAME = 'MSA Update ISIN'
        ) a inner join 
        (
        SELECT 
          mnf.SOFTCARD_OID AS SOFTCARD_OID,
          bom.STRING_VALUE AS MYVALUE2
        FROM 
          MANIFEST_APPLICATIONS mnf inner join 
          BOM_DATA_STORE_ELEMENTS bom on bom.bom_data_store_oid=mnf.bill_of_materials_oid
        WHERE bom.NAME='MSAISIN'
        ) b on a.SOFTCARD_OID=b.SOFTCARD_OID
		
      ) isin ON isin.SOFTCARD_OID    =sfcd.OID
    WHERE 1                          =1
    AND sfcd.CARD_ID                IS NOT NULL
    ) as pma.NKAM_BA_TABLE)
    into outTable
    from dual;
    RETURN outTable;
  END;
   
   
select * from table(GET_NKAM_BAS_QCM);
   
   
Select 
  ROWNUM as MYROWNUM,
  sc.OID as OID,
  sc.CARD_ID as CHIP_ID,
  sc.STATUS as CHIP_STATUS,
  ns.DEVICE_ID as DEVICE_ID,
  ns.BE_ID as BE_ID,
  ns.NCRS_ID as NCRS_ID,
  ns.READER_VENDOR_ID as READER_VENDOR_ID,
  ns.EQUIPMENT_VENDOR_ID as EQUIPMENT_VENDOR_ID, 
  be.CVMK_PREFERENCE as CVMK_PREFERENCE,
  bas.MSA,
  bas.S2,
  bas.S9,
  bas.TKF,
  bas.ISIN,
  bas.MSA_VERSION,
  bas.S9_VERSION,
  bas.S2_VERSION,
  bas.TKF_VERSION,
  bas.CHIP_STATUS,
  bas.MSA_STATUS,
  bas.S9_STATUS,
  bas.S2_STATUS,
  bas.TKF_STATUS
from 
  SOFTCARDS sc inner join
  ACCOUNTS ac on ac.OID=SC.ACCOUNT_OID inner join
  REQUESTED_NSAM_DEVICES ns on ns.DEVICE_ID=ac.ACCOUNT_NUMBER inner join
  BUSINESS_ENTITIES be on be.BE_ID=ns.BE_ID inner join
  table(GET_NKAM_BAS_QCM) bas on sc.CARD_ID=bas.CHIP_ID
WHERE 1=1


