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
function renderToTokenProductLookup(value)
{
	if(Ext.StoreMgr.lookup('TokenProducts')!=null && Ext.StoreMgr.lookup('TokenProducts').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TokenProducts').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('TokenProducts').findRecord('id', value).get('name'));
	else
		return value;
};

Ext.define('Apm.view.managetokens.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.managetokenslist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Apm.view.lookup.TokenAppStatus',
        'Apm.view.lookup.TokenProduct',
        'Ext.data.StoreManager',
	],
	
	id		: 'idManageTokensList',
    title 	: 'Manage Tokens List',
	store	: 'ManageTokens',
	renderTo: 'divManageTokensList',
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
						icon	: Apm.app.hasRole('TOKENS/MANAGE TOKENS') ? varIconDetail : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('TOKENS/MANAGE TOKENS'),
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
			{
				id: 'idGPanDisplay',
				header: "PAN Display",
				dataIndex: 'panDisplay',
				flex:  1,
				sortable: true,
				width: 100,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGPanId',
				header: "PAN ID",
				dataIndex: 'panId',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGPanSeqNumber',
				header: "PAN SeqNumber",
				dataIndex: 'panSeqNumber',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGExpiryDate',
				header: "Expiry Date",
				dataIndex: 'expiryDate',
				flex:  1,
				sortable: true,
				width: 55,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGCustomerCode',
				header: "Customer Code",
				dataIndex: 'customerCode',
				flex:  1,
				sortable: false,
				width: 100,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGStatus',
				header: "Active",
				dataIndex: 'status',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGTokenProductId',
				header: "Token Product",
				dataIndex: 'tokenProductId',
				flex:  1,
				sortable: false,
				width: 100,
				align: 'center',
				renderer: renderToTokenProductLookup,
			},
			{
				id: 'idGDefaultTokenAppId',
				header: "Default TokenApp Id",
				dataIndex: 'defaultTokenAppId',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGAppSequenceNumber',
				header: "App Sequence Number",
				dataIndex: 'appSequenceNumber',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGStatusId',
				header: "Application Status",
				dataIndex: 'statusId',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				renderer: renderToTokenAppStatusLookup,
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGPanEncrypted',
				header: "PAN Encrypted",
				dataIndex: 'panEncrypted',
				flex:  1,
				sortable: false,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGStatus',
				header: "Active",
				dataIndex: 'status',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGPanAlias',
				header: "PAN Alias",
				dataIndex: 'panAlias',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			/*{
				id: 'idGPinId',
				header: "Pin Id",
				dataIndex: 'pinId',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGPinTries',
				header: "Remaining Tries",
				dataIndex: 'pinTriesRemaining',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			},
			{
				id: 'idGPukId',
				header: "PUK ID",
				dataIndex: 'pukId',
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				//	xtype: 'checkcolumn',
			}, */

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
			id 		: 'idManageTokensTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},		
		{
			id 		: 'idManageTokensBBar',
			xtype	: 'apppagingbar',
			store	: 'ManageTokens',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});