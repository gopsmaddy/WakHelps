var transactionStatisticsMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
Ext.define('Apm.store.TransactionStatistics',
{
	extend		: 'Ext.data.Store',
	id			: 'idTransactionStatisticsStore',
	model		: 'Apm.model.TransactionStatistic',
	remoteSort	: true,
	// allow the grid to interact with the paging scroller by buffering
	buffered	: false,
	autoSync	: true,
	autoLoad	: false,
	pageSize	: varGridDefaultPageSize,
	proxy		: 
	{
		// load using script tags for cross domain, if the data in on the same domain as
		// this page, an HttpProxy would be better
		url 	: urlTransactionStatisticsData,
		type	: varProxyType,				
		reader	: 
		{
			type: varReaderType,
			root: varRootRecord,
			idProperty: varIdProperty,
			totalProperty: varTotalProperty,					
			successProperty	: varSuccessProperty,
			messageProperty: varMessageProperty,
		},
		headers: 
		{            
			'pageName':document.getElementById('pageName').value,
		},		
		writer: 
		{
			type			: varWriterType,
            writeAllFields : varWriteAllFields,
		},	
		simpleSortMode: varSimpleSortModeOn,
        listeners:
                {
                    exception: function(proxy, response, operation)
                    {
                        Ext.MessageBox.show(
                        {
                            title: 'Remote Exception',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
        },
	},
	listeners: 
	{		
		beforeload : function(store, operation, eOpts )
		{			
			//var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
			console.log('Before Loading.....');
			transactionStatisticsMask.show();
		},
		
		load: function(store,records,options) 
		{
			//var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
			store.loaded = true;
			console.log('Loaded.....');		
			transactionStatisticsMask.hide();
		},
        write: function(proxy, operation)
        {
            console.log('operation.action.....'+operation.action);
            Ext.Msg.alert(operation.action, operation.resultSet.message);
        }
	},
	sorters: [{property: 'name', direction: 'ASC'}]
});	
///////////////////////////////////////////////////