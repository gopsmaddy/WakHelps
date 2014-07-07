var varInstitutionCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});



Ext.define('Apm.controller.Institution',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idInstitutionController',
	
	stores	: ['AuthMethod','EncryptionZone','Institution'],
	
	models	: ['AuthMethod','EncryptionZone','Institution'],
	
	views	: 
	[
        'institution.List',
		'institution.Edit',	
    ],
	
	refs: 
	[
        {ref: 'institutionList'		, selector: 'institutionlist'},			
		{ref: 'institutionEdit'		, selector: 'institutionedit'},		
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
			'institutionlist': 
			{
				beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },			
			//---------Start : Toolbar Actions---------------
			'institutionlist > toolbar button[action=add]': 
			{
                click: this.toolbarAdd
            },
			'institutionlist > toolbar button[action=sync]': 
			{
                click: this.toolbarSync
            },
			'institutionlist > toolbar button[action=edit]': 
			{
                click: this.toolbarEdit
            },
			'institutionlist > toolbar button[action=delete]': 
			{
                click: this.toolbarDelete
            },
			'institutionlist > toolbar button[action=run]': 
			{
                click: this.toolbarRun
            },			
			//---------Start : Column Actions---------------	
			'institutionlist actioncolumn ': 
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////			
            'institutionedit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'institutionedit > toolbar button[action=create]':
            {
                click: this.editpanelCreate
            },
            'institutionedit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'institutionedit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'institutionedit > toolbar button[action=close]':
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

        this.getEncryptionZoneStore().getProxy().extraParams={limit:1000};
        this.getEncryptionZoneStore().load();

        this.getInstitutionStore().load();

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
		//Ext.ComponentQuery.query("institutionlist > toolbar")[0].hide();
		//Ext.ComponentQuery.query("institutionlist actioncolumn")[0].hide();		
		
	},
	//------------------------------------------
	rowSelected: function(model, records) 
	{
		if (records[0]) 
		{
			this.setActiveRecord(records[0] || null);
			//this.getInstitutionList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);	
			//this.getInstitutionEdit().show();
			//this.getInstitutionEdit().loadRecord(records[0]);
			
			
			console.log('rowSelected ');
			Ext.ComponentQuery.query("institutionlist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("institutionlist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("institutionlist > toolbar button[action=run]")[0].enable();				
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
		Ext.ComponentQuery.query("institutionedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("institutionedit > toolbar button[action=create]")[0].show();

        this.getInstitutionList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);

		$( "#divInstitutionEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});				
		this.getInstitutionEdit().show();

    },	
	toolbarSync: function() 
	{
		console.log('Clicked toolbarSync');		
        store = this.getInstitutionStore(); 
		store.sync();
    },
	toolbarEdit: function() 
	{	
		console.log('Clicked toolbarEdit');		
    },
	toolbarDelete: function() 
	{			
		var selection = this.getInstitutionList().getView().getSelectionModel().getSelection()[0];
		if (selection) 
		{					
			console.log('Clicked toolbarDelete '+selection.get('id'));	
			store = this.getInstitutionStore(); 
			editor=this.getInstitutionEdit();	
			
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
		this.getInstitutionList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getInstitutionStore(); 	
		editor=this.getInstitutionEdit();	
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
			Ext.ComponentQuery.query("institutionedit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("institutionedit > toolbar button[action=create]")[0].hide();

			$( "#divInstitutionEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

                height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});		
			this.getInstitutionEdit().show();
			this.getInstitutionEdit().loadRecord(record);	
			
		}
		
    },	
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreate: function()
    	{
    		console.log('Clicked editpanelCreate....');
            var form = this.getInstitutionEdit().getForm();
            var selmodel=this.getInstitutionList().getView().getSelectionModel();
    		store = this.getInstitutionStore();
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
    			$("#divInstitutionEdit").dialog('close');
    			this.getInstitutionEdit().hide();

            }

        },


    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getInstitutionEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getInstitutionEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getInstitutionList().getView().getSelectionModel().getSelection()[0];

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
    			$("#divInstitutionEdit").dialog('close');
    			this.getInstitutionEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getInstitutionEdit().getForm().setActiveRecord(null);
            this.getInstitutionEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getInstitutionEdit().getForm();
    		form.reset();
    		var sb = this.getInstitutionEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divInstitutionEdit").dialog('close');
    		this.getInstitutionEdit().hide();
        },


    	/////////////////End: Edit Panel Actions /////////////////////////////////

    	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getInstitutionEdit().activeRecord = record;
            if (record)
    		{
                //('institutionedit >  #idBtnSave').enable();
    			this.getInstitutionEdit().down('#idBtnSave').enable();
                this.getInstitutionEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('institutionedit >  #idBtnSave').disable();
    			this.getInstitutionEdit().down('#idBtnSave').disable();
                this.getInstitutionEdit().getForm().reset();
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