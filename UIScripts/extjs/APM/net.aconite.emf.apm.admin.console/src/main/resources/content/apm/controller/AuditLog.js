Ext.define('Apm.controller.AuditLog',
{
    extend	: 'Ext.app.Controller',
	
	id		: 'idAuditLogController',
	
	stores	: ['AuditLog'],
	
	models	: ['AuditLog'],
	
	views	: 
	[
        'auditlog.Search',
		'auditlog.List',
    ],
	
	refs: 
	[
		{ref: 'auditLogSearch'	, selector: 'auditlogsearch'},
        {ref: 'auditLogList'	, selector: 'auditloglist'}
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
			'auditloglist':
			{
				beforerender	: this.beforeGridRender
            },
			/////////////////End: Grid Panel Actions ///////////////////////////////////
	        /////////////////Start: Search Panel Actions /////////////////////////////////
			'auditlogsearch > toolbar button[action=search]':
            {
                 click: this.auditLogSearchPanelSearch
            },
            'auditlogsearch > toolbar button[action=reset]':
            {
                click: this.auditLogSearchPanelReset
            },
            /////////////////End: Search Panel Actions /////////////////////////////////
});
		
    },
	//###################################################################################
	/////////////////// Implementing Action Functions ///////////////////////////////////

	onLaunch: function()
    {
        console.log('onLaunch.... ');
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

	//---------end : Grid Actions-----------------------

	/////////////////Start: Search Panel Actions /////////////////////////////////
	auditLogSearchPanelSearch: function()
	{
	    console.log('Clicked auditLogSearchPanelSearch....');

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

        var fp = this.getAuditLogSearch();
        var store = this.getAuditLogStore();

        if(fp.getForm().isValid())
		{
		    this.loadData(fp, store);
		    this.getAuditLogList().show();
        }
	},
	auditLogSearchPanelReset: function()
	{
		console.log('Clicked auditLogSearchPanelReset....');
		var fp = this.getAuditLogSearch();
		var store = this.getAuditLogSearch();
		fp.getForm().reset();
		this.getAuditLogList().hide();
	},    	
    //=================================
	loadData: function(formpanel,store)
    {
        formpanel.getEl().mask();
        //getForm() retrieves the Ext.basic.Form (from Ext.panel.Form)
        var params = formpanel.getForm().getValues();
        //Write over
        store.getProxy().extraParams = params;
        store.getProxy().extraParams.limit = 1000;
        //load
        store.load();
        formpanel.getEl().unmask();
    },
});