Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../ux/');
Ext.require
([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.grid.PagingScroller'
]);


Ext.onReady(function()
{
	/////////////////Scheduler Data Mapping//////////////////////////////////////////
    Ext.define('SchedulerModel', 
	{
        extend: 'Ext.data.Model',
        fields: 
			[				
				{name: 'title'		, mapping: 'title'},
				{name: 'forumtitle'	, mapping: 'forumtitle'},
				{name: 'forumid'	, mapping: 'forumid'},
				{name: 'username'	, mapping: 'username'},				
				{name: 'replycount' , mapping: 'replycount'	, type: 'int'}, 
				{name: 'lastpost'	, mapping: 'lastpost'	, type: 'date'	, dateFormat: 'timestamp'	},
				{name: 'lastposter'	, mapping: 'lastposter'},
				{name: 'excerpt'	, mapping: 'excerpt'},
				{name: 'threadid'	, mapping: 'threadid'}				
			]
        
    });
	
	/////////////////Scheduler Data Store//////////////////////////////////////////

    // create the Data Store
    var apmSchedulerStore = new Ext.data.Store//Ext.create('Ext.data.Store', 
	(
		{
			id: 'idSchedulerStore',
			model: 'SchedulerModel',
			remoteSort: true,
			// allow the grid to interact with the paging scroller by buffering
			buffered: false,
			pageSize: 100,
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
					idProperty: 'threadid'
				},
				// sends single sort as multi parameter
				simpleSortMode: true
			},
			sorters: [{property: 'lastpost', direction: 'DESC'}],
			autoLoad: true
		}
	);
	/////////////////Scheduler Render Topic//////////////////////////////////////////
    function renderTopic(value, p, record) 
	{
        return Ext.String.format
		(
            '<a href="http://sencha.com/forum/showthread.php?t={2}" target="_blank">{0}</a>',
            value,
            record.data.forumtitle,
            record.getId(),
            record.data.forumid
        );
    }
	
	/////////////////Scheduler Data Grid//////////////////////////////////////////
	var pluginExpanded = true;
    var apmSchedulerGrid = new Ext.grid.GridPanel//Ext.create('Ext.grid.Panel', 
	(
		{
			id:'idSchedulerGrid',
			renderTo:'divSchedulerResults',
			title: 'Scheduler Tasksxx',
			store: apmSchedulerStore,			
			// grid columns
			columns:
				[
					{id: 'idGRownumber'	, text: "Row Id"	, xtype: 'rownumberer'	 , width: 50	, sortable: false},
					{id: 'idGTopic'		, text: "Topic"		, dataIndex: 'title'	 , flex: 1		, sortable: false	, renderer: renderTopic	, tdCls: 'x-grid-cell-topic'},
					{id: 'idGAuthor'	, text: "Author"	, dataIndex: 'username'	 , width: 100	, sortable: true	, hidden: true},
					{id: 'idGReplies'	, text: "Replies"	, dataIndex: 'replycount', width: 70	, sortable: false	, align: 'center'},
					{id: 'idGLastpost'	, text: "Last Post"	, dataIndex: 'lastpost'	 , width: 130	, sortable: true	, renderer: Ext.util.Format.dateRenderer('n/j/Y g:i A')}
				],
			//viewConfig: {trackOver: false},
			//viewConfig: {emptyText: 'No records to display.'},
			/*
			viewConfig: 
			{
				id: 'idViewConfig',
				trackOver: false,
				stripeRows: false,
				plugins: 
				[
					{
						pluginId: 'idPreviewPlugin',
						ptype: 'preview',
						bodyField: 'excerpt',
						expanded: true						
					}
				]
			},
			*/
			//width: 700,
			//height: 500,
			collapsible: true,
			loadMask: true,
			selModel: {pruneRemoved: false},
			multiSelect: true,
			
			//autoExpandColumn: 'idGTopic',
		   	autoWidth: true,
		   	autoHeight:true,
		   	//stripeRows: true,
			// paging bar on the bottom
			bbar: new Ext.PagingToolbar//Ext.create('Ext.PagingToolbar', 
			(
				{
					id : 'idSchedulerBBar',
					displayInfo: true,
					displayMsg: 'Displaying topics {0} - {1} of {2}',
					emptyMsg: "No items to display",						
					store: apmSchedulerStore,
					//pageSize:myDefaultPageSize,
					//plugins: [new Ext.ux.PageSizePlugin()]
					/*					
					items:
					[
						'-', 
						{
							text: 'Show Preview',
							pressed: pluginExpanded,
							enableToggle: true,
							toggleHandler: 
									function(btn, pressed) 
									{
										var preview = Ext.getCmp('idViewConfig').getPlugin('idPreviewPlugin');
										preview.toggleExpanded(pressed);
									}
						}
					]				
					*/
				}
			),
			
		}
	);
});