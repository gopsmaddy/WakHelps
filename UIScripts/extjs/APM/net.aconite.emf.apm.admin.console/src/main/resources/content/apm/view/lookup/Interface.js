Ext.define('Apm.view.lookup.Interface' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.interfacelookup',
	
	requires: ['Ext.toolbar.Toolbar'],
	
	//id : 'idToolbarView',
	//xtype: 'combobox',
	store			: 'Interface',
	width			:  50,
    displayField	: 'name',
    valueField		: 'id',
    //typeAhead		: true,
    triggerAction	: 'all',
    selectOnTab		: true,
    //fieldLabel		: 'Choose State',
    //emptyText 		: 'Choose One',
    queryMode		: 'local', //'remote',//
    forceSelection	: true,
    editable		: false,

    lazyRender		: true,
    listClass		: 'x-combo-list-small',

    initComponent: function()
    {
        this.callParent(arguments);
    },

});
