Ext.define('Apm.view.lookup.PMResponseCode' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.pmresponsecodelookup',
	
	requires: ['Ext.toolbar.Toolbar'],
	
	//id : 'idToolbarView',
	//xtype: 'combobox',
	store			: 'PMResponseCode',
	width			:  50,
    displayField	: 'name',
    valueField		: 'id',
    value           : true,
	mode            : 'local',
    triggerAction	: 'all',
    selectOnTab		: true,
    queryMode		: 'local',//'remote',//
    forceSelection	: true,
    editable		: false,

    lazyRender		: true,
    listClass		: 'x-combo-list-small',

    initComponent: function()
    {
        this.callParent(arguments);
    },


});
