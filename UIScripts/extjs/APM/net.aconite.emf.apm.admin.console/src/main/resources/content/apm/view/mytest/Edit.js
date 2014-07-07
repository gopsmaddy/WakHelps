var varEditPanelHeight=800;
var varEditPanelWidth=600;
var varEditPanelStatus=true;

Ext.define('Apm.view.mytest.Edit', 
{
    extend: 'Ext.form.Panel',
	//extend: 'Ext.window.Window',
    alias : 'widget.mytestedit',
	
	requires: 
	[
		'Ext.form.Panel',
		'Ext.form.field.Date',
		'Ext.tip.QuickTipManager',
		'Ext.ux.statusbar.StatusBar',
		//'Ext.ux.statusbar.ValidationStatus',
		
		'Ext.ux.form.field.DateTime',
		'Apm.view.EditorFooter',
		'Apm.view.lookup.MyTest',
		'Apm.view.lookup.TestCountry',		
	
	],
	   
	
	id		: 'idMyTestEdit',
	renderTo: 'divMyTestEdit',	
	title	: 'My Test Details',
	hidden	: true,
	waitMsgTarget: true,
	//frame	: true,	
	width	: (varEditPanelWidth-30),
	height	: (varEditPanelHeight-60),
	bodyPadding: 5,
	fieldDefaults: 
	{
		labelAlign: 'left',
		labelWidth: 120,
		anchor: '100%'
	},
	/*
	defaults: 
	{
		anchor: '95%',
		allowBlank: false,
		selectOnFocus: true,
		msgTarget: 'side'
	},
	*/
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
				id			: 'idETestCountry',
				fieldLabel	: '<span style="color:red;font-weight:bold">*</span>ETestCountry',
				blankText   : 'ETestCountry is required',
				xtype		: 'testcountrylookup',
				name		: 'countryId',
				allowBlank	: false,
				readOnly	: false,
			},
			{
				xtype: 'textfield',
				name: 'password1',
				inputType: 'password',
				fieldLabel: 'Password field'
			}, 
			{
				xtype: 'filefield',
				name: 'file1',
				fieldLabel: 'File upload'
			}, 
			{
				id:'idCommand',
				xtype: 'textareafield',
				name: 'command',
				fieldLabel: 'TextArea',
				value: 'Textarea value'
			}, 
			{
				xtype: 'displayfield',
				name: 'displayfield1',
				fieldLabel: 'Display field',
				value: 'Display field <span style="color:green;">value</span>'
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
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Date Range',
                combineErrors: true,
                msgTarget : 'side',
                layout: 'hbox',
                defaults: 
				{
                    flex: 1,
                    hideLabel: true
                },
                items: 
				[
                    {
                        xtype     : 'datefield',
                        name      : 'startDate',
                        fieldLabel: 'Start',
                        margin: '0 5 0 0',
                        //allowBlank: false /////////////validating/////////////////////////
                    },
                    {
                        xtype     : 'datefield',
                        name      : 'endDate',
                        fieldLabel: 'End',
                        //allowBlank: false /////////////validating/////////////////////////
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Details',
                collapsible: true,
                defaults: 
				{
                    labelWidth: 89,
                    anchor: '100%',
                    layout: 
					{
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    }
                },
                items: 
				[
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Phone',
                        combineErrors: true,
                        msgTarget: 'under',
                        defaults: 
						{
                            hideLabel: true
                        },
                        items: 
						[
                            {xtype: 'displayfield', value: '('},
                            {xtype: 'textfield',    fieldLabel: 'Phone 1', name: 'phone-1', width: 29, allowBlank: true},
                            {xtype: 'displayfield', value: ')'},
                            {xtype: 'textfield',    fieldLabel: 'Phone 2', name: 'phone-2', width: 29, allowBlank: true, margins: '0 5 0 0'},
                            {xtype: 'displayfield', value: '-'},
                            {xtype: 'textfield',    fieldLabel: 'Phone 3', name: 'phone-3', width: 48, allowBlank: true}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Time worked',
                        combineErrors: false,
                        defaults: 
						{
                            hideLabel: true
                        },
                        items: 
						[
                           {
                               name : 'hours',
                               xtype: 'numberfield',
                               width: 48,
                               //allowBlank: false /////////////validating/////////////////////////
                           },
                           {
                               xtype: 'displayfield',
                               value: 'hours'
                           },
                           {
                               name : 'minutes',
                               xtype: 'numberfield',
                               width: 48,
                               //allowBlank: false /////////////validating/////////////////////////
                           },
                           {
                               xtype: 'displayfield',
                               value: 'mins'
                           }
                        ]
                    },
                    {
                        xtype : 'fieldcontainer',
                        combineErrors: true,
                        msgTarget: 'side',
                        fieldLabel: 'Full Name',						
                        defaults: 
						{
                            hideLabel: true
                        },
                        items : 
						[
                            {
                                //the width of this field in the HBox layout is set directly
                                //the other 2 items are given flex: 1, so will share the rest of the space
                                width:          50,

                                xtype:          'combo',
                                mode:           'local',
                                value:          'mrs',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel:     'Title',
                                name:           'title',
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store:          Ext.create('Ext.data.Store', 
								{
                                    fields : ['name', 'value'],
                                    data   : 
									[
                                        {name : 'Mr',   value: 'mr'},
                                        {name : 'Mrs',  value: 'mrs'},
                                        {name : 'Miss', value: 'miss'}
                                    ]
                                })
                            },
                            {
                                xtype: 'textfield',
                                flex : 1,
                                name : 'firstName',
                                fieldLabel: 'First',
								blankText: 'First Name is required',
                                allowBlank: false /////////////validating/////////////////////////
                            },
                            {
                                xtype: 'textfield',
                                flex : 1,
                                name : 'lastName',
                                fieldLabel: 'Last',
								blankText: 'Last Name is required',
                                allowBlank: false, /////////////validating/////////////////////////
                                margins: '0'
                            }
                        ]
                    }
                ]
            }
        ],
        buttons: 
		[
            {
                text   : 'Load test data',
                handler: function() 
				{
                    this.up('form').getForm().loadRecord(Ext.create('Employee', 
					{
                        'email'    : 'abe@sencha.com',
                        'title'    : 'mr',
                        'firstName': 'Abraham',
                        'lastName' : 'Elias',
                        'startDate': '01/10/2003',
                        'endDate'  : '12/11/2009',
                        'phone-1'  : '555',
                        'phone-2'  : '123',
                        'phone-3'  : '4567',
                        'hours'    : 7,
                        'minutes'  : 15
                    }));
                }
            },
            {
                text   : 'Save',
                handler: function() 
				{
                    var form = Ext.getCmp('idMyTestEdit').getForm();
                        s = '';
                    if (form.isValid()) 
					{
                        Ext.iterate(form.getValues(), function(key, value) 
						{
							s += Ext.util.Format.format("{0} = {1}<br />", key, value);
						}, this	);
						
						
                        Ext.Msg.confirm
						(
							'Form Values', 
							s,						
							function (btn) 
							{
																
								if (btn == 'yes')
								{
									var selection = Ext.getCmp('idMyTestList').getView().getSelectionModel().getSelection()[0];
									if (selection) 
									{		
										/*Ext.Array.each(selection, function(record, index, selectedSelf) 
										{	
											// Get the value that was selected in the add text grid.											
											record.set('command', Ext.getCmp('idCommand').getValue());						
										});*/
										//form.reset();	
										form.updateRecord(selection);										
									}	
									
								}
								else
								{
									
								}
							}							
						);
						$("#divMyTestEdit").dialog('close');
						Ext.getCmp('idMyTestEdit').hide();
						
                    }
                }
            },
            {
                text   : 'Reset',
                handler: function() 
				{
                    var form = Ext.getCmp('idMyTestEdit').getForm();
					//Ext.getCmp('idMyTestEdit').getForm().reset();
					var record = Ext.getCmp('idMyTestList').getView().getSelectionModel().getSelection()[0];
					if (record) 
					{
						form.loadRecord(record);
						var sb = Ext.getCmp('idMyTestEditStatusbar');
						// once completed
						sb.clearStatus(); 	
					}
                }
            },
			{
                text   : 'Clear',
                handler: function() 
				{
                    var form = Ext.getCmp('idMyTestEdit').getForm();
					form.reset();	
					var sb = Ext.getCmp('idMyTestEditStatusbar');
					// once completed
					sb.clearStatus(); 					
                }
            },
			{
                text   : 'Close',
                handler: function() 
				{
                    $("#divMyTestEdit").dialog('close');
					Ext.getCmp('idMyTestEdit').hide();
				}	
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
						text: 'Save',
						handler: function()
						{
							var fp = Ext.getCmp('idMyTestEdit');
							if(fp.getForm().isValid())
							{
								var sb = Ext.getCmp('idMyTestEditStatusbar');
								//sb.showBusy('Saving form...');
								//fp.getEl().mask();
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
									   sb.setStatus(
										{
											text:'Form error!',
											iconCls:'',
											clear: true
										});
									   fp.getEl().unmask();
									}
									
									
								});
							}
						}
					}
				]
			}, 
			, 
            //Ext.create('Ext.ux.StatusBar', 
			{
                xtype: 'statusbar',
				dock: 'bottom',
                id: 'idMyTestEditStatusbar',
                //defaultText: 'Ready',
                //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idMyTestEdit'})
            }//)
            
		],
		
	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

