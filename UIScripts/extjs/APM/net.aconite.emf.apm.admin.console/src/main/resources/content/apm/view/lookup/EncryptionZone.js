//var apmSchedulerTBar = Ext.create('Ext.toolbar.Toolbar',
Ext.define('Apm.view.lookup.EncryptionZone' ,	
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.encriptionzonelookup',
	
	requires: ['Ext.toolbar.Toolbar'],
	

	store			: 'EncryptionZone',
    width			:  50,
    displayField	: 'name',
    valueField		: 'id',
    //typeAhead		: true,
    triggerAction	: 'all',
    selectOnTab		: true,
    //fieldLabel		: 'Choose State',
    //emptyText 		: 'Choose One',
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
