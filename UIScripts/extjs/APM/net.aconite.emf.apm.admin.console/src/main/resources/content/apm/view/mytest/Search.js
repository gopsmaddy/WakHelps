var varSearchPanelHeight=300;
var varSearchPanelWidth=600;
var varSearchPanelStatus=true;

Ext.define('Apm.view.mytest.Search', 
{
    extend: 'Ext.form.Panel',
	//extend: 'Ext.window.Window',
    alias : 'widget.mytestsearch',
	
	requires: 
	[
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.tip.QuickTipManager',		
		
		'Ext.ux.form.field.DateTime',		
		'Apm.view.lookup.TestCountry',		
	
	],
	   
	
	id		: 'idMyTestSearch',
	renderTo: 'divMyTestSearch',	
	title	: 'My Test Search Details',
	hidden	: false,
	waitMsgTarget: true,
	//frame	: true,	
	//width	: (varSearchPanelWidth-30),
	autoWidth: true,
	height	: (varSearchPanelHeight-60),
	bodyPadding: 5,
	fieldDefaults: 
	{
		labelAlign: 'left',
		labelWidth: 90,
		anchor: '100%'
	},	
	defaultType: 'textfield',
	//listClass: 'x-column-header-text',
	
	items: 
		[
			{
			   xtype: 'displayfield',
			   value: 'displayfield'
		    },
			{
				xtype	: 'label',
				name	: 'id',
				text	: 'My Test Panel label text here',
			},
			{
				xtype: 'textfield',
				name: 'name',
				fieldLabel: 'Text field',
				value: 'Text field value'
			}, 
			{
				id			: 'idSTestCountry',
				
				fieldLabel	: 'STestCountry',
				blankText   : 'STestCountry is required',
				xtype		: 'testcountrylookup',
				name		: 'countryId',
				allowBlank	: false,
				readOnly	: false,
			},
			{
				xtype: 'numberfield',
				name: 'numberfield1',
				fieldLabel: 'Number field',
				value: 5,
				minValue: 0,
				maxValue: 50
			}, 
			{
				xtype: 'checkboxfield',
				name: 'checkbox1',
				fieldLabel: 'Checkbox',
				boxLabel: 'box label'
			}, 
			{
				xtype: 'radiofield',
				name: 'radio1',
				value: 'radiovalue1',
				fieldLabel: 'Radio buttons',
				boxLabel: 'radio 1'
			}, 
			{
				xtype: 'radiofield',
				name: 'radio1',
				value: 'radiovalue2',
				fieldLabel: '',
				labelSeparator: '',
				hideEmptyLabel: false,
				boxLabel: 'radio 2'
			}, 
			{
				xtype: 'datefield',
				name: 'date1',
				fieldLabel: 'Date Field',
				blankText: 'Birthdate is required',
				msgTarget: 'side',
				//allowBlank: false, /////////////validating/////////////////////////
			}, 
			{
				xtype: 'timefield',
				name: 'time1',
				fieldLabel: 'Time Field',
				minValue: '1:30 AM',
				maxValue: '9:15 PM'
			},	
            {
                xtype     : 'textfield',
                name      : 'email',
                fieldLabel: 'Email Address',
				blankText: 'Email Address is required',
                vtype: 'email',
                msgTarget: 'side', 
                //allowBlank: false /////////////validating/////////////////////////
            }
        ],        
		dockedItems: 
		[
			{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				items: 
				['->', 
					{
						text: 'Submit',
						handler: function()
						{
							var fp = Ext.getCmp('idMyTestSearch');
							if(fp.getForm().isValid())
							{
								//var sb = Ext.getCmp('idMyTestSearchStatusbar');
								//sb.showBusy('Saving form...');
								fp.getEl().mask();
								fp.getForm().submit(
								{
									url: 'fake.php',
									/*
									success: function()
									{
										sb.setStatus(
										{
											text:'Form saved!',
											iconCls:'',
											clear: true
										});
										fp.getEl().unmask();
									}
									*/
									success: function(form, action) 
									{
									   Ext.Msg.alert('Success', action.result.msg);
									   fp.getEl().unmask();
									},
									failure: function(form, action) 
									{
										switch (action.failureType) 
										{
											case Ext.form.action.Action.CLIENT_INVALID:
												Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
												break;
											case Ext.form.action.Action.CONNECT_FAILURE:
												Ext.Msg.alert('Failure', 'Ajax communication failed');
												break;
											case Ext.form.action.Action.SERVER_INVALID:
											   Ext.Msg.alert('Failure', action.result.msg);
									   }
									   
									   fp.getEl().unmask();
									}
									
									
								});
							}
						}
					}
				]
			}, 		
            
		],
		
	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

