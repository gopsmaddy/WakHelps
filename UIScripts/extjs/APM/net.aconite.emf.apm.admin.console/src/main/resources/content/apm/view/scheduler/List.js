var varActionColumnEditHide=false;
var varActionColumnDeleteHide=false;
var varActionColumnRunHide=false;

function renderToSchedulerTypeLookup(value)
{
	if(Ext.StoreMgr.lookup('SchedulerType')!=null && Ext.StoreMgr.lookup('SchedulerType').findRecord('value', value)!=null && Ext.StoreMgr.lookup('SchedulerType').findRecord('value', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('SchedulerType').findRecord('value', value).get('name'));
	else
		return value;
};

Ext.define('Apm.view.scheduler.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.schedulerlist',

	requires:
	[
		'Ext.ux.CheckColumn',
		'Ext.selection.CellModel',
		'Apm.view.Pagingbar',
		'Apm.view.Toolbar',
		'Apm.view.Actioncolumn',
		'Apm.view.lookup.SchedulerType',
	],

	id		: 'idSchedulerList',
    title 	: 'Scheduler Task List',
	store	: 'Scheduler',
	renderTo: 'divSchedulerList',
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
						icon	: Apm.app.hasRole('ADMINISTRATION/TASK SCHEDULER') ? varIconEdit : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/TASK SCHEDULER'),
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
						{
							this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);
						}
					},
					{icon: varIconGap},
					{
						itemId	: 'idColumnDelete',
						tooltip	: 'Delete',
						icon	: Apm.app.hasRole('ADMINISTRATION/TASK SCHEDULER') ? varIconDelete : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/TASK SCHEDULER'),
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
						{
							this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, record, node);
						},
					},
					{icon: varIconGap},
					{
						itemId	: 'idColumnRun',
						tooltip	: 'Run Now ...',
						icon	: Apm.app.hasRole('ADMINISTRATION/TASK SCHEDULER') ? varIconRun : Ext.BLANK_IMAGE_URL,
                        disabled: !Apm.app.hasRole('ADMINISTRATION/TASK SCHEDULER'),
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
						{
							//alert("Edit " + record.get('name'));
							this.fireEvent('itemclick', this, 'run', grid, rowIndex, colIndex, record, node);
						}
					},

				]
			},
            {id: 'idGRownumber'	, header: "Row ID"		, xtype: 'rownumberer'	 , width: 50	, sortable: false	, hidden: varGridHideRowId},
            {id: 'idGId'		, header: "Task ID"		, dataIndex: 'id'		 , width: 50	, sortable: true	, align: 'left', hidden: varGridHideRowId},
            {id: 'idGName'		, header: "Task Name"		, dataIndex: 'name'	 	 , flex:  1		, sortable: true	, align: 'left'	, renderer:renderToSchedulerTypeLookup},//   , field: {xtype: 'schedulertasklookup'}
            {id: 'idGCommand'	, header: "Cron Parameters"		, dataIndex: 'cronParameters'	 , flex:  1		, sortable: true	, align: 'center'},//	    , field: {xtype: 'textfield',vtype:'apmCommand'}}	, tooltip: 'start and end offset values'},
          //  {id: 'idGParameter'	, header: "Cron Parameters"	, dataIndex: 'cronParameters' , flex:  1		, sortable: true	, align: 'center'},//	    , field: {xtype: 'textfield',vtype:'apmCommand'}}	, tooltip: 'start and end offset values'},
            {id: 'idGStatus'	, header: "Active?"		, dataIndex: 'status'	 , width: 50	, sortable: true	, align: 'center'},// xtype: 'checkcolumn'	, stopSelection: true},
            {id: 'idGLastRun'	, header: "Last Run"	, dataIndex: 'lastRunTime'	 , width: 130	, sortable: true	, align: 'center'	, renderer: render2APMDate},
            {id: 'idGNextRun'	, header: "Next Run"	, dataIndex: 'nextRunTime'	 , width: 130	, sortable: true	, align: 'center'	, renderer: render2APMDate},//renderer: Ext.util.Format.dateRenderer('Y-m-d G:i:s')},

        ];

        this.callParent(arguments);

        Ext.getCmp('idSchedulerTBar').setVisible(Apm.app.hasRole('ADMINISTRATION/TASK SCHEDULER'));
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

	plugins: [varSchedulerCellEditing],
	//plugins: [rowEditing],

	//bbar: 'Pagingbar',
	//tbar: apmSchedulerTBar,
	dockedItems:
	[
		{
			id 		: 'idSchedulerTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},
		{
			id 		: 'idSchedulerBBar',
			xtype	: 'apppagingbar',
			store	: 'Scheduler',
			dock	: 'bottom',
			hidden	: false,
		},

	]
});