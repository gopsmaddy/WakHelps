var varActionColumnEditHide=false;
var varActionColumnDeleteHide=false;
var varActionColumnRunHide=true;
Ext.define('Apm.view.pmresponsecode.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.pmresponsecodelist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        //'Apm.view.lookup.EncryptionZone',
        //'Ext.data.StoreManager',
	],
	
	id		: 'idPMResponseCodeList',
    title 	: 'PMResponseCode List',
	store	: 'PMResponseCode',
	renderTo: 'divPMResponseCodeList',
	hidden	: false,	
	
    initComponent: function() 
	{
        this.columns = 
		[
			//{id: 'idGAction'	, header: "action"		, xtype:'appactioncolumn', width: 75	, sortable: false   ,align	: 'center'},
//			{
//				xtype: 'actioncolumn',
//				width:75,
//				sortable: false,
//				items:
//				[
//
//					{
//						itemId	: 'idColumnEdit',
//						tooltip	: 'Edit',
//						icon	: varIconEdit,
//						disabled: false,
//						hidden	: varActionColumnEditHide,
//						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
//						{
//							this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);
//						}
//					},
//					{icon: varIconGap},
//					{
//						itemId	: 'idColumnDelete',
//						tooltip	: 'Delete',
//						icon	: varIconDelete,
//						disabled: false,
//						hidden	: varActionColumnDeleteHide,
//						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
//						{
//							this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, record, node);
//						},
//					},
//					/*
//					{icon: varIconGap},
//					{
//						itemId	: 'idColumnRun',
//						tooltip	: 'Run',
//						icon	: varIconRun,
//						disabled: false,
//						hidden	: varActionColumnRunHide,
//						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
//						{
//							//alert("Edit " + record.get('name'));
//							this.fireEvent('itemclick', this, 'run', grid, rowIndex, colIndex, record, node);
//						}
//					},
//					*/
//
//				]
//			},
			{id: 'idGRownumber'	, header: "Row ID"		, xtype: 'rownumberer'	 , width: 50	, sortable: false	, hidden: varGridHideRowId},
			{id: 'idGId'		, header: "Id"			, dataIndex: 'id'		 , width: 100	, sortable: true	, align: 'left'},
			{id: 'idGName'		, header: "Name"		, dataIndex: 'name'	 	 , flex:  1		, sortable: true	, align: 'left'},

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
	
	plugins: [varPMResponseCodeCellEditing],
	//plugins: [rowEditing],
		
	dockedItems: 
	[
		{
			id 		: 'idPMResponseCodeTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},		
		{
			id 		: 'idPMResponseCodeBBar',
			xtype	: 'apppagingbar',
			store	: 'PMResponseCode',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});