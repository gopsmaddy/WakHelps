Ext.define('Apm.view.lookup.Status' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.statuslookup',

	requires: ['Ext.toolbar.Toolbar'],
	
	store           : 'Status',
	width			: 50,
	value           : true,
	mode            : 'local',
	triggerAction   : 'all',
	forceSelection  : true,
	editable        : false,
	displayField    : 'name',
	valueField      : 'value',
	queryMode       : 'local',
	
	lazyRender: true,
	listClass: 'x-combo-list-small',

	initComponent: function()
	{
        this.callParent(arguments);
    },

});
