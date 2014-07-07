var varActionColumnEditHide=false;
var varActionColumnDeleteHide=false;
var varActionColumnRunHide=false;

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
		'Apm.view.lookup.MyTest',	
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
			{
				xtype: 'rownumberer',
				width: 50,
				sortable: false
			},
			{
				//tdCls: 'x-grid-cell-topic',
				text: "Topic",
				dataIndex: 'title',
				flex: 1,
				//renderer: renderTopic,
				sortable: false
			},
			{
				text: "Author",
				dataIndex: 'username',
				width: 100,
				hidden: true,
				sortable: true
			},
			{
				text: "Replies",
				dataIndex: 'replycount',
				align: 'center',
				width: 70,
				sortable: false
			},
			{
				id: 'last',
				text: "Last Post",
				dataIndex: 'lastpost',
				width: 130,
				//renderer: Ext.util.Format.dateRenderer('n/j/Y g:i A'),
				sortable: true
			}
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
	
	plugins: [cellEditing],
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