var varPMTransactionTypeCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.PMTransactionType', 
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idPMTransactionTypeController',
	
	stores	: ['PMTransactionType'],
	
	models	: ['PMTransactionType'],
	
	views	: 
	[
        'pmtransactiontype.List',
		'pmtransactiontype.Edit',	
    ],
	
	refs: 
	[
        {ref: 'PMTransactionTypeList'	, selector: 'pmtransactiontypelist'},		
		{ref: 'PMTransactionTypeEdit'	, selector: 'pmtransactiontypeedit'},		
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
			'pmtransactiontypelist': 
			{
				beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },			
			//---------Start : Toolbar Actions---------------
			'pmtransactiontypelist > toolbar button[action=add]': 
			{
                click: this.toolbarAdd
            },
			'pmtransactiontypelist > toolbar button[action=sync]': 
			{
                click: this.toolbarSync
            },
			'pmtransactiontypelist > toolbar button[action=edit]': 
			{
                click: this.toolbarEdit
            },
			'pmtransactiontypelist > toolbar button[action=delete]': 
			{
                click: this.toolbarDelete
            },
			'pmtransactiontypelist > toolbar button[action=run]': 
			{
                click: this.toolbarRun
            },			
			//---------Start : Column Actions---------------	
			'pmtransactiontypelist actioncolumn ': 
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////
            'pmtransactiontypeedit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'pmtransactiontypeedit > toolbar button[action=create]':
            {
                 click: this.editpanelCreate
             },
            'pmtransactiontypeedit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'pmtransactiontypeedit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'pmtransactiontypeedit > toolbar button[action=close]':
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

         this.getPMTransactionTypeStore().load();


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
		Ext.ComponentQuery.query("pmtransactiontypelist > toolbar")[0].hide();
		//Ext.ComponentQuery.query("pmtransactiontypelist actioncolumn")[0].hide();
		
	},
	//------------------------------------------
	rowSelected: function(model, records) 
	{
		if (records[0]) 
		{
			this.setActiveRecord(records[0] || null);
			//this.getPMTransactionTypeList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);	
			//this.getPMTransactionTypeEdit().show();
			//this.getPMTransactionTypeEdit().loadRecord(records[0]);
			
			
			console.log('rowSelected ');
			Ext.ComponentQuery.query("pmtransactiontypelist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("pmtransactiontypelist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("pmtransactiontypelist > toolbar button[action=run]")[0].enable();				
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

	    Ext.ComponentQuery.query("pmtransactiontypeedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("pmtransactiontypeedit > toolbar button[action=create]")[0].show();

        this.getPMTransactionTypeList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);

		$( "#divPMTransactionTypeEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});				
		this.getPMTransactionTypeEdit().show();

    },	
	toolbarSync: function() 
	{
		console.log('Clicked toolbarSync');		
        store = this.getPMTransactionTypeStore(); 
		store.sync();
    },
	toolbarEdit: function() 
	{	
		console.log('Clicked toolbarEdit');		
    },
	toolbarDelete: function() 
	{			
		var selection = this.getPMTransactionTypeList().getView().getSelectionModel().getSelection()[0];
		if (selection) 
		{					
			console.log('Clicked toolbarDelete '+selection.get('id'));	
			store = this.getPMTransactionTypeStore(); 	
			editor=this.getPMTransactionTypeEdit();	
			
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
		this.getPMTransactionTypeList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getPMTransactionTypeStore(); 	
		editor=this.getPMTransactionTypeEdit();
		
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

			 Ext.ComponentQuery.query("pmtransactiontypeedit > toolbar button[action=save]")[0].show();
             Ext.ComponentQuery.query("pmtransactiontypeedit > toolbar button[action=create]")[0].hide();


			$( "#divPMTransactionTypeEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});	
			this.getPMTransactionTypeEdit().show();
			this.getPMTransactionTypeEdit().loadRecord(record);	
			
		}
		
    },	
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreate: function()
    {
        console.log('Clicked editpanelCreate....');
        var form = this.getPMTransactionTypeEdit().getForm();
        var selmodel=this.getPMTransactionTypeList().getView().getSelectionModel();
        store = this.getPMTransactionTypeStore();
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
            $("#divPMTransactionTypeEdit").dialog('close');
            this.getPMTransactionTypeEdit().hide();

        }

    },

    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getPMTransactionTypeEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getPMTransactionTypeEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getPMTransactionTypeList().getView().getSelectionModel().getSelection()[0];

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
    			$("#divPMTransactionTypeEdit").dialog('close');
    			this.getPMTransactionTypeEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getPMTransactionTypeEdit().getForm().setActiveRecord(null);
            this.getPMTransactionTypeEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getPMTransactionTypeEdit().getForm();
    		form.reset();
    		var sb = this.getPMTransactionTypeEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divPMTransactionTypeEdit").dialog('close');
    		this.getPMTransactionTypeEdit().hide();
        },


    	/////////////////End: Edit Panel Actions /////////////////////////////////

    	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getPMTransactionTypeEdit().activeRecord = record;
            if (record)
    		{
                //('pmtransactiontypeedit >  #idBtnSave').enable();
    			this.getPMTransactionTypeEdit().down('#idBtnSave').enable();
                this.getPMTransactionTypeEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('pmtransactiontypeedit >  #idBtnSave').disable();
    			this.getPMTransactionTypeEdit().down('#idBtnSave').disable();
                this.getPMTransactionTypeEdit().getForm().reset();
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