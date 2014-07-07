var tokenAppStatusMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
Ext.define('Apm.store.TokenAppStatus',
{
	extend		: 'Ext.data.Store',
	id			: 'idTokenAppStatusStore',
	model		: 'Apm.model.TokenAppStatus',
//	data   		:
//				[
//                    {"id":1, "name":"Active"},
//                    {"id":2, "name":"Inactive"},
//                    {"id":3, "name":"Locked"},
//                    {"id":4, "name":"Deleted"},
//                    {"id":5, "name":"Waiting activation"},
//                    {"id":6, "name":"PIN locked"},
//				],
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
		url 	: urlTokenAppStatusData,
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

			console.log('Before Loading.....');
			tokenAppStatusMask.show();
		},

		load: function(store,records,options)
		{
			store.loaded = true;
			console.log('Loaded.....');
			tokenAppStatusMask.hide();
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