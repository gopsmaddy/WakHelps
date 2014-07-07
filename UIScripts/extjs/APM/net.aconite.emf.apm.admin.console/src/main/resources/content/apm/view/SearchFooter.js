Ext.define('Apm.view.SearchFooter' ,	
{
	extend	: 'Ext.toolbar.Toolbar',
    alias 	: 'widget.searchfooter',
	
	requires: ['Ext.toolbar.Toolbar'],
	

	items:
	['->',
		{
			itemId		: 'idSBtnSubmit',
			text		: 'Submit',
			xtype		: 'button',
			iconCls		: 'icon-submit',
			disabled	: false,
			hidden		: true,
			action		: 'submit',
		},	
		{
			itemId		: 'idSBtnSearch',
			text		: 'Search',
			xtype		: 'button',
			iconCls		: 'icon-search',
			disabled	: false,
			hidden		: false,
			action		: 'search',
		},			
		{
			itemId		: 'idSBtnReset',
			text		: 'Reset',
			xtype		: 'button',
			iconCls		: 'icon-reset',
			disabled	: false,
			hidden		: false,
			action		: 'reset',

		},
		{
			itemId		: 'idSBtnClear',
			text		: 'Clear',
			xtype		: 'button',
			iconCls		: 'icon-clear',
			disabled	: false,
			hidden		: true,
			action		: 'clear',
		}
	],
	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },									

});