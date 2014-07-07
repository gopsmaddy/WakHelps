var varGridDefaultPageSize	= 10;
var varGridPluginExpanded 	= true;
var varGridHideRowId 		= true;
var varSimpleSortModeOn		= true;
var varWriteAllFields       = true;

var varProxyType 		= 'ajax'; //'rest'; //
var varReaderType		= 'json';
var varWriterType		= 'json';

var varRootRecord		= 'records';
var varIdProperty		= 'id';
var varTotalProperty	= 'totalCount';
var varSuccessProperty	= 'success';
var varMessageProperty  = 'message';
	

//-------------------------

var varPollingInterval	= 10000; //in millis

var varTickerPollingUrl	= '../../UIEventLogger';//../data/myticker/ping.json';
var varTickerGetEventsUrl	= '../../UIEventLogger?action=getEvents';//../data/myticker/mytest.json';
var varTickerUpdateEventUrl	= '../../UIEventLogger?action=updateEvent';
var varTickerDeleteEventUrl	= '../../UIEventLogger?action=deleteEvent';
var varTickerUpdateEventByStatusUrl	= '../../UIEventLogger?action=updateEventByStatus';
var varTickerDeleteEventByStatusUrl	= '../../UIEventLogger?action=deleteEventByStatus';
var varTickerDeleteAllEventsUrl	= '../../UIEventLogger?action=deleteAllEvents';

//xmlhttp.open("POST","../../UIEventLogger",true); //getname will be the servlet name

