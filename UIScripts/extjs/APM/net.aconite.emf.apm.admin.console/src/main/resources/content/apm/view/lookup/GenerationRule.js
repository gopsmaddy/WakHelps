Ext.define('Apm.view.lookup.GenerationRule' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.generationrulelookup',

	requires: ['Ext.toolbar.Toolbar'],

	store           : 'GenerationRule',
	width			:  50,
	mode            : 'local',
	triggerAction   : 'all',
	forceSelection  : true,
	editable        : false,
	displayField    : 'name',
	valueField      : 'id',
	queryMode       : 'local',
	
	lazyRender: true,
	listClass: 'x-combo-list-small',

	initComponent: function()
	{
        this.callParent(arguments);
    },

});
