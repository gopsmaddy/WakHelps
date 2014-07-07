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

function renderToInstitutionLookup(value)
{
	if(Ext.StoreMgr.lookup('Institution')!=null && Ext.StoreMgr.lookup('Institution').findRecord('id', value)!=null && Ext.StoreMgr.lookup('Institution').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('Institution').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToInterfaceTypeLookup(value)
{
	if(Ext.StoreMgr.lookup('InterfaceType')!=null && Ext.StoreMgr.lookup('InterfaceType').findRecord('id', value)!=null && Ext.StoreMgr.lookup('InterfaceType').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('InterfaceType').findRecord('id', value).get('name'));
	else
		return value;
};


Ext.define('Apm.view.interface.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.interfacelist',

	requires:
	[
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Apm.view.lookup.EncryptionZone',
        'Apm.view.lookup.Institution',
		'Apm.view.lookup.InterfaceType',
        'Ext.data.StoreManager',
	],

	id		: 'idInterfaceList',
    title 	: 'Interface List',
	store	: 'Interface',
	renderTo: 'divInterfaceList',
	hidden	: false,

    initComponent: function()
	{
        this.columns =
		[

			//{id: 'idGAction'	, header: "action"		, xtype:'appactioncolumn', width: 75	, sortable: false   ,align	: 'center'},
			{
				xtype: 'actioncolumn',
				width:60,
				sortable: false,
				items:
				[

					{
						itemId	: 'idColumnEdit',
						tooltip	: 'Edit',
						icon	: Apm.app.hasRole('ADMINISTRATION/INTERFACES/INTERFACES') ? varIconEdit : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/INTERFACES/INTERFACES'),
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
						{
							this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);
						}
					},
					{icon: varIconGap},
					{
						itemId	: 'idColumnDelete',
						tooltip	: 'Delete',
						icon	: Apm.app.hasRole('ADMINISTRATION/INTERFACES/INTERFACES') ? varIconDelete : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/INTERFACES/INTERFACES'),
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
			{id: 'idGRownumber'		, header: "Row ID"			, xtype: 'rownumberer'	 		, width: 30		, sortable: false	, hidden: varGridHideRowId},
			{id: 'idGId'			, header: "Id"				, dataIndex: 'id'		 		, width: 35	, sortable: true	, align: 'left'},
			{id: 'idGName'			, header: "Name"			, dataIndex: 'name'	 	 		, flex:  1		, sortable: true	, align: 'left'	},
			{id: 'idGInterfaceType'	, header: "Interface Type"	, dataIndex: 'interfaceTypeId'	, flex:  1		, sortable: false	, align: 'left', renderer: renderToInterfaceTypeLookup	},
			{id: 'idGInstitution'	, header: "Institution"		, dataIndex: 'institutionId' 	, flex:  1		, sortable: false	, align: 'left', renderer: renderToInstitutionLookup	},
			{id: 'idGEncryptionZone', header: "Encryption Zone"	, dataIndex: 'encryptionZoneId'	, flex:  1		, sortable: false	, align: 'left', renderer: renderToEncryptionZoneLookup	},
			{id: 'idGIpAddress'		, header: "IP Address"		, dataIndex: 'ipAddress'	 	, flex:  1		, sortable: true	, align: 'left'},
			{id: 'idGPort'			, header: "IP Port"			, dataIndex: 'ipPort'	 		, width: 50		, sortable: true	, align: 'left'},
			{id: 'idGTimeout'		, header: "Timeout"			, dataIndex: 'timeout'	 		, width: 60		, sortable: true	, align: 'left'},
			{id: 'idGKeepAlive'		, header: "KeepAlive"		, dataIndex: 'keepAlive'	 	, width: 60		, sortable: false	, align: 'center'},
			{id: 'idGSession'		, header: "Session"		, dataIndex: 'session'	 	, width: 60		, sortable: false	, align: 'center'},
			{id: 'idGSSL'		, header: "SSL"		, dataIndex: 'ssl'	 	, width: 60		, sortable: false	, align: 'center'},
			{id: 'idGKeystorePath'		, header: "Keystore Path"		, dataIndex: 'keystorePath'	 	, flex:  1		, sortable: false	, align: 'center'},
			{id: 'idGKeystorePassword'		, header: "Keystore Password"		, dataIndex: 'keystorePassword'	 	, flex:  1		, sortable: false	, align: 'center'},
			{id: 'idGCertificateAlias'		, header: "Certificate Alias"		, dataIndex: 'certificateAlias'	 	, flex:  1		, sortable: false	, align: 'center'},
			{id: 'idGKeyPassword'		, header: "Key Password"		, dataIndex: 'keyPassword'	 	, flex:  1		, sortable: false	, align: 'center'},
        ];

        this.callParent(arguments);

        Ext.getCmp('idInterfaceTBar').setVisible(Apm.app.hasRole('ADMINISTRATION/INTERFACES/INTERFACES'));
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

    plugins: [varInterfaceCellEditing],
	//plugins: [rowEditing],

	dockedItems:
	[
		{
			id 		: 'idInterfaceTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},
		{
			id 		: 'idInterfaceBBar',
			xtype	: 'apppagingbar',
			store	: 'Interface',
			dock	: 'bottom',
			hidden	: false,
		},

	]
});