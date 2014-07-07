var varIssuerCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.Issuer', 
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idIssuerController',
	
	stores	: ['Institution','Country','Issuer'],
	
	models	: ['Institution','Country','Issuer'],
	
	views	: 
	[
        'issuer.Search',
		'issuer.List',
		'issuer.Edit',	
    ],
	
	refs: 
	[
		{ref: 'issuerSearch'	, selector: 'issuersearch'},	
        {ref: 'issuerList'		, selector: 'issuerlist'},			
		{ref: 'issuerEdit'		, selector: 'issueredit'},
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
			'issuerlist': 
			{
				beforerender	: this.beforeGridRender,
                //itemdblclick	: this.rowDblclicked,
				selectionchange	: this.rowSelected
            },			
			//---------Start : Toolbar Actions---------------
			'issuerlist > toolbar button[action=add]': 
			{
                click: this.toolbarAdd
            },
			'issuerlist > toolbar button[action=sync]': 
			{
                click: this.toolbarSync
            },
			'issuerlist > toolbar button[action=edit]': 
			{
                click: this.toolbarEdit
            },
			'issuerlist > toolbar button[action=delete]': 
			{
                click: this.toolbarDelete
            },
			'issuerlist > toolbar button[action=run]': 
			{
                click: this.toolbarRun
            },			
			//---------Start : Column Actions---------------	
			'issuerlist actioncolumn ': 
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////			
            'issueredit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'issueredit > toolbar button[action=create]':
            {
                 click: this.editpanelCreate
             },
            'issueredit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'issueredit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'issueredit > toolbar button[action=close]':
            {
                click: this.editpanelClose
            },
            /////////////////End: EditPanel Actions /////////////////////////////////
			/////////////////Start: Search Panel Actions /////////////////////////////////			
            'issuersearch > toolbar button[action=submit]':
            {
                 click: this.searchpanelSubmit
            },	
			'issuersearch > toolbar button[action=search]':
            {
                 click: this.searchpanelSearch
            },	
            'issuersearch > toolbar button[action=reset]':
            {
                click: this.searchpanelReset
            },
            'issuersearch  > toolbar button[action=clear]':
            {
                click: this.searchpanelClear
            },
            //--------------
            'issuersearch #idSInstitution':
            {
                select: this.onInstitutionComboSelect
            },
            /////////////////End: Search Panel Actions /////////////////////////////////
        });				
		
    },
	//###################################################################################
	/////////////////// Implementing Action Functions ///////////////////////////////////

	onLaunch: function()
    {
        console.log('onLaunch.... ');

        this.getCountryStore().getProxy().extraParams={limit:1000};
        this.getCountryStore().load();

        this.getInstitutionStore().getProxy().extraParams={limit:1000};
        this.getInstitutionStore().load();

         //this.getIssuerStore().load();     //will be loaded by search button


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
		//Ext.ComponentQuery.query("issuerlist > toolbar")[0].hide();
		//Ext.ComponentQuery.query("issuerlist actioncolumn")[0].hide();		
		
	},
	//------------------------------------------
	rowSelected: function(model, records) 
	{
		if (records[0]) 
		{
			this.setActiveRecord(records[0] || null);
			//this.getIssuerList().getView().getSelectionModel().select(rowIndex,false);
			//this.up('form').getForm().loadRecord(records[0]);	
			//this.getIssuerEdit().show();
			//this.getIssuerEdit().loadRecord(records[0]);
			
			
			console.log('rowSelected ');
			Ext.ComponentQuery.query("issuerlist > toolbar button[action=delete]")[0].enable();
			Ext.ComponentQuery.query("issuerlist > toolbar button[action=edit]")[0].enable();
			Ext.ComponentQuery.query("issuerlist > toolbar button[action=run]")[0].enable();				
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
		Ext.ComponentQuery.query("issueredit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("issueredit > toolbar button[action=create]")[0].show();

        this.getIssuerList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);

		$( "#divIssuerEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});				
		this.getIssuerEdit().show();

    },	
	toolbarSync: function() 
	{
		console.log('Clicked toolbarSync');		
        store = this.getIssuerStore(); 
		store.sync();
    },
	toolbarEdit: function() 
	{	
		console.log('Clicked toolbarEdit');		
    },
	toolbarDelete: function() 
	{			
		var selection = this.getIssuerList().getView().getSelectionModel().getSelection()[0];
		if (selection) 
		{					
			console.log('Clicked toolbarDelete '+selection.get('id'));	
			store = this.getIssuerStore(); 
			editor=this.getIssuerEdit();	
			
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
		this.getIssuerList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getIssuerStore(); 	
		editor=this.getIssuerEdit();	
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

			Ext.ComponentQuery.query("issueredit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("issueredit > toolbar button[action=create]")[0].hide();

			$( "#divIssuerEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});		
			this.getIssuerEdit().show();
			this.getIssuerEdit().loadRecord(record);	
			
		}
		
    },	
	//-----------end: actioncolumn Actions-----------------------
	/////////////////End: Grid Panel Actions ///////////////////////////////////
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreate: function()
    	{
    		console.log('Clicked editpanelCreate....');
            var form = this.getIssuerEdit().getForm();
            var selmodel=this.getIssuerList().getView().getSelectionModel();
    		store = this.getIssuerStore();
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

    			$("#divIssuerEdit").dialog('close');
    			this.getIssuerEdit().hide();

            }

        },

    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getIssuerEdit().activeRecord;

    		if (!active)
    		{
    			return;
    		}
    		var form = this.getIssuerEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getIssuerList().getView().getSelectionModel().getSelection()[0];

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

    			$("#divIssuerEdit").dialog('close');
    			this.getIssuerEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getIssuerEdit().getForm().setActiveRecord(null);
            this.getIssuerEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getIssuerEdit().getForm();
    		form.reset();
    		var sb = this.getIssuerEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divIssuerEdit").dialog('close');
    		this.getIssuerEdit().hide();
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
		
		var fp = this.getIssuerSearch();
		var store = this.getIssuerStore();
		if(fp.getForm().isValid())
		{				
			this.loadData(fp,store);
			this.getIssuerList().show();
		}
		
		
	},
	searchpanelReset: function()
	{
		console.log('Clicked searchpanelReset....');
		var fp = this.getIssuerSearch();
		var store = this.getIssuerStore();
		//this.getIssuerSearch().getForm().setActiveRecord(null);
		fp.getForm().reset();
		//this.loadData(fp,store);
		this.getIssuerList().hide();
	},    	

	searchpanelClear: function()
	{
		console.log('Clicked searchpanelClear....');
		var form = this.getIssuerSearch().getForm();
		form.reset();
		var sb = this.getIssuerSearch().getStatusbar();
		// once completed
		sb.clearStatus();
	},
    	
    onInstitutionComboSelect: function()
    {
        console.log('onInstitutionComboSelect.... ');
    },
    	/////////////////End: Search Panel Actions /////////////////////////////////
	
	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getIssuerEdit().activeRecord = record;
            if (record)
    		{                
    			this.getIssuerEdit().down('#idBtnSave').enable();
                this.getIssuerEdit().getForm().loadRecord(record);
            }
    		else
    		{                
    			this.getIssuerEdit().down('#idBtnSave').disable();
                this.getIssuerEdit().getForm().reset();
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