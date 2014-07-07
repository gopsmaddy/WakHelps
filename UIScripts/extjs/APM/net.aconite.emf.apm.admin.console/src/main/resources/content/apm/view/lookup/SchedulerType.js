Ext.define('Apm.view.lookup.SchedulerType' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.schedulertypelookup',

	requires: ['Ext.toolbar.Toolbar'],
	
	store           : 'SchedulerType',
	width			: 50,
	value           : 'pinmailer',
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
