var varActionColumnEditHide=false;
var varActionColumnDeleteHide=false;
var varActionColumnRunHide=true;

//TODO implement the lookup for the extract types
/*
function renderToTokenAppStatusLookup(value)
{
	if(Ext.StoreMgr.lookup('TokenAppStatus')!=null && Ext.StoreMgr.lookup('TokenAppStatus').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TokenAppStatus').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('TokenAppStatus').findRecord('id', value).get('name'));
	else
		return value;
};
function renderToTokenProductLookup(value)
{
	if(Ext.StoreMgr.lookup('TokenProducts')!=null && Ext.StoreMgr.lookup('TokenProducts').findRecord('id', value)!=null && Ext.StoreMgr.lookup('TokenProducts').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('TokenProducts').findRecord('id', value).get('name'));
	else
		return value;
};   */
function renderToExtractTypeLookup(value)
{
	if(Ext.StoreMgr.lookup('DataExtractLogType')!=null && Ext.StoreMgr.lookup('DataExtractLogType').findRecord('id', value)!=null && Ext.StoreMgr.lookup('DataExtractLogType').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('DataExtractLogType').findRecord('id', value).get('name'));
	else
		return value;
};


Ext.define('Apm.view.dataextractlog.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.dataextractloglist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',
        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Ext.data.StoreManager',
	],
	
	id		: 'idDataExtractLogList',
    title 	: 'Data Extract Log List',
	store	: 'DataExtractLog',
	renderTo: 'divDataExtractLogList',
	hidden	: true,




    initComponent: function() 
	{
        this.columns = 
		[
			{
			    id: 'idID',
			    header: "Log ID",
			    dataIndex: "id",
			    flex: 1,
			    width: 100,
			    sortable: false	,
			},
			{
				id: 'idOriginator',
				header: "Originator",
				dataIndex: "originator",
				flex:  1,
				sortable: true,
				width: 100,
				align: 'center',
			},
			{
				id: 'idExtractTypeID',
				header: "Extract Type",
				dataIndex: "extractTypeId",
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
				renderer: renderToExtractTypeLookup
			},
			{
				id: 'idStartDateTime',
				header: "Start",
				dataIndex: "startDateTime",
				flex:  1,
				sortable: true,
				width: 50,
				align: 'center',
			},
            {
                id: 'idFinishDateTime',
                header: "Finish",
                dataIndex: "finishDateTime",
                flex:  1,
                sortable: true,
                width: 50,
                align: 'center',
            },
            {
                id: 'idIDFrom',
                header: "From ID",
                dataIndex: "idFrom",
                flex:  1,
                sortable: true,
                width: 50,
                align: 'center',
            },
            {
                id: 'idIDTo',
                header: "To ID",
                dataIndex: "idTo",
                flex:  1,
                sortable: true,
                width: 50,
                align: 'center',
            },
            {
                id: 'idDateTimeFrom',
                header: "Date From",
                dataIndex: "dateFrom",
                flex:  1,
                sortable: true,
                width: 50,
                align: 'center',
            },
            {
                id: 'idDateTimeTo',
                header: "Date To",
                dataIndex: "dateTo",
                flex:  1,
                sortable: true,
                width: 50,
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
                id: 'idFiles',
                header: "Files",
                dataIndex: "files",
                flex:  1,
                sortable: true,
                width: 50,
                align: 'center',
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
			id 		: 'idDataExtractLogBBar',
			xtype	: 'apppagingbar',
			store	: 'DataExtractLog',
			dock	: 'bottom',
			hidden	: false,
		},
		
	]
});