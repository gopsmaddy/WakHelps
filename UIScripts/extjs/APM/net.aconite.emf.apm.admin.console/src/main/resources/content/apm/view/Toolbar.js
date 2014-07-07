//var apmSchedulerTBar = Ext.create('Ext.toolbar.Toolbar',
Ext.define('Apm.view.Toolbar' ,	
{
	extend	: 'Ext.toolbar.Toolbar',
    alias 	: 'widget.apptoolbar',
	
	requires: ['Ext.toolbar.Toolbar'],
	
	//id : 'idToolbarView',
	//xtype: 'toolbar',
	items: 
	[
		{
			//id  	: 'idTAddBtn',
			itemId	: 'idAddBtn',
			text	: 'Add',
			iconCls	: 'icon-add',
			disabled: false,
			hidden	: false,
			action	: 'add',
		}, 
		'-', 
		{
			//id  	: 'idTSyncBtn',
			itemId	: 'idSyncBtn',
			text	: 'Sync',
			iconCls	: 'icon-sync',
			disabled: true,
			hidden	: true,
			action	: 'sync'
		},
		'-', 
		{
			//id  	: 'idTEditBtn',
			itemId	: 'idEditBtn',
			text	: 'Edit',
			iconCls	: 'icon-edit',
			disabled: true,
			hidden	: true,
			action	: 'edit'
		},
		'-',
		{
			//id  	: 'idTDeleteBtn',
			itemId	: 'idDeleteBtn',
			text	: 'Delete',
			iconCls	: 'icon-delete',
			disabled: true,
			hidden	: true,
			action	: 'delete'
		},
		'-',
		{
			//id  	: 'idTRunBtn',
			itemId	: 'idRunBtn',
			text	: 'Run',
			iconCls	: 'icon-run',
			disabled: true,
			hidden	: true,
			action	: 'run'
		}
	],
	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },									

});