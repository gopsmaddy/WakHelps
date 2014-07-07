Ext.define('Apm.view.lookup.TestCountry' ,	
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.testcountrylookup',
	
	requires: ['Ext.toolbar.Toolbar'],
	
	 store			: 'TestCountry',
    width			:  50,
	//height			:  50,
	multiSelect :true,
	//pageSize:100,
	
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
		beforerender: function(combo, eOpts )
		{
			//console.log('beforerender.....TestCountry');	
			//combo.getStore().setPageSize(20);		
		},
		beforeselect : function(combo, record, index,eOpts )
		{			
			console.log('Before Select.....');			
		},		
	},

    initComponent: function()
    {
        this.callParent(arguments);
    },

});
