var varActionColumnEditHide=false;
var varActionColumnDeleteHide=false;
var varActionColumnRunHide=false;

function renderTopic(value) 
{	
	if(Ext.StoreMgr.lookup('TestCountry')==null)
		alert('store is null');
	
	if(Ext.StoreMgr.lookup('TestCountry')!=null && Ext.StoreMgr.lookup('TestCountry').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TestCountry').findRecord('id', value).get('name')!=null)
        return Ext.String.format (Ext.StoreMgr.lookup('TestCountry').findRecord('id', value).get('name'));
    else
        return value;
};

function renderTopicx(value, p, record) 
{
	return Ext.String.format
	(
		'<a href="http://sencha.com/forum/showthread.php?t={2}" target="_blank">{0}</a>',
		'value',
		record.data.forumtitle,
		record.getId(),
		record.data.forumid
	);
};

Ext.define('Apm.view.mytest.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.mytestlist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
		'Ext.selection.CellModel',		
		'Apm.view.Pagingbar',
		'Apm.view.Toolbar',
		'Apm.view.Actioncolumn',
		'Apm.view.lookup.TestCountry',
		'Ext.data.StoreManager'
	],
	
	id		: 'idMyTestList',
    title 	: 'MyTest List',
	store	: 'MyTest',
	renderTo: 'divMyTestList',
	hidden	: false,	
	
    initComponent: function() 
	{
        this.columns = 
		[
           //{id: 'idGAction'	, header: "action"		, xtype:'appactioncolumn', width: 75	, sortable: false   ,align	: 'center'},
			{
				xtype: 'actioncolumn',
				width:75,
				sortable: false,						
				items: 
				[
					
					{
						itemId	: 'idColumnEdit',	
						tooltip	: 'Edit',
						icon	: varIconEdit,
						disabled: false,
						hidden	: varActionColumnEditHide,						
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode) 
						{
							this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);							
						}						
					},
					{icon: varIconGap},
					{
						itemId	: 'idColumnDelete',						
						tooltip	: 'Delete',
						icon	: varIconDelete,						
						disabled: false,
						hidden	: varActionColumnDeleteHide,						
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode) 
						{							
							this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, record, node);							
						},						
					},
					{icon: varIconGap},
					{
						itemId	: 'idColumnRun',						
						tooltip	: 'Run',
						icon	: varIconRun,
						disabled: false,
						hidden	: varActionColumnRunHide,	
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode) 
						{
							//alert("Edit " + record.get('name'));
							this.fireEvent('itemclick', this, 'run', grid, rowIndex, colIndex, record, node);							
						}						
					},
					
				]
			},
			{id: 'idGRownumber'	, header: "Row ID"		, xtype: 'rownumberer'	 , width: 50	, sortable: false	, hidden: varGridHideRowId},
            {id: 'idGId'		, header: "Task ID"		, dataIndex: 'id'		 , width: 50	, sortable: true	, align: 'left'},
            {id: 'idGName'		, header: "Name"		, dataIndex: 'name'	 	 , flex:  1		, sortable: true	, align: 'left'}, //field: {xtype: 'mytestlookup'}},//
            {id: 'idGCommand'	, header: "Cron"		, dataIndex: 'command'	 , flex:  1		, sortable: true	, align: 'left'},//	    , field: {xtype: 'textfield',vtype:'apmCommand'}}	, tooltip: 'start and end offset values'},
            {id: 'idGSeconds'	, header: "Seconds"		, dataIndex: 'seconds'	 , width: 60	, sortable: true	, align: 'left', hidden: false, renderer: renderTopic},//, field: {xtype: 'countrylookup'} },//editor: apmSecondsField	},
            {id: 'idGStatus'	, header: "Active?"		, dataIndex: 'status'	 , width: 50	, sortable: true	, align: 'center', xtype: 'checkcolumn'	, stopSelection: true},
            {id: 'idGLastRun'	, header: "Last Run"	, dataIndex: 'lastrun'	 , width: 130	, sortable: true	, align: 'left'	, renderer: Ext.util.Format.dateRenderer('Y-m-d G:i:s')},
            {id: 'idGNextRun'	, header: "Next Run"	, dataIndex: 'nextrun'	 , width: 130	, sortable: true	, align: 'left'	, renderer: Ext.util.Format.dateRenderer('Y-m-d G:i:s')},

			
        ];

        this.callParent(arguments);
    },
	
	//viewConfig: {trackOver: false},
	viewConfig: {emptyText: 'No records to display.'},			
	
	//width: 700,
	autoWidth: true,
	
	height: 320,			
	//autoHeight:true,
	
	collapsible: true,
	loadMask: true,
	
	//selModel: {pruneRemoved: false},
	selModel: {selType: 'rowmodel'},
	//selModel: { selType: 'cellmodel'},
	
	multiSelect: false,	
	stripeRows: true,
	
	plugins: [varMyTestCellEditing],
	//plugins: [rowEditing],
	
	//bbar: 'Pagingbar',	
	//tbar: apmMyTestTBar,
	dockedItems: 
	[
		{
			id 		: 'idMyTestTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},		
		{
			id 		: 'idMyTestBBar',
			xtype	: 'apppagingbar',
			store	: 'MyTest',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});