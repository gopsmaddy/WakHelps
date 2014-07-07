var varEditPanelHeight=450;
var varEditPanelWidth=600;
var varEditPanelStatus=true;
Ext.define('Apm.view.tokenproducts.Edit',
{
    extend: 'Ext.form.Panel',
	//extend: 'Ext.window.Window',
    alias : 'widget.tokenproductsedit',

	requires:
	[
	    'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
      //  'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',

        'Ext.ux.form.field.DateTime',
        'Apm.view.lookup.Issuer',
        'Apm.view.lookup.PersoBureau',
        'Apm.view.lookup.Country',
        'Apm.view.lookup.TokenProductGroup',
        'Apm.view.lookup.TokenProduct',

        'Apm.view.EditorFooter',

	],


	id:'idTokenProductsEdit',
	renderTo:'divTokenProductsEdit',
	border:0,
	hidden	: true,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',
    waitMsgTarget: true,
	//frame	: true,
	width	: (varEditPanelWidth-30),
	height	: (varEditPanelHeight-50),
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
						 id:'idID',
						xtype		: 'displayfield',
						fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Id',
						name		: 'id',
						value		: '<span style="color:black;">Id will be generated</span>',
					},
					{
                        id:'idName',
                        fieldLabel: '<span style="color:red;font-weight:bold">*</span>Name',
                        name: 'name',
                        hidden:false,
                        allowBlank:false,
                        blankText   : 'Please Specify a name',
                        maxLength	: 128,
                        enforceMaxLength: true,
                    },
					{
						id: 'idIssuerTokenProductCode',
						name: 'issuerTokenProductCode',
						fieldLabel: '<span style="color:red;font-weight:bold">*</span>Issuer Token Product Code',
						allowBlank:false,
                        blankText   : 'Please Specify Issuer Token Product Code',
                        maxLength	: 32,
                        enforceMaxLength: true,
					},
					{
						id:'idIssuerid',
						fieldLabel: '<span style="color:red;font-weight:bold">*</span>Issuer',
						name: 'issuerId',
						xtype: 'issuerlookup',
						allowBlank:false,
						hidden:false,
						blankText   : 'Please Specify Issuer',
					},
					{
						id:'idTokenProductGroupID',
						fieldLabel: '<span style="color:red;font-weight:bold">*</span>Token Product Group',
						name: 'tokenProductGroupId',
						xtype		: 'tokenproductgrouplookup',
						allowBlank:false,
						hidden:false,
						blankText   : 'Please Specify Token Product Group',
					},
					{
                        id:'idSameAsID',
                        xtype: 'checkboxfield',
                        fieldLabel: 'Same as Token Product',
                    },
					{
						id:'idReissueTokenProductID',
						fieldLabel: '<span style="color:red;font-weight:bold">*</span>Reissue Token Product',
						name: 'reissueTokenProductId',
						xtype: 'tokenproductlookup',
						allowBlank:false,
                        hidden:false,
                        blankText   : 'Please Specify Reissue Token Product',
					},
					{
                        id:'idRetentionDays',
                        fieldLabel: '<span style="color:red;font-weight:bold">*</span>Retention Days',
                        name: 'retentionDays',
                        xtype: 'numberfield',
                        allowBlank:false,
                        blankText   : 'Please Specify Retention Days',
                        value:180,
                    },
                    {
                        id:'idCountryCode',
                        fieldLabel: '<span style="color:red;font-weight:bold">*</span>Country',
                        name: 'countryCode',
                        xtype: 'countrylookup',
                        hidden:false,
                        allowBlank:false,
                        blankText   : 'Please Specify Country',
                    },
					{
						id:'idLanguangeCode',
						fieldLabel: '<span style="color:red;font-weight:bold">*</span>Languange Code',
						name: 'languageCode',
						hidden:false,
						allowBlank:false,
                        blankText   : 'Please Specify Languange Code',
                        maxLength	: 2,
                        enforceMaxLength: true,
                        //maskRe		: /[\W]/i,
                        regex		: /^\w{1,2}$/,
                        regexText	: 'Must be a 2-characters ISO 639-1 language code',
					},
					{
						id:'idPersoBureauID',
						fieldLabel: '<span style="color:red;font-weight:bold">*</span>Perso Bureau',
						name: 'persoBureauId',
						xtype: 'persobureaulookup',
						hidden:false,
						allowBlank:false,
                        blankText   : 'Please Specify Perso Bureau',
					},
					{
						id:'idFeedbackRequired',
						fieldLabel: '<span style="color:white;font-weight:bold">*</span>Feedback Required',
						name: 'feedbackRequired',
						xtype: 'checkboxfield',
						hidden:false,
					},
					{
                        id:'idStatus',
                        xtype: 'checkboxfield',
                        fieldLabel: '<span style="color:white;font-weight:bold">*</span>Active',
                        name: 'status',
                        hidden:false
                    },

        ],
    dockedItems:
    [
        {
            id 		: 'idTokenProductsEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            id		: 'idTokenProductsEditStatusbar',
            xtype	: 'statusbar',
            dock	: 'bottom',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idTokenProductsEdit'})
        },
	],

	initComponent: function()
	{
        this.callParent(arguments);
    },

});

