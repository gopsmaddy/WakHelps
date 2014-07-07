Ext.define('Apm.view.lookup.AuthMethod' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.authmethodlookup',

	requires: ['Ext.toolbar.Toolbar'],

	store           : 'AuthMethod',
	width			:  50,
	
	value           : 'Ldap',
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
