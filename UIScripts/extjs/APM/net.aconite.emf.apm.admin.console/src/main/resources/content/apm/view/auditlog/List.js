Ext.define('Apm.view.auditlog.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.auditloglist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Ext.data.StoreManager',
	],
	
	id		: 'idAuditLogList',
    title 	: 'Audit log List',
	store	: 'AuditLog',
	renderTo: 'divAuditLogList',
	hidden	: true,

    initComponent: function() 
	{
        this.columns = 
		[
			{
			    id: 'idDateTime',
			    header: "Date/Time",
			    dataIndex: "datetime",
			    flex: 1,
			    sortable: false,
			    align: 'center',
			},
			{
				id: 'idUsername',
				header: "User name",
				dataIndex: "username",
				flex:  1,
				sortable: true,
				align: 'center',
			},
			{
				id: 'idOriginator',
				header: "Originator",
				dataIndex: "originator",
				flex:  3,
				sortable: true,
				align: 'center',
			},
			{
				id: 'idDescription',
				header: "Description",
				dataIndex: "description",
				flex:  3,
				sortable: true,
				align: 'left',
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
	
	dockedItems:
	[
		{
			id 		: 'idAuditLogBBar',
			xtype	: 'apppagingbar',
			store	: 'AuditLog',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});