Ext.define('Apm.view.lookup.MTokenProductGroup' ,
{
	extend	: 'Ext.ux.form.CheckboxListCombo',
    alias 	: 'widget.mtokenproductgrouplookup',
	
	requires:
	    [
	        'Ext.toolbar.Toolbar',
	        'Ext.ux.form.CheckboxListCombo',
	    ],
	
	//id : 'idToolbarView',
	//xtype: 'combobox',
	store			: 'TokenProductGroups',
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

    //lazyRender		: true,
    //listClass		: 'x-combo-list-small',

    initComponent: function()
    {
        this.callParent(arguments);
    },

});
