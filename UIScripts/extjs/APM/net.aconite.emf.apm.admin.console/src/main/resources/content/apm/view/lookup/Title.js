Ext.define('Apm.view.lookup.Title' ,
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.titlelookup',

	requires: ['Ext.toolbar.Toolbar'],

	store           : 'Title',
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
          if(combo.value<1)
            combo.clearValue();
        },
    },        

});
