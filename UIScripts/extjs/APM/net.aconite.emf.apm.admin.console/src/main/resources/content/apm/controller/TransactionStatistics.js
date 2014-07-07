var varManageTokensCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 2});

Ext.define('Apm.controller.TransactionStatistics',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idTransactionStatisticsController',
	
	stores	: ['Institution','Issuer','TokenProducts','TransactionStatistics'],
	
	models	: ['Institution','Issuer','TokenProducts','TransactionStatistic'],
	
	views	: 
	[
        'transactionstatistics.Search',
		'transactionstatistics.List',
    ],
	
	refs: 
	[
		{ref: 'transactionStatisticsSearch'	, selector: 'transactionstatisticssearch'},
        {ref: 'transactionStatisticsList'		, selector: 'transactionstatisticslist'}
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
			'transactionstatisticslist':
			{
				beforerender	: this.beforeGridRender,
				selectionchange	: this.rowSelected

            },			

			//---------Start : Column Actions---------------	
			'transactionstatisticslist actioncolumn ':
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////

	/////////////////Start: Search Panel Actions /////////////////////////////////
            'transactionstatisticssearch > toolbar button[action=search]':
            {
                 click: this.statsSearchPanelSearch
            },
            'transactionstatisticssearch > toolbar button[action=reset]':
            {
                click: this.statsSearchPanelReset
            },
            //========================
            'transactionstatisticssearch #idSInstitution':
            {
                select: this.onInstitutionComboSelect
            },
            'transactionstatisticssearch #idSIssuer':
            {
                change: this.onIssuerMultiSelect
            }

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
        this.getIssuerStore().getProxy().extraParams={limit:1000};
        this.getIssuerStore().load();
        this.getTokenProductsStore().getProxy().extraParams={limit:1000,issuerId:''};
        this.getTokenProductsStore().load();
    },

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
		Ext.ComponentQuery.query("transactionstatisticslist > toolbar")[0].hide();
    },
	//------------------------------------------
	rowSelected: function(model, records)
	{

	},

	//---------end : Grid Actions-----------------------

	//-----------------start: actioncolumn Actions-------------	
	handleActionColumn : function(column, action, grid, rowIndex, colIndex, record, node)
	{
        console.log(action);

    },

	/////////////////Start: Search Panel Actions /////////////////////////////////
	statsSearchPanelSearch: function(){
	    console.log('Clicked statsSearchPanelSearch....');
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

        if(this.getTransactionStatisticsSearch().getForm().isValid())
		{
            this.loadData(this.getTransactionStatisticsSearch(),this.getTransactionStatisticsStore());
		    this.getTransactionStatisticsList().show();
		}
	},
	statsSearchPanelReset: function()
	{
		console.log('Clicked statsSearchPanelReset....');
		var fp = this.getTransactionStatisticsSearch();
		var store = this.getTransactionStatisticsSearch();
		fp.getForm().reset();
		this.getTransactionStatisticsList().hide();

		Ext.ComponentQuery.query("#idSIssuer")[0].disable();
        Ext.ComponentQuery.query("#idSTokenProduct")[0].disable();
        this.getIssuerStore().getProxy().extraParams={limit:1000};
        this.getIssuerStore().load();
        this.getTokenProductsStore().getProxy().extraParams={limit:1000,issuerId:''};
        this.getTokenProductsStore().load();
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
   },
    loadData: function(formpanel,store)
    	{
            formpanel.getEl().mask();
            //getForm() retrieves the Ext.basic.Form (from Ext.panel.Form)
			var params = formpanel.getForm().getValues();
            //Write over
            //Write over
			store.getProxy().extraParams = params;
			//load
			store.load();
            formpanel.getEl().unmask();
        },

});


