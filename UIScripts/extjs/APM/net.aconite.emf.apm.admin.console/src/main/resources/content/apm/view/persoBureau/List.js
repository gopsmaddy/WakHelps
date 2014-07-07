var varActionColumnEditHide=false;
var varActionColumnDeleteHide=false;
var varActionColumnRunHide=true;


function renderToEncryptionZoneLookup(value)
{
	if(Ext.StoreMgr.lookup('EncryptionZone')!=null && Ext.StoreMgr.lookup('EncryptionZone').findRecord('id', value)!=null && Ext.StoreMgr.lookup('EncryptionZone').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('EncryptionZone').findRecord('id', value).get('name'));
	else
		return value;
};

Ext.define('Apm.view.persoBureau.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.persoBureaulist',

	requires:
	[
		'Ext.ux.CheckColumn',
		
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Apm.view.lookup.EncryptionZone',
        'Apm.view.lookup.Institution',
        'Ext.data.StoreManager',
	],

	id		: 'idPersoBureauList',
    title 	: 'PersoBureau List',
	store	: 'PersoBureau',
	renderTo: 'divPersoBureauList',
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
						icon	: Apm.app.hasRole('ADMINISTRATION/INTERFACES/PERSONALISATION BUREAUS') ? varIconEdit : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/INTERFACES/PERSONALISATION BUREAUS'),
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
						{
							this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);
						}
					},
					{icon: varIconGap},
					{
						itemId	: 'idColumnDelete',
						tooltip	: 'Delete',
						icon	: Apm.app.hasRole('ADMINISTRATION/INTERFACES/PERSONALISATION BUREAUS') ? varIconDelete : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/INTERFACES/PERSONALISATION BUREAUS'),
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
						{
							this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, record, node);
						},
					},
					/*
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
					*/

				]
			},
			{id: 'idGRownumber'		, header: "Row ID"			, xtype: 'rownumberer'	 		, width: 50		, sortable: false	, hidden: varGridHideRowId},
			{id: 'idGId'			, header: "Id"				, dataIndex: 'id'		 		, width: 100	, sortable: true	, align: 'left'},
			{id: 'idGName'			, header: "Name"			, dataIndex: 'name'	 	 		, flex:  1		, sortable: true	, align: 'left'	},
			{id: 'idGCode'		, header: "Code"		, dataIndex: 'code'	 	, flex:  1		, sortable: true	, align: 'left'},
			{id: 'idGDestinationDirectory'		, header: "Destination Directory"		, dataIndex: 'destinationDirectory'	 	, flex:  1		, sortable: true	, align: 'left'},
			{id: 'idGEncryptionZone', header: "Encryption Zone"	, dataIndex: 'encryptionZoneId'	, flex:  1		, sortable: false	, align: 'left', renderer: renderToEncryptionZoneLookup	},
			{id: 'idGExtractPan'    , header: "Extract Pan"		, dataIndex: 'extractPan'	 	, flex:  1		, sortable: false	, align: 'center'},
			{id: 'idGExtractPanDisplay'			, header: "Extract Pan Display"			, dataIndex: 'extractPanDisplay'	 		, flex:  1		, sortable: false	, align: 'center'},

        ];

        this.callParent(arguments);

        Ext.getCmp('idPersoBureauTBar').setVisible(Apm.app.hasRole('ADMINISTRATION/INTERFACES/PERSONALISATION BUREAUS'));
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

    plugins: [varPersoBureauCellEditing],
	//plugins: [rowEditing],

	dockedItems:
	[
		{
			id 		: 'idPersoBureauTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},
		{
			id 		: 'idPersoBureauBBar',
			xtype	: 'apppagingbar',
			store	: 'PersoBureau',
			dock	: 'bottom',
			hidden	: false,
		},

	]
});