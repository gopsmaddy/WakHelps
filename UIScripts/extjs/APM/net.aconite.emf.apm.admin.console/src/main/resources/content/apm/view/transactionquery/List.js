var varActionColumnEditHide=false;
var varActionColumnDeleteHide=false;
var varActionColumnRunHide=true;

function renderToTokenAppStatusLookup(value)
{
	if(Ext.StoreMgr.lookup('TokenAppStatus')!=null && Ext.StoreMgr.lookup('TokenAppStatus').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TokenAppStatus').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('TokenAppStatus').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToTxStatusLookup(value)
{
	if(Ext.StoreMgr.lookup('TxStatus')!=null && Ext.StoreMgr.lookup('TxStatus').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TxStatus').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('TxStatus').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToResponseCodeLookup(value)
  {
	if(Ext.StoreMgr.lookup('PMResponseCode')!=null && Ext.StoreMgr.lookup('PMResponseCode').findRecord('id', value)!=null && Ext.StoreMgr.lookup('PMResponseCode').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('PMResponseCode').findRecord('id', value).get('name'));
	else
		return value;
  };

 function renderToTokenProductLookup(value)
 {
 	if(Ext.StoreMgr.lookup('TokenProducts')!=null && Ext.StoreMgr.lookup('TokenProducts').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TokenProducts').findRecord('id', value).get('name')!=null)
 		return Ext.String.format (Ext.StoreMgr.lookup('TokenProducts').findRecord('id', value).get('name'));
 	else
 		return value;
 };

Ext.define('Apm.view.transactionquery.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.transactionquerylist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Apm.view.lookup.TokenAppStatus',
        'Apm.view.lookup.TokenProduct',
        'Apm.view.lookup.PMResponseCode',
        'Apm.view.lookup.TxStatus',
        'Ext.data.StoreManager',
	],
	
	id		: 'idTransactionQueryList',
    title 	: 'Transaction List',
	store	: 'Transaction',
	renderTo: 'divTransactionQueryList',
	hidden	: true,




    initComponent: function() 
	{
        this.columns = 
		[
			//{id: 'idGAction'	, header: "action"		, xtype:'appactioncolumn', width: 75	, sortable: false   ,align	: 'center'},
			{
				xtype: 'actioncolumn',
				width:50,
				sortable: false,
				items:
				[

					{
						itemId	: 'idColumnDetail',
						tooltip	: 'Detail',
						icon	: varIconDetail,
						disabled: varActionColumnEditHide,
						hidden	: varActionColumnEditHide,
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
						{
							this.fireEvent('itemclick', this, 'detail', grid, rowIndex, colIndex, record, node);
						}
					},
				]
			},
			{
			    id: 'idGRownumber',
			    header: "Row ID",
			    xtype: 'rownumberer',
			    width: 50,
			    sortable: false	,
			    hidden: varGridHideRowId
			},
			{
			    id: 'idGId',
			    header: "Id",
			    dataIndex: 'id',
			    width: 50,
			    sortable: true,
			    align: 'left'
			},
			{    id: 'idGStatus',
			    header: "Status",
			    dataIndex: 'status',
			    renderer: renderToTxStatusLookup,
			    width: 50,
			    sortable: false,
			    align: 'left'
			},			{    id: 'idGTransType',
			    header: "Transaction Type",
			    dataIndex: 'transactionType',
			    width: 50,
			    sortable: false,
			    align: 'left'
			},
			{    id: 'idGSystemDateTime',
			    header: "System DateTime",
			    dataIndex: 'systemDateTime',
			    width: 50,
			    sortable: false,
			    align: 'left'
			},

			{    id: 'idGRequestPanDisplay',
			    header: "Request PAN",
			    dataIndex: 'requestPanDisplay',
			    width: 50,
			    sortable: false,
			    align: 'left'
			},
						{    id: 'idGResponsePanDisplay',
            			    header: "Response PAN",
            			    dataIndex: 'responsePanDisplay',
            			    width: 50,
            			    sortable: false,
            			    align: 'left'
            			},
			{    id: 'idGRequestDateTime',
			    header: "Request DateTime",
			    dataIndex: 'requestDateTime',
			    width: 50,
			    sortable: false,
			    align: 'left'
			},
			{    id: 'idGResponseDateTime',
			    header: "Response DateTime",
			    dataIndex: 'responseDateTime',
			    width: 50,
			    sortable: false,
			    align: 'left'
			},
			{
			    id: 'idGResponseCode',
			    header: "Response Code",
			    dataIndex: 'responseCode',
			    renderer: renderToResponseCodeLookup,
			    width: 50,
			    sortable: false,
			    align: 'left'
			},
			{
			    id: 'idGError',
			    header: "Error",
			    dataIndex: 'errorDescription',
			    width: 50,
			    sortable: false,
			    align: 'left'
			},
			{
			    id: 'idGREQPanID',
			    header: "Request PAN ID",
			    dataIndex: 'requestPanId',
			    width: 50,
			    sortable: false,
			    align: 'left'
			},
			{
			    id: 'idGRSPPanID',
			    header: "Response PAN ID",
			    dataIndex: 'responsePanId',
			    width: 50,
			    sortable: false,
			    align: 'left'
			},
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
	
	plugins: [varManageTokensCellEditing],
	//plugins: [rowEditing],
		
	dockedItems: 
	[
		{
			id 		: 'idTransactionQueryTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},		
		{
			id 		: 'idTransactionQueryBBar',
			xtype	: 'apppagingbar',
			store	: 'Transaction',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});