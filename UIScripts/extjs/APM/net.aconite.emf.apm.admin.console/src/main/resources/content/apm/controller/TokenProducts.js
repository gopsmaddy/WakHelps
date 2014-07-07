var varTokenProductsCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});
var varTokenAppProfilesCellEditing= Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});
var varBinRangeCellEditing= Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});



Ext.define('Apm.controller.TokenProducts', 
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idTokenProductsController',
	
	stores	: ['PersoBureau','Country','EncryptionZone','EncryptionKey','VerificationMethod','PanGenerationRule','GenerationRule','TokenProductGroups','Institution','Issuer','TokenProducts','TokenAppProfiles','BINRange','Status','PinGenerationRule', 'PinDeliveryMethod'],
	
	models	: ['PersoBureau','Country','EncryptionZone','EncryptionKey','VerificationMethod','PanGenerationRule','GenerationRule','TokenProductGroups','Institution','Issuer','TokenProducts','TokenAppProfiles','BINRange','Status','PinGenerationRule', 'PinDeliveryMethod'],
	
	views	: 
	[
        		
		'tokenproducts.List',
		'tokenproducts.Edit',
		'tokenproducts.Search',
		'tokenappprofiles.List',
		'tokenappprofiles.Edit',
		'binrange.List',
		'binrange.Edit',

    ],
	
	refs: 
	[
        {ref: 'tokenProductsList'			, selector: 'tokenproductslist'},
		{ref: 'tokenProductsEdit'			, selector: 'tokenproductsedit'},
		{ref: 'tokenProductsSearch'			, selector: 'tokenproductssearch'},
		{ref: 'tokenAppProfilesList'		, selector: 'tokenappprofileslist'},
		{ref: 'tokenAppProfilesEdit'		, selector: 'tokenappprofilesedit'},
		{ref: 'bINRangeList'				, selector: 'binrangelist'},
		{ref: 'bINRangeEdit'				, selector: 'binrangeedit'},
	
    ],
	

	
    init: function() 
	{
        this.control(
		{

			'tokenproductslist': 
			{
                itemdblclick	: this.rowDblclicked,
                selectionchange	: this.rowSelected
            },
			
			//---------Start : Toolbar Actions---------------
			'tokenproductslist > toolbar button[action=add]':
			{
                click: this.toolbarAdd
            },
			'tokenproductslist > toolbar button[action=sync]': 
			{
                click: this.toolbarSync
            },
			'tokenproductslist > toolbar button[action=edit]': 
			{
                click: this.toolbarEdit
            },
			'tokenproductslist > toolbar button[action=delete]': 
			{
                click: this.toolbarDelete
            },
			//---------End : Toolbar Actions---------------
			//---------Start : Column Actions---------------	
			'tokenproductslist actioncolumn ': 
			{
                itemclick : this.handleActionColumn
            },						
			
			//---------End : Column Actions---------------
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////
            'tokenproductsedit > toolbar > button[action=save]':
            {
                click: this.editpanelSave
            },
            'tokenproductsedit > toolbar button[action=create]':
            {
                click: this.editpanelCreate
            },
            'tokenproductsedit > toolbar button[action=reset]':
            {
                click: this.editpanelReset
            },
            'tokenproductsedit > toolbar button[action=clear]':
            {
                click: this.editpanelClear
            },
            'tokenproductsedit > toolbar button[action=close]':
            {
                click: this.editpanelClose
            },
            'tokenproductsedit > #idSameAsID':
            {
                 change: this.onSameAsID
            },
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
           'tokenproductssearch #idSTokenProductGroups':
          {
              //select: this.onTokenProductGroupComboSelect
              beforeselect:this.beforeTokenProductGroupComboSelect


          },
			/////////////////End: Search Panel Actions /////////////////////////////////
			//########################################################################################
			//////////////////// Start Token App Profiles wiring ///////////////////////////////////
			
			'tokenappprofileslist': 
			{
                itemdblclick	: this.rowDblclickedTAP,
				selectionchange	: this.rowSelectedTAP
            },
			
			//---------Start : Toolbar Actions---------------
			'tokenappprofileslist > toolbar button[action=add]':
			{
                click: this.toolbarAddTAP
            },
			'tokenappprofileslist > toolbar button[action=sync]': 
			{
                click: this.toolbarSyncTAP
            },
			'tokenappprofileslist > toolbar button[action=edit]': 
			{
                click: this.toolbarEditTAP
            },
			'tokenappprofileslist > toolbar button[action=delete]': 
			{
                click: this.toolbarDeleteTAP
            },
			//---------End : Toolbar Actions---------------
		

			//---------Start : Column Actions---------------	
			'tokenappprofileslist actioncolumn ':
			{
                itemclick : this.handleActionColumnTAP
            },						
			
			//---------End : Column Actions---------------
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////
            'tokenappprofilesedit > toolbar button[action=save]':
            {
                click: this.editpanelSaveTAP
            },
            'tokenappprofilesedit > toolbar button[action=create]':
            {
                click: this.editpanelCreateTAP
            },
            'tokenappprofilesedit > toolbar button[action=reset]':
            {
                click: this.editpanelResetTAP
            },
            'tokenappprofilesedit > toolbar button[action=clear]':
            {
                click: this.editpanelClearTAP
            },
            'tokenappprofilesedit > toolbar button[action=close]':
            {
                click: this.editpanelCloseTAP
            },
			
			//////////////////// END Token App Profiles wiring ///////////////////////////////////
			//########################################################################################

			//////////////////// Start BIN Range wiring ///////////////////////////////////
			
			'binrangelist': 
			{
				itemdblclick	: this.rowDblclickedBIN,
				selectionchange	: this.rowSelectedBIN
            },
			
			//---------Start : Toolbar Actions---------------
			'binrangelist > toolbar button[action=add]': 
			{
                click: this.toolbarAddBIN
            },
			'binrangelist > toolbar button[action=sync]': 
			{
                click: this.toolbarSyncBIN
            },
			'binrangelist > toolbar button[action=edit]': 
			{
                click: this.toolbarEditBIN
            },
			'binrangelist > toolbar button[action=delete]': 
			{
                click: this.toolbarDeleteBIN
            },
			//---------End : Toolbar Actions---------------
		

			//---------Start : Column Actions---------------	
			'binrangelist actioncolumn ': 
			{
                itemclick : this.handleActionColumnBIN
            },						
			
			//---------End : Column Actions---------------
			/////////////////End: Grid Panel Actions ///////////////////////////////////
			/////////////////Start: Edit Panel Actions /////////////////////////////////
            'binrangeedit > toolbar button[action=save]':
            {
                click: this.editpanelSaveBIN
            },
            'binrangeedit > toolbar button[action=create]':
            {
                click: this.editpanelCreateBIN
            },
            'binrangeedit > toolbar button[action=reset]':
            {
                click: this.editpanelResetBIN
            },
            'binrangeedit > toolbar button[action=clear]':
            {
                click: this.editpanelClearBIN
            },
            'binrangeedit > toolbar button[action=close]':
            {
                click: this.editpanelCloseBIN
            },
			
				//////////////////// END BIN Range wiring ///////////////////////////////////

			
        });

		
		
    },
//########################################################################################
//########################################################################################

	onLaunch: function() 
	{
	    console.log('onLaunch.... ');

        this.getInstitutionStore().getProxy().extraParams={limit:1000};
        this.getInstitutionStore().load();

    },
 //########################################################################################
 //########################################################################################
    onPanelRendered: function() 
	{
        console.log('The panel was rendered '+new Date().getTime());
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
		if (record) 
		{
            this.getTokenAppProfilesStore().getProxy().extraParams={limit:3,tokenProductId:record.get('id')};
            this.getTokenAppProfilesStore().load();
			this.getTokenAppProfilesList().show();
			//this.getTokenProductsList().collapse();
			this.getBINRangeList().hide();
		}	
	},
	//////////////end: Grid Actions/////////////////
	//////////////start: Toolbar Actions////////////
	toolbarAdd: function() 
	{
		console.log('Clicked toolbarAdd');		
		Ext.ComponentQuery.query("tokenproductsedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("tokenproductsedit > toolbar button[action=create]")[0].show();
        Ext.ComponentQuery.query("#idSameAsID")[0].show();
        this.getTokenProductsList().getView().getSelectionModel().deselectAll();
        this.setActiveRecord(null);
		$( "#divTokenProductsEdit" ).dialog(
		{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus				
		});				
		this.getTokenProductsEdit().show();

    },	
	toolbarSync: function() 
	{
		console.log('Clicked toolbarSync');		
        store = this.getTokenProductsStore(); 
		store.sync();
    },
	toolbarEdit: function() 
	{	
		console.log('Clicked toolbarEdit');	
	
    },
	toolbarDelete: function() 
	{			
		var selection = this.getTokenProductsList().getView().getSelectionModel().getSelection()[0];
		if (selection) 
		{					
			console.log('Clicked toolbarDelete '+selection.get('id'));	
			store = this.getTokenProductsStore(); 			
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
        console.log(action+':TP');
		this.getTokenProductsList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getTokenProductsStore(); 	
		
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
							
			Ext.ComponentQuery.query("tokenproductsedit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("tokenproductsedit > toolbar button[action=create]")[0].hide();
			$( "#divTokenProductsEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide();
				             if(!isNaN(Ext.ComponentQuery.query("#idID")[0].getValue())) {
                                              Ext.ComponentQuery.query("#idSameAsID")[0].hide();
                              }
				},

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});				
			this.getTokenProductsEdit().show();
			this.getTokenProductsEdit().loadRecord(record);

			 //this.getTokenProductGroupsStore().getProxy().extraParams={limit:1000,issuerId: record.get('issuerId'),option:false};
             //this.getTokenProductGroupsStore().load({params:{limit:1000,issuerId: record.get('issuerId'),option:false}});
			
		}
		
    },	
	//-----------end: Toolbar Actions-----------------------
	/////////////////////////////////////////////////////////////
	

    	/////////////////Start: Edit Panel Actions /////////////////////////////////
    	editpanelCreate: function()
        	{
        		console.log('Clicked editpanelCreate....');
                var form = this.getTokenProductsEdit().getForm();
                var selmodel=this.getTokenProductsList().getView().getSelectionModel();
        		store = this.getTokenProductsStore();
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
        			$("#divTokenProductsEdit").dialog('close');
        			this.getTokenProductsEdit().hide();

                }

            },


        	editpanelSave: function()
        	{
        		console.log('Clicked editpanelSave Token Products....');
        		var active = this.getTokenProductsEdit().activeRecord;
        		if (!active)
        		{
        			return;
        		}
        		var form = this.getTokenProductsEdit().getForm();
        		s = '';
        		if (form.isValid())
        		{
        			Ext.iterate(form.getValues(), function(key, value)
        			{
        				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
        			}, this	);

        			var selection = this.getTokenProductsList().getView().getSelectionModel().getSelection()[0];

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
        			$("#divTokenProductsEdit").dialog('close');
        			this.getTokenProductsEdit().hide();
        		}
            },

        	editpanelReset: function()
        	{
        		console.log('Clicked editpanelReset....');
        		this.getTokenProductsEdit().getForm().setActiveRecord(null);
                this.getTokenProductsEdit().getForm().reset();
            },

        	editpanelClear: function()
        	{
        		console.log('Clicked editpanelClear....');
        		var form = this.getTokenProductsEdit().getForm();
        		form.reset();
        		var sb = this.getTokenProductsEdit().getStatusbar();
        		// once completed
        		sb.clearStatus();
            },

        	editpanelClose: function()
        	{
        		console.log('Clicked editpanelClose....');
        		$("#divTokenProductsEdit").dialog('close');
        		this.getTokenProductsEdit().hide();
            },
            onSameAsID: function( checkBox, newValue, oldValue )
            {

               if(newValue){
                   Ext.ComponentQuery.query("#idReissueTokenProductID")[0].disable();
               }
               else{
                    Ext.ComponentQuery.query("#idReissueTokenProductID")[0].enable();
               }

                  //   Ext.ComponentQuery.query("#idSIssuer")[0].enable();
            },


			
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

         this.getPersoBureauStore().getProxy().extraParams={limit:1000};
         this.getPersoBureauStore().load();

         this.getCountryStore().getProxy().extraParams={limit:1000};
         this.getCountryStore().load();

		
		var fp = this.getTokenProductsSearch();
		var store = this.getTokenProductsStore();
		if(fp.getForm().isValid())
		{				
			this.loadData(fp,store);			
			this.getTokenProductsList().show();
			this.getTokenAppProfilesList().hide();
			this.getBINRangeList().hide();			
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

        //this.getTokenProductGroups2Store().getProxy().extraParams={limit:1000,issuerId: records[0].get('id'),option:false};
        //this.getTokenProductGroups2Store().load();

        this.getTokenProductGroupsStore().getProxy().extraParams={limit:1000,issuerId: records[0].get('id')};
        this.getTokenProductGroupsStore().load();
        Ext.ComponentQuery.query("#idSTokenProductGroups")[0].enable();
    },
    beforeTokenProductGroupComboSelect: function(combo, record,index,eOpts )
    {
        console.log('beforeTokenProductGroupComboSelect.... ');
        //this.getTokenProductGroupsStore().getProxy().extraParams={limit:1000,issuerId: records[0].get('id'),option:true};
        //this.getTokenProductGroupsStore().load();
//        //if(cb.emptyText)
//        {
//            combo.setValue("EM");
//            combo.applyEmptyText('XX');
//        }

    },


			
        	/////////////////End: Edit Panel Actions /////////////////////////////////

        	//=================================

        	setActiveRecord: function(record)
        	{
                this.getTokenProductsEdit().activeRecord = record;
                if (record)
        		{

        			this.getTokenProductsEdit().down('#idBtnSave').enable();
                    this.getTokenProductsEdit().getForm().loadRecord(record);
                }
        		else
        		{

        			this.getTokenProductsEdit().down('#idBtnSave').disable();
                    this.getTokenProductsEdit().getForm().reset();
                }
            },


        	//=================================

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


  //########################################################################################
  //########################################################################################
	// start TOKEN APP Profiles Action Event Handling //
	    /*
	            this.getCountryStore().getProxy().extraParams={limit:1000};
                //if(!this.getCountryStore().loaded)
                this.getCountryStore().load();

	    */
	//////////////start: Grid Actions/////////////////	
	rowSelectedTAP: function(model, records)
	{
	  if (records[0])
      		{
      			this.setActiveRecordTAP(records[0] || null);

      		}
	},
	rowDblclickedTAP: function(dv, record, item, index, e)
	{
		console.log('rowDblclickedTAP ');
		if (record)
		{
		  this.getBINRangeStore().getProxy().extraParams={limit:2,tokenProductId:record.get('tokenProductId'),appSequenceNumber:record.get('appSequenceNumber')};
          this.getBINRangeStore().load();
     	  this.getBINRangeList().show();
		  //this.getTokenAppProfilesList().collapse();
		}
	},
	//////////////end: Grid Actions/////////////////
	//////////////start: Toolbar Actions////////////
	toolbarAddTAP: function()
	{
		console.log('Clicked toolbarAddTAP');

		Ext.ComponentQuery.query("tokenappprofilesedit > toolbar button[action=save]")[0].hide();
        Ext.ComponentQuery.query("tokenappprofilesedit > toolbar button[action=create]")[0].show();

        this.getTokenAppProfilesList().getView().getSelectionModel().deselectAll();
        this.setActiveRecordTAP(null);
		$( "#divTokenAppProfilesEdit" ).dialog(
		{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeightTAP,
				width : varEditPanelWidthTAP,
				modal : varEditPanelStatusTAP
		});
		this.getTokenAppProfilesEdit().show();



    },
	toolbarSyncTAP: function()
	{
		console.log('Clicked toolbarSyncTAP');
        store = this.getTokenAppProfilesStore();
		store.sync();
    },
	toolbarEditTAP: function()
	{
		console.log('Clicked toolbarEditTAP');
    },
	toolbarDeleteTAP: function()
	{
		var selection = this.getTokenAppProfilesList().getView().getSelectionModel().getSelection()[0];
		if (selection)
		{
			console.log('Clicked toolbarDeleteTAP '+selection.get('id'));
			store = this.getTokenAppProfilesStore();
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
	handleActionColumnTAP : function(column, action, grid, rowIndex, colIndex, record, node)
	{
        console.log(action+':TAP');
		this.getTokenAppProfilesList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getTokenAppProfilesStore();

		if(action=='delete')
		{
			console.log('Clicked actioncolumnDeleteTAP '+ record.get('id'));
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
			Ext.ComponentQuery.query("tokenappprofilesedit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("tokenappprofilesedit > toolbar button[action=create]")[0].hide();
			$( "#divTokenAppProfilesEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeightTAP,
				width : varEditPanelWidthTAP,
				modal : varEditPanelStatusTAP
			});
			this.getTokenAppProfilesEdit().show();
			this.getTokenAppProfilesEdit().loadRecord(record);


		}

    },
	//-----------end: Toolbar Actions-----------------------
	/////////////////////////////////////////////////////////////


		/////////////////Start: Edit Panel Actions /////////////////////////////////
    	editpanelCreateTAP: function()
        	{
        		console.log('Clicked editpanelCreate TAP....');
                var form = this.getTokenAppProfilesEdit().getForm();
                var selmodel=this.getTokenAppProfilesList().getView().getSelectionModel();
        		store = this.getTokenAppProfilesStore();
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
    							//need to pass selected params from search criteria
    							store.load();

        					}
        					else
        					{
        					}
        				}
        			);
        			$("#divTokenAppProfilesEdit").dialog('close');
        			this.getTokenAppProfilesEdit().hide();

                }

            },


        	editpanelSaveTAP: function()
        	{
        		console.log('Clicked editpanelSave TAP....');
        		var active = this.getTokenAppProfilesEdit().activeRecord;
        		if (!active)
        		{
        			return;
        		}
        		var form = this.getTokenAppProfilesEdit().getForm();
        		s = '';
        		if (form.isValid())
        		{
        			Ext.iterate(form.getValues(), function(key, value)
        			{
        				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
        			}, this	);

        			var selection = this.getTokenAppProfilesList().getView().getSelectionModel().getSelection()[0];

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
        			$("#divTokenAppProfilesEdit").dialog('close');
        			this.getTokenAppProfilesEdit().hide();
        		}
            },

        	editpanelResetTAP: function()
        	{
        		console.log('Clicked editpanelReset....');
        		this.getTokenAppProfilesEdit().getForm().setActiveRecord(null);
                this.getTokenAppProfilesEdit().getForm().reset();
            },

        	editpanelClearTAP: function()
        	{
        		console.log('Clicked editpanelClear....');
        		var form = this.getTokenAppProfilesEdit().getForm();
        		form.reset();
        		var sb = this.getTokenAppProfilesEdit().getStatusbar();
        		// once completed
        		sb.clearStatus();
            },

        	editpanelCloseTAP: function()
        	{
        		console.log('Clicked editpanelClose....');
        		$("#divTokenAppProfilesEdit").dialog('close');
        		this.getTokenAppProfilesEdit().hide();
            },


        	/////////////////End: Edit Panel Actions /////////////////////////////////

        	//=================================

        	setActiveRecordTAP: function(record)
        	{
                this.getTokenAppProfilesEdit().activeRecord = record;
                if (record)
        		{
                    //('institutionedit >  #idBtnSave').enable();
        			this.getTokenAppProfilesEdit().down('#idBtnSave').enable();
                    this.getTokenAppProfilesEdit().getForm().loadRecord(record);
                }
        		else
        		{
                    //('institutionedit >  #idBtnSave').disable();
        			this.getTokenAppProfilesEdit().down('#idBtnSave').disable();
                    this.getTokenAppProfilesEdit().getForm().reset();
                }
            },


        	//=================================



 //########################################################################################
 //########################################################################################

		// start BIN Range Action Event Handling //

	//////////////start: Grid Actions/////////////////
	rowSelectedBIN: function(model, records)
	{
	  if (records[0])
      		{
      			this.setActiveRecordBIN(records[0] || null);

      		}
	},
	rowDblclickedBIN: function(dv, record, item, index, e)
	{
		console.log('rowDblclickedBIN ');
		if (record)
		{
			//this.up('form').getForm().loadRecord(records[0]);
			//Ext.getCmp('idTokenAppProfilesList').getStore().load();
			//Ext.getCmp('idTokenAppProfilesList').show();
			//Ext.ComponentQuery.query("tokenproductslist > toolbar button[action=delete]")[0].enable();
			//Ext.ComponentQuery.query("tokenproductslist > toolbar button[action=edit]")[0].enable();
		}
	},
	//////////////end: Grid Actions/////////////////
	//////////////start: Toolbar Actions/////////getBINRangeList///
	toolbarAddBIN: function()
	{
		console.log('Clicked toolbarAddBIN');
 		Ext.ComponentQuery.query("binrangeedit > toolbar button[action=save]")[0].hide();
         Ext.ComponentQuery.query("binrangeedit > toolbar button[action=create]")[0].show();

         this.getBINRangeList().getView().getSelectionModel().deselectAll();
         this.setActiveRecordBIN(null);
		$( "#divBINRangeEdit" ).dialog(
		{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeightBIN,
				width : varEditPanelWidthBIN,
				modal : varEditPanelStatusBIN
		});
		this.getBINRangeEdit().show();

    },
	toolbarSyncBIN: function()
	{
		console.log('Clicked toolbarSyncBIN');
        store = this.getBINRangeStore();
		store.sync();
    },
	toolbarEditBIN: function()
	{
		console.log('Clicked toolbarEditBIN');
    },
	toolbarDeleteTAP: function()
	{
		var selection = this.getBINRangeList().getView().getSelectionModel().getSelection()[0];
		if (selection)
		{
			console.log('Clicked toolbarDeleteBIN '+selection.get('id'));
			store = this.getBINRangeStore();
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
	handleActionColumnBIN : function(column, action, grid, rowIndex, colIndex, record, node)
	{
        console.log(action+':BIN');
		this.getBINRangeList().getView().getSelectionModel().select(rowIndex,false);
		store = this.getBINRangeStore();

		if(action=='delete')
		{
			console.log('Clicked actioncolumnDeleteBIN '+ record.get('id'));
			Ext.Msg.confirm
			(
				'Confirm',
				'Are you sure you want to delete the BIN Range from '+ record.get('binFrom')+' to '+ record.get('binTo')+'?',
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

			Ext.ComponentQuery.query("binrangeedit > toolbar button[action=save]")[0].show();
            Ext.ComponentQuery.query("binrangeedit > toolbar button[action=create]")[0].hide();
			$( "#divBINRangeEdit" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeightBIN,
				width : varEditPanelWidthBIN,
				modal : varEditPanelStatusBIN
			});
			this.getBINRangeEdit().show();
			this.getBINRangeEdit().loadRecord(record);

		}

    },


	/////////////////Start: Edit Panel Actions /////////////////////////////////
	editpanelCreateBIN: function()
    	{
    		console.log('Clicked editpanelCreate BIN....');
            var form = this.getBINRangeEdit().getForm();
            var selmodel=this.getBINRangeList().getView().getSelectionModel();
    		store = this.getBINRangeStore();
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
							//need to pass selected params from search criteria
							store.load();

    					}
    					else
    					{
    					}
    				}
    			);
    			$("#divBINRangeEdit").dialog('close');
    			this.getBINRangeEdit().hide();

            }

        },


    	editpanelSaveBIN: function()
    	{
    		console.log('Clicked editpanelSaveBin Range....');
    		var active = this.getBINRangeEdit().activeRecord;
    		if (!active)
    		{
    			return;
    		}
    		var form = this.getBINRangeEdit().getForm();
    		s = '';
    		if (form.isValid())
    		{
    			Ext.iterate(form.getValues(), function(key, value)
    			{
    				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
    			}, this	);

    			var selection = this.getBINRangeList().getView().getSelectionModel().getSelection()[0];

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
    			$("#divBINRangeEdit").dialog('close');
    			this.getBINRangeEdit().hide();
    		}
        },

    	editpanelResetBIN: function()
    	{
    		console.log('Clicked editpanelReset....');
    		this.getBINRangeEdit().getForm().setActiveRecord(null);
            this.getBINRangeEdit().getForm().reset();
        },

    	editpanelClearBIN: function()
    	{
    		console.log('Clicked editpanelClear....');
    		var form = this.getBINRangeEdit().getForm();
    		form.reset();
    		var sb = this.getBINRangeEdit().getStatusbar();
    		// once completed
    		sb.clearStatus();
        },

    	editpanelCloseBIN: function()
    	{
    		console.log('Clicked editpanelClose....');
    		$("#divBINRangeEdit").dialog('close');
    		this.getBINRangeEdit().hide();
        },


    	/////////////////End: Edit Panel Actions /////////////////////////////////

    	//=================================

    	setActiveRecordBIN: function(record)
    	{
            this.getBINRangeEdit().activeRecord = record;
            if (record)
    		{
                //('institutionedit >  #idBtnSave').enable();
    			this.getBINRangeEdit().down('#idBtnSave').enable();
                this.getBINRangeEdit().getForm().loadRecord(record);
            }
    		else
    		{
                //('institutionedit >  #idBtnSave').disable();
    			this.getBINRangeEdit().down('#idBtnSave').disable();
                this.getBINRangeEdit().getForm().reset();
            }
        },


    	//=================================
	//-----------end: Toolbar Actions-----------------------
	/////////////////////////////////////////////////////////////

});