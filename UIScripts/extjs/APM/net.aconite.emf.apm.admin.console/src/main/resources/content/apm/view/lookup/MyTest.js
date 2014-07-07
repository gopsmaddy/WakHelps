//var apmSchedulerTBar = Ext.create('Ext.toolbar.Toolbar',
Ext.define('Apm.view.lookup.MyTest' ,	
{
	extend	: 'Ext.form.field.ComboBox',
    alias 	: 'widget.mytestlookup',
	
	requires: ['Ext.toolbar.Toolbar'],
	
	//id : 'idToolbarView',
	//xtype: 'combobox',
	store			: 'MyTest',
	/*
	store: 
	[
		['pinmailer','Pin Mailerx'],
		['tokenimportfeedback','Token Import Feedback'],
		['tokenorderfeedback','Token Order Feedback']						
	],*/
	
	width			:  50,
    displayField	: 'name',
    valueField		: 'id',
    //typeAhead		: true,
    triggerAction	: 'all',
    selectOnTab		: true,
    //fieldLabel		: 'Choose State',
    //emptyText 		: 'Choose One',
    queryMode		: 'remote',//'local'
    forceSelection	: true,
    editable		: false,

    lazyRender		: true,
    listClass		: 'x-combo-list-small',

    initComponent: function()
    {
        this.callParent(arguments);
    },
	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },									

});
