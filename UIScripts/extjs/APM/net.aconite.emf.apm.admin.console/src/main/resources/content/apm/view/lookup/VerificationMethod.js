Ext.define('Apm.view.lookup.VerificationMethod' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.verificationmethodlookup',

	requires: ['Ext.toolbar.Toolbar'],

	store           : 'VerificationMethod',
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
