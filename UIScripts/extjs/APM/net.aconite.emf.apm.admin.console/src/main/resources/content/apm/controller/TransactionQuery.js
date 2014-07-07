var varManageTokensCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.TransactionQuery',
{
    extend	: 'Ext.app.Controller',

	id		: 'idTransactionQueryController',

	stores	: ['Transaction','Institution','Issuer','TokenProducts','PMResponseCode','PMTransactionType','PinDeliveryMethod','TxStatus'],

	models	: ['Transaction','Institution','Issuer','TokenProducts','PMResponseCode','PMTransactionType','PinDeliveryMethod','TxStatus'],

	views	:
	[
        'transactionquery.Search',
		'transactionquery.List',
		'transactionquery.Detail',
    ],

	refs:
	[
		{ref: 'transactionQuerySearch'	, selector: 'transactionquerysearch'},
        {ref: 'transactionQueryList'		, selector: 'transactionquerylist'},
		{ref: 'transactionQueryDetail'		, selector: 'transactionquerydetail'},
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
			'transactionquerylist':
			{
				beforerender	: this.beforeGridRender,

            },

			//---------Start : Column Actions---------------
			'transactionquerylist actioncolumn ':
			{
                itemclick : this.handleActionColumn
            },
			/////////////////End: Grid Panel Actions ///////////////////////////////////

	/////////////////Start: Search Panel Actions /////////////////////////////////
            'transactionquerysearch > toolbar button[action=submit]':
            {
                 click: this.searchpanelSubmit
            },
			'transactionquerysearch > toolbar button[action=search]':
            {
                 click: this.searchpanelSearch
            },
            'transactionquerysearch > toolbar button[action=reset]':
            {
                click: this.searchpanelReset
            },
            'transactionquerysearch  > toolbar button[action=clear]':
            {
                click: this.searchpanelClear
            },
            //========================
            'transactionquerysearch #idSInstitution':
            {
                select: this.onInstitutionComboSelect
            },
            'transactionquerysearch #idSIssuer':
            {
                change: this.onIssuerMultiSelect
            },
            'transactionquerysearch #idSTokenProduct':
            {
                select: this.onTokenProductMultiSelect
            },
            'transactionquerysearch #idSClearPan':
            {
                change: this.onClearPanChange
            },
            'transactionquerysearch #idSEncryptedPan':
            {
                change: this.onEncryptedPanChange
            },
            /////////////////End: Search Panel Actions /////////////////////////////////

			/////////////////Start: Edit Panel Actions /////////////////////////////////
            'transactionquerydetail > toolbar button[action=save]':
            {
                click: this.editpanelSave
            },
            'transactionquerydetail > toolbar button[action=close]':
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
        this.getPMResponseCodeStore().getProxy().extraParams={limit:100};
        this.getPMResponseCodeStore().load();
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
		Ext.ComponentQuery.query("transactionquerylist > toolbar")[0].hide();
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
	//	this.getManageTokensList().getView().getSelectionModel().select(rowIndex,false);

		if(action=='detail')
		{
         	Ext.ComponentQuery.query("#idBtnSave")[0].hide();
			console.log('Clicked actioncolumnDetail '+ record.get('id'));
			$( "#divTransactionQueryDetail" ).dialog(
			{
				open: function() { $(".ui-dialog-titlebar-close").hide(); },

				height: varEditPanelHeight,
				width : varEditPanelWidth,
				modal : varEditPanelStatus
			});
			this.getTransactionQueryDetail().show();
			this.getTransactionQueryDetail().loadRecord(record);

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
                var oneOffYear=getYear(Ext.getCmp('idSDateFrom').getValue());
                var oneOffMonth=getMonth(Ext.getCmp('idSDateFrom').getValue());
                var oneOffDay=getDay(Ext.getCmp('idSDateFrom').getValue());
                var oneOffHour=getHour(Ext.getCmp('idSDateFrom').getValue());
                var oneOffMinute=getMinute(Ext.getCmp('idSDateFrom').getValue());

                        var oneOffYearTo=getYear(Ext.getCmp('idSDateTo').getValue());
                        var oneOffMonthTo=getMonth(Ext.getCmp('idSDateTo').getValue());
                        var oneOffDayTo=getDay(Ext.getCmp('idSDateTo').getValue());
                        var oneOffHourTo=getHour(Ext.getCmp('idSDateTo').getValue());
                        var oneOffMinuteTo=getMinute(Ext.getCmp('idSDateTo').getValue());

                var dateStringFrom =  oneOffDay + "/" +  oneOffMonth + "/" + oneOffYear + " " +  oneOffHour + ":" + oneOffMinute
                var dateStringTo =  oneOffDayTo + "/" +  oneOffMonthTo + "/" + oneOffYearTo + " " +  oneOffHourTo + ":" + oneOffMinuteTo

                Ext.getCmp('idStart').setValue(dateStringFrom);
                Ext.getCmp('idEnd').setValue(dateStringTo);
        		var fp = this.getTransactionQuerySearch();
        		var store = this.getTransactionStore();

		if(fp.getForm().isValid())
		{
            console.log('searchpanelSearch....loading the data');

			this.loadData(fp,store);
			this.getTransactionQueryList().show();
		}


	},
	searchpanelReset: function()
	{
		console.log('Clicked searchpanelReset....');
		var fp = this.getTransactionQuerySearch();
		Ext.ComponentQuery.query("#idSIssuer")[0].getStore().removeAll();
		Ext.ComponentQuery.query("#idSTokenProduct")[0].getStore().removeAll();
		Ext.ComponentQuery.query("#idSIssuer")[0].disable();
		Ext.ComponentQuery.query("#idSTokenProduct")[0].disable();

		this.getTransactionQueryList().hide();
		fp.getForm().reset();
	},

	searchpanelClear: function()
	{
		console.log('Clicked searchpanelClear....');
	/*	var form = this.getManageTokensSearch().getForm();
		form.reset();
		var sb = this.getManageTokensSearch().getStatusbar();
		// once completed
		sb.clearStatus();   */
	},
    //=================================
    onInstitutionComboSelect: function(combo, records,eOpts )
    {
         console.log('onInstitutionComboSelect.... '+records[0].get('id'));
         this.getIssuerStore().getProxy().extraParams={limit:1000,institutionId: records[0].get('id')};
         this.getIssuerStore().load();
         Ext.ComponentQuery.query("#idSIssuer")[0].enable();
    },
    onIssuerMultiSelect: function(multiselect, issuerIDs, oldValue, eOpts)
    {

        if(issuerIDs!=null && issuerIDs.length>0){
            this.getTokenProductsStore().getProxy().extraParams={limit:1000,issuerId: issuerIDs};
            this.getTokenProductsStore().load();
        }
        Ext.ComponentQuery.query("#idSTokenProduct")[0].enable();

    },
    onTokenProductMultiSelect: function(multiselect, records,eOpts){
     console.log('onTokenProductMultiSelect.... '+records[0].get('id'));
                   alert('Selected a value');
    },
    onClearPanChange: function(){

        if(Ext.ComponentQuery.query("#idSClearPan")[0].getValue().length>0){
           Ext.ComponentQuery.query("#idSEncryptedPan")[0].disable();
        }else{
            Ext.ComponentQuery.query("#idSEncryptedPan")[0].enable();
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
       	/*	var active = this.getInstitutionEdit().activeRecord;
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
       		}    */
           },


       	editpanelClose: function()
       	{
       		console.log('Clicked editpanelClose....');
       		$("#divTransactionQueryDetail").dialog('close');
       		//this.getInstitutionEdit().hide();
        },


       	/////////////////End: Edit Panel Actions /////////////////////////////////

	//###################################################################################

    	setActiveRecord: function(record)
    	{
        /*    this.getManageTokensDetail().activeRecord = record;
            if (record)
    		{
    			//this.getManageTokensEdit().down('#idBtnSave').enable();
                this.getManageTokensDetail().getForm().loadRecord(record);
            }
    		else
    		{
    			//this.getManageTokensDetail().down('#idBtnSave').disable();
                this.getManageTokensDetail().getForm().reset();
            }   */
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