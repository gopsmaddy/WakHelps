Ext.require([
	'Ext.grid.*',
	'Ext.data.*',
	'Ext.util.*',
	'Ext.state.*',
	'Ext.tab.*',
    'Ext.window.*',
    'Ext.tip.*',
    'Ext.layout.container.Border',
	'Ext.toolbar.Toolbar'
	]);


Ext.define('MyTickerModel',
{
	extend	: 'Ext.data.Model',
	id		: 'idMyTickerModel',
	fields	:
	[
		{name: 'id'		, mapping: 'id'	, type: 'int'	, useNull: true},
		{name: 'type'	, mapping: 'type'},
		{name: 'subject', mapping: 'subject',convert: function (v) { return Ext.util.Format.htmlEncode(v);}},
		{name: 'body'	, mapping: 'body', convert: function (v) { return Ext.util.Format.htmlEncode(v);}},			
		{name: 'time'	, mapping: 'time',type: 'int',useNull: true , convert : function (v) { return render2TickerDate(v);}},
		{name: 'status'	, mapping: 'status',type: 'int'},
		
		
	]

});	
	
	
	
	
Ext.define('MyForm',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.myform',
	
						
	id		: 'idMyForm',
	renderTo: 'divMyFrom',	
	title	: 'MyForm Search Criteria',
	hidden	: false,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    //frame	: true,
	//autoWidth: true,
    width	: 400,	
    height	: 150,
    bodyPadding: 25,
    fieldDefaults:
    {
        labelAlign: 'left',
        labelWidth: 120,
        anchor: '100%',		
    },
	
	items: 
    [

        {
            id			: 'idSHello',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>hello',
            blankText   : 'Hello is required',
            //xtype		: 'institutionlookup',
            name		: 'hello',
            allowBlank	: false,
            readOnly	: false,
        },
        {
            id			: 'idSName',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Name',
            blankText   : 'Name is required',
            name		: 'name',
            allowBlank	: true,
            readOnly	: false,
            maxLength	: 24,
            enforceMaxLength: true,
        },
        
    ],
	
    dockedItems:
    [
         {
            id 		: 'idMyFormFooter',
			xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },        

    ],
	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});
	
Ext.define('SearchFooter' ,	
{
	extend	: 'Ext.toolbar.Toolbar',
    alias 	: 'widget.searchfooter',
	
	requires: ['Ext.toolbar.Toolbar'],
	

	items:
	['->',	
		{
			itemId		: 'idSBtnSearch',
			text		: 'Search',
			xtype		: 'button',
			iconCls		: 'icon-search',
			disabled	: false,
			hidden		: false,
			handler: function() 
			{
				if (this.up('form').getForm().isValid()) 
				{					
					this.up('form').getForm().submit();
					this.up('form').getForm().reset();
					
					Ext.Ajax.request(
					{
						url: '../../UIEventLogger',
						method: 'POST',
						params: {oldstatus:'0',newstatus:'1'},
						success: function(response, options)
						{
						   var jsonResponse = Ext.decode(response.responseText);
							if(jsonResponse.success)
							{
								//console.info("success-UpdateEventByStatus >>> "+jsonResponse.message);	
							}
							else	
							{
								//console.info("failed-UpdateEventByStatus >>> "+jsonResponse.message);						
							}				   
						},
						failure: function(response, options)
						{
						   var serverResponse = response.responseText;
						   //console.info("failure-UpdateEventByStatus >>> "+serverResponse);			   
						}
					});
			
					
					Ext.MessageBox.alert('Thank you!', 'Your inquiry has been sent. We will respond as soon as possible.');
				}
			}
		},			
		{
			itemId		: 'idSBtnReset',
			text		: 'Reset',
			xtype		: 'button',
			iconCls		: 'icon-reset',
			disabled	: false,
			hidden		: false,
			action		: 'reset',

		}
	],
	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },									

});		

	
Ext.onReady(function() 
{		
	var win = new MyForm();
	
});