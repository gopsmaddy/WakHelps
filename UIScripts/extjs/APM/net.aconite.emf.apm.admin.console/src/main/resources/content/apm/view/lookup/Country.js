Ext.define('Apm.view.lookup.Country' ,	
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.countrylookup',
	
	requires: ['Ext.toolbar.Toolbar'],
	
	store			: 'Country',
    width			:  50,
	//height			:  50,
	//multiSelect :true,
	//pageSize:100,
	
	//remoteSort:true,
	//remoteFilter:true,
	//remoteGroup:true,
	
	
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
	
	listeners: 
	{		
	/*	beforerender: function(combo, eOpts )
		{
			console.log('beforerender.....');	
			//combo.getStore().setPageSize(20);		
		},
		beforeselect : function(combo, record, index,eOpts )
		{			
			console.log('Before Select.....');			
		},		*/
	},

    initComponent: function()
    {
        this.callParent(arguments);
    },

});
