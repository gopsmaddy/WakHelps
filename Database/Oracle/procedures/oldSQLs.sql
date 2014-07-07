
--Statistics
select
	NVL2(x.REQUEST_TYPE, x.REQUEST_TYPE,y.REQTYPE) REQUEST_TYPE,
    (NVL2(x.TOTAL_RECEIVED_REQUEST, x.TOTAL_RECEIVED_REQUEST, 0) || '') received,
    (NVL2(x.UN_DELIVERED_REQUEST, x.UN_DELIVERED_REQUEST, 0) || '') un_delivered,
    (NVL2(x.AT_BUREAU_REQUEST, x.AT_BUREAU_REQUEST, 0) || '') at_bureau,
    (NVL2(x.COMPLETED_REQUEST, x.COMPLETED_REQUEST, 0) || '') completed,
    (NVL2(x.FAILED_REQUEST, x.FAILED_REQUEST, 0) || '') failed_request
from
	(SELECT
		vbs.REQUEST_TYPE,
		sum(decode(vbs.STATE, null, 0, 1)) TOTAL_RECEIVED_REQUEST,
		sum(decode(vbs.STATE, 100, 1, 0)) UN_DELIVERED_REQUEST,
	  	sum(decode(vbs.STATE, 110, 1, 0))  AT_BUREAU_REQUEST,
	  	sum(decode(vbs.STATE, 140, 1, 0)) COMPLETED_REQUEST,
	  	sum(decode(vbs.STATE, 200, 1, 0)) FAILED_REQUEST
	FROM
		BUREAU_STATUS_VIEW vbs
	WHERE
		CREATED BETWEEN {?startDate} AND {?endDate}
		AND BUREAU = '{?bureauName}'
	GROUP BY vbs.REQUEST_TYPE) x,

	(SELECT myTemp.requestType reqType
			FROM  (SELECT 'CreateRequest' AS requestType FROM dual
				  UNION ALL SELECT 'RenewRequest' AS requestType FROM dual
				  UNION ALL SELECT 'ReplaceRequest' AS requestType FROM dual
				  UNION ALL SELECT 'UploadRequest' AS requestType FROM dual
				  ) myTemp) y
WHERE y.reqType = x.REQUEST_TYPE(+)
ORDER BY y.REQTYPE

------------------------------------------------------
--Undelivered Requests
select request_type, product, tracking_id, created
from bureau_status_view
where state = 100
and created between {?startDate} and {?endDate}
and bureau = '{?bureauName}'
order by created, tracking_id

{BUREAU_UNDELIVERED_VIEW.STATE}=100 
AND {BUREAU_UNDELIVERED_VIEW.CREATED} in {?startDate} to {?endDate} 
AND {BUREAU_UNDELIVERED_VIEW.BUREAU} = {?bureauName}

------------------------------------------------------
--At Bureau Requests
select request_type, created, product, tracking_id, date_delivered, batch_file_name, state
from bureau_status_view
where state = 110
and created between {?startDate} and {?endDate}
and bureau = '{?bureauName}'
order by created, tracking_id

-----------------------------------------------------
--Failed Requests
select request_type, created, product, tracking_id, date_delivered, batch_file_name, issued, state
from bureau_status_view
where state = 200
and created between {?startDate} and {?endDate}
and bureau = '{?bureauName}'
order by created, tracking_id

--------------