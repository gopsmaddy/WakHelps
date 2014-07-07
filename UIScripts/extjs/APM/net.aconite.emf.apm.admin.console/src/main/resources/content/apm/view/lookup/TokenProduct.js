Ext.define('Apm.view.lookup.TokenProduct' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.tokenproductlookup',
	
	requires: ['Ext.toolbar.Toolbar'],
	
	//id : 'idToolbarView',
	//xtype: 'combobox',
	store			: 'TokenProducts',
	width			:  50,
    displayField	: 'name',
    valueField		: 'id',
    //typeAhead		: true,
    triggerAction	: 'all',
    selectOnTab		: true,
    //fieldLabel		: 'Choose State',
    //emptyText 		: 'Choose One',
    queryMode		: 'local',
    forceSelection	: true,
    editable		: false,

    lazyRender		: true,
    listClass		: 'x-combo-list-small',

    initComponent: function()
    {
        this.callParent(arguments);
    },

});
