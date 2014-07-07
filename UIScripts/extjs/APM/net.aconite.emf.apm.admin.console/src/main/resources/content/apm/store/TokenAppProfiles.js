var tokenAppProfilesMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
Ext.define('Apm.store.TokenAppProfiles',
{
	extend		: 'Ext.data.Store',
	id			: 'idTokenAppProfilesStore',
	model		: 'Apm.model.TokenAppProfiles',
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
		url 	: urlTokenAppProfilesData,			
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
            	var messageToDisplay;
            	if(!response.responseText){
            		console.log("message undefined");
            		messageToDisplay = operation.error;
            	} else{
            		console.log("message response");
            		console.log(response)
            		console.log(response.responseText);
            		var uiResponse = $.parseJSON(response.responseText);
            		messageToDisplay = uiResponse.message;
            	}
            	
                Ext.MessageBox.show(
                {
                    title: 'Remote Exception',
                    msg: messageToDisplay,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
                console.log(operation.error);
            }
        },
	},
	listeners:
	{
		beforeload : function(store, operation, eOpts )
		{
			//var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
			console.log('Before Loading.....');
			tokenAppProfilesMask.show();


		},

		load: function(store,records,options)
		{
			//var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
			store.loaded = true;
			console.log('Loaded.....');
			tokenAppProfilesMask.hide();
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