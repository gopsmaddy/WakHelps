var varSearchPanelHeight=650;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.ordertoken.Order',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.ordertokenorder',

	requires:
	[
        'Ext.form.Panel',
        //'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',
        //'Ext.ux.form.field.DateTime',

        'Apm.view.ordertoken.List',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Apm.view.SearchFooter',

        'Apm.view.lookup.Institution',
        'Apm.view.lookup.Issuer',
        'Apm.view.lookup.TokenProduct',
        'Apm.view.lookup.TokenOrderType',
        'Apm.view.lookup.Interface',
	],

	id		: 'idOrderTokenOrder',
	renderTo: 'divOrderTokenOrder',
	title	: 'Order Token Details',
	hidden	: false,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    frame	: true,
	//autoWidth: true,
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
        },
        {
            id			: 'idSInterface',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Interface',
            blankText   : 'Interface is required',
            xtype		: 'interfacelookup',
            name		: 'interfaceId',
            allowBlank	: false,
            //readOnly	: true,
            disabled: true,
        },
        {
            id			: 'idSIssuer',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Issuer',
            blankText   : 'Issuer is required',
			xtype		: 'issuerlookup',
            name		: 'issuerId',
            allowBlank	: false,
            //readOnly	: true,
			disabled: true,
        },
        {
            id			: 'idSTokenProduct',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Token Product',
            blankText   : 'You need to select at one Token Product',
            name		: 'tokenProductId',
			xtype		: 'tokenproductlookup',
            allowBlank	: false,
            //readOnly	: true,
			disabled: true,
			multiSelect : false,
			size : 100,
        },
        {
            id			: 'idSTokenOrderType',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Order Type',
            blankText   : 'Order type is required',
            xtype		: 'tokenordertypelookup',
            name		: 'tokenordertypeId',
            allowBlank	: false,
            readOnly	: false,
        },
        {
            id: 'idSTokenFeedbackFlag',
            xtype: 'radiogroup',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Feedback?',
            allowBlank	: false,
            items:
            [
                {
                    boxLabel: 'Yes',
                    name: 'feedbackFlag',
                    inputValue: 'Y',
                    allowBlank	: false,
                },
                {
                    boxLabel: 'No',
                    name: 'feedbackFlag',
                    inputValue: 'N',
                    allowBlank	: false,
                },
                {
                    boxLabel: 'Default',
                    name: 'feedbackFlag',
                    inputValue: 'D',
                    allowBlank	: false,
                },
            ],
        },
        {
            id:'idGridTokenApp',
            xtype: 'ordertokenlist',
            height: 300,
            title:'Token Application',
            padding: '10 0 0 0',
        },
    ],

    dockedItems:
    [
         {
            id 		: 'idOrderTokenSearchFooter',
            xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idOrderTokenSearchStatusbar',
        },

    ],

	initComponent: function()
	{
        this.callParent(arguments);
    },

});

