var varActionColumnEditHide=false;
var varActionColumnDeleteHide=false;
var varActionColumnRunHide=true;

function renderToInstitutionLookup(value)
{
	if(Ext.StoreMgr.lookup('Institution')!=null && Ext.StoreMgr.lookup('Institution').findRecord('id', value)!=null && Ext.StoreMgr.lookup('Institution').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('Institution').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToCountryLookup(value)
{
	if(Ext.StoreMgr.lookup('Country')!=null && Ext.StoreMgr.lookup('Country').findRecord('id', value)!=null && Ext.StoreMgr.lookup('Country').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('Country').findRecord('id', value).get('name'));
	else
		return value;
};

Ext.define('Apm.view.issuer.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.issuerlist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Apm.view.lookup.Institution',
        'Apm.view.lookup.Country',
        'Ext.data.StoreManager',
	],
	
	id		: 'idIssuerList',
    title 	: 'Issuer List',
	store	: 'Issuer',
	renderTo: 'divIssuerList',
	hidden	: true,	
    //layout: 'fit',



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
						icon	: Apm.app.hasRole('ADMINISTRATION/ISSUERS') ? varIconEdit : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/ISSUERS'),
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode) 
						{
							this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);							
						}						
					},
					{icon: varIconGap},
					{
						itemId	: 'idColumnDelete',						
						tooltip	: 'Delete',
						icon	: Apm.app.hasRole('ADMINISTRATION/ISSUERS') ? varIconDelete : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/ISSUERS'),
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
			{id: 'idGRownumber'		, header: "Row ID"		, xtype: 'rownumberer'	 	, width: 50		, sortable: false	, hidden: varGridHideRowId},
			{id: 'idGId'			, header: "Id"			, dataIndex: 'id'		 	, width: 100	, sortable: true	, align: 'left'},
			{id: 'idGName'			, header: "Name"		, dataIndex: 'name'	 	 	, flex:  1		, sortable: true	, align: 'left'},
			{id: 'idGInstitution'	, header: "Institution"	, dataIndex: 'institutionId', flex:  1		, sortable: false	, align: 'left', renderer: renderToInstitutionLookup},
			{id: 'idGCountry'		, header: "Country"		, dataIndex: 'countryId' 	, flex:  1		, sortable: false	, align: 'left', renderer: renderToCountryLookup},

        ];

        this.callParent(arguments);

        Ext.getCmp('idIssuerTBar').setVisible(Apm.app.hasRole('ADMINISTRATION/ISSUERS'));
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
	
	plugins: [varIssuerCellEditing],
	//plugins: [rowEditing],
		
	dockedItems: 
	[
		{
			id 		: 'idIssuerTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},		
		{
			id 		: 'idIssuerBBar',
			xtype	: 'apppagingbar',
			store	: 'Issuer',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});