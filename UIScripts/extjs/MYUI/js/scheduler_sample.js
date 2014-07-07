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
    var apmSchedulerStore = new Ext.data.JsonStore//Ext.create('Ext.data.Store', 
	(
		{
			id: 'idSchedulerStore',
			model: 'SchedulerModel',
			remoteSort: true,
			// allow the grid to interact with the paging scroller by buffering
			buffered: true,
			autoSync: true,
			autoLoad: true,
			pageSize: 100,
			proxy: 
			{
				// load using script tags for cross domain, if the data in on the same domain as
				// this page, an HttpProxy would be better
				type: 'ajax',
				//url: 'http://www.sencha.com/forum/remote_topics/index.php',
				//url: 'http://localhost:8080/testgui/jsp/MyTest.jsp',
				url: 'http://localhost:8080/testgui/data/myjson.json',
				reader: 
				{
					type: 'json',
					root: 'topics',
					totalProperty: 'totalCount',
					idProperty: 'threadid'
				},
				writer: 
				{
					type: 'json'
				},
				// sends single sort as multi parameter
				simpleSortMode: true
			},
			sorters: [{property: 'lastpost', direction: 'DESC'}]
			
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
	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
	var pluginExpanded = true;
    var apmSchedulerGrid = new Ext.grid.GridPanel//Ext.create('Ext.grid.Panel', 
	(
		{
			id:'idSchedulerGrid',
			renderTo:'divSchedulerResults',
			title: 'Scheduler Tasks',
			store: apmSchedulerStore,
			plugins: [rowEditing],			
			// grid columns
			columns:
				[
					{id: 'idGRownumber'	, header: "Row Id"		, xtype: 'rownumberer'	 , width: 50	, sortable: false},
					{id: 'idGTopic'		, header: "Topic"		, dataIndex: 'title'	 , flex: 1		, sortable: true	, field: {xtype: 'textfield'}},
					{id: 'idGAuthor'	, header: "Author"		, dataIndex: 'username'	 , width: 100	, sortable: true	, hidden: true},
					{id: 'idGReplies'	, header: "Replies"		, dataIndex: 'replycount', width: 70	, sortable: false	, align: 'center'},
					{id: 'idGLastpost'	, header: "Last Post"	, dataIndex: 'lastpost'	 , width: 130	, sortable: true	, renderer: Ext.util.Format.dateRenderer('n/j/Y g:i A')}
				],
			//viewConfig: {trackOver: false},
			viewConfig: {emptyText: 'No records to display.'},			
			//width: 700,
			height: 500,
			collapsible: true,
			loadMask: true,
			selModel: {pruneRemoved: false},
			multiSelect: true,			
			
		   	autoWidth: true,
		   	//autoHeight:true,
		   	//stripeRows: true,
			// paging bar on the bottom
			/*
			bbar: new Ext.PagingToolbar//Ext.create('Ext.PagingToolbar', 
			(
				{
					id : 'idSchedulerBBar',
					displayInfo: true,
					displayMsg: 'Displaying topics {0} - {1} of {2}',
					emptyMsg: "No items to display",						
					store: apmSchedulerStore					
				}
			),
			*/
			dockedItems: 
			[
				{
					xtype: 'toolbar',
					items: 
					[
						{
							text: 'Add',
							iconCls: 'icon-add',
							handler: function()
							{
								// empty record
								apmSchedulerStore.insert(0, new SchedulerModel());
								rowEditing.startEdit(0, 0);
							}
						}, 
						'-', 
						{
							itemId: 'delete',
							text: 'Delete',
							iconCls: 'icon-delete',
							disabled: true,
							handler: function()
							{
								var selection = apmSchedulerGrid.getView().getSelectionModel().getSelection()[0];
								if (selection) 
								{
									apmSchedulerStore.remove(selection);
								}
							}
						}
					]
				}
			]
			
		}
	);
	apmSchedulerGrid.getSelectionModel().on('selectionchange', function(selModel, selections)
	{
        apmSchedulerGrid.down('#delete').setDisabled(selections.length === 0);
    });
	//////////////////////////////////////////////////////////////////////////////////
});