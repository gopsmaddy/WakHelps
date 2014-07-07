Ext.define('Apm.view.binrange.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.binrangelist',

	requires: 
	[
		 'Ext.ux.CheckColumn',
         'Ext.selection.CellModel',

         'Apm.view.Pagingbar',
         'Apm.view.Toolbar',
         'Apm.view.Actioncolumn',
         'Ext.data.StoreManager',

	],
	
	id		: 'idBINRangeList',
    title 	: 'BIN Range',
	store	: 'BINRange',
	renderTo: 'divBINRangeResults',
	hidden	: true,
	
    initComponent: function() 
	{
        this.columns = 
		[
				{
				xtype: 'actioncolumn',
				width:75,
				sortable: false,
				items:
				[
					{
                        itemId	: 'idColumnEdit',
                        tooltip	: 'Edit',
                        icon	: Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS') ? varIconEdit : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS'),
                        handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
                        {
                            this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);
                        }
                    },
                    {icon: varIconGap},
                    {
						itemId	: 'idColumnDelete',
						tooltip	: 'Delete',
						icon	: Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS') ? varIconDelete : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS'),
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
						{
							this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, record, node);
						},
					},


				]
			},
          //  {id: 'idGRownumber'	, header: "Row ID"		, xtype: 'rownumberer'	 , width: 50	, sortable: false	, hidden: varGridHideRowId},
			{id: 'idGID',header: "ID",dataIndex: 'id',width: 15, sortable: true,align: 'left'},
			{id: 'idGTPID',header: "Token Product ID",dataIndex: 'tokenProductId',width: 50,sortable: true,align: 'left'},
			{id: 'idASNum',header: "App SEQ NUM",dataIndex: 'appSeqNumber',flex:  1,sortable: true,width: 50,align: 'left'},
			{id: 'idGBINFrom',header: "BIN From",dataIndex: 'binFrom',flex:  1,sortable: true,width: 70, align: 'left'},
			{id: 'idGBINTo',header: "BIN To",dataIndex: 'binTo',flex:  1,sortable: true,width: 70, align: 'left'},
			{id: 'idGDescription',header: "Description",dataIndex: 'description',flex:  1,sortable: true,width: 100, align: 'left'},
				
			]
		

        this.callParent(arguments);

        Ext.getCmp('idBINRangeTBar').setVisible(Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS'));
    },
	
	//viewConfig: {trackOver: false},
	viewConfig: {emptyText: 'No records to display.'},			
	
	//width: 700,
	autoWidth: true,
	
	height: 150,
	//autoHeight:true,
	
	collapsible: true,
	loadMask: true,
	
	//selModel: {pruneRemoved: false},
	selModel: {selType: 'rowmodel'},
	//selModel: { selType: 'cellmodel'},
	
	multiSelect: false,	
	stripeRows: true,
	plugins: [varBinRangeCellEditing],
	//plugins: [rowEditing],
	
	//bbar: 'Pagingbar',	
	//tbar: apmSchedulerTBar,
	dockedItems: 
	[
		{
			id 		: 'idBINRangeTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},		
		{
			id 		: 'idBINRangeBBar',
			xtype	: 'apppagingbar',
			store	: 'BINRange',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});