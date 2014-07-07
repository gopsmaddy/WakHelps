Ext.define('Apm.view.mytest.Edit', 
{
    extend: 'Ext.form.Panel',
	//extend: 'Ext.window.Window',
    alias : 'widget.mytestedit',
	
	requires: 
	[
			
		'Ext.ux.form.field.DateTime',
		'Apm.view.lookup.MyTest',
		
	],
	
    //title 	: 'Edit User',
    //layout	: 'fit',
    //autoShow: true,
	
						
	id		: 'idMyTestEdit',
	renderTo: 'divMyTestEdit',	
	title	: 'My Test Details',
	hidden	: true,
	defaults: 
	{
		anchor: '100%'
	},
	defaultType: 'textfield',
	listClass: 'x-column-header-text',
	items: 
	[
		{
			fieldLabel	: 'Task Id',
			name		: 'id',
			readOnly	: false,
			listeners	: 
			{
				change 	:function(Field,newValue,oldValue,eOpts)
				{
					Ext.getCmp('idBtnSave').enable();
				}
			}	
			
		},
		{
			id			: 'idName',
			fieldLabel	: 'Task Name',
			//xtype		: 'mytesttasklookup',
			name		: 'name',
			readOnly	: true,					
		},
		{
			id			: 'idCommand',
			fieldLabel	: 'Command',
			name		: 'command',
			hidden		: false						
		},
		{						
			id			: 'idBtnSave',
			text		: 'Save',
			xtype		: 'button',
			iconCls		: 'icon-save',
			disabled	: true,
			scope		: this,
			//action		: 'save',			
			handler		: function()						
			{
				var selection = Ext.getCmp('idMyTestList').getView().getSelectionModel().getSelection()[0];
				if (selection) 
				{		
					Ext.Array.each(selection, function(record, index, selectedSelf) 
					{	
						// Get the value that was selected in the add text grid.
						//alert('Run'+selection.get('id')+' > '+selection.get('command'));
						//alert(Ext.getCmp('idCommandSHD').getValue());
						record.set('command', Ext.getCmp('idCommand').getValue());						
					});
					$("#divMyTestEdit").dialog('close');
					Ext.getCmp('idMyTestEdit').hide();
				}
			}
			
		},
		////////////////////////
		{
			id		:'idCronOption',
			xtype	: 'textfield',											
			hidden	: true,
			readOnly: true
		},
		{
			id		: 'idGeneratedCronCommand',
			xtype	: 'textfield',											
			hidden	: true,
			readOnly: true
		},
		//////////////////
		{
			id:'idDailyCronSet',
			xtype:'fieldset',
			title: 'Daily Task',
			checkboxToggle:true,
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
							id:'idDailyCronSetStartDateTime',								
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
					id:'idDailyCronSetValue',
					xtype: 'radiogroup',
					//fieldLabel: 'Perform this Task',
					hidden:true,
					columns: 2,
					defaults: 
					{
						name: 'dailytask' //Each radio has the same name so the browser will make sure only one is checked at once
					},
					items: 
					[
						//{ boxLabel: 'Every Day'			, inputValue: '0'},
						{ boxLabel: 'Recur Every n Days', inputValue: '1',checked: true},
						//{ boxLabel: 'Every n Hours'		, inputValue: '2'},
						//{ boxLabel: 'Every n Minutes'	, inputValue: '3'},
						//{ boxLabel: 'Weekdays'			, inputValue: '4'},
						//{ boxLabel: 'Weekends'			, inputValue: '5'}
					],
					listeners: 
					{
						change :function(Field,newValue,oldValue,eOpts)
						{
							if (newValue.dailytask =='1' || newValue.dailytask =='2' || newValue.dailytask =='3') 
							{
									 //alert(newValue.dailytask);												 
									 Ext.getCmp('idDailyCronSetNValue').show();
							}
							else
							{
									Ext.getCmp('idDailyCronSetNValue').hide();
							}

						}
					}
					
				},							
				{
					id:'idDailyCronSetNValue',
					fieldLabel: 'Recur Every   Days',
					name: 'nvalue',								
					xtype: 'numberfield',		
					//fieldLabel: 'End',
					allowBlank: false,
					value:'1',
					minValue: 1,
					maxValue: 31,	
					//flex: 1
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
					//Ext.getCmp('idDailyCronSetNValue').hide();
					Ext.getCmp('idBuildCronBtn').setText('Build Cron for Daily Task');
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
			checkboxToggle:true,
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
							id:'idWeeklyCronSetStartDateTime',
							xtype: 'timefield',
							allowBlank: false,
							format: 'H:i'	
						}
					]
					
				},							
				{
					id:'idWeeklyCronSetNValue',
					fieldLabel: 'Recur Every   Week on',
					name: 'nvalue',								
					xtype: 'numberfield',		
					hidden:true,
					allowBlank: false,
					value:'1',
					minValue: 1,
					maxValue: 52,	
					//flex: 1
				},
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
						{boxLabel: 'Monday'		,inputValue:'1', checked: true },
						{boxLabel: 'Tuesday'	,inputValue:'2'},									
						{boxLabel: 'Wednesday'	,inputValue:'3'},
						{boxLabel: 'Thursday'	,inputValue:'4'},
						{boxLabel: 'Friday'		,inputValue:'5'},
						{boxLabel: 'Saturday'	,inputValue:'6'},
						{boxLabel: 'Sunday'		,inputValue:'0'}	
						
					]
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
					Ext.getCmp('idBuildCronBtn').setText('Build Cron for Weekly Task');
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
			checkboxToggle:true,
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
							id:'idMonthlyCronSetStartDateTime',
							xtype: 'timefield',
							allowBlank: false,
							format: 'H:i'	
						}
					]
					
				},
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
						{boxLabel: 'January'	,inputValue:'1', checked: true },
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
					Ext.getCmp('idBuildCronBtn').setText('Build Cron for Monthly Task');
					
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
			title: 'Only One time',		
			checkboxToggle:true,
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
					Ext.getCmp('idBuildCronBtn').setText('Build Cron for One off Task');
					
					Ext.getCmp('idCronOption').setValue('idOneoff');	
					Ext.getCmp('idDailyCronSet').collapse( );
					Ext.getCmp('idWeeklyCronSet').collapse( );	
					Ext.getCmp('idMonthlyCronSet').collapse( );								
					//alert('enable');
				}
			}					

		},
		{
			id:'idExtractData',
			xtype:'fieldset',
			title: 'Extract Data',											
			checkboxToggle:true,						
			collapsible : true,
			collapsed: true,
			defaultType: 'textfield',						
			defaults: {anchor: '100%'},
			layout: 'anchor',
			//layout: 'column',
			items: 
			[							
				{								
					xtype:'fieldset',
					columnWidth: 1,
					title: 'Data Offset (days)',
					//collapsible: true,
					border:'1',
					defaultType: 'textfield',
					defaults: {anchor: '100%', value:0},
					layout: 'column',
					items :
					[
						{
							xtype:'fieldset',
							columnWidth: 0.5,
							title: 'Start',
							//collapsible: true,
							border:'0',
							defaultType: 'textfield',
							defaults: {anchor: '100%'},
							layout: 'anchor',
							items :
							[
								{
									id:'idExtractDataStartOffsetValue',
									xtype: 'numberfield',										
									allowBlank: false,
									//fieldLabel: 'Start',
									emptyText :'Start',
									minValue: -100,
									maxValue: 0,
									//flex: 1	
									listeners: 
									{
										change: function(field, value) 
										{														
											var startValue=Ext.getCmp('idExtractDataStartOffsetValue').getValue();
											var endValue=Ext.getCmp('idExtractDataEndOffsetValue').getValue();
											
											var comment= 'Data from '+(startValue ? startValue : '0')+' day before the event to '+( endValue ? endValue : '0')+' days after the event';
											Ext.getCmp('idExtractDataLabel').setText(comment);
										}
									}
								}
							]
						},
						{
							xtype:'fieldset',
							columnWidth: 0.5,
							title: 'End',
							//collapsible: true,
							border:'0',
							defaultType: 'textfield',
							defaults: {anchor: '100%'},
							layout: 'anchor',
							items :
							[
								{
									id:'idExtractDataEndOffsetValue',
									xtype: 'numberfield',		
									//fieldLabel: 'End',
									allowBlank: false,
									emptyText :'End',
									minValue: -100,
									maxValue: 100,	
									//flex: 1
									// Add change handler to force user-entered numbers to evens
									listeners: 
									{
										change: function(field, value) 
										{														
											var startValue=Ext.getCmp('idExtractDataStartOffsetValue').getValue();
											var endValue=Ext.getCmp('idExtractDataEndOffsetValue').getValue();
											
											var comment= 'Data from '+(startValue ? startValue : '0')+' day before the event to '+( endValue ? endValue : '0')+' days after the event';
											Ext.getCmp('idExtractDataLabel').setText(comment);
										}
									}
								}
							]
						}
					]
				},
				{
					id: 'idExtractDataLabel',
					xtype: 'label',
					text: 'Data from 0 day before the event to 0 days after the event',
				}
				
			]						
		},
		{						
			id: 'idBuildCronBtn',
			text: 'Build Cron',
			xtype: 'button',
			iconCls: 'icon-save',
			disabled: false,
			scope: this,
			handler: function()						
			{
				///////////////////////////////////////////////////
				var startCron='0 0 22 ';
				var startHour=getHour(Ext.getCmp('idMonthlyCronSetStartDateTime').getValue());
				var startMinute=getMinute(Ext.getCmp('idMonthlyCronSetStartDateTime').getValue());
				
				if(Ext.getCmp('idMonthlyCronSetStartDateTime').getValue())
					startCron='0 '+startMinute+' '+startHour+' ';
				
				
				var taskId=Ext.getCmp('idCronOption').getValue();
				var cronCommand=startCron+'? * *' // Fire at 10:00:00pm every day
				
				if('idDaily' == taskId)
				{	
					var startHour=getHour(Ext.getCmp('idDailyCronSetStartDateTime').getValue());
					var startMinute=getMinute(Ext.getCmp('idDailyCronSetStartDateTime').getValue());
				
					if(Ext.getCmp('idDailyCronSetStartDateTime').getValue())
						startCron='0 '+startMinute+' '+startHour+' ';
					
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
					var startHour=getHour(Ext.getCmp('idWeeklyCronSetStartDateTime').getValue());
					var startMinute=getMinute(Ext.getCmp('idWeeklyCronSetStartDateTime').getValue());
				
					if(Ext.getCmp('idWeeklyCronSetStartDateTime').getValue())
						startCron='0 '+startMinute+' '+startHour+' ';
					
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
					else
						cronCommand=startCron+'? * 1';	
				}
				if('idMonthly' ==taskId)
				{
					var startHour=getHour(Ext.getCmp('idMonthlyCronSetStartDateTime').getValue());
					var startMinute=getMinute(Ext.getCmp('idMonthlyCronSetStartDateTime').getValue());
				
					if(Ext.getCmp('idMonthlyCronSetStartDateTime').getValue())
						startCron='0 '+startMinute+' '+startHour+' ';
					
					var searchType = Ext.ComponentQuery.query("#idMonthlyCronSet [name=monthlytask][checked=true]");
					var monthValue="";
					Ext.Array.each(searchType, function(record, index, selectedSelf) 
					{	
						if(index>0)
							monthValue=monthValue+',';
						
						monthValue=monthValue+searchType[index].getSubmitValue();
															
					});
					if(monthValue!='')
						cronCommand=startCron+'1 '+monthValue+' ?';	
					else
						cronCommand=startCron+'1 * ?';	
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
				
				Ext.getCmp('idGeneratedCronCommand').setValue(cronCommand);
				Ext.getCmp('idCommand').setValue(Ext.getCmp('idGeneratedCronCommand').getValue());
				//alert(Ext.getCmp('idCommandSHD').getValue());
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
	],
		
	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

