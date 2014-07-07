//var apmSchedulerTBar = Ext.create('Ext.toolbar.Toolbar',
Ext.define('Apm.view.Actioncolumn' ,	
{
	extend	: 'Ext.grid.column.Action',
    alias 	: 'widget.appactioncolumn',
	
	requires: ['Ext.grid.column.Action'],
	
	//id 	: 'idActioncolumnView',
	//xtype	: 'actioncolumn',
	//width	:75,
	//sortable: false,						
	items	: 
	[
		{
			itemId	: 'idColumnDelete',
			//text	: 'Delete',
			tooltip	: 'Delete',
			icon	: varIconDelete,
			//iconCls: 'icon-delete',
			disabled: false,
			hidden	: false,
			action	: 'delete',
		},
		{icon: varIconGap},
		{
			itemId	: 'idColumnRun',
			//text	: 'Run',
			tooltip	: 'Run ',
			icon	: varIconRun,
			//iconCls: 'icon-delete',
			disabled: false,
			hidden	: false,
			action	: 'run',
		},
		{icon: varIconGap},
		{
			itemId	: 'idColumnEdit',
			//text	: 'Delete',
			tooltip	: 'Edit',
			icon	: varIconEdit,
			//iconCls: 'icon-delete',
			disabled: false,
			hidden	: false,
			action	: 'edit',
		},		
	],

	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },									

});