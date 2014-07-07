var varEditPanelHeightBIN=350;
var varEditPanelWidthBIN=600;
var varEditPanelStatusBIN=true;

Ext.define('Apm.view.binrange.Edit',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.binrangeedit',

	requires:
	[
		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        //'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',

        'Ext.ux.form.field.DateTime',
        'Apm.view.lookup.Issuer',
        'Apm.view.lookup.TokenProduct',

        'Apm.view.EditorFooter',

	],



	id:'idBINRangeEdit',
	renderTo:'divBINRangeEdit',
	title:' BIN Range Details',
    hidden	: true,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    //frame	: true,
    width	: (varEditPanelWidthBIN-30),
    height	: (varEditPanelHeightBIN-60),
    bodyPadding: 5,
    fieldDefaults:
    {
        labelAlign: 'left',
        labelWidth: 160,
        anchor: '100%'
    },
	//listClass: 'x-column-header-text',
	items:
	[
        {
            xtype		: 'displayfield',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Id',
            name		: 'id',
            value		: '<span style="color:black;">Id will be generated</span>',

        },
        {
            fieldLabel  : '<span style="color:red;font-weight:bold">*</span>Token Product ID',
            name        : 'tokenProductId',
            xtype		: 'tokenproductlookup',
            blankText   : 'Please Specify Name',
            allowBlank : false,
            maxLength	: 128,
            enforceMaxLength: true,
        },
        {
            id:'idAppSeqNumBIN',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>App Sequence Number',
            name: 'appSeqNumber',
            xtype: 'numberfield',
            allowBlank:false,
            blankText   : 'Please Specify App Sequence Number',
            maskRe		: /[\d]/i,
            regex		: /^\d{1,2}$/,
            regexText	: 'Must be a numeric value in the format xx',
        },
        {
            id:'idBINfromBIN',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>BIN From',
            name: 'binFrom',
           // xtype: 'numberfield',
            allowBlank:false,
            blankText   : 'Please Specify a BIN From range',
            hidden:false,
            maskRe		: /[\d]/i,
            regex		: /^\d{16,19}$/,
            regexText	: 'Must be a numeric value of size 16 to 19',
            maxLength   : 19,
        },{
            id:'idBINToBIN',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>BIN To',
            name: 'binTo',
           // xtype: 'numberfield',
            allowBlank:false,
            blankText   : 'Please Specify a BIN To range',
            hidden:false,
            maskRe		: /[\d]/i,
            regex		: /^\d{16,19}$/,
            regexText	: 'Must be a numeric value of size 16 to 19',
            maxLength   : 19,
        },
        {
            id:'idDescriptionBIN',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>Description',
            name: 'description',
            allowBlank:false,
            blankText   : 'Please Specify a description',
            hidden:false,
            maxLength	: 512,
            enforceMaxLength: true,
        },

	],
	dockedItems:
    [
        {
            id 		: 'idBinRangeEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            id		: 'idBinRangeEditStatusbar',
            xtype	: 'statusbar',
            dock	: 'bottom',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idBinRangeEdit'})
        },
    ],

	initComponent: function()
	{
        this.callParent(arguments);
    },

});

