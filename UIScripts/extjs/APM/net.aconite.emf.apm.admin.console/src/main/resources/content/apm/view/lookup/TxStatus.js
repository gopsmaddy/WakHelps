Ext.define('Apm.view.lookup.TxStatus' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.txstatuslookup',

	requires: ['Ext.toolbar.Toolbar'],
	
	store           : 'TxStatus',
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
