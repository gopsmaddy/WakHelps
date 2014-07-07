Ext.require(
[
	'Ext.form.*',
	'Ext.data.*',
]);

Ext.onReady(function()
{

    Ext.define('Apm.home', 
	{
        extend: 'Ext.data.Model',
        fields: 
		[
			{name: 'system'	    , mapping: 'system'},
			{name: 'username'	, mapping: 'username'},
			{name: 'lastAccessStr'	, mapping: 'lastAccessStr'}
        ]
    });   

    var formPanel = Ext.create('Ext.form.Panel', 
	{
        renderTo: 'divHome',
        frame: true,
        //title:'',
        width: 500,
        bodyPadding: 5,
        waitMsgTarget: true,

        fieldDefaults: 
		{
            labelAlign: 'right',
            labelWidth: 85,
            msgTarget: 'side'
        },

        // configure how to read the XML data
        reader : Ext.create('Ext.data.reader.Json', 
		{           
			model : 'Apm.home',
			type  : 'json',
			method: 'GET',
            root  : 'records',
            successProperty: 'success'
        }),
        
        items: 
		[
		{
            xtype: 'fieldset',
            title: 'Login Information',
            defaultType: 'textfield',
            defaults: 
			{
                width: 600
            },
            items: 
			[
				{
                    xtype		: 'displayfield',
					fieldLabel	: '<span style="color:white;font-weight:bold" align="left">*</span>System',
					name		: 'system',
					value		: '<span style="color:black;"></span>',
                },
				{
                    xtype		: 'displayfield',
					fieldLabel	: '<span style="color:white;font-weight:bold" align="left">*</span>Username',
					name		: 'username',
					value		: '<span style="color:black;"></span>',
                }, 
				{
                    xtype		: 'displayfield',
					fieldLabel	: '<span style="color:white;font-weight:bold" align="left">*</span>Last login',
					name		: 'lastAccessStr',
					value		: '<span style="color:black;"></span>',
                }, 							
            ]
        }],
       
    });
	
	 formPanel.getForm().load({ url: '/admin/system/userdetails', waitMsg: 'Loading...', method: 'get' });
});
