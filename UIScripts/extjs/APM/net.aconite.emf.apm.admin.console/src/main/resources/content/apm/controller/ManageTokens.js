var varManageTokensCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.ManageTokens',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idManageTokensController',
	
	stores	: ['TokenProductGroups','Institution','Issuer','TokenProducts','ManageTokens','TokenAppStatus'],
	
	models	: ['TokenProductGroups','Institution','Issuer','TokenProducts','ManageTokens','TokenAppStatus'],
	
	views	: 
	[
        'managetokens.Search',
		'managetokens.List',
		'managetokens.Detail',
    ],
	
	refs: 
	[
		{ref: 'manageTokensSearch'	, selector: 'managetokenssearch'},
        {ref: 'manageTokensList'		, selector: 'managetokenslist'},
		{ref: 'manageTokensDetail'		, selector: 'managetokensdetail'},
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
			'managetokenslist':
			{
				beforerender	: this.beforeGridRender,
				selectionchange	: this.rowSelected

            },			

			//---------Start : Column Actions---------------	
			'managetokenslist actioncolumn ':
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////

	/////////////////Start: Search Panel Actions /////////////////////////////////
            'managetokenssearch > toolbar button[action=submit]':
            {
                 click: this.searchpanelSubmit
            },
			'managetokenssearch > toolbar button[action=search]':
            {
                 click: this.searchpanelSearch
            },
            'managetokenssearch > toolbar button[action=reset]':
            {
                click: this.searchpanelReset
            },
            'managetokenssearch  > toolbar button[action=clear]':
            {
                click: this.searchpanelClear
            },
            //========================
            'managetokenssearch #idSInstitution':
            {
                select: this.onInstitutionComboSelect
            },
            'managetokenssearch #idSIssuer':
            {
                select: this.onIssuerComboSelect
            },
            'managetokenssearch #idSClearPan':
            {
                change: this.onClearPanChange
            },
            'managetokenssearch #idSEncryptedPan':
            {
                change: this.onEncryptedPanChange
            },
            /////////////////End: Search Panel Actions /////////////////////////////////

			/////////////////Start: Edit Panel Actions /////////////////////////////////
            'managetokensdetail > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'managetokensdetail > toolbar button[action=close]':
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
        this.getInstitutionStore().getProxy().extraParams={limit:1000};
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
		Ext.ComponentQuery.query("managetokenslist > toolbar")[0].hide();
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
			//Ext.ComponentQuery.query("managetokenslist > toolbar button[action=detail]")[0].enable();

		}		
	},

	//---------end : Grid Actions-----------------------

	//-----------------start: actioncolumn Actions-------------	
	handleActionColumn : function(column, action, grid, rowIndex, colIndex, record, node)
	{
        console.log(action);
		this.getManageTokensList().getView().getSelectionModel().select(rowIndex,false);

		if(action=='detail')
		{
							
			console.log('Clicked actioncolumnDetail '+ record.get('id'));
			Ext.ComponentQuery.query("#idBtnSave")[0].enable();
			$( "#divManageTokensDetail" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});		
			this.getManageTokensDetail().show();
			this.getManageTokensDetail().loadRecord(record);

			
		}
		
    },	

	/////////////////Start: Search Panel Actions /////////////////////////////////
	searchpanelSubmit: function()
	{
		console.log('Clicked searchpanelClearSubmit....');	
			
	},
	searchpanelSearch: function()
	{
	    console.log('Clicked searchpanelSearch....');

        var prevDate = Ext.getCmp('idSExpiryDate').getValue();

        if(Ext.getCmp('idSExpiryDate').getValue().length>9 && Ext.getCmp('idSExpiryDate').getValue().indexOf('/') == -1  )
        {
            var fullDate = new Date(prevDate);
            var day =  fullDate.getDate();
            var month = fullDate.getMonth()+1;
            var year = fullDate.getFullYear();
            Ext.getCmp('idSExpiryDate').setValue(day+"/"+month+"/"+year);
        }

        this.getTokenAppStatusStore().load();

		if(this.getManageTokensSearch().getForm().isValid())
		{
		    this.loadData(this.getManageTokensSearch(),this.getManageTokensStore());
			Ext.getCmp('idSExpiryDate').setValue(prevDate);
            this.getManageTokensList().show();
            this.getManageTokensList().getChildByElement("idManageTokensBBar").moveFirst();
		}
		
		
	},
	searchpanelReset: function()
	{
		console.log('Clicked searchpanelReset....');
		var fp = this.getManageTokensSearch();
		var store = this.getManageTokensSearch();
		//this.getIssuerSearch().getForm().setActiveRecord(null);
		fp.getForm().reset();
		//this.loadData(fp,store);
		this.getManageTokensList().hide();
		Ext.ComponentQuery.query("#idSIssuer")[0].disable();
		Ext.ComponentQuery.query("#idSTokenProduct")[0].disable();
	},    	

	searchpanelClear: function()
	{
		console.log('Clicked searchpanelClear....');
		var form = this.getManageTokensSearch().getForm();
		form.reset();
		var sb = this.getManageTokensSearch().getStatusbar();
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
        this.getTokenProductsStore().getProxy().extraParams={limit:1000,issuerId: records[0].get('id')};
        this.getTokenProductsStore().load();
        Ext.ComponentQuery.query("#idSTokenProduct")[0].enable();
    },
    onClearPanChange: function(){

        if(Ext.ComponentQuery.query("#idSClearPan")[0].getValue().length>0){
           Ext.ComponentQuery.query("#idSEncryptedPan")[0].disable();
        }else{
            Ext.ComponentQuery.query("#idSEncryptedPan")[0].enable();
        }

        if(Ext.ComponentQuery.query("#idSClearPan")[0].getValue().length>0 && Ext.ComponentQuery.query("#idSTokenProduct").SelectedIndex == 0){
            Ext.ComponentQuery.query("#idSTokenProduct")[0].disable();
        }
        else{
            if(Ext.ComponentQuery.query("#idsIssuer").SelectedIndex == 0){
             Ext.ComponentQuery.query("#idSTokenProduct")[0].enable();
            }
        }
    },
    onEncryptedPanChange: function(){

        if(Ext.ComponentQuery.query("#idSEncryptedPan")[0].getValue().length>0){
           Ext.ComponentQuery.query("#idSClearPan")[0].disable();
        }else{
            Ext.ComponentQuery.query("#idSClearPan")[0].enable();
        }
    },
    	/////////////////End: Search Panel Actions /////////////////////////////////

   	/////////////////Start: Edit Panel Actions /////////////////////////////////
       	editpanelSave: function()
       	{
       		console.log('Clicked editpanelSave....');
       		var active = this.getManageTokensDetail().activeRecord;
       		if (!active)
       		{

       				return;
       		}
       		var form = this.getManageTokensDetail().getForm();
       		s = '';
       		if (form.isValid())
       		{
       			Ext.iterate(form.getValues(), function(key, value)
       			{
       				s += Ext.util.Format.format("{0} = {1}<br />", key, value);
       			}, this	);

       			var selection = this.getManageTokensList().getView().getSelectionModel().getSelection()[0];

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
       			$("#divManageTokensDetail").dialog('close');
       			this.getManageTokensDetail().hide();
       		}
           },


       	editpanelClose: function()
       	{
       		console.log('Clicked editpanelClose....');
       		$("#divManageTokensDetail").dialog('close');
       		//this.getInstitutionEdit().hide();
           },


       	/////////////////End: Edit Panel Actions /////////////////////////////////

	//###################################################################################

    	setActiveRecord: function(record)
    	{
            this.getManageTokensDetail().activeRecord = record;
            if (record)
    		{                
    			this.getManageTokensDetail().down('#idBtnSave').enable();
                this.getManageTokensDetail().getForm().loadRecord(record);
            }
    		else
    		{                
    			this.getManageTokensDetail().down('#idBtnSave').disable();
                this.getManageTokensDetail().getForm().reset();
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

});