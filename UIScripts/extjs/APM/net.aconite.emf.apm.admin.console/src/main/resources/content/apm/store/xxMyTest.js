var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});

Ext.define('Apm.store.MyTest', 
{
	extend		: 'Ext.data.Store',
	id			: 'idMyTestStore',
	model		: 'Apm.model.MyTest',
	remoteSort	: true,
	// allow the grid to interact with the paging scroller by buffering
	buffered	: false,
	//autoSync	: true,
	autoLoad	: true,
	pageSize	: varGridDefaultPageSize,
	proxy: 
	{
		// load using script tags for cross domain, if the data in on the same domain as
		// this page, an HttpProxy would be better
		type: 'jsonp',
		url: 'http://www.sencha.com/forum/remote_topics/index.php',
		reader: 
		{
			root: 'topics',
			totalProperty: 'totalCount',
			idProperty: 'threadid',
		},
		// sends single sort as multi parameter
		simpleSortMode: true,
		afterRequest: function (request, success) 
        {
            console.log('request.action : '+request.action);
		}
	},
	sorters: 
	[{
		property: 'lastpost',
		direction: 'DESC'
	}],	
});	
///////////////////////////////////////////////////