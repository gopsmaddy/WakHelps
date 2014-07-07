var varActionColumnEditHide=false;
var varActionColumnDeleteHide=false;
var varActionColumnRunHide=true;

Ext.define('Apm.view.transactionstatistics.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.transactionstatisticslist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',
        'Apm.view.statisticsTotal',
        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Ext.data.StoreManager',
	],
	
	id		: 'idTransactionStatsList',
    title 	: 'Transaction Statistics List',
	store	: 'TransactionStatistics',
	renderTo: 'divTransactionsList',
	hidden	: true,




    initComponent: function() 
	{
        this.columns = 
		[
			{
                id: 'idDateTime',
                header: "Transaction Date",
                dataIndex: "systemDateTime",
                flex:  1,
                sortable: true,
                width: 50,
                align: 'center',
            },
			{
				id: 'idTransactionIssuerName',
				header: "Issuer",
				dataIndex: "issuer",
				flex:  1,
				sortable: true,
				width: 100,
				align: 'center',
			},
			{
                id: 'idTransactionProductName',
                header: "Product",
                dataIndex: "tokenProduct",
                flex: 1,
                width: 100,
                sortable: false	,
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
                id: 'idTransactionType',
                header: "Transaction Type",
                dataIndex: "transactionType",
                flex:  1,
                sortable: true,
                width: 50,
                align: 'center',
            },
			{
                id: 'idResponseCode',
                header: "Response Code",
                dataIndex: "responseCode",
                flex:  1,
                sortable: true,
                width: 50,
                align: 'center',
            },
			{
				id: 'idQuantity',
				header: "Number of Transactions",
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
			id 		: 'idTransactionStatisticsTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},
		{
			id 		: 'idTransactionStatisticsBBar',
			xtype	: 'apppagingbar',
			store	: 'TransactionStatistics',
			dock	: 'bottom',
			hidden	: false,
			items: ['->',{
                                   id 		: 'idTransactionStatisticsLabel',
                                   xtype	: 'statisticsLabel',
                                   store	: 'TransactionStatistics',
                                   hidden	: false,
                                   dock: 'middle',
                                 }
			]
		},



	]
});