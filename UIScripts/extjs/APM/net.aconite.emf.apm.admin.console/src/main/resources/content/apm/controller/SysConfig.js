var varSysConfigCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.SysConfig',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idSysConfigController',
	
	stores	: ['SysConfig'],
	
	models	: ['SysConfig'],
	
	views	: 
	[
        'sysconfig.Search',
		'sysconfig.List',
		'sysconfig.Edit',	
    ],
	
	refs: 
	[
        {ref: 'sysConfigSearch'		, selector: 'sysconfigsearch'},	
		{ref: 'sysConfigList'		, selector: 'sysconfiglist'},			
		{ref: 'sysConfigEdit'		, selector: 'sysconfigedit'},		
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
			'sysconfiglist': 
			{
				beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },			
			//---------Start : Toolbar Actions---------------
			'sysconfiglist > toolbar button[action=add]': 
			{
                click: this.toolbarAdd
            },
			'sysconfiglist > toolbar button[action=sync]': 
			{
                click: this.toolbarSync
            },
			'sysconfiglist > toolbar button[action=edit]': 
			{
                click: this.toolbarEdit
            },
			'sysconfiglist > toolbar button[action=delete]': 
			{
                click: this.toolbarDelete
            },
			'sysconfiglist > toolbar button[action=run]': 
			{
                click: this.toolbarRun
            },			
			//---------Start : Column Actions---------------	
			'sysconfiglist actioncolumn ': 
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////			
            'sysconfigedit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'sysconfigedit > toolbar button[action=create]':
            {
                click: this.editpanelCreate
            },
            'sysconfigedit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'sysconfigedit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'sysconfigedit > toolbar button[action=close]':
            {
                click: this.editpanelClose
            },
            /////////////////End: EditPanel Actions /////////////////////////////////
			/////////////////Start: Search Panel Actions /////////////////////////////////			
            'sysconfigsearch > toolbar button[action=submit]':
            {
                 click: this.searchpanelSubmit
            },	
			'sysconfigsearch > toolbar button[action=search]':
            {
                 click: this.searchpanelSearch
            },	
            'sysconfigsearch > toolbar button[action=reset]':
            {
                click: this.searchpanelReset
            },
            'sysconfigsearch  > toolbar button[action=clear]':
            {
                click: this.searchpanelClear
            },
            
            /////////////////End: Search Panel Actions /////////////////////////////////
        });				
		
    },
	//###################################################################################
	/////////////////// Implementing Action Functions ///////////////////////////////////
	onLaunch: function()
    {
        console.log('onLaunch.... ');

         //this.getSysConfigStore().load();

        this.getSysConfigList().hide();
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
		Ext.ComponentQuery.query("sysconfiglist > toolbar")[0].hide();
		//Ext.ComponentQuery.query("sysconfiglist actioncolumn")[0].hide();		
		
	},
	//------------------------------------------
	rowSelected: function(model, records) 
	{
		if (records[0]) 
		{
			this.setActiveRecord(records[0] || null);
			//this.getSysConfigList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);	
			//this.getSysConfigEdit().show();
			//this.getSysConfigEdit().loadRecord(records[0]);
			
			
			console.log('rowSelected ');
			Ext.ComponentQuery.query("sysconfiglist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("sysconfiglist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("sysconfiglist > toolbar button[action=run]")[0].enable();				
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
		Ext.ComponentQuery.query("sysconfigedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("sysconfigedit > toolbar button[action=create]")[0].show();

        Ext.ComponentQuery.query("sysconfigedit > textfield[id=idName]")[0].setReadOnly(false);
        //this.getSysConfigEdit().down('#idName').disable();

        this.getSysConfigList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);

		$( "#divSysConfigEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});				
		this.getSysConfigEdit().show();

    },	
	toolbarSync: function() 
	{
		console.log('Clicked toolbarSync');		
        store = this.getSysConfigStore(); 
		store.sync();
    },
	toolbarEdit: function() 
	{	
		console.log('Clicked toolbarEdit');		
    },
	toolbarDelete: function() 
	{			
		var selection = this.getSysConfigList().getView().getSelectionModel().getSelection()[0];
		if (selection) 
		{					
			console.log('Clicked toolbarDelete '+selection.get('id'));	
			store = this.getSysConfigStore(); 
			editor=this.getSysConfigEdit();	
			
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
		this.getSysConfigList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getSysConfigStore(); 	
		editor=this.getSysConfigEdit();	
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
			Ext.ComponentQuery.query("sysconfigedit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("sysconfigedit > toolbar button[action=create]")[0].hide();

            Ext.ComponentQuery.query("sysconfigedit > textfield[id=idName]")[0].setReadOnly(true);

			$( "#divSysConfigEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});		
			this.getSysConfigEdit().show();
			this.getSysConfigEdit().loadRecord(record);	
			
		}
		
    },	
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreate: function()
    	{
    		console.log('Clicked editpanelCreate....');
            var form = this.getSysConfigEdit().getForm();
            var selmodel=this.getSysConfigList().getView().getSelectionModel();
    		store = this.getSysConfigStore();
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
    			$("#divSysConfigEdit").dialog('close');
    			this.getSysConfigEdit().hide();

            }

        },


    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getSysConfigEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getSysConfigEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getSysConfigList().getView().getSelectionModel().getSelection()[0];

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
    			$("#divSysConfigEdit").dialog('close');
    			this.getSysConfigEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getSysConfigEdit().getForm().setActiveRecord(null);
            this.getSysConfigEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getSysConfigEdit().getForm();
    		form.reset();
    		var sb = this.getSysConfigEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divSysConfigEdit").dialog('close');
    		this.getSysConfigEdit().hide();
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
			
			var fp = this.getSysConfigSearch();
			var store = this.getSysConfigStore();
			if(fp.getForm().isValid())
			{				
				this.loadData(fp,store);
				this.getSysConfigList().show();
			}
			
			
		},
		searchpanelReset: function()
		{
			console.log('Clicked searchpanelReset....');
			var fp = this.getSysConfigSearch();
			var store = this.getSysConfigStore();
			//this.getSysConfigSearch().getForm().setActiveRecord(null);
			fp.getForm().reset();
			//this.loadData(fp,store);
			this.getSysConfigList().hide();
		},    	

		searchpanelClear: function()
		{
			console.log('Clicked searchpanelClear....');
			var form = this.getSysConfigSearch().getForm();
			form.reset();
			var sb = this.getSysConfigSearch().getStatusbar();
			// once completed
			sb.clearStatus();
		},			
		
    	/////////////////End: Search Panel Actions /////////////////////////////////

    	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getSysConfigEdit().activeRecord = record;
            if (record)
    		{
                //('sysconfigedit >  #idBtnSave').enable();
    			this.getSysConfigEdit().down('#idBtnSave').enable();
                this.getSysConfigEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('sysconfigedit >  #idBtnSave').disable();
    			this.getSysConfigEdit().down('#idBtnSave').disable();
                this.getSysConfigEdit().getForm().reset();
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