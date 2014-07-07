var varSearchPanelHeight=670;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.transactionquery.Search',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.transactionquerysearch',

	requires:
	[

		'Ext.form.Panel',
        //'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        'Ext.ux.form.MultiSelect',
        'Ext.ux.form.field.DateTime',
        'Apm.view.SearchFooter',
        'Apm.view.lookup.Institution',
        'Apm.view.lookup.Issuer',
        'Apm.view.lookup.TokenProductGroup',

	],

	id		: 'idTransactionQuerySearch',
	renderTo: 'divTransactionQuerySearch',
	title	: 'Search Criteria',
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
    layout: 'absolute',
    fieldDefaults:
    {
        labelAlign: 'left',
        labelWidth: 100,
      //  anchor: '100%',
    },
	items:
    [

        {
            id			: 'idSInstitution',
			labelAlign: 'top',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Institution',
            blankText   : 'Institution is required',
            xtype		: 'institutionlookup',
            name		: 'institutionId',
            allowBlank	: false,
            readOnly	: false,
            x:10,
            y:10,
          	width: 250,
          	height:50,
        },
        {
            id			: 'idSDateFrom',
			labelAlign: 'top',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Date From',
			xtype: 'datetimefield',
            name		: 'dateFrom',
            endDateField: 'idSDateTo',
            //Doesn't catch the null input properly
            //allowBlank	: false,
            //format: 'd/m/Y',
            //Doesn't catch the null input properly
            //blankText   : 'Date From is required',
			size : 10,
          	x:10,
            y:65,
          	width: 250
        },
		 {
            id			: 'idSDateTo',
			labelAlign: 'top',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Date To',
			xtype: 'datetimefield',
            startDateField: 'idSDateFrom',
            name		: 'dateTo',
            //Doesn't catch the null input properly
            //blankText   : 'Date To is required',
            //format: 'd/m/Y',
            //Doesn't catch the null input properly
            //allowBlank	: false,
			size : 10,
			x:325,
            y:65,
            width: 250
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
          	x:10,
            y:115,
          	width: 300,
          	height:100,
         },
        {
            id			: 'idSTokenProduct',
			labelAlign: 'top',
            fieldLabel	: 'Token Product',
            name		: 'tokenProductIds',
          	xtype: 'multiselect',
            store: 'TokenProducts',
            valueField: 'id',
            displayField: 'name',
            //readOnly	: true,
			disabled: true,
            x:325,
            y:115,
            width: 300,
            height:100,
        },
		{
            id			: 'idSTransationType',
			labelAlign: 'top',
            fieldLabel	: 'Transaction Type',
            name		: 'transactionTypes',
          	xtype: 'multiselect',
            store: 'PMTransactionType',
            valueField: 'id',
            displayField: 'name',
            //readOnly	: true,
			disabled: false,
          	x:10,
            y:227,
            width: 300,
            height:100,
        },

        {
            id			: 'idSTransationStatus',
           	labelAlign: 'top',
            fieldLabel	: 'Transaction Status',
            name		: 'transactionStatus',
            xtype: 'multiselect',
            store: 'TxStatus',
            valueField: 'id',
            displayField: 'name',
           	disabled: false,
          	x:325,
            y:227,
          	width: 300,
          	height:100,
                },

        {
            id			: 'idSPMResponseCodes',
            labelAlign: 'top',
            fieldLabel	: 'Response Codes',
            name		: 'responseCodes',
          	xtype: 'multiselect',
            store: 'PMResponseCode',
            valueField: 'id',
            displayField: 'name',
            //readOnly	: true,
          	x:10,
            y:335,
          	width: 300,
          	height:100,
        },
		 {
            id			: 'idSClearPan',
			labelAlign: 'top',
            fieldLabel	: 'Clear PAN',
            name		: 'clearPan',
            x:10,
            y:435,
          	width: 250,
        },

        {
            id			: 'idSEncryptedPan',
			labelAlign: 'top',
            fieldLabel	: 'Encrypted Pan',
            name		: 'encryptedPan',
			size : 100,
            x:325,
            y:435,
          	width: 250,
        },
        {
            id			: 'idSCustomerCode',
            labelAlign: 'top',
			fieldLabel	: 'Customer Code',
            name		: 'customerCode',
			size : 100,
            x:10,
            y:480,
          	width: 250,
        },
        {
            id			: 'idSPanId',
			labelAlign: 'top',
            fieldLabel	: 'PAN Id',
            name		: 'panId',
			size : 10,
            x:325,
            y:480,
          	width: 250,
        },
         {
                 id			: 'idStart',
            name		: 'startDate',
     			size : 0,
     			hidden:true,
                 x:350,
                 y:480,
               	width: 250,
             },
        {
            id			: 'idEnd',
            name		: 'endDate',
            hidden:true,
			size : 0,
            x:370,
            y:480,
          	width: 250,
        },


    ],
  dockedItems:
    [
         {
            id 		: 'idTransactionQuerySearchFooter',
            xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idTransactionQuerySearchStatusbar',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idIssuerSearch'})
        },

    ],

	initComponent: function()
	{
        this.callParent(arguments);
    },

});

