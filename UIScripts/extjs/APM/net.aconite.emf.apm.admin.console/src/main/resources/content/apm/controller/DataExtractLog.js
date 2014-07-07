Ext.define('Apm.controller.DataExtractLog',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idDataExtractLogController',
	
	stores	: ['DataExtractLog','DataExtractLogType'],
	
	models	: ['DataExtractLog','DataExtractLogType'],
	
	views	: 
	[
        'dataextractlog.Search',
		'dataextractlog.List',
    ],
	
	refs: 
	[
		{ref: 'dataExtractLogSearch'	, selector: 'dataextractlogsearch'},
        {ref: 'dataExtractLogList'		, selector: 'dataextractloglist'}
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
			'dataextractloglist':
			{
				beforerender	: this.beforeGridRender,
				selectionchange	: this.rowSelected

            },			

			//---------Start : Column Actions---------------	
			'dataextractloglist actioncolumn ':
			{
                itemclick : this.handleActionColumn
            },					
			/////////////////End: Grid Panel Actions ///////////////////////////////////

	/////////////////Start: Search Panel Actions /////////////////////////////////
            'dataextractlogsearch > toolbar button[action=submit]':
            {
                 click: this.dataExtractLogSearchPanelSubmit
            },
			'dataextractlogsearch > toolbar button[action=search]':
            {
                 click: this.dataExtractLogSearchPanelSearch
            },
            'dataextractlogsearch > toolbar button[action=reset]':
            {
                click: this.dataExtractLogSearchPanelReset
            },
            'dataextractlogsearch  > toolbar button[action=clear]':
            {
                click: this.dataExtractLogSearchPanelClear
            },
            //========================
    /////////////////End: Search Panel Actions /////////////////////////////////
});
		
    },
	//###################################################################################
	/////////////////// Implementing Action Functions ///////////////////////////////////

	onLaunch: function()
    {
        console.log('onLaunch.... ');
        this.getDataExtractLogTypeStore().getProxy().extraParams={limit:1000};
        this.getDataExtractLogTypeStore().load();
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
	dataExtractLogSearchPanelSubmit: function()
	{
		console.log('Clicked extractlogSearchPanelClearSubmit....');

	},

	dataExtractLogSearchPanelSearch: function()
	{
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

        if(this.getDataExtractLogSearch().getForm().isValid()){
		    this.loadData(this.getDataExtractLogSearch(),this.getDataExtractLogStore());
		    this.getDataExtractLogList().show();

        }
	},
	dataExtractLogSearchPanelReset: function()
	{
		console.log('Clicked statsSearchPanelReset....');
		var fp = this.getDataExtractLogSearch();
		var store = this.getDataExtractLogSearch();
		fp.getForm().reset();
		this.getDataExtractLogList().hide();
    },

	dataExtractLogSearchClear: function()
	{
		console.log('Clicked statsSearchPanelClear....');
		var form = this.getDataExtractLogSearch().getForm();
		form.reset();
		var sb = this.getDataExtractLogSearch().getStatusbar();
		// once completed
		sb.clearStatus();
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