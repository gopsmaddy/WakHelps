var varPersoBureauCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.PersoBureau',
{
    extend	: 'Ext.app.Controller',

	id		: 'idPersoBureauController',

	stores	: ['EncryptionZone','PersoBureau'],

	models	: ['EncryptionZone','PersoBureau'],

	views	:
	[
        'persoBureau.List',
		'persoBureau.Edit',
    ],

	refs:
	[
        {ref: 'persoBureauList'		, selector: 'persoBureaulist'},
		{ref: 'persoBureauEdit'		, selector: 'persoBureauedit'},
    ],

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
			'persoBureaulist':
			{
				beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },
			//---------Start : Toolbar Actions---------------
			'persoBureaulist > toolbar button[action=add]':
			{
                click: this.toolbarAdd
            },
			'persoBureaulist > toolbar button[action=sync]':
			{
                click: this.toolbarSync
            },
			'persoBureaulist > toolbar button[action=edit]':
			{
                click: this.toolbarEdit
            },
			'persoBureaulist > toolbar button[action=delete]':
			{
                click: this.toolbarDelete
            },
			'persoBureaulist > toolbar button[action=run]':
			{
                click: this.toolbarRun
            },
			//---------Start : Column Actions---------------
			'persoBureaulist actioncolumn ':
			{
                itemclick : this.handleActionColumn
            },
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////
            'persoBureauedit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'persoBureauedit > toolbar button[action=create]':
            {
                click: this.editpanelCreate
            },
            'persoBureauedit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'persoBureauedit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'persoBureauedit > toolbar button[action=close]':
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

        this.getEncryptionZoneStore().load();
        this.getPersoBureauStore().load();

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
		//Ext.ComponentQuery.query("persoBureaulist > toolbar")[0].hide();
		//Ext.ComponentQuery.query("persoBureaulist actioncolumn")[0].hide();

	},
	//------------------------------------------
	rowSelected: function(model, records)
	{
		if (records[0])
		{
			this.setActiveRecord(records[0] || null);
			//this.getPersoBureauList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);
			//this.getPersoBureauEdit().show();
			//this.getPersoBureauEdit().loadRecord(records[0]);


			console.log('rowSelected ');
			Ext.ComponentQuery.query("persoBureaulist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("persoBureaulist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("persoBureaulist > toolbar button[action=run]")[0].enable();
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
        Ext.ComponentQuery.query("persoBureauedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("persoBureauedit > toolbar button[action=create]")[0].show();

        this.getPersoBureauList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);

		$( "#divPersoBureauEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});
		this.getPersoBureauEdit().show();

    },
	toolbarSync: function()
	{
		console.log('Clicked toolbarSync');
        store = this.getPersoBureauStore();
		store.sync();
    },
	toolbarEdit: function()
	{
		console.log('Clicked toolbarEdit');
    },
	toolbarDelete: function()
	{
		var selection = this.getPersoBureauList().getView().getSelectionModel().getSelection()[0];
		if (selection)
		{
			console.log('Clicked toolbarDelete '+selection.get('id'));
			store = this.getPersoBureauStore();
			editor=this.getPersoBureauEdit();

			Ext.Msg.confirm
			(
				'Confirm',
				'Are you sure you want to delete '+selection.get('name')+'?',
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
	//-----------------end: Toolbar Actions--------------------
	//-----------------start: actioncolumn Actions-------------
	handleActionColumn : function(column, action, grid, rowIndex, colIndex, record, node)
	{
        console.log(action);
		this.getPersoBureauList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getPersoBureauStore();
		editor=this.getPersoBureauEdit();
		if(action=='delete')
		{
			console.log('Clicked actioncolumnDelete '+ record.get('id'));
			Ext.Msg.confirm
			(
				'Confirm',
				'Are you sure you want to delete '+record.get('name')+'?',
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

		if(action=='edit')
		{

			console.log('Clicked actioncolumnEdit '+ record.get('id'));

			 Ext.ComponentQuery.query("persoBureauedit > toolbar button[action=save]")[0].show();
             Ext.ComponentQuery.query("persoBureauedit > toolbar button[action=create]")[0].hide();

			$( "#divPersoBureauEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});
			this.getPersoBureauEdit().show();
			this.getPersoBureauEdit().loadRecord(record);

		}

    },
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreate: function()
    	{
    		console.log('Clicked editpanelCreate....');
            var form = this.getPersoBureauEdit().getForm();
            var selmodel=this.getPersoBureauList().getView().getSelectionModel();
            store = this.getPersoBureauStore();
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
    						
    						console.log('store.insert... ');
    						store.insert(0, form.getValues());
    						selmodel.select(0,false);
    						store.load();

    					}
    					else
    					{
    					}
    				}
    			);
    			$("#divPersoBureauEdit").dialog('close');
    			this.getPersoBureauEdit().hide();

            }

        },

    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getPersoBureauEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getPersoBureauEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getPersoBureauList().getView().getSelectionModel().getSelection()[0];

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
    			$("#divPersoBureauEdit").dialog('close');
    			this.getPersoBureauEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getPersoBureauEdit().getForm().setActiveRecord(null);
            this.getPersoBureauEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getPersoBureauEdit().getForm();
    		form.reset();
    		var sb = this.getPersoBureauEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divPersoBureauEdit").dialog('close');
    		this.getPersoBureauEdit().hide();
        },


    	/////////////////End: Edit Panel Actions /////////////////////////////////

    	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getPersoBureauEdit().activeRecord = record;
            if (record)
    		{
                //('persoBureauedit >  #idBtnSave').enable();
    			this.getPersoBureauEdit().down('#idBtnSave').enable();
                this.getPersoBureauEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('persoBureauedit >  #idBtnSave').disable();
    			this.getPersoBureauEdit().down('#idBtnSave').disable();
                this.getPersoBureauEdit().getForm().reset();
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