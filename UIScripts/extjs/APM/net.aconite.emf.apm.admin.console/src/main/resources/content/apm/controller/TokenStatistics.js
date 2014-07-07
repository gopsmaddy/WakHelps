Ext.define('Apm.controller.TokenStatistics',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idTokenStatisticsController',
	
	stores	: ['Institution','Issuer','TokenProducts','TokenStatistics'],
	
	models	: ['Institution','Issuer','TokenProducts','TokenStatistic'],
	
	views	: 
	[
        'tokenstatistics.Search',
		'tokenstatistics.List',
    ],
	
	refs: 
	[
		{ref: 'tokenStatisticsSearch'	, selector: 'tokenstatisticssearch'},
        {ref: 'tokenStatisticsList'		, selector: 'tokenstatisticslist'}
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
			'tokenstatisticslist':
			{
				beforerender	: this.beforeGridRender,
			},

			//---------Start : Column Actions---------------	
			'tokenstatisticslist actioncolumn ':
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////

	/////////////////Start: Search Panel Actions /////////////////////////////////
            'tokenstatisticssearch > toolbar button[action=search]':
            {
                 click: this.statsSearchPanelSearch
            },
            'tokenstatisticssearch > toolbar button[action=reset]':
            {
                click: this.statsSearchPanelReset
            },
                        //========================
            'tokenstatisticssearch #idSInstitution':
            {
                select: this.onInstitutionComboSelect
            },
            'tokenstatisticssearch #idSIssuer':
            {
                select: this.onIssuerComboSelect
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
		Ext.ComponentQuery.query("tokenstatisticslist > toolbar")[0].hide();
    },
	//---------end : Grid Actions-----------------------

	//-----------------start: actioncolumn Actions-------------	
	handleActionColumn : function(column, action, grid, rowIndex, colIndex, record, node)
	{
        console.log(action);

    },

	/////////////////Start: Search Panel Actions /////////////////////////////////
	statsSearchPanelSearch: function()
	{
	    console.log('Clicked statsSearchPanelSearch....');

        if(this.getTokenStatisticsSearch().getForm().isValid())
		{
		    this.loadData(this.getTokenStatisticsSearch(),this.getTokenStatisticsStore());
		    this.getTokenStatisticsList().show();
        }
	},
	statsSearchPanelReset: function()
	{
		console.log('Clicked statsSearchPanelReset....');
		var fp = this.getTokenStatisticsSearch();
		var store = this.getTokenStatisticsSearch();
		fp.getForm().reset();
		this.getTokenStatisticsList().hide();

		Ext.ComponentQuery.query("#idSIssuer")[0].disable();
		Ext.ComponentQuery.query("#idSTokenProduct")[0].disable();
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