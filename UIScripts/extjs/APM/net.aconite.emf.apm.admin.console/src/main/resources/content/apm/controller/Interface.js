var varInterfaceCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.Interface',
{
    extend	: 'Ext.app.Controller',

	id		: 'idInterfaceController',

	stores	: ['EncryptionZone','Institution','InterfaceType', 'Interface'],

	models	: ['EncryptionZone','Institution','InterfaceType', 'Interface'],

	views	:
	[
        'interface.List',
		'interface.Edit',
    ],

	refs:
	[
        {ref: 'interfaceList'		, selector: 'interfacelist'},
		{ref: 'interfaceEdit'		, selector: 'interfaceedit'},
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
			'interfacelist':
			{
				beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },
			//---------Start : Toolbar Actions---------------
			'interfacelist > toolbar button[action=add]':
			{
                click: this.toolbarAdd
            },
			'interfacelist > toolbar button[action=sync]':
			{
                click: this.toolbarSync
            },
			'interfacelist > toolbar button[action=edit]':
			{
                click: this.toolbarEdit
            },
			'interfacelist > toolbar button[action=delete]':
			{
                click: this.toolbarDelete
            },
			'interfacelist > toolbar button[action=run]':
			{
                click: this.toolbarRun
            },
			//---------Start : Column Actions---------------
			'interfacelist actioncolumn ':
			{
                itemclick : this.handleActionColumn
            },
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////
            'interfaceedit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'interfaceedit > toolbar button[action=create]':
            {
                click: this.editpanelCreate
            },
            'interfaceedit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'interfaceedit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'interfaceedit > toolbar button[action=close]':
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
        this.getInstitutionStore().load();
        this.getInterfaceTypeStore().load();
        this.getInterfaceStore().load();

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
		//Ext.ComponentQuery.query("interfacelist > toolbar")[0].hide();
		//Ext.ComponentQuery.query("interfacelist actioncolumn")[0].hide();

	},
	//------------------------------------------
	rowSelected: function(model, records)
	{
		if (records[0])
		{
			this.setActiveRecord(records[0] || null);
			//this.getInterfaceList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);
			//this.getInterfaceEdit().show();
			//this.getInterfaceEdit().loadRecord(records[0]);


			console.log('rowSelected ');
			Ext.ComponentQuery.query("interfacelist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("interfacelist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("interfacelist > toolbar button[action=run]")[0].enable();
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
        Ext.ComponentQuery.query("interfaceedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("interfaceedit > toolbar button[action=create]")[0].show();

        this.getInterfaceList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);

		$( "#divInterfaceEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});
		this.getInterfaceEdit().show();

    },
	toolbarSync: function()
	{
		console.log('Clicked toolbarSync');
        store = this.getInterfaceStore();
		store.sync();
    },
	toolbarEdit: function()
	{
		console.log('Clicked toolbarEdit');
    },
	toolbarDelete: function()
	{
		var selection = this.getInterfaceList().getView().getSelectionModel().getSelection()[0];
		if (selection)
		{
			console.log('Clicked toolbarDelete '+selection.get('id'));
			store = this.getInterfaceStore();
			editor=this.getInterfaceEdit();

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
		this.getInterfaceList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getInterfaceStore();
		editor=this.getInterfaceEdit();
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

			 Ext.ComponentQuery.query("interfaceedit > toolbar button[action=save]")[0].show();
             Ext.ComponentQuery.query("interfaceedit > toolbar button[action=create]")[0].hide();

			$( "#divInterfaceEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});
			this.getInterfaceEdit().show();
			this.getInterfaceEdit().loadRecord(record);

		}

    },
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreate: function()
    	{
    		console.log('Clicked editpanelCreate....');
            var form = this.getInterfaceEdit().getForm();
            var selmodel=this.getInterfaceList().getView().getSelectionModel();
            store = this.getInterfaceStore();
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
    			$("#divInterfaceEdit").dialog('close');
    			this.getInterfaceEdit().hide();

            }

        },

    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getInterfaceEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getInterfaceEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getInterfaceList().getView().getSelectionModel().getSelection()[0];

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
    			$("#divInterfaceEdit").dialog('close');
    			this.getInterfaceEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getInterfaceEdit().getForm().setActiveRecord(null);
            this.getInterfaceEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getInterfaceEdit().getForm();
    		form.reset();
    		var sb = this.getInterfaceEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divInterfaceEdit").dialog('close');
    		this.getInterfaceEdit().hide();
        },


    	/////////////////End: Edit Panel Actions /////////////////////////////////

    	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getInterfaceEdit().activeRecord = record;
            if (record)
    		{
                //('interfaceedit >  #idBtnSave').enable();
    			this.getInterfaceEdit().down('#idBtnSave').enable();
                this.getInterfaceEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('interfaceedit >  #idBtnSave').disable();
    			this.getInterfaceEdit().down('#idBtnSave').disable();
                this.getInterfaceEdit().getForm().reset();
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