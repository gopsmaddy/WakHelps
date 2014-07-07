var myIssuerMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});

Ext.define('Apm.store.Issuer', 
{
	extend		: 'Ext.data.Store',
	alias       : 'widget.issuerstore',

	id			: 'idIssuerStore',
	model		: 'Apm.model.Issuer',
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
		url 	: urlIssuerData,
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
			myIssuerMask.show();
			//extraParams:{ eyeColor:'##################' };
		},
		
		load: function(store,records,options) 
		{			
			store.loaded = true;
			console.log('Loaded.....');		
			myIssuerMask.hide();
		},
        write: function(proxy, operation)
        {
            console.log('operation.action.....'+operation.action);
            //if (operation.action == 'destroy')
           // {
                //main.child('#form').setActiveRecord(null);
                //this.fireEvent('storeWrite', this, 'destroy', proxy, operation);
           //}
           //Ext.example.msg(operation.action, operation.resultSet.message);
           //Ext.example.msg(operation.action, operation.resultSet.message);
           Ext.Msg.alert(operation.action, operation.resultSet.message);

        }
	},
	sorters: [{property: 'name', direction: 'ASC'}]	
});	
///////////////////////////////////////////////////