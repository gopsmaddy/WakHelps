var varPMResponseCodeCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.PMResponseCode',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idPMResponseCodeController',
	
	stores	: ['PMResponseCode'],
	
	models	: ['PMResponseCode'],
	
	views	: 
	[
        'pmresponsecode.List',
		'pmresponsecode.Edit',	
    ],
	
	refs: 
	[
        {ref: 'PMResponseCodeList'	, selector: 'pmresponsecodelist'},				
		{ref: 'PMResponseCodeEdit'	, selector: 'pmresponsecodeedit'},		
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
			'pmresponsecodelist': 
			{
				beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },			
			//---------Start : Toolbar Actions---------------
			'pmresponsecodelist > toolbar button[action=add]': 
			{
                click: this.toolbarAdd
            },
			'pmresponsecodelist > toolbar button[action=sync]': 
			{
                click: this.toolbarSync
            },
			'pmresponsecodelist > toolbar button[action=edit]': 
			{
                click: this.toolbarEdit
            },
			'pmresponsecodelist > toolbar button[action=delete]': 
			{
                click: this.toolbarDelete
            },
			'pmresponsecodelist > toolbar button[action=run]': 
			{
                click: this.toolbarRun
            },			
			//---------Start : Column Actions---------------	
			'pmresponsecodelist actioncolumn ': 
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////			
            'pmresponsecodeedit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'pmresponsecodeedit > toolbar button[action=create]':
            {
                 click: this.editpanelCreate
             },
            'pmresponsecodeedit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'pmresponsecodeedit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'pmresponsecodeedit > toolbar button[action=close]':
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

         this.getPMResponseCodeStore().load();


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
		Ext.ComponentQuery.query("pmresponsecodelist > toolbar")[0].hide();
		//Ext.ComponentQuery.query("pmresponsecodelist actioncolumn")[0].hide();
		
	},
	//------------------------------------------
	rowSelected: function(model, records) 
	{
		if (records[0]) 
		{
			this.setActiveRecord(records[0] || null);
			//this.getPMResponseCodeList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);	
			//this.getPMResponseCodeEdit().show();
			//this.getPMResponseCodeEdit().loadRecord(records[0]);
			
			
			console.log('rowSelected ');
			Ext.ComponentQuery.query("pmresponsecodelist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("pmresponsecodelist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("pmresponsecodelist > toolbar button[action=run]")[0].enable();				
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
		Ext.ComponentQuery.query("pmresponsecodeedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("pmresponsecodeedit > toolbar button[action=create]")[0].show();

        this.getPMResponseCodeList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);

		$( "#divPMResponseCodeEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});				
		this.getPMResponseCodeEdit().show();

    },	
	toolbarSync: function() 
	{
		console.log('Clicked toolbarSync');		
        store = this.getPMResponseCodeStore(); 
		store.sync();
    },
	toolbarEdit: function() 
	{	
		console.log('Clicked toolbarEdit');		
    },
	toolbarDelete: function() 
	{			
		var selection = this.getPMResponseCodeList().getView().getSelectionModel().getSelection()[0];
		if (selection) 
		{					
			console.log('Clicked toolbarDelete '+selection.get('id'));	
			store = this.getPMResponseCodeStore(); 
			editor=this.getPMResponseCodeEdit();	
			
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
		this.getPMResponseCodeList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getPMResponseCodeStore(); 
		editor=this.getPMResponseCodeEdit();		
		
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
			Ext.ComponentQuery.query("pmresponsecodeedit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("pmresponsecodeedit > toolbar button[action=create]")[0].hide();

			$( "#divPMResponseCodeEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});		
			this.getPMResponseCodeEdit().show();
			this.getPMResponseCodeEdit().loadRecord(record);	
			
		}
		
    },	
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreate: function()
    	{
    		console.log('Clicked editpanelCreate....');
            var form = this.getPMResponseCodeEdit().getForm();
    		var selmodel=this.getPMResponseCodeList().getView().getSelectionModel();
    		store = this.getPMResponseCodeStore();
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
    			$("#divPMResponseCodeEdit").dialog('close');
    			this.getPMResponseCodeEdit().hide();

            }

        },

    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getPMResponseCodeEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getPMResponseCodeEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getPMResponseCodeList().getView().getSelectionModel().getSelection()[0];

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
    			$("#divPMResponseCodeEdit").dialog('close');
    			this.getPMResponseCodeEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getPMResponseCodeEdit().getForm().setActiveRecord(null);
            this.getPMResponseCodeEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getPMResponseCodeEdit().getForm();
    		form.reset();
    		var sb = this.getPMResponseCodeEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divPMResponseCodeEdit").dialog('close');
    		this.getPMResponseCodeEdit().hide();
        },


    	/////////////////End: Edit Panel Actions /////////////////////////////////

    	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getPMResponseCodeEdit().activeRecord = record;
            if (record)
    		{
                //('pmresponsecodeedit >  #idBtnSave').enable();
    			this.getPMResponseCodeEdit().down('#idBtnSave').enable();
                this.getPMResponseCodeEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('pmresponsecodeedit >  #idBtnSave').disable();
    			this.getPMResponseCodeEdit().down('#idBtnSave').disable();
                this.getPMResponseCodeEdit().getForm().reset();
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