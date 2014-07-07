function renderToIssuerLookup(value)
{
	if(Ext.StoreMgr.lookup('Issuer')!=null && Ext.StoreMgr.lookup('Issuer').findRecord('id', value)!=null && Ext.StoreMgr.lookup('Issuer').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('Issuer').findRecord('id', value).get('name'));
	else
		return value;
};
function renderToTokenProductLookup(value)
{
	if(Ext.StoreMgr.lookup('TokenProduct')!=null && Ext.StoreMgr.lookup('TokenProduct').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TokenProduct').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('TokenProduct').findRecord('id', value).get('name'));
	else
		return value;
};
function renderToTokenProductGroupLookup(value)
{
	if(Ext.StoreMgr.lookup('TokenProductGroup')!=null && Ext.StoreMgr.lookup('TokenProductGroup').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TokenProductGroup').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('TokenProductGroup').findRecord('id', value).get('name'));
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

function renderToPersoBureauLookup(value)
{
	if(Ext.StoreMgr.lookup('PersoBureau')!=null && Ext.StoreMgr.lookup('PersoBureau').findRecord('id', value)!=null && Ext.StoreMgr.lookup('PersoBureau').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('PersoBureau').findRecord('id', value).get('name'));
	else
		return value;
};

Ext.define('Apm.view.tokenproducts.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.tokenproductslist',

	requires: 
	[
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Apm.view.lookup.Issuer',
        'Apm.view.lookup.TokenProduct',
        'Ext.data.StoreManager',

	],
	
	id		: 'idTokenProductsList',
    title 	: 'Token Products',
	store	: 'TokenProducts',
	renderTo: 'divTokenProductsList',
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
				{id: 'idGRownumber'	, header: "Row ID"		, xtype: 'rownumberer'	 , width: 50	, sortable: false	, hidden: varGridHideRowId},
				{
					id: 'idGID',
					header: "ID",
					dataIndex: 'id',
					width: 50,
					sortable: true,
					align: 'left'
				},
				{
                    id: 'idGName',
                    header: "Name",
                    dataIndex: 'name',
                    flex:  1,
                    sortable: true,
                    width: 100,
                    align: 'left'
                },
				{
					id: 'idGIPCode',
					header: "Issuer Token Product Code",
					dataIndex: 'issuerTokenProductCode',
					width: 100,
					sortable: true,
					align: 'left'
				},
				{
					id: 'idGIssuerID',
					header: "Issuer ID",
					dataIndex: 'issuerId',
					flex:  1,
					sortable: true,
					width: 100,
					align: 'left',
					renderer: renderToIssuerLookup,
				},
				{
					id: 'idGTokenProductGroupID',
					header: "Token Product Group",
					dataIndex: 'tokenProductGroupId',
					flex:  1,
					sortable: true,
					width: 100,
					align: 'left',
					renderer: renderToTokenProductGroupLookup,
				},
				{
					id: 'idGReissueTokenProductID',
					header: "Reissue Token Product",
					dataIndex: 'reissueTokenProductId',
					flex:  1,
					sortable: true,
					width: 100,
					align: 'left',
					renderer: renderToTokenProductLookup,
				},
				{
					id: 'idGRetentionDays',
					header: "Retention Days",
					dataIndex: 'retentionDays',
					flex:  1,
					sortable: true,
					width: 100,
					align: 'left'
				},
				{
                    id: 'idGCountryCode',
                    header: "Country Code",
                    dataIndex: 'countryCode',
                    flex:  1,
                    sortable: true,
                    align: 'left',
                    renderer: renderToCountryLookup,
                },
				{
					id: 'idGLanguangeCode',
					header: "Languange Code",
					dataIndex: 'languageCode',
					flex:  1,
					sortable: true,
					align: 'left'
				},
				{
					id: 'idGPersoBureauID',
					header: "Perso Bureau ID",
					dataIndex: 'persoBureauId',
					flex:  1,
					sortable: true,
					width: 100,
					align: 'left' ,
					renderer: renderToPersoBureauLookup,
				},
				{
					id: 'idGFeedbackRequired',
					header: "Feedback Required",
					dataIndex: 'feedbackRequired',
					flex:  1,
					width: 50,
					sortable: true,
					align: 'center',
				//	xtype: 'checkcolumn',
					stopSelection: true
				},
				{
                    id: 'idGStatus',
                    header: "Active",
                    dataIndex: 'status',
                    flex:  1,
                    sortable: true,
                    width: 50,
                    sortable: true,
                    align: 'center',
                //	xtype: 'checkcolumn',
                    stopSelection: true
                },

				
			]
		

        this.callParent(arguments);

        Ext.getCmp('idTokenProductsTBar').setVisible(Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS'));
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
	plugins: [varTokenProductsCellEditing],
	//plugins: [rowEditing],
	
	//bbar: 'Pagingbar',	
	//tbar: apmSchedulerTBar,
	dockedItems: 
	[
		{
			id 		: 'idTokenProductsTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},		
		{
			id 		: 'idTokenProductsBBar',
			xtype	: 'apppagingbar',
			store	: 'TokenProducts',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});