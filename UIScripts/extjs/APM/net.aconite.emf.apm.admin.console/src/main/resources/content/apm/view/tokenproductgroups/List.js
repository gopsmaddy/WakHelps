 var varActionColumnEditHide=false;
 var varActionColumnDeleteHide=false;
 var varActionColumnRunHide=true;

function renderToIssuerLookup(value)
{
	if(Ext.StoreMgr.lookup('Issuer')!=null && Ext.StoreMgr.lookup('Issuer').findRecord('id', value)!=null && Ext.StoreMgr.lookup('Issuer').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('Issuer').findRecord('id', value).get('name'));
	else
		return value;
};


Ext.define('Apm.view.tokenproductgroups.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.tokenproductgroupslist',

	requires: 
	[
		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Apm.view.lookup.Issuer',         ,
        'Ext.data.StoreManager',
	],
	
	id		: 'idTokenProductGroupsList',
    title 	: 'Token Product Groups',
	store	: 'TokenProductGroups',
	renderTo: 'divTokenProductGroupsList',
	hidden	: true,
	
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
                        icon	: Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCT GROUPS') ? varIconEdit : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCT GROUPS'),
                        handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
                        {
                            this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);
                        }
                    },
                    {icon: varIconGap},
                    {
                        itemId	: 'idColumnDelete',
                        tooltip	: 'Delete',
                        icon	: Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCT GROUPS') ? varIconDelete : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCT GROUPS'),
                        handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
                        {
                            this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, record, node);
                        },
                    },

                ]
            },
            {id: 'idGRownumber'		, header: "Row ID"		, xtype: 'rownumberer'	 	, width: 50		, sortable: false	, hidden: varGridHideRowId},
            {id: 'idGId'			, header: "Id"			, dataIndex: 'id'		 	, width: 100	, sortable: true	, align: 'left'},
            {id: 'idGName'			, header: "Name"		, dataIndex: 'name'	 	 	, flex:  1		, sortable: true	, align: 'left'},
            {id: 'idGIssuer'	    , header: "Issuer"	    , dataIndex: 'issuerId'     , flex:  1		, sortable: false	, align: 'left', renderer: renderToIssuerLookup},
            {id: 'idGGroupCode'		, header: "Group Code"	, dataIndex: 'groupCode'	, flex:  1		, sortable: true	, align: 'left'},

        ];


        this.callParent(arguments);

        Ext.getCmp('idTokenProductGroupsTBar').setVisible(Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCT GROUPS'));
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

    plugins: [varTokenProductGroupsCellEditing],

	dockedItems: 
	[
		{
			id 		: 'idTokenProductGroupsTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},		
		{
			id 		: 'idTokenProductGroupsBBar',
			xtype	: 'apppagingbar',
			store	: 'TokenProductGroups',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});