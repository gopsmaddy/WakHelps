Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux', '../extjs-4.1.0/examples/ux');

Ext.require
([    
	'Ext.selection.CellModel', 	
	'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*', 
	'Ext.state.*',
	'Ext.form.*',
	//'Ext.grid.PagingScroller',
	//'Ext.tip.QuickTipManager',	
	
	//'Ext.toolbar.Paging',
    //'Ext.ux.PreviewPlugin',
    //'Ext.ModelManager',	
    'Ext.ux.CheckColumn',

]);

Ext.onReady(function()
{
	Ext.tip.QuickTipManager.init();
	
	
	//////////////////////////////////////////////////////////////////////////////////
	
	
		
	// custom Vtype for vtype:'IPAddress'	
	Ext.apply
	(
		Ext.form.field.VTypes, 
		{
			//  vtype validation function
			time: function(val, field) 
			{
				return timeTest.test(val);
			},
			// vtype Text property: The error text to display when the validation function returns false
			timeText: 'Not a valid time.  Must be in the format "12:34 PM".',
			// vtype Mask property: The keystroke filter mask
			timeMask: /[\d\s:amp]/i,
			timeTest: /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i,
			//----------------------------------------------------
			IPAddress:  function(val) 
			{
				return ipAddressTest.test(val);
			},
			IPAddressText: 'Must be a numeric IP address',
			IPAddressMask: /[\d\.]/i,
			IPAddressTest : /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
			//----------------------------------------------------
			password : function(val, field) 
			{
				if (field.initialPassField) 
				{
					var pwd = Ext.getCmp(field.initialPassField);
					return (val == pwd.getValue());
				}
				return true;
			},	
			passwordText : 'Passwords do not match',	
			//----------------------------------------------------
			hyphen:function(val)
			{
				return this.hyphenTest.test(val);
			},   
			hyphenText	: "Password must contain 7-20 characters with uppercase letters, lowercase letters and at least one number.",
			hyphenTest	: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/,	
			//----------------------------------------------------
			cronMinSec:function(val)
			{
				return this.cronMinSecTest.test(val);
			},   
			cronMinSecText	: "Cron command must contain * or 0-59 numbers only",
			cronMinSecTest	: /^(\*|[0-9]|[0-5][0-9])$/,
			//----------------------------------------------------
			cronHour:function(val)
			{
				return this.cronHourTest.test(val);
			},   
			cronHourText	: "Cron command must contain * or 0-23 numbers only",
			cronHourTest	: /^(\*|[0-9]|[0-1][0-9]|[2][0-3])$/,
			//----------------------------------------------------
			cronMofDay:function(val)
			{
				return this.cronMofDayTest.test(val);
			},   
			cronMofDayText	: "Cron command must contain *,? or 1-31 numbers only",
			cronMofDayTest	: /^(\*|\?|[1-9]|[0-2][0-9]|[3][0-1])$/,
			//----------------------------------------------------
			cronMonth:function(val)
			{
				return this.cronMonthTest.test(val);
			},   
			cronMonthText	: "Cron command must contain * or 1-12 numbers only",
			cronMonthTest	: /^(\*|[1-9]|[0-1][0-2])$/,
			//----------------------------------------------------
			cronMofWeek:function(val)
			{
				return this.cronMofWeekTest.test(val);
			},   
			cronMofWeekText	: "Cron command must contain *, ? or 1-7 numbers only",
			cronMofWeekTest	: /^(\*|\?|[1-7])$/,
			//----------------------------------------------------
			cronYear:function(val)
			{
				return this.cronYearTest.test(val);
			},   
			cronYearText	: "optional",
			cronYearTest	: /^(\*|\|\?|[2][0]\d{2})$/,
			//----------------------------------------------------
			myCommand:function(val)
			{
				return this.myCommandTest.test(val);
			},   
			myCommandText	: "Cron command must contain {x,y} where x<=0 and y>=0 only",
			myCommandTest	: /^(\{)([0]|-\d{1,2})(\,)([0]|\d{1,2})(\})$/,
			//----------------------------------------------------
			
		}
	);
	
	/////////////////////////////////////////////////////////////////////////////////
	
	
	/////////////////////////////////////////////////////////////////////////////////
	/////////////////Scheduler Data Mapping//////////////////////////////////////////
	
    Ext.define('SchedulerModel', 
	{
        extend: 'Ext.data.Model',
        fields: 
			[				
				{name: 'id'			, mapping: 'id'		, type: 'int'	, useNull: true},
				{name: 'title'		, mapping: 'title'},
				{name: 'name'		, mapping: 'name'},
				{name: 'status'		, mapping: 'status'	, type: 'bool'},
				{name: 'command'	, mapping: 'command'},	
				{name: 'seconds'	, mapping: 'seconds'},//,type: 'date', dateFormat: 'm/d/Y'},
				{name: 'minutes'	, mapping: 'minutes'},
				{name: 'hours'		, mapping: 'hours'},
				{name: 'minutes'	, mapping: 'minutes'},
				{name: 'dayofmonth'	, mapping: 'dayofmonth'},
				{name: 'month'		, mapping: 'month'},
				{name: 'dayofweek'	, mapping: 'dayofweek'},
				{name: 'year'		, mapping: 'year'},
				{name: 'lastrun'	, mapping: 'lastrun', type: 'date'	, dateFormat: 'timestamp'},
				{name: 'nextrun'	, mapping: 'lastrun', type: 'date'	, dateFormat: 'timestamp'},
				{name: 'runonce'	, mapping: 'runonce'},				
				//{name: 'replycount' , mapping: 'replycount'	, type: 'int'}, 
				//{name: 'lastpost'	, mapping: 'lastpost'	, type: 'date'	, dateFormat: 'timestamp'},								
			]
        
    });	
	
	/////////////////Scheduler Data Store//////////////////////////////////////////

    // create the Data Store
    var apmSchedulerStore = Ext.create('Ext.data.Store', //new Ext.data.Store(
		{
			id: 'idSchedulerStore',
			model: 'SchedulerModel',
			remoteSort: true,
			// allow the grid to interact with the paging scroller by buffering
			buffered: false,
			//autoSync: true,
			//autoLoad: true,
			pageSize: 10,
			proxy: 
			{
				// load using script tags for cross domain, if the data in on the same domain as
				// this page, an HttpProxy would be better
				type: 'rest', //rest
				url : urlSchedulerData,			
				reader: 
				{
					type: 'json',
					root: 'schedules',
					totalProperty: 'totalCount',
					idProperty: 'id'
				},
				writer: 
				{
					type: 'json'
				}
				/*,
				listeners: 
				{
					write: function(store, operation)
					{
						
						alert(record.getId());
						var record = operation.getRecords()[0],
						name = Ext.String.capitalize(operation.action),
						verb;                    
						
						if (name == 'Destroy') 
						{
							record = operation.records[0];
							verb = 'Destroyed';
						} 
						else 
						{
							verb = name + 'd';
						}
						Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
                
					}
				}*/
				// sends single sort as multi parameter
				//simpleSortMode: true
			},
			sorters: [{property: 'lastrun', direction: 'DESC'}]
			
		}
	);	
	
	
	/////////////////Scheduler Tool bar//////////////////////////////////////////
	
	var apmSchedulerTBar = Ext.create('Ext.toolbar.Toolbar',
									{
										id : 'idSchedulerTBar',
										items: 
										[
											{
												itemId: 'idAddBtn',
												text: 'Add',
												iconCls: 'icon-add',
												handler: function()
												{													
													// empty record
													apmSchedulerStore.insert(0, new SchedulerModel());
													//rowEditing.startEdit(0, 0);	
													cellEditing.startEdit(0, 0);	
		
												}
											},
											'-', 
											{
												itemId: 'idSynchBtn',
												text: 'Synch',
												iconCls: 'icon-delete',
												disabled: false,
												hidden: false,
												handler: function()
												{													
													apmSchedulerStore.sync();
												}
											},											
											'-', 
											{
												itemId: 'idDeleteBtn',
												text: 'Delete',
												iconCls: 'icon-delete',
												disabled: true,
												hidden: true,
												handler: function()
												{
													var selection = apmSchedulerGrid.getView().getSelectionModel().getSelection()[0];
													if (selection) 
													{
														apmSchedulerStore.remove(selection);
													}
												}
											},
											'-',
											{
												itemId: 'idRunBtn',
												text: 'Run',
												iconCls: 'icon-run',
												disabled: true,
												hidden: true,
												handler: function()
												{
													var selection = apmSchedulerGrid.getView().getSelectionModel().getSelection()[0];
													if (selection) 
													{									
														//alert('Run'+selection.get('id'));
														
														Ext.Msg.confirm
														(
															'Confirm', 
															'Are you sure you want to run '+selection.get('name')+' task?',
															function (btn) 
															{
																if (btn == 'yes')
																{
																	Ext.Ajax.request
																	(
																		{
																			url: urlSchedulerRun,
																			method: 'POST',
																			params: {taskId:selection.get('id')},
																			success: function(response)
																			{
																				var serverResponse = response.responseText;
																				console.log(serverResponse);
																			}
																		}
																	);
																}
															}
														);											
														
													}								
												}
											}
										]
									
									});
									
	/////////////////Scheduler Paging bar//////////////////////////////////////////
	
	var apmSchedulerBBar = Ext.create('Ext.PagingToolbar',						
									{
										id : 'idSchedulerBBar',
										displayInfo: true,
										displayMsg: 'Displaying topics {0} - {1} of {2}',
										emptyMsg: "No items to display",						
										store: apmSchedulerStore//,
										//pageSize:myDefaultPageSize,	
										//plugins: [new Ext.ux.PageSizePlugin()]									
										
									});
	
	
	/////////////////Scheduler Data Grid//////////////////////////////////////////
	
	var gridForm = Ext.create('Ext.form.Panel', 
	{
        id: 'idSchedulerFormGrid',
		renderTo:'divSchedulerResults',
        frame: true,
        title: 'Scheduler Tasks',
        bodyPadding: 5,
        autoWidth: true,
        layout: 'column',    // Specifies that the items will now be arranged in columns

        fieldDefaults: 
		{
            labelAlign: 'left',
            msgTarget: 'side'
        },

        items: 
		[
			{            
				xtype: 'gridpanel',
				columnWidth: 0.70,
				id:'idSchedulerGrid',
				//renderTo:'divSchedulerResults',
				//title: 'Scheduler Tasks',
				store: apmSchedulerStore,
				frame: true,			
				// grid columns
				columns:
					[
						{id: 'idGRownumber'	, header: "Row ID"		, xtype: 'rownumberer'	 , width: 50	, sortable: false	, hidden: true},
						{id: 'idGId'		, header: "Task ID"		, dataIndex: 'id'		 , width: 50	, sortable: true	, align: 'left'},
						{id: 'idGName'		, header: "Name"		, dataIndex: 'name'	 	 , flex:  1		, sortable: true	, align: 'left'		, editor: apmNameField},//
						{id: 'idGCommand'	, header: ""			, dataIndex: 'command'	 , flex:  1		, sortable: true	, align: 'left'},//	, field: {xtype: 'textfield',vtype:'apmCommand'}}	, tooltip: 'start and end offset values'},
						{id: 'idGSeconds'	, header: "Seconds"		, dataIndex: 'seconds'	 , width: 60	, sortable: true	, align: 'left'		, editor: apmSecondsField	, hidden: true},
						{id: 'idGMinutes'	, header: "Minutes"		, dataIndex: 'minutes'	 , width: 60	, sortable: true	, align: 'left'		, editor: apmMinutesFeild	, hidden: true},
						{id: 'idGHours'		, header: "Hours"		, dataIndex: 'hours'	 , width: 60	, sortable: true	, align: 'left'		, editor: apmHoursFeild		, hidden: true},
						{id: 'idGDayofmonth', header: "Dayofmonth"	, dataIndex: 'dayofmonth', width: 60	, sortable: true	, align: 'left'		, editor: apmDaysFeild	, hidden: true},
						{id: 'idGMonth'		, header: "Month"		, dataIndex: 'month'	 , width: 60	, sortable: true	, align: 'left'		, editor: apmMonthsField	, hidden: true},
						{id: 'idGDayofweek'	, header: "Dayofweek"	, dataIndex: 'dayofweek' , width: 60	, sortable: true	, align: 'left'		, editor: apmWeeksField	, hidden: true},
						{id: 'idGYear'		, header: "Year"		, dataIndex: 'year'	 	 , width: 60	, sortable: true	, align: 'left'		, editor: apmYearsField	, hidden: true},
						{id: 'idGStatus'	, header: "Active?"		, dataIndex: 'status'	 , width: 50	, sortable: true	, align: 'center'	, xtype: 'checkcolumn'	, stopSelection: true},
						{id: 'idGLastRun'	, header: "Last Run"	, dataIndex: 'lastrun'	 , width: 130	, sortable: true	, align: 'left'		, renderer: Ext.util.Format.dateRenderer('Y-m-d g:i:s A')},
						{id: 'idGNextRun'	, header: "Next Run"	, dataIndex: 'nextrun'	 , width: 130	, sortable: true	, align: 'left'		, renderer: Ext.util.Format.dateRenderer('Y-m-d g:i:s A')},
						//{id: 'idGRunonce'	, header: "Run Once"	, dataIndex: 'runonce'	 , width: 70	, sortable: true	, align: 'left'		, field: {xtype: 'textfield'	, hidden: true}},
						//{id: 'idGLastRun'	, header: "Last Run"	, dataIndex: 'lastrun'	 , width: 130	, sortable: true	, align: 'left'		, editor: apmDateField	, renderer: Ext.util.Format.dateRenderer('Y-m-d g:i:s A')},
						{
							xtype: 'actioncolumn',
							width:25,
							sortable: false,						
							items: 
							[
								{
									itemId: 'idDeleteRBtn',
									//text: 'Delete',
									tooltip: 'Delete Task',
									icon: '../lib/images/delete.gif',
									//iconCls: 'icon-delete',
									//disabled: true,
									handler: function(grid, rowIndex, colIndex) 
									{	
										var record = grid.getStore().getAt(rowIndex);
										//alert("Edit " + record.get('firstname'));
										
										Ext.Msg.confirm
										(
											'Confirm', 
											'Are you sure you want to delete '+record.get('name')+' task?',
											function (btn) 
											{
												if (btn == 'yes')
												{
													apmSchedulerStore.removeAt(rowIndex); 
												}
											}
										);				
									}
								},
								
							]
						},
						{
							xtype: 'actioncolumn',
							width:25,
							sortable: false,						
							items: 
							[
								{
									itemId: 'idRunRBtn',
									//text: 'Run',
									tooltip: 'Run Task',
									icon: '../lib/images/run.gif',
									//iconCls: 'icon-delete',
									//disabled: true,
									handler: function(grid, rowIndex, colIndex) 
									{	
										var record = grid.getStore().getAt(rowIndex);
										Ext.Msg.confirm
										(
											'Confirm', 
											'Are you sure you want to run '+record.get('name')+' task?',
											function (btn) 
											{
												if (btn == 'yes')
												{
													Ext.Ajax.request
													(
														{
															url: urlSchedulerRun,
															method: 'POST',
															params: {taskId:record.get('id')},
															success: function(response)
															{
																var serverResponse = response.responseText;
																console.log(serverResponse);
															}
														}
													);
												}
											}
										);				
									}
								}
							]
						}
					],
					
				//viewConfig: {trackOver: false},
				viewConfig: {emptyText: 'No records to display.'},			
				//width: 700,
				autoWidth: true,
				height: 300,			
				//autoHeight:true,
				collapsible: true,
				loadMask: true,
				//selModel: {pruneRemoved: false},				
				selModel: { selType: 'rowmodel'},
				//selModel: { selType: 'cellmodel'},
				multiSelect: false,	
				stripeRows: true,
				
				plugins: [cellEditing],
				//plugins: [rowEditing],
				
				bbar: apmSchedulerBBar,	
				tbar: apmSchedulerTBar,

				listeners: 
				{
					selectionchange: function(model, records) 
					{
						if (records[0]) 
						{
							this.up('form').getForm().loadRecord(records[0]);							
						}
					}	
					
				}
			},
			{					
				columnWidth: 0.30,				
				margin: '0 0 0 10',
				xtype: 'fieldset',
				title:' Execution Details',
				defaults: 
				{
					anchor: '100%'
				},
				defaultType: 'textfield',
				listClass: 'x-column-header-text',
				items: 
				[
					{
						fieldLabel: 'Task Id',
						name: 'id',
						readOnly:true
					},
					{
						fieldLabel: 'Task Name',
						name: 'name',
						readOnly:true,					
					},
					{
						id:'idCommand',
						fieldLabel: 'Command',
						name: 'command',
						hidden:false						
					},
									
					{
						id:'idDailyCronSet',
						xtype:'fieldset',
						title: 'Daily Task',
						//checkboxToggle:true,
						collapsible: true,
						collapsed: true,
						defaultType: 'textfield',
						layout: 'anchor',
						defaults: 
						{
							anchor: '100%'
						}, 
						items :
						[
							{
								id:'idDailyCronSetValue',
								xtype: 'radiogroup',
								//fieldLabel: 'Perform this Task',
								columns: 2,
								defaults: 
								{
									name: 'dailytask' //Each radio has the same name so the browser will make sure only one is checked at once
								},
								items: 
								[
									{ boxLabel: 'Every Day'			, inputValue: '0'},//, checked: true},
									{ boxLabel: 'Every n Days'		, inputValue: '1'},
									{ boxLabel: 'Every n Hours'		, inputValue: '2'},
									{ boxLabel: 'Every n Minutes'	, inputValue: '3'},
									{ boxLabel: 'Weekdays'			, inputValue: '4'},
									{ boxLabel: 'Weekends'			, inputValue: '5'}
								]
							},
							{
								id:'idDailyCronSetNValue',
								fieldLabel: 'N Value',
								name: 'nvalue',
								value:'1'
							}
						],
						listeners: 
						{
							collapse: function(p) 
							{
								p.cascade(function () 
								{
									//this.disable();	
								});
								//alert('disable');
							},
							expand: function(p) 
							{
								p.cascade(function () 
								{
									//this.enable();
								});
								Ext.getCmp('idCronOption').setValue('idDaily');
								Ext.getCmp('idWeeklyCronSet').collapse( );
								Ext.getCmp('idMonthlyCronSet').collapse( );
								Ext.getCmp('idOneoffCronSet').collapse( );
								//alert('enable');
							}
						}
					},
					{
						id:'idWeeklyCronSet',
						xtype:'fieldset',
						title: 'Weekly Task',											
						collapsible: true,
						collapsed: true,
						defaultType: 'textfield',
						layout: 'anchor',
						defaults: 
						{
							anchor: '100%'
						}, 						
						items: 
						[
							
							
							{
								id:'idWeeklyCronSetValue',
								xtype: 'checkboxgroup',
								//fieldLabel: 'Perform this Task',
								columns: 2,
								defaults: 
								{
									anchor: '100%',
									name: 'weeklytask' 
								},
								items: 
								[
									{boxLabel: 'Monday'		,inputValue:'1'},//checked: true },
									{boxLabel: 'Tuesday'	,inputValue:'2'},									
									{boxLabel: 'Wednesday'	,inputValue:'3'},
									{boxLabel: 'Thursday'	,inputValue:'4'},
									{boxLabel: 'Friday'		,inputValue:'5'},
									{boxLabel: 'Saturday'	,inputValue:'6'},
									{boxLabel: 'Sunday'		,inputValue:'0'}	
									
								]
							},				
						],
						listeners: 
						{
							collapse: function(p) 
							{
								p.cascade(function () 
								{
									//this.disable();	
								});
								//alert('disable');
							},
							expand: function(p) 
							{
								p.cascade(function () 
								{
									//this.enable();
								});
								Ext.getCmp('idCronOption').setValue('idWeekly');
								Ext.getCmp('idDailyCronSet').collapse( );
								Ext.getCmp('idMonthlyCronSet').collapse( );
								Ext.getCmp('idOneoffCronSet').collapse( );
								//alert('enable');
							}
						}
					},
					{
						id:'idMonthlyCronSet',
						xtype:'fieldset',
						title: 'Monthly Task',											
						collapsible: true,
						collapsed: true,
						defaultType: 'textfield',
						layout: 'anchor',
						defaults: 
						{
							anchor: '100%'
						}, 						
						items: 
						[
							
							
							{
								id:'idMonthlyCronSetValue',
								xtype: 'checkboxgroup',
								//fieldLabel: 'Perform this Task',
								columns: 2,
								defaults: 
								{
									anchor: '100%',
									name: 'monthlytask' 
								},
								items: 
								[
									{boxLabel: 'January'	,inputValue:'1'},//checked: true },
									{boxLabel: 'February'	,inputValue:'2'},									
									{boxLabel: 'March'		,inputValue:'3'},
									{boxLabel: 'April'		,inputValue:'4'},
									{boxLabel: 'May'		,inputValue:'5'},
									{boxLabel: 'June'		,inputValue:'6'},
									{boxLabel: 'July'		,inputValue:'7'},	
									{boxLabel: 'August'		,inputValue:'8'},
									{boxLabel: 'September'	,inputValue:'9'},
									{boxLabel: 'October'	,inputValue:'10'},
									{boxLabel: 'November'	,inputValue:'11'},
									{boxLabel: 'December'	,inputValue:'12'},
									
								]
							},				
						],
						listeners: 
						{
							collapse: function(p) 
							{
								p.cascade(function () 
								{
									//this.disable();	
								});
								//alert('disable');
							},
							expand: function(p) 
							{
								p.cascade(function () 
								{
									//this.enable();
								});
								Ext.getCmp('idCronOption').setValue('idMonthly');
								Ext.getCmp('idDailyCronSet').collapse( );
								Ext.getCmp('idWeeklyCronSet').collapse( );
								Ext.getCmp('idOneoffCronSet').collapse( );
								//alert('enable');
							}
						}
					},
					{
						id:'idOneoffCronSet',
						xtype:'fieldset',
						//checkboxToggle:true,
						title: 'Only One time',					
						collapsible : true,
						collapsed: true,
						defaultType: 'textfield',
						layout: 'anchor',
						defaults: {anchor: '100%',value: new Date()},
						items :
						[
							{
								id:'idOneoffCronSetRunDateTime',
								xtype: 'datetimefield',
								fieldLabel: 'Date Time',
								name: 'OneoffRunDateTime'
							}
						],
						listeners: 
						{
							collapse: function(p) 
							{
								p.cascade(function () 
								{
									//this.disable();	
								});
								//alert('disable');
							},
							expand: function(p) 
							{
								p.cascade(function () 
								{
									//this.enable();
								});
								Ext.getCmp('idCronOption').setValue('idOneoff');	
								Ext.getCmp('idDailyCronSet').collapse( );
								Ext.getCmp('idWeeklyCronSet').collapse( );	
								Ext.getCmp('idMonthlyCronSet').collapse( );								
								//alert('enable');
							}
						}					

					},
					{
						id:'idStartCronSet',
						xtype:'fieldset',
						title: 'Sheduler Parameters',											
						checkboxToggle:true,						
						collapsible : true,
						collapsed: true,
						defaultType: 'textfield',						
						defaults: {anchor: '100%'},
						//layout: 'anchor',
						layout: 'column',
						items: 
						[
							{								
								xtype:'fieldset',
								columnWidth: 0.5,
								title: 'Job Starting Time',
								//collapsible: true,
								border:'1',
								defaultType: 'textfield',
								defaults: {anchor: '100%',value: new Date()},
								layout: 'anchor',
								items :
								[
									{
										id:'idStartCronSetStartDateTime',								
										//name: 'nextrun',								
										xtype: 'timefield',
										allowBlank: false,
										format: 'H:i',
										//width: 80,
										flex: 1
										
									}
								]
							},
							{								
								xtype:'fieldset',
								columnWidth: 0.5,
								title: 'Data Offset (days)',
								//collapsible: true,
								border:'1',
								defaultType: 'textfield',
								defaults: {anchor: '100%'},
								//layout: 'vbox',
								items :
								[
									{
										id:'idStartCronSetStartOffsetValue',
										xtype: 'numberfield',										
										allowBlank: false,
										emptyText :'Start',
										minValue: -100,
										maxValue: 0,										
									},
									{
										id:'idStartCronSetEndOffsetValue',
										xtype: 'numberfield',										
										allowBlank: false,
										emptyText :'End',
										minValue: -100,
										maxValue: 100,										
									}
								]
							}
							
						]						
					},					
					{						
						itemId: 'idBuildCronBtn',
						text: 'Build Cron',
						xtype: 'button',
						iconCls: 'icon-save',
						disabled: false,
						scope: this,
						handler: function()						
						{
							///////////////////////////////////////////////////
							var startCron='0 0 22 ';
							var startHour=getHour(Ext.getCmp('idStartCronSetStartDateTime').getValue());
							var startMinute=getMinute(Ext.getCmp('idStartCronSetStartDateTime').getValue());
							
							if(Ext.getCmp('idStartCronSetStartDateTime').getValue())
								startCron='0 '+startMinute+' '+startHour+' ';
							
							var taskId=Ext.getCmp('idCronOption').getValue();
							var cronCommand=startCron+'? * *' // Fire at 10:00:00pm every day
							
							if('idDaily' == taskId)
							{										
								var searchType = Ext.ComponentQuery.query("#idDailyCronSet [name=dailytask][checked=true]");
								
								if(searchType[0].getGroupValue()>0)
								{
									var nValue=Ext.getCmp('idDailyCronSetNValue').getValue();
									
									if(searchType[0].getGroupValue()==1)//Every n Days
										cronCommand=startCron+'0-31/'+nValue+' * *';
									
									if(searchType[0].getGroupValue()==2)//Every n Hours
										cronCommand='0 0 0-23/'+nValue+' * * *';
									
									if(searchType[0].getGroupValue()==3)//Every n Minutes
										cronCommand='0 0-59/'+nValue+' * * * *';
									
									if(searchType[0].getGroupValue()==4)//Weekdays
										cronCommand=startCron+'? * 1-5';
									
									if(searchType[0].getGroupValue()==5)//Weekends
										cronCommand=startCron+'? * 0,6';										
								}
								else
								{
									//Every Day
									cronCommand=startCron+'? * *';
								}
								//alert(searchType[0].getGroupValue());
							}
							if('idWeekly' == taskId)
							{
								var searchType = Ext.ComponentQuery.query("#idWeeklyCronSet [name=weeklytask][checked=true]");
								var weekValue="";
								Ext.Array.each(searchType, function(record, index, selectedSelf) 
								{	
									if(index>0)
										weekValue=weekValue+',';
									
									weekValue=weekValue+searchType[index].getSubmitValue();
																		
								});
								if(weekValue!='')
									cronCommand=startCron+'? * '+weekValue+'';								
							}
							if('idMonthly' ==taskId)
							{
								var searchType = Ext.ComponentQuery.query("#idMonthlyCronSet [name=monthlytask][checked=true]");
								var monthValue="";
								Ext.Array.each(searchType, function(record, index, selectedSelf) 
								{	
									if(index>0)
										monthValue=monthValue+',';
									
									monthValue=monthValue+searchType[index].getSubmitValue();
																		
								});
								if(monthValue!='')
									cronCommand=startCron+'? '+monthValue+' *';	
							}
							if('idOneoff' == taskId)
							{	
								var oneOffYear=getYear(Ext.getCmp('idOneoffCronSetRunDateTime').getValue());
								var oneOffMonth=getMonth(Ext.getCmp('idOneoffCronSetRunDateTime').getValue());
								var oneOffDay=getDay(Ext.getCmp('idOneoffCronSetRunDateTime').getValue());
								var oneOffHour=getHour(Ext.getCmp('idOneoffCronSetRunDateTime').getValue());
								var oneOffMinute=getMinute(Ext.getCmp('idOneoffCronSetRunDateTime').getValue());
								
								cronCommand='0 '+oneOffMinute+' '+oneOffHour+' '+oneOffDay+' '+oneOffMonth+' ? '+oneOffYear;				
								
							}
							
							Ext.getCmp('idCronBuild').setValue(cronCommand);
							Ext.getCmp('idCommand').setValue(Ext.getCmp('idCronBuild').getValue());
							//alert(Ext.getCmp('idCommand').getValue());
							//////////////////////////////////////////////
							
						}	
							
					},			
/*
Field Name	 	Allowed Values	 	Allowed Special Characters
Seconds	  		0-59	  			, - * /
Minutes	  		0-59	  			, - * /
Hours	  		0-23	  			, - * /
Day-of-month	1-31	  			, - * ? / L W
Month	  		1-12 or JAN-DEC	  	, - * /
Day-of-Week	  	1-7 or SUN-SAT	  	, - * ? / L #
Year (Optional)	empty, 1970-2199	, - * /

"0 15 10 ? * *"	  	Fire at 10:15am every day

*/
					{						
						itemId: 'idSaveCronBtn',
						text: 'Save',
						xtype: 'button',
						iconCls: 'icon-save',
						disabled: false,
						scope: this,
						handler: function()						
						{
							var selection = Ext.getCmp('idSchedulerGrid').getView().getSelectionModel().getSelection()[0];
							if (selection) 
							{		
								Ext.Array.each(selection, function(record, index, selectedSelf) 
								{	
									// Get the value that was selected in the add text grid.
									//alert('Run'+selection.get('id')+' > '+selection.get('command'));
									//alert(Ext.getCmp('idCommand').getValue());
									record.set('command', Ext.getCmp('idCommand').getValue());
								});
							}
						}
					},
					{
						id:'idCronOption',
						xtype: 'textfield',											
						hidden:true,
						readOnly:true
					},
					{
						id:'idCronBuild',
						xtype: 'textfield',											
						hidden:true,
						readOnly:true
					},
					
				]
			}
		],		
        
    });	

	//////////////////////////////////////////////////////////////////////////////////
	//http://www.mysamplecode.com/2012/05/extjs-card-layout-grid-example3.html
	//http://www.robertplank.com/cron/
	//http://jaspreetchahal.org/get-put-post-delete-requests-with-extjs-and-jquery-ajax/
	//http://www.openjs.com/scripts/jslibrary/demos/crontab.php
	//http://regexlib.com/Contributors.aspx
	//http://docs.sencha.com/ext-js/4-0/#!/example/writer/writer.html
	//http://www.robertplank.com/cron/
	//http://www.sencha.com/forum/showthread.php?140701-ExtJs4-Checkbox-List-Combo
});