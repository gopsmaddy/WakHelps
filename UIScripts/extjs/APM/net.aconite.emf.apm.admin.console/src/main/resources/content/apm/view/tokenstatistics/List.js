Ext.define('Apm.view.tokenstatistics.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.tokenstatisticslist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Ext.data.StoreManager',
	],
	
	id		: 'idTokensStatsList',
    title 	: 'Tokens Statistics List',
	store	: 'TokenStatistics',
	renderTo: 'divTokensList',
	hidden	: true,

    initComponent: function() 
	{
        this.columns = 
		[
			{
			    id: 'idTokenProductName',
			    header: "Product",
			    dataIndex: "tokenProductName",
			    flex: 1,
			    width: 100,
			    sortable: false	,
			},
			{
				id: 'idTokenIssuerName',
				header: "Issuer",
				dataIndex: "issuerName",
				flex:  1,
				sortable: true,
				width: 100,
				align: 'center',
			},
			{
				id: 'idStatus',
				header: "Status",
				dataIndex: "status",
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
			},
			{
				id: 'idQuantity',
				header: "Quantity",
				dataIndex: "quantity",
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
			},

        ];

        this.callParent(arguments);

    },
	
	viewConfig: {emptyText: 'No records to display.'},
	autoWidth: true,
	height: 320,
	collapsible: true,
	loadMask: true,
	
	selModel: {selType: 'rowmodel'},

	multiSelect: false,	
	stripeRows: true,
	
	dockedItems:
	[
		{
			id 		: 'idTokenStatisticsTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},		
		{
			id 		: 'idTokenStatisticsBBar',
			xtype	: 'apppagingbar',
			store	: 'TokenStatistics',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});