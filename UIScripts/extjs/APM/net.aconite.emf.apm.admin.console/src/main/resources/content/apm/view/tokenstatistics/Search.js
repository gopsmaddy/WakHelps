var varSearchPanelHeight=300;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.tokenstatistics.Search',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.tokenstatisticssearch',

	requires:
	[

		'Ext.form.Panel',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        'Apm.view.SearchFooter',
        'Apm.view.lookup.Institution',
        'Apm.view.lookup.Issuer',
        'Apm.view.lookup.TokenProduct',
	],

	id		: 'idTokenStatsSearch',
	renderTo: 'divTokensReportsCriteria',
	title	: 'Search Criteria',
	hidden	: false,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    frame	: true,
	width	: (varSearchPanelWidth-30),
    height	: (varSearchPanelHeight-60),
    bodyPadding: 25,
    fieldDefaults:
    {
        labelAlign: 'left',
        labelWidth: 120,
        anchor: '100%',
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

        },
        {
            id			: 'idSIssuer',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Issuer',
            blankText   : 'NULL',
			xtype		: 'issuerlookup',
            name		: 'issuerId',
            allowBlank	: true,
            multiSelect : false,
            //readOnly	: true,
			disabled: true,

        },
        {
            id			: 'idSTokenProduct',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Token Product',
            blankText   : 'NULL',
            name		: 'tokenProductId',
			xtype		: 'tokenproductlookup',
            allowBlank	: true,
            //readOnly	: true,
			disabled: true,
			multiSelect : false,
			size : 100,
        }   ,
    ],

  dockedItems:
    [
         {
            id 		: 'idTokenStatisticsSearchFooter',
            xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idTokenStatisticsStatusbar',
        },

    ],

	initComponent: function()
	{
        this.callParent(arguments);

    },

});

