var varSchedulerCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.Scheduler',
{
    extend	: 'Ext.app.Controller',

	id		: 'idSchedulerController',

	stores	: ['SchedulerType','Scheduler','Issuer'],

	models	: ['SchedulerType','Scheduler','Issuer'],

	views	:
	[
        'scheduler.List',
		'scheduler.Edit',
    ],

	refs:
	[
        {ref: 'schedulerList'		, selector: 'schedulerlist'},
		{ref: 'schedulerEdit'		, selector: 'scheduleredit'},
    ],

	/*
	refs: [
        {ref: 'feedList'	, selector: 'feedlist'},
        {ref: 'feedData'	, selector: 'feedlist dataview'},
        {ref: 'feedShow'	, selector: 'feedshow'},
        {ref: 'feedForm'	, selector: 'feedwindow form'},
        {ref: 'feedCombo'	, selector: 'feedwindow combobox'},
        {ref: 'articleGrid'	, selector: 'articlegrid'},
        {ref: 'feedWindow'	, selector: 'feedwindow'	, autoCreate: true	, xtype: 'feedwindow'}
    ],

    requires: ['FV.lib.FeedValidator'],
	*/
	//###################################################################################
	/////////////////// Initializing Controller /////////////////////////////////////////

    init: function()
	{
        this.control(
		{
            //'viewport > panel':
			//{
            //    render: this.onPanelRendered
            //},
			/////////////////Start Grid Panel Actions ///////////////////////////////////
			//---------Start : Grid Actions---------------
			'schedulerlist':
			{
                beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },
			//---------Start : Toolbar Actions---------------
			'schedulerlist > toolbar button[action=add]':
			{
                click: this.toolbarAdd
            },
			'schedulerlist > toolbar button[action=sync]':
			{
                click: this.toolbarSync
            },
			'schedulerlist > toolbar button[action=edit]':
			{
                click: this.toolbarEdit
            },
			'schedulerlist > toolbar button[action=delete]':
			{
                click: this.toolbarDelete
            },
			'schedulerlist > toolbar button[action=run]':
			{
                click: this.toolbarRun
            },
			//---------Start : Column Actions---------------
			'schedulerlist actioncolumn ':
			{
                itemclick : this.handleActionColumn
            },
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////
			'scheduleredit > toolbar button[action=save]':
			{
                click: this.editpanelSave
            },
            'scheduleredit > toolbar button[action=create]':
            {
                click: this.editpanelCreate
            },
			'scheduleredit > toolbar button[action=reset]':
			{
                click: this.editpanelReset
            },
			'scheduleredit > toolbar button[action=clear]':
			{
                click: this.editpanelClear
            },
			'scheduleredit > toolbar button[action=close]':
			{
                click: this.editpanelClose
            },

			/////////////////End: EditPanel Actions /////////////////////////////////
        });

    },
	//###################################################################################
	/////////////////// Implementing Action Functions ///////////////////////////////////

	onLaunch: function()
    {
        console.log('onLaunch.... ');

         this.getSchedulerStore().load();
         this.getIssuerStore().getProxy().extraParams={limit:1000};
         this.getIssuerStore().load();

    },

	/*
	onLaunch: function()
	{
        var dataview = this.getFeedData(),
            store = this.getFeedsStore();
        dataview.bindStore(store);
        dataview.getSelectionModel().select(store.getAt(0));
    },
	*/

    onPanelRendered: function()
	{
        console.log('The panel was rendered '+new Date().getTime());
    },
	/////////////////Start Grid Panel Actions ///////////////////////////////////
	//---------start : Grid Actions---------------
	// please use this section to setup the application panel features //

	beforeGridRender: function()
	{
		console.log('beforeGridRender ');
		//Ext.ComponentQuery.query("countrylist > toolbar")[0].hide();
		//Ext.ComponentQuery.query("countrylist actioncolumn")[0].hide();

	},
	//------------------------------------------
	rowSelected: function(model, records)
	{
		if (records[0])
		{
			this.setActiveRecord(records[0] || null);
			//this.getSchedulerList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);
			//this.getSchedulerEdit().show();
			//this.getSchedulerEdit().loadRecord(records[0]);


			console.log('rowSelected ');
			Ext.ComponentQuery.query("schedulerlist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("schedulerlist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("schedulerlist > toolbar button[action=run]")[0].enable();
		}
	},
	rowDblclicked: function(dv, record, item, index, e)
	{
		console.log('rowDblclicked ');
		/*
		$( "#dialog-modal" ).dialog(
		{
			height: 600,
			width: 600,
			//modal: true
		});
		*/
	},
	//---------end : Grid Actions-----------------------
	//---------start: Toolbar Actions-------------------
	toolbarAdd: function()
	{
		console.log('Clicked toolbarAdd');
		Ext.ComponentQuery.query("scheduleredit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("scheduleredit > toolbar button[action=create]")[0].show();
        Ext.ComponentQuery.query("scheduleredit > toolbar button[action=create]")[0].disable();

        this.getSchedulerList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);

		$( "#divSchedulerEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});
		this.getSchedulerEdit().show();

    },
	toolbarSync: function()
	{
		console.log('Clicked toolbarSync');
        store = this.getSchedulerStore();
		store.sync();
    },
	toolbarEdit: function()
	{
		console.log('Clicked toolbarEdit');
    },
	toolbarDelete: function()
	{
		var selection = this.getSchedulerList().getView().getSelectionModel().getSelection()[0];
		if (selection)
		{
			console.log('Clicked toolbarDelete '+selection.get('id'));
			store = this.getSchedulerStore();
			editor=this.getSchedulerEdit();
			Ext.Msg.confirm
			(
				'Confirm',
				'Are you sure you want to delete '+selection.get('name')+' task?',
				function (btn)
				{
					if (btn == 'yes')
					{
						store.remove(selection);
						editor.hide();
					}
				}
			);

		}
    },
	toolbarRun: function()
	{
		var selection = this.getSchedulerList().getView().getSelectionModel().getSelection()[0];
		if (selection)
		{
			console.log('Clicked toolbarRun '+selection.get('id'));

			Ext.Msg.confirm
			(
				'Confirm',
				'Are you sure you want to run '+selection.get('name')+' task now?',
				function (btn)
				{
					if (btn == 'yes')
					{
                        //Ext.getBody().mask('Triggering the scheduler task...');
                        Ext.Ajax.request(
                        {
                            url: urlSchedulerRun,
                            method: 'GET',
                            params: {taskId:selection.get('id')},
                            success: function(response, options)
                            {
                               var serverResponse = response.responseText;
                               console.log(serverResponse);

                              /*console.log("response:"+response);
                               console.log("options:"+options);
                               Ext.Msg.alert(operation.action, operation.resultSet.message); */
                            },
                            failure: function(response, options)
                            {
                               var serverResponse = response.responseText;
                               console.log(serverResponse);
                               /*
                               console.log("response:"+response);
                               console.log("options:"+options);
                               Ext.MessageBox.show(
                               {
                                   title: 'Task Execution Error',
                                   msg: operation.getError(),
                                   icon: Ext.MessageBox.ERROR,
                                   buttons: Ext.Msg.OK
                               });*/
                            }


                        });
					}
				}
			);
		}
    },
	//-----------------end: Toolbar Actions--------------------
	//-----------------start: actioncolumn Actions-------------
	handleActionColumn : function(column, action, grid, rowIndex, colIndex, record, node)
	{
        console.log(action);
		this.getSchedulerList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getSchedulerStore();
		editor=this.getSchedulerEdit();

		if(action=='delete')
		{
			console.log('Clicked actioncolumnDelete '+ record.get('id'));
			Ext.Msg.confirm
			(
				'Confirm',
				'Are you sure you want to delete '+record.get('name')+' task?',
				function (btn)
				{
					if (btn == 'yes')
					{
						store.remove(record);
						editor.hide();
					}
				}
			);
		}

		if(action=='run')
		{
			console.log('Clicked actioncolumnRun '+ record.get('id'));
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
								method: 'GET',
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
		if(action=='edit')
		{

			console.log('Clicked actioncolumnEdit '+ record.get('id'));

			Ext.ComponentQuery.query("scheduleredit > toolbar button[action=save]")[0].enable();
			Ext.ComponentQuery.query("scheduleredit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("scheduleredit > toolbar button[action=create]")[0].hide();

			$( "#divSchedulerEdit" ).dialog(
				{
					open: function() { $(".ui-dialog-titlebar-close").hide();

                     //pinmailer value is 3
                //     console.log("THE VALUE IS AM LOOKING FOR: "+ Ext.ComponentQuery.query("#idName")[0].getValue());
					 if(Ext.ComponentQuery.query("#idName")[0].getValue()=='pinmailer')
					 {
                        // Ext.ComponentQuery.query("#idSameAsID")[0].hide();
                       Ext.ComponentQuery.query("#idIssuerid")[0].show();
                     }
                     else{
                     // console.log('going in the right direction' + Ext.ComponentQuery.query("#idName")[0].getValue=='pinmailer');
                    Ext.ComponentQuery.query("#idIssuerid")[0].hide();
                     }

					},

					height: varEditPanelHeight,
					width : varEditPanelWidth,
					modal : varEditPanelStatus
				});
			this.getSchedulerEdit().show();
			this.getSchedulerEdit().loadRecord(record);

		}

    },
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreate: function()
    {
        console.log('Clicked editpanelCreate....');
        var form = this.getSchedulerEdit().getForm();
        var selmodel=this.getSchedulerList().getView().getSelectionModel();
        store = this.getSchedulerStore();

        s = '';
        //if (form.isValid())
        {
            //Ext.iterate(form.getValues(), function(key, value)
            //{
            //	s += Ext.util.Format.format("{0} = {1}<br />", key, value);
            //}, this	);


            //Ext.Msg.confirm
            //(
            //	'Form Values',
            //	s,
            //	function (btn)
            //	{
            //		if (btn == 'yes')
            //		{

                        console.log('store.insert... ');
                        store.insert(0, form.getValues());
                        selmodel.select(0,false);
                        store.load();

            //		}
            //		else
            //		{
            //		}
            //	}
            //);
            $("#divSchedulerEdit").dialog('close');
            this.getSchedulerEdit().hide();

        }

    },
	editpanelSave: function()
	{
		console.log('Clicked editpanelSave....');
		var active = this.getSchedulerEdit().activeRecord;
		if (!active)
		{
			return;
		}
		var form = this.getSchedulerEdit().getForm();
		s = '';
		//if (form.isValid())
		{
			//Ext.iterate(form.getValues(), function(key, value)
			//{
			//	s += Ext.util.Format.format("{0} = {1}<br />", key, value);
			//}, this	);

			var selection = this.getSchedulerList().getView().getSelectionModel().getSelection()[0];

			//Ext.Msg.confirm
			//(
			//	'Form Values',
			//	s,
			//	function (btn)
			//	{
			//		if (btn == 'yes')
			//		{
						if (selection)
						{
							console.log('form.updateRecord.... ');
							form.updateRecord(selection);
							store.load();
						}
			//		}
			//		else
			//		{
			//		}
			//	}
			//);
			$("#divSchedulerEdit").dialog('close');
			this.getSchedulerEdit().hide();
		}
    },

	editpanelReset: function()
	{
		console.log('Clicked editpanelReset....');
		this.getSchedulerEdit().getForm().setActiveRecord(null);
        this.getSchedulerEdit().getForm().reset();
    },

	editpanelClear: function()
	{
		console.log('Clicked editpanelClear....');
		var form = this.getSchedulerEdit().getForm();
		form.reset();
		var sb = this.getSchedulerEdit().getStatusbar();
		// once completed
		sb.clearStatus();
    },

	editpanelClose: function()
	{
		console.log('Clicked editpanelClose....');
		$("#divSchedulerEdit").dialog('close');
		this.getSchedulerEdit().hide();
    },


	/////////////////End: Edit Panel Actions /////////////////////////////////

	//###################################################################################

	setActiveRecord: function(record)
	{
        this.getSchedulerEdit().activeRecord = record;
        if (record)
		{
            //('Scheduleredit >  #idBtnSave').enable();
			//this.getSchedulerEdit().down('#idBuildCronBtn').enable();
			//this.getSchedulerEdit().down('#idBtnSave').enable();
            this.getSchedulerEdit().getForm().loadRecord(record);
        }
		else
		{
            //('Scheduleredit >  #idBtnSave').disable();
			//this.getSchedulerEdit().down('#idBuildCronBtn').disable();
			//this.getSchedulerEdit().down('#idBtnSave').disable();
            this.getSchedulerEdit().getForm().reset();
        }
    },


	//###################################################################################


	/*
	editUser: function(grid, record)
	{
		console.log('Double clicked on ' + record.get('name'));

        //var view = Ext.widget('useredit');
        //view.down('form').loadRecord(record);
    },

	updateUser: function(button)
	{
        console.log('clicked the Save button');

		//var win    = button.up('window'),
        //form   = win.down('form'),
        //record = form.getRecord(),
        //values = form.getValues();

		//record.set(values);
		//win.close();

		//this.getUsersStore().sync();
    }
	*/
});