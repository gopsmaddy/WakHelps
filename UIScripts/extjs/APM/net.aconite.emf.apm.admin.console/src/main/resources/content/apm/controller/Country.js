var varCountryCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.Country',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idCountryController',
	
	stores	: ['Country'],
	
	models	: ['Country'],
	
	views	: 
	[
        'country.List',
		'country.Edit',	
    ],
	
	refs: 
	[
        {ref: 'countryList'		, selector: 'countrylist'},			
		{ref: 'countryEdit'		, selector: 'countryedit'},		
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
			'countrylist': 
			{
				beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },			
			//---------Start : Toolbar Actions---------------
			'countrylist > toolbar button[action=add]': 
			{
                click: this.toolbarAdd
            },
			'countrylist > toolbar button[action=sync]': 
			{
                click: this.toolbarSync
            },
			'countrylist > toolbar button[action=edit]': 
			{
                click: this.toolbarEdit
            },
			'countrylist > toolbar button[action=delete]': 
			{
                click: this.toolbarDelete
            },
			'countrylist > toolbar button[action=run]': 
			{
                click: this.toolbarRun
            },			
			//---------Start : Column Actions---------------	
			'countrylist actioncolumn ': 
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////			
            'countryedit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'countryedit > toolbar button[action=create]':
            {
                 click: this.editpanelCreate
             },
            'countryedit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'countryedit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'countryedit > toolbar button[action=close]':
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

        this.getCountryStore().load();

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
		Ext.ComponentQuery.query("countrylist > toolbar")[0].hide();
		//Ext.ComponentQuery.query("countrylist actioncolumn")[0].hide();
		
	},
	//------------------------------------------
	rowSelected: function(model, records) 
	{
		if (records[0]) 
		{
			this.setActiveRecord(records[0] || null);
			//this.getCountryList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);	
			//this.getCountryEdit().show();
			//this.getCountryEdit().loadRecord(records[0]);
			
			
			console.log('rowSelected ');
			Ext.ComponentQuery.query("countrylist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("countrylist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("countrylist > toolbar button[action=run]")[0].enable();				
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
		Ext.ComponentQuery.query("countryedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("countryedit > toolbar button[action=create]")[0].show();

        this.getCountryList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);

		var record = selmodel.getSelection()[0];
		$( "#divCountryEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});				
		this.getCountryEdit().show();

    },	
	toolbarSync: function() 
	{
		console.log('Clicked toolbarSync');		
        store = this.getCountryStore(); 
		store.sync();
    },
	toolbarEdit: function() 
	{	
		console.log('Clicked toolbarEdit');		
    },
	toolbarDelete: function() 
	{			
		var selection = this.getCountryList().getView().getSelectionModel().getSelection()[0];
		if (selection) 
		{					
			console.log('Clicked toolbarDelete '+selection.get('id'));	
			store = this.getCountryStore(); 
			editor=this.getCountryEdit();	
			
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
		this.getCountryList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getCountryStore(); 	
		editor=this.getCountryEdit();	
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
							
		//	console.log('Clicked actioncolumnEdit '+ record.get('id'));
			Ext.ComponentQuery.query("countryedit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("countryedit > toolbar button[action=create]")[0].hide();

			$( "#divCountryEdit" ).dialog(
				{
					open: function() { $(".ui-dialog-titlebar-close").hide(); },

					height: varEditPanelHeight,
					width : varEditPanelWidth,
					modal : varEditPanelStatus
				});			
			this.getCountryEdit().show();
			this.getCountryEdit().loadRecord(record);	
			
		}
		
    },	
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
    /////////////////Start: Edit Panel Actions /////////////////////////////////
    editpanelCreate: function()
    	{
    		console.log('Clicked editpanelCreate....');
            var form = this.getCountryEdit().getForm();
            var selmodel=this.getCountryList().getView().getSelectionModel();
    		store = this.getCountryStore();
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
    			$("#divgetCountryEdit").dialog('close');
    			this.getCountryEdit().hide();

            }

        },

    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getCountryEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getCountryEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getCountryList().getView().getSelectionModel().getSelection()[0];

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
    			$("#divCountryEdit").dialog('close');
    			this.getCountryEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getCountryEdit().getForm().setActiveRecord(null);
            this.getCountryEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getCountryEdit().getForm();
    		form.reset();
    		var sb = this.getCountryEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divCountryEdit").dialog('close');
    		this.getCountryEdit().hide();
        },


    	/////////////////End: Edit Panel Actions /////////////////////////////////

    	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getCountryEdit().activeRecord = record;
            if (record)
    		{
                //('countryedit >  #idBtnSave').enable();
    			this.getCountryEdit().down('#idBtnSave').enable();
                this.getCountryEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('countryedit >  #idBtnSave').disable();
    			this.getCountryEdit().down('#idBtnSave').disable();
                this.getCountryEdit().getForm().reset();
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