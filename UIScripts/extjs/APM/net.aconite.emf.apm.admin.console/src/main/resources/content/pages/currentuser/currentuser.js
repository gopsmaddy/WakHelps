
/*
Ext.require(
[
	'Ext.form.*',
	'Ext.data.*',
]);

Ext.onReady(function()
{

    Ext.define('Apm.currentuser',
	{
        extend: 'Ext.data.Model',
        fields:
		[
			{name: 'system'	    , mapping: 'system'},
			{name: 'username'	, mapping: 'username'},
        ]
    });

    var formPanel = Ext.create('Ext.form.Panel',
	{
        renderTo: 'divCurrentUser',
        //frame: true,
        waitMsgTarget: true,

//        fieldDefaults:
//		{
//            labelAlign: 'right',
//            labelWidth: 85,
//            labelHeight: 20,
//            msgTarget: 'side'
//        },

        // configure how to read the XML data
        reader : Ext.create('Ext.data.reader.Json',
		{
			model : 'Apm.currentuser',
			type  : 'json',
			method: 'GET',
            root  : 'records',
            successProperty: 'success'
        }),

        //width	: 100,
        //border:1,
        height	: 35,
        //bodyPadding: 100,
        fieldDefaults:
        {
            labelAlign: 'left',
            labelWidth: 80,
            anchor: '100%',
            fontSize: 10,
            height: 15,
        },

        defaultType: 'displayfield',
        items:
		[
            {
                xtype		: 'displayfield',
                fieldLabel	: 'System',
                name		: 'system',
				value		: '<span style="color:black;">*</span>',
            },
            {
                xtype		: 'displayfield',
                fieldLabel	: 'Username',
                name		: 'username',
				value		: '<span style="color:black;">*</span>',
            },
        ],

    });

	 formPanel.getForm().load({ url: '/admin/system/userdetails', waitMsg: 'Loading...', method: 'get' });
});
*/
/*
$.getJSON('/admin/system/userdetails', function(data)
{
	  var items = [];

	  $.each(data.records, function(i, record)
	  {
		items.push('System&nbsp;:&nbsp;'+record.system + '&nbsp;&nbsp;<br/>Username&nbsp;:&nbsp;'+record.username+'&nbsp;&nbsp;');
	  });

	  $('<div/>',
	  {
		html: items.join('')
	  }).appendTo('#divCurrentUser');
});

*/