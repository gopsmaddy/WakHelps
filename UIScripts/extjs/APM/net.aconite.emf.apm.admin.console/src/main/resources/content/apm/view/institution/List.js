var varActionColumnEditHide=false;
var varActionColumnDeleteHide=true;
var varActionColumnRunHide=true;

function renderToEncryptionZoneLookup(value)
{
	if(Ext.StoreMgr.lookup('EncryptionZone')!=null && Ext.StoreMgr.lookup('EncryptionZone').findRecord('id', value)!=null && Ext.StoreMgr.lookup('EncryptionZone').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('EncryptionZone').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToAuthMethodLookup(value)
{
	if(Ext.StoreMgr.lookup('AuthMethod')!=null && Ext.StoreMgr.lookup('AuthMethod').findRecord('value', value)!=null && Ext.StoreMgr.lookup('AuthMethod').findRecord('value', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('AuthMethod').findRecord('value', value).get('name'));
	else
		return value;
};

Ext.define('Apm.view.institution.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.institutionlist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Apm.view.lookup.EncryptionZone',
		'Apm.view.lookup.AuthMethod',
		'Ext.data.StoreManager',
	],
	
	id		: 'idInstitutionList',
    title 	: 'Institution List',
	store	: 'Institution',
	renderTo: 'divInstitutionList',
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
						icon	: Apm.app.hasRole('ADMINISTRATION/INSTITUTIONS') ? varIconEdit : Ext.BLANK_IMAGE_URL,
						disabled: !Apm.app.hasRole('ADMINISTRATION/INSTITUTIONS'),
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode) 
						{
							this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);							
						}						
					},
					{icon: varIconGap},
					{
						itemId	: 'idColumnDelete',						
						tooltip	: 'Delete',
						icon	: Apm.app.hasRole('ADMINISTRATION/INSTITUTIONS') ? varIconDelete : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/INSTITUTIONS'),
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
			{id: 'idGRownumber'	, header: "Row ID"			, xtype: 'rownumberer'	                    , width: 50	    , sortable: false	, hidden: varGridHideRowId},
			{id: 'idGId'		, header: "Id"				, dataIndex: 'id'		                    , width: 100	, sortable: true	, align: 'left'},
			{id: 'idGName'		, header: "Name"			, dataIndex: 'name'	 	                    , flex:  1		, sortable: true	, align: 'left'	},
			{id: 'idGAuthMethod', header: "Auth Method"		, dataIndex: 'authMethod'                   , width: 100	, sortable: true	, align: 'left'	, renderer: renderToAuthMethodLookup},
			{id: 'idGLocalZone'	, header: "Local Zone"		, dataIndex: 'localEncryptionZoneId'        , flex:  1		, sortable: false	, align: 'left'	, renderer: renderToEncryptionZoneLookup},
			{id: 'idGInstZone'	, header: "Institution Zone", dataIndex: 'institutionEncryptionZoneId'	, flex:  1		, sortable: false	, align: 'left'	, renderer: renderToEncryptionZoneLookup},

        ];

        this.callParent(arguments);

        Ext.getCmp('idInstitutionTBar').setVisible(Apm.app.hasRole('ADMINISTRATION/INSTITUTIONS'));
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
	
	plugins: [varInstitutionCellEditing],
	//plugins: [rowEditing],

	dockedItems: 
	[
		{
			id 		: 'idInstitutionTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,

		},		
		{
			id 		: 'idInstitutionBBar',
			xtype	: 'apppagingbar',
			store	: 'Institution',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});