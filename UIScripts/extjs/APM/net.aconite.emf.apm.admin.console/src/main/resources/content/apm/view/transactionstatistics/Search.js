var varSearchPanelHeight=300;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.transactionstatistics.Search',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.transactionstatisticssearch',

	requires:
	[

		'Ext.form.Panel',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        'Apm.view.SearchFooter',
        'Apm.view.lookup.Institution',
        'Ext.ux.form.field.DateTime',
        'Ext.ux.form.MultiSelect',
	],

	id		: 'idTransactionStatsSearch',
	renderTo: 'divTransactionsReportsCriteria',
	title	: 'Search Criteria',
	hidden	: false,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',
    layout: 'absolute',
    waitMsgTarget: true,
    frame	: true,
	width	: (varSearchPanelWidth-30),
    height	: (varSearchPanelHeight-60),
    bodyPadding: 25,
    fieldDefaults:
    {
        labelAlign: 'left',
    },

	items:
    [
        {
            id			: 'idSInstitution',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Institution',
            blankText   : 'Institution is required',
            xtype		: 'institutionlookup',
            name		: 'institutionId',
            allowBlank	: false,
            readOnly	: false,
            multiSelect : false,
            anchor: '100%',
            width : 200,
            x: 10,
            y: 10,

        },
        {
            id			: 'idSIssuer',
            labelAlign: 'top',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Issuer',
            blankText   : null ,
            xtype: 'multiselect',
            store: 'Issuer',
            valueField: 'id',
            displayField: 'name',
            name		: 'issuerIds',
            disabled: true,
            allowBlank	: true,
            x:205,
            y:50,
            width: 250,
            height:100,
         },
        {
            id			: 'idSTokenProduct',
            labelAlign: 'top',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Token Product',
            blankText   : 'NULL',
            name		: 'tokenProductIds',
			xtype		: 'multiselect',
			store       : 'TokenProducts',
			valueField: 'id',
            displayField: 'name',
            allowBlank	: true,
            disabled: true,
            height: 100,
			width: 250,
			x: 465,
			y: 50,

        }   ,
        {
            id			: 'idSDateFrom',
            labelAlign: 'top',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Date From',
            xtype: 'datetimefield',
            name		: 'dateFrom',
            endDateField: 'idSDateTo',

            x:10,
            y:50,
            width: 180 ,
        },
         {
            id			: 'idSDateTo',
            labelAlign: 'top',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Date To',
            xtype: 'datetimefield',
            startDateField: 'idSDateFrom',
            name		: 'dateTo',

            x:10,
            y:110,
            width: 180,
        },
        {
            id			: 'idStart',
            name		: 'startDate',
            size : 0,
            hidden:true,
            x:0,
            y:0,
            width: 0,
        },
        {
            id			: 'idEnd',
            name		: 'endDate',
            hidden:true,
            size : 0,
            x:0,
            y:0,
            width: 0,
        },
    ],

  dockedItems:
    [
         {
            id 		: 'idTransactionStatisticsSearchFooter',
            xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idTransactionStatisticsStatusbar',
        },

    ],

	initComponent: function()
	{
        this.callParent(arguments);

    },

});

