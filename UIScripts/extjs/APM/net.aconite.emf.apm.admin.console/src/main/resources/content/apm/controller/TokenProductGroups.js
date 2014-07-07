var varTokenProductGroupsCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.TokenProductGroups', 
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idTokenProductGroupsController',
	
	stores	: ['Institution','Issuer','TokenProductGroups'],
	
	models	: ['Institution','Issuer','TokenProductGroups'],
	
	views	: 
	[
        'tokenproductgroups.Search',
		'tokenproductgroups.List',
		'tokenproductgroups.Edit',

    ],
	
	refs: 
	[
        {ref: 'tokenProductGroupsSearch'		, selector: 'tokenproductgroupssearch'},
        {ref: 'tokenProductGroupsList'			, selector: 'tokenproductgroupslist'},
		{ref: 'tokenProductGroupsEdit'			, selector: 'tokenproductgroupsedit'},
	
    ],

    init: function() 
	{
        this.control(
		{
         /*   'viewport > panel':
			{
                render: this.onPanelRendered
            },    */
			'tokenproductgroupslist': 
			{
                itemdblclick	: this.rowDblclicked,
				beforerender	: this.beforeGridRender,
				selectionchange	: this.rowSelected
            },
			
			//---------Start : Toolbar Actions---------------
			'tokenproductgroupslist > toolbar button[action=add]': 
			{
                click: this.toolbarAdd
            },
			'tokenproductgroupslist > toolbar button[action=sync]': 
			{
                click: this.toolbarSync
            },
			'tokenproductgroupslist > toolbar button[action=edit]': 
			{
                click: this.toolbarEdit
            },
			'tokenproductgroupslist > toolbar button[action=delete]': 
			{
                click: this.toolbarDelete
            },
			//---------End : Toolbar Actions---------------
			//---------Start : Column Actions---------------	
			'tokenproductgroupslist actioncolumn ': 
			{
                itemclick : this.handleActionColumn
            },						
			
			//---------End : Column Actions---------------
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////
            'tokenproductgroupsedit > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'tokenproductgroupsedit > toolbar button[action=create]':
            {
                click: this.editpanelCreate
            },
            'tokenproductgroupsedit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'tokenproductgroupsedit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'tokenproductgroupsedit > toolbar button[action=close]':
            {
                click: this.editpanelClose
            },
             /////////////////End: EditPanel Actions /////////////////////////////////
            /////////////////Start: Search Panel Actions /////////////////////////////////
            'tokenproductgroupssearch > toolbar button[action=submit]':
            {
                 click: this.searchpanelSubmit
            },
            'tokenproductgroupssearch > toolbar button[action=search]':
            {
                 click: this.searchpanelSearch
            },
            'tokenproductgroupssearch > toolbar button[action=reset]':
            {
                click: this.searchpanelReset
            },
            'tokenproductgroupssearch  > toolbar button[action=clear]':
            {
                click: this.searchpanelClear
            },
            //--------------
            'tokenproductgroupssearch #idSInstitution':
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

            this.getInstitutionStore().getProxy().extraParams={limit:1000};
            this.getInstitutionStore().load();

             //this.getTokenProductGroupsStore().load();     //will be loaded by search button


        },

    onPanelRendered: function() 
	{
        console.log('The panel was rendered '+new Date().getTime());
    },

    beforeGridRender: function()
    {
        console.log('beforeGridRender ');
        //Ext.ComponentQuery.query("institutionlist > toolbar")[0].hide();
        //Ext.ComponentQuery.query("institutionlist actioncolumn")[0].hide();

    },
	//////////////start: Grid Actions/////////////////	
	rowSelected: function(model, records)
	{
	  if (records[0])
      		{
      			this.setActiveRecord(records[0] || null);

      		}
	},
	rowDblclicked: function(dv, record, item, index, e) 
	{
		console.log('rowDblclicked ');

	},
	//////////////end: Grid Actions/////////////////
	//////////////start: Toolbar Actions////////////
	toolbarAdd: function() 
	{
		console.log('Clicked toolbarAdd');		
		Ext.ComponentQuery.query("tokenproductgroupsedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("tokenproductgroupsedit > toolbar button[action=create]")[0].show();

        this.getTokenProductGroupsList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);
		$( "#divTokenProductGroupsEdit" ).dialog(
				{
					open: function() { $(".ui-dialog-titlebar-close").hide(); },

					height: varEditPanelHeight,
					width: varEditPanelWidth,
					modal: varEditPanelStatus					
		});				
		this.getTokenProductGroupsEdit().show();

    },	
	toolbarSync: function() 
	{
		console.log('Clicked toolbarSync');		
        store = this.getTokenProductGroupsStore(); 
		store.sync();
    },
	toolbarEdit: function() 
	{	
		console.log('Clicked toolbarEdit');	
	
    },
	toolbarDelete: function() 
	{			
		var selection = this.getTokenProductGroupsList().getView().getSelectionModel().getSelection()[0];
		if (selection) 
		{					
			console.log('Clicked toolbarDelete '+selection.get('id'));	
			store = this.getTokenProductGroupsStore();
			editor=this.getTokenProductGroupsEdit();
			Ext.Msg.confirm
			(
				'Confirm', 
				'Are you sure you want to delete '+selection.get('name')+' task?',
				function (btn) 
				{
					if (btn == 'yes')
					{
						
						store.remove(selection);
					}
				}
			);	
			
		}
    },
	//////////////end: Toolbar Actions/////////////////
	//------------------start: actioncolumn Actions-------------	
	handleActionColumn : function(column, action, grid, rowIndex, colIndex, record, node) 
	{
        console.log(action);
		this.getTokenProductGroupsList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getTokenProductGroupsStore(); 	
        editor=this.getTokenProductGroupsEdit();
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
					}
				}
			);
		}
		
		if(action=='edit')
		{
							
			console.log('Clicked actioncolumnEdit '+ record.get('id'));
			Ext.ComponentQuery.query("tokenproductgroupsedit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("tokenproductgroupsedit > toolbar button[action=create]")[0].hide();
			$( "#divTokenProductGroupsEdit" ).dialog(
				{
					open: function() { $(".ui-dialog-titlebar-close").hide(); },

					height: varEditPanelHeight,
					width: varEditPanelWidth,
					modal: varEditPanelStatus	
			});				
			this.getTokenProductGroupsEdit().show();
			this.getTokenProductGroupsEdit().loadRecord(record);	
			
		}
		
    },	
	//-----------end: Toolbar Actions-----------------------
	/////////////////////////////////////////////////////////////
	
	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreate: function()
    	{
    		console.log('Clicked editpanelCreate....');
            var form = this.getTokenProductGroupsEdit().getForm();
            var selmodel=this.getTokenProductGroupsList().getView().getSelectionModel();
    		store = this.getTokenProductGroupsStore();
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
    			$("#divTokenProductGroupsEdit").dialog('close');
    			this.getTokenProductGroupsEdit().hide();

            }

        },


    	editpanelSave: function()
    	{
    		console.log('Clicked editpanelSave....');
    		var active = this.getTokenProductGroupsEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getTokenProductGroupsEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getTokenProductGroupsList().getView().getSelectionModel().getSelection()[0];

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
    			$("#divTokenProductGroupsEdit").dialog('close');
    			this.getTokenProductGroupsEdit().hide();
    		}
        },

    	editpanelReset: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getTokenProductGroupsEdit().getForm().setActiveRecord(null);
            this.getTokenProductGroupsEdit().getForm().reset();
        },

    	editpanelClear: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getTokenProductGroupsEdit().getForm();
    		form.reset();
    		var sb = this.getTokenProductGroupsEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelClose: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divTokenProductGroupsEdit").dialog('close');
    		this.getTokenProductGroupsEdit().hide();
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

        		var fp = this.getTokenProductGroupsSearch();
        		var store = this.getTokenProductGroupsStore();
        		if(fp.getForm().isValid())
        		{
        			this.loadData(fp,store);
        			this.getTokenProductGroupsList().show();
        		}


        	},
        	searchpanelReset: function()
        	{
        		console.log('Clicked searchpanelReset....');
                var fp = this.getTokenProductGroupsSearch();
                var store = this.getTokenProductGroupsStore();
                //this.getTokenProductGroupsSearch().getForm().setActiveRecord(null);
                fp.getForm().reset();
                //this.loadData(fp,store);
                this.getTokenProductGroupsList().hide();
                Ext.ComponentQuery.query("#idSIssuer")[0].disable();
        	},

        	searchpanelClear: function()
        	{
        		console.log('Clicked searchpanelClear....');
        		var form = this.getTokenProductGroupsSearch().getForm();
        		form.reset();
        		var sb = this.getTokenProductGroupsSearch().getStatusbar();
        		// once completed
        		sb.clearStatus();
        	},
            //=============================
             onInstitutionComboSelect: function(combo, records,eOpts )
            {
                 console.log('onInstitutionComboSelect.... '+records[0].get('id'));
                 this.getIssuerStore().getProxy().extraParams={limit:1000,institutionId: records[0].get('id')};
                 this.getIssuerStore().load();
                 Ext.ComponentQuery.query("#idSIssuer")[0].enable();
            },
        /////////////////End: Search Panel Actions /////////////////////////////////
    	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getTokenProductGroupsEdit().activeRecord = record;
            if (record)
    		{
                //('institutionedit >  #idBtnSave').enable();
    			this.getTokenProductGroupsEdit().down('#idBtnSave').enable();
                this.getTokenProductGroupsEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('institutionedit >  #idBtnSave').disable();
    			this.getTokenProductGroupsEdit().down('#idBtnSave').disable();
                this.getTokenProductGroupsEdit().getForm().reset();
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

});