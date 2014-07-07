Ext.define('Apm.view.lookup.PinDeliveryMethod' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.pindeliverymethodlookup',

	requires: ['Ext.toolbar.Toolbar'],

	store           : 'PinDeliveryMethod',
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
    listeners:
    {
        select : function(combo, records,eOpts )
        {
          if(combo.value<0)
            combo.clearValue();
        },
    },        

});
