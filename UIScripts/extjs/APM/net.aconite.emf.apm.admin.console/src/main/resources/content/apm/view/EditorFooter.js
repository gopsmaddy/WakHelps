Ext.define('Apm.view.EditorFooter' ,	
{
	extend	: 'Ext.toolbar.Toolbar',
    alias 	: 'widget.editorfooter',
	
	requires: ['Ext.toolbar.Toolbar'],
	

	items:
	['->',
		{
			itemId		: 'idBtnSave',
			text		: 'Save',
			xtype		: 'button',
			iconCls		: 'icon-save',
			disabled	: true,
			hidden		: false,
			action		: 'save',
		},
		{
			itemId		: 'idBtnCreate',
			text		: 'Create',
			xtype		: 'button',
			iconCls		: 'icon-user-add',
			disabled	: false,
			hidden		: true,
			action		: 'create',

		},
		{
			itemId		: 'idBtnReset',
			text		: 'Reset',
			xtype		: 'button',
			iconCls		: 'icon-reset',
			disabled	: false,
			hidden		: true,
			action		: 'reset',			

		},
		{
			itemId		: 'idBtnClear',
			text		: 'Clear',
			xtype		: 'button',
			iconCls		: 'icon-clear',
			disabled	: false,
			hidden		: true,
			action		: 'clear',			
		},
		{
			itemId		: 'idBtnClose',
			text		: 'Cancel',
			xtype		: 'button',
			iconCls		: 'icon-close',
			disabled	: false,
			hidden		: false,
			action		: 'close',			
		}
	],
	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },									

});