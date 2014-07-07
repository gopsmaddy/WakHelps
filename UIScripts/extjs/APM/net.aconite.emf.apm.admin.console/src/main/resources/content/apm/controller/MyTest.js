var varMyTestCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.MyTest',
{
    extend	: 'Ext.app.Controller',

	id		: 'idMyTestController',

	stores	: ['TestCountry','MyTest'],

	models	: ['TestCountry','MyTest'],

	views	:
	[
        'mytest.Search',
		'mytest.List',
		'mytest.Edit',
    ],

	refs:
	[
        {ref: 'myTestSearch'	, selector: 'mytestsearch'},
		{ref: 'myTestList'		, selector: 'mytestlist'},
		{ref: 'myTestEdit'		, selector: 'mytestedit'},
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
			'mytestlist':
			{
                beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },
			//---------Start : Toolbar Actions---------------
			'mytestlist > toolbar button[action=add]':
			{
                click: this.toolbarAdd
            },
			'mytestlist > toolbar button[action=sync]':
			{
                click: this.toolbarSync
            },
			'mytestlist > toolbar button[action=edit]':
			{
                click: this.toolbarEdit
            },
			'mytestlist > toolbar button[action=delete]':
			{
                click: this.toolbarDelete
            },
			'mytestlist > toolbar button[action=run]':
			{
                click: this.toolbarRun
            },
			//---------Start : Column Actions---------------
			'mytestlist actioncolumn ':
			{
                itemclick : this.handleActionColumn
            },
			/////////////////End: Grid Panel Actions ///////////////////////////////////
		   /////////////////Start: Edit Panel Actions /////////////////////////////////
		   /*
            'mytestedit > toolbar button[action=save]':
            {
                   click: this.editpanelSave
               },
            'mytestedit > toolbar button[action=reset]':
            {
                   click: this.editpanelReset
               },
            'mytestedit > toolbar button[action=clear]':
            {
                   click: this.editpanelClear
               },
            'mytestedit > toolbar button[action=close]':
            {
                   click: this.editpanelClose
               },
			*/
            /////////////////End: EditPanel Actions /////////////////////////////////
            /*
            /////////////////Start: Search Panel Actions /////////////////////////////////
            'tokenproductssearch > toolbar button[action=submit]':
            {
                 click: this.searchpanelSubmit
            },
            'tokenproductssearch > toolbar button[action=search]':
            {
                 click: this.searchpanelSearch
            },
            'tokenproductssearch > toolbar button[action=reset]':
            {
                click: this.searchpanelReset
            },
            'tokenproductssearch  > toolbar button[action=clear]':
            {
                click: this.searchpanelClear
            },
            //========================
           'tokenproductssearch #idSInstitution':
           {
               select: this.onInstitutionComboSelect
           },
           'tokenproductssearch #idSIssuer':
           {
               select: this.onIssuerComboSelect
           },
            /////////////////End: Search Panel Actions /////////////////////////////////
            */
        });

    },
	//###################################################################################
	/////////////////// Implementing Action Functions ///////////////////////////////////
    onComboSelect: function()
    {
        console.log('onComboSelect.... ');
    },
	onLaunch: function()
    {
        console.log('onLaunch.... ');

        //this.getCountryStore().getProxy().extraParams={limit:300};
        //if(!this.getCountryStore().loaded)
            //this.getCountryStore().load();
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
			//this.setActiveRecord(records[0] || null);
			//this.getMyTestList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);
			//this.getMyTestEdit().show();
			this.getMyTestEdit().loadRecord(records[0]);

			console.log('rowSelected ');
			Ext.ComponentQuery.query("mytestlist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("mytestlist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("mytestlist > toolbar button[action=run]")[0].enable();
			
			this.getMyTestStore().load({params:{eyeColor:'brown' }});		
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
        // empty record
		store = this.getMyTestStore();
		model = this.getMyTestModel();

		// Create a model instance
		var defaultRecord = Ext.create(model,
		{
			seconds: '1',
			status: true,
		});
		varMyTestCellEditing.cancelEdit();
        store.insert(0, defaultRecord);

		//store.insert(0, new model);
		//rowEditing.startEdit(0, 0);
		//cellEditing.startEdit(0, 3);
		//this.getMyTestTaskLookup().forceSelection=false;
		selmodel=this.getMyTestList().getView().getSelectionModel();
		selmodel.select(0,false);
		var record = selmodel.getSelection()[0];
		$( "#divMyTestEdit" ).dialog(
			{
				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});
		this.getMyTestEdit().show();
		this.getMyTestEdit().loadRecord(record);

    },
	toolbarSync: function()
	{
		console.log('Clicked toolbarSync');
        store = this.getMyTestStore();
		store.sync();
    },
	toolbarEdit: function()
	{
		console.log('Clicked toolbarEdit');
    },
	toolbarDelete: function()
	{
		var selection = this.getMyTestList().getView().getSelectionModel().getSelection()[0];
		if (selection)
		{
			console.log('Clicked toolbarDelete '+selection.get('id'));
			store = this.getMyTestStore();
			editor=this.getMyTestEdit();
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
		var selection = this.getMyTestList().getView().getSelectionModel().getSelection()[0];
		if (selection)
		{
			console.log('Clicked toolbarRun '+selection.get('id'));

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
								url: urlMyTestRun,
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
    },
	//-----------------end: Toolbar Actions--------------------
	//-----------------start: actioncolumn Actions-------------
	handleActionColumn : function(column, action, grid, rowIndex, colIndex, record, node)
	{
        console.log(action);
		this.getMyTestList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getMyTestStore();
		editor=this.getMyTestEdit();

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
								url: urlMyTestRun,
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
		if(action=='edit')
		{

			console.log('Clicked actioncolumnEdit '+ record.get('id'));
			$( "#divMyTestEdit" ).dialog(
				{
					height: varEditPanelHeight,
					width : varEditPanelWidth,
					modal : varEditPanelStatus
				});
			this.getMyTestEdit().show();
			this.getMyTestEdit().loadRecord(record);
			/*this.getMyTestEdit().getForm().loadRecord(
					{
	                    url: 'http://localhost:8080/testgui/data/xml-form-data.xml',
	                    waitMsg: 'Loading...'
	                });			*/

		}

    },
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	/*
    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getMyTestEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getMyTestEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getMyTestList().getView().getSelectionModel().getSelection()[0];

    			Ext.Msg.confirm
    			(
    				'Form Values',
    				s,
    				function (btn)
    				{
    					if (btn == 'yes')
    					{
    						if (selection)
    						{
    							console.log('form.updateRecord.... ');
    							form.updateRecord(selection);
    						}
    					}
    					else
    					{
    					}
    				}
    			);
    			$("#divMyTestEdit").dialog('close');
    			this.getMyTestEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getMyTestEdit().getForm().setActiveRecord(null);
            this.getMyTestEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getMyTestEdit().getForm();
    		form.reset();
    		var sb = this.getMyTestEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divMyTestEdit").dialog('close');
    		this.getMyTestEdit().hide();
        },


    	/////////////////End: Edit Panel Actions /////////////////////////////////
    	/////////////////Start: Search Panel Actions /////////////////////////////////
        	searchpanelSubmit: function()
        	{
        		console.log('Clicked searchpanelClearSubmit....');

        	},
        	searchpanelSearch: function()
        	{
        		console.log('Clicked searchpanelSearch....');

        		 this.getEncryptionZoneStore().getProxy().extraParams={limit:1000};
                 this.getEncryptionZoneStore().load();


        		var fp = this.getTokenProductsSearch();
        		var store = this.getTokenProductsStore();
        		if(fp.getForm().isValid())
        		{
        			this.loadData(fp,store);
        			this.getTokenProductsList().show();
        		}


        	},
        	searchpanelReset: function()
        	{
        		console.log('Clicked searchpanelReset....');
        		var fp = this.getTokenProductsSearch();
        		var store = this.getTokenProductsStore();
        		//this.getIssuerSearch().getForm().setActiveRecord(null);
        		fp.getForm().reset();
        		//this.loadData(fp,store);
        		this.getTokenProductsList().hide();
        		this.getTokenAppProfilesList().hide();
        		this.getBINRangeList().hide();
        		Ext.ComponentQuery.query("#idSIssuer")[0].disable();
        		Ext.ComponentQuery.query("#idSTokenProductGroups")[0].disable();
        	},

        	searchpanelClear: function()
        	{
        		console.log('Clicked searchpanelClear....');
        		var form = this.getTokenProductsSearch().getForm();
        		form.reset();
        		var sb = this.getTokenProductsSearch().getStatusbar();
        		// once completed
        		sb.clearStatus();
        	},

        	//=================================
            onInstitutionComboSelect: function(combo, records,eOpts )
            {
                 console.log('onInstitutionComboSelect.... '+records[0].get('id'));
                 this.getIssuerStore().getProxy().extraParams={limit:1000,institutionId: records[0].get('id')};
                 this.getIssuerStore().load();
                 Ext.ComponentQuery.query("#idSIssuer")[0].enable();
            },
            onIssuerComboSelect: function(combo, records,eOpts )
            {
                console.log('onIssuerComboSelect.... '+records[0].get('id'));
                this.getTokenProductGroupsStore().getProxy().extraParams={limit:1000,issuerId: records[0].get('id')};
                this.getTokenProductGroupsStore().load();
                Ext.ComponentQuery.query("#idSTokenProductGroups")[0].enable();
            },

                	/////////////////End: Edit Panel Actions /////////////////////////////////

    	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getMyTestEdit().activeRecord = record;
            if (record)
    		{
                //('mytestedit >  #idBtnSave').enable();
    			this.getMyTestEdit().down('#idBtnSave').enable();
                this.getMyTestEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('mytestedit >  #idBtnSave').disable();
    			this.getMyTestEdit().down('#idBtnSave').disable();
                this.getMyTestEdit().getForm().reset();
            }
        },

        loadData: function(formpanel,store)
        {
            formpanel.getEl().mask();

            //getForm() retrieves the Ext.basic.Form (from Ext.panel.Form)
            var params = formpanel.getForm().getValues();
            //Write over
            store.getProxy().extraParams = params;
            //load
            store.load();

            formpanel.getEl().unmask();

        },
    	//###################################################################################


*/
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