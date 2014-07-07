var varMyTestMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});

Ext.define('Apm.store.MyTest', 
{
	extend		: 'Ext.data.Store',
	id			: 'idMyTestStore',
	model		: 'Apm.model.MyTest',
	remoteSort	: true,
	// allow the grid to interact with the paging scroller by buffering
	buffered	: false,
	autoSync	: true,
	autoLoad	: true,
	pageSize	: varGridDefaultPageSize,
	proxy		: 
	{
		// load using script tags for cross domain, if the data in on the same domain as
		// this page, an HttpProxy would be better		
		url 	: urlMyTestData,			//'http://modules.eurouwins.com/php/test2.php',//'http://localhost:8080/apmgui/jsp/myproxy.jsp?action=pins',//
		type	: varProxyType, //'jsonp',//
		//callbackKey: 'callback'	,
		//timeout: 120000,
        //noCache: true,
		//actionMethods: 
		//{
		//	read   : 'GET',
		//	create : 'POST',			
		//	update : 'PUT',
		//	destroy: 'DELETE',
		//},
		//headers: 
		//{
        //    'Content-type': 'application/json',
		//	'password':'apm',
        //},
		//headers: 
		//{
		//	'Content-type': 'application/json',
		//	'Accept': 'application/json',    
        //},
		reader	: 
		{
			type: varReaderType,
			root: varRootRecord,
			idProperty: varIdProperty,
			totalProperty:varTotalProperty,	
			successProperty	: varSuccessProperty,
		},	
		writer: 
		{
			type			: varWriterType,
		},
		listeners:
        {
            exception: function(proxy, response, operation)
            {
                Ext.MessageBox.show(
                {
                    title: 'Remote Exception',
                    msg: 'NetworkError: 404 Not Found',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        },
		simpleSortMode: true,
		/*
		afterRequest: function (request, success) 
        {
            console.log('request.action : '+request.action);
			
            if (request.action == 'read') 
			{
                //this.readCallback(request);
            }
            
            else if (request.action == 'create') 
			{
                //this.createCallback(request);
            }
            
            else if (request.action == 'update') 
			{
                //this.updateCallback(request);
            }
            
            else if (request.action == 'destroy') 
			{
                //this.deleteCallback(request);
            }
        },
		*/
		/*,
		listeners: 
		{
			write: function(store, operation)
			{
				
				alert(record.getId());
				var record = operation.getRecords()[0],
				name = Ext.String.capitalize(operation.action),
				verb;                    
				
				if (name == 'Destroy') 
				{
					record = operation.records[0];
					verb = 'Destroyed';
				} 
				else 
				{
					verb = name + 'd';
				}
				Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
		
			}
		}*/		
	},
	
	listeners: 
	{		
		beforeload : function(store, operation, eOpts )
		{			
			console.log('Before Loading.....MyTest');
			varMyTestMask.show();
			//store.load({params:{eyeColor:'brown' }});			
			
		},		
		load: function(store,records,options) 
		{			
			store.loaded = true;
			console.log('Loaded.....MyTest');		
			varMyTestMask.hide();
		},
        write: function(proxy, operation)
        {
            console.log('operation.action.....'+operation.action);
            //if (operation.action == 'destroy')
            //{
            //    main.child('#form').setActiveRecord(null);
            //}
            //Ext.example.msg(operation.action, operation.resultSet.message);
            Ext.Msg.alert(operation.action, operation.resultSet.message);
        }
	},
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////
////////////////////////////////////////////////


/*
//http://stackoverflow.com/questions/7316967/extjs-4-problems-with-jsonstore-post-request

type: 'ajax',
actionMethods: {
    create : 'POST',
    read   : 'POST',
    update : 'POST',
    destroy: 'POST'
}
//---------------------
//http://stackoverflow.com/questions/7566564/is-it-possible-to-access-cross-site-post-method-in-extjs4

Ext.define('Ext.data.proxy.CustomJsonP',
    extend: 'Ext.data.proxy.JsonP'),
    doRequest: function(operation, callback, scope) {
        operation['method'] = 'POST';
        this.callParent(arguments);
}

Ext.define('User', {

 extend: 'Ext.data.Model',
 fields: ['id', 'name', 'email']
});

var store = Ext.create('Ext.data.Store', {
    model: 'User',
    restful:true,   
       proxy: new Ext.data.proxy.CustomJsonP({
           url: 'http://localhost:8080/testapp/userreg',
           callbackKey: 'Callback'
    }),

        headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'    
        }
    });

store.load();
//---------------
Ext.override(Ext.data.Request, {
    method: 'POST'
})

//---------------------
//http://techknowfreak.com/2011/10/extjs-4-mvc-asp-net-mvc-3-crud-rest/#.UBDcgGFYs6A

afterRequest: function (request, success)
        {
			console.log('afterRequest.....');
			
            if (request.action == 'read') 
			{
                this.readCallback(request);
            }
 
            else if (request.action == 'create') 
			{
                this.createCallback(request);
            }
 
            else if (request.action == 'update') 
			{
                this.updateCallback(request);
            }
 
            else if (request.action == 'destroy') 
			{
                this.deleteCallback(request);
            }
        },
 
        //After Albums fetched
 
        readCallback: function (request)
        {
            if (!request.operation.success)
            {
            console.log('readCallback.....');
            }
        },
 
        //After A record/Album created
 
        createCallback: function (request)
        {
            if (!request.operation.success)
            {
              console.log('createCallback.....');
            }
        },
 
        //After Album updated
 
        updateCallback: function (request)
        {
            if (!request.operation.success)
            {
              console.log('updateCallback.....');
            }
        },
 
        //After a record deleted
 
        deleteCallback: function (request)
        {
            if (!request.operation.success)
            {
               console.log('deleteCallback.....');
            }
        }

*/