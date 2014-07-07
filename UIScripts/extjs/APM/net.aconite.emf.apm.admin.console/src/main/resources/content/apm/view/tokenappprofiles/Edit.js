var varEditPanelHeightTAP=800;
var varEditPanelWidthTAP=600;
var varEditPanelStatusTAP=true;


Ext.define('Apm.view.tokenappprofiles.Edit',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.tokenappprofilesedit',

	requires:
	[
		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        //'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',

        'Ext.ux.form.field.DateTime',
        'Apm.view.lookup.Issuer',
        'Apm.view.lookup.EncryptionZone',
        'Apm.view.lookup.TokenProduct',
        'Apm.view.lookup.VerificationMethod',
        'Apm.view.lookup.EncryptionKey',
        'Apm.view.lookup.PanGenerationRule',
        'Apm.view.lookup.PinGenerationRule',
        'Apm.view.lookup.PinDeliveryMethod',
        'Apm.view.lookup.Status',

        'Apm.view.EditorFooter',


	],


	id:'idTokenAppProfilesEdit',
	renderTo:'divTokenAppProfilesEdit',
//	title:' Token App Profiles Details',
    hidden	: true,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    //frame	: true,
    width	: (varEditPanelWidthTAP-30),
    height	: (varEditPanelHeightTAP-60),
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
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Token Product Id',
            id:'idTokenProductId',
            name: 'tokenProductId',
            xtype		: 'tokenproductlookup',
            allowBlank:false,
            blankText   : 'Please select a token product',
        },
        {
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>App Sequence Number',
            id:'idAppSeqNumberTAP',
            name: 'appSequenceNumber',
            xtype: 'numberfield',
            allowBlank:false,
            blankText   : 'Please Specify an application sequence number',
            maskRe		: /[\d]/i,
            regex		: /^\d{1,2}$/,
            regexText	: 'Must be a numeric value in the format xx',
        },
        {
            id:'idStatusTAP',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>Status',
            name: 'status',
            xtype		: 'statuslookup',
            hidden:false
        },
        {
            id:'idNameTAP',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Name',
            name: 'name',
            hidden:false,
            allowBlank:false,
            blankText   : 'Please Specify a name',
        },
        {
            id:'idDefaultAppFlagTAP',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>Default App',
            name: 'defaultAppFlag',
            xtype: 'checkboxfield',
            hidden:false
        },{
            id:'idPINRequiredFlagTAP',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>PIN Required',
            name: 'pinRequiredFlag',
            xtype: 'checkboxfield',
            hidden:false
        },{
            id:'idPUKrequiredflagTAP',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>PUK Required',
            name: 'pukRequiredFlag',
            xtype: 'checkboxfield',
            hidden:false
        },{
            id:'idPINlengthTAP',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>PIN Length',
            name: 'pinLength',
            hidden:false,
            xtype: 'numberfield',
            value:1,
            allowBlank:false,
            blankText   : 'Please Specify a PIN Length',
        },{
            id:'idPUKlengthTAP',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>PUK Length',
            name: 'pukLength',
            hidden:false,
            xtype: 'numberfield',
            value:1,
            allowBlank:false,
            blankText   : 'Please Specify a PUK Length',
        },
        {
                      id:'idPANGenerationRuleIdTAP',
                      fieldLabel: '<span style="color:red;font-weight:bold">*</span>PAN Generation Rule',
                      name: 'panGenerationRuleId',
                      hidden:false,
                      xtype		: 'pangenerationrulelookup',
                      allowBlank:false,
                      blankText   : 'Please Specify a generation rule',

        },
        {
                      id:'idPINGenerationRuleIdTAP',
                      fieldLabel: '<span style="color:red;font-weight:bold">*</span>PIN Generation Rule',
                      name: 'pinGenerationRuleId',
                      hidden:false,
                      xtype		: 'pingenerationrulelookup',
                      allowBlank:false,
                      blankText   : 'Please Specify a generation rule',

        },
    /*	{
            id:'idPUKChangeFlagTAP',
            fieldLabel: 'PUK Change',
            name: 'allowPukChangeFlag',
            hidden:false
        },*/
            {
            id:'idExpiryInDaysTAP',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Expiry in days',
            name: 'expiryInDays',
            hidden:false,
            xtype: 'numberfield',
            value:1 ,
            allowBlank:false,
            blankText   : 'Please Specify an expiry in days',
        },
        {
            id:'idEImportEncryptionZone',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Import Encryption Zone',
            name: 'importEncryptionZoneId',
            xtype		: 'encriptionzonelookup',
            hidden:false,
            allowBlank:false,
            blankText   : 'Please Specify an import encryption zone',
        },
        {
            id:'idEExportEncryptionZone',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Export Encryption Zone',
            xtype		: 'encriptionzonelookup',
            name: 'exportEncryptionZoneId',
            hidden:false,
            allowBlank:false,
            blankText   : 'Please Specify an export encryption zone',
        },
        {
            id:'idEPinVerficationMethodId',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Verification Method',
            xtype		: 'verificationmethodlookup',
            name: 'pinVerificationMethodId',
            hidden:false,
            allowBlank:false,
            blankText   : 'Please Specify a verification method',
        },
        {
            id:'idEPinVerficationKeyId',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>Verification key',
            xtype		: 'encryptionkeylookup',
            name: 'pinVerificationKeyId',
            hidden:false,
            allowBlank:false,
            blankText   : 'Please Specify a verification key',
        },
        {
            id:'idEPinTries',
            fieldLabel: '<span style="color:red;font-weight:bold">*</span>PIN tries',
        //	xtype		: 'encriptionzonelookup',
            name: 'pinTriesNumber',
            hidden:false,
            xtype: 'numberfield',
            value:1,
            allowBlank:false,
            blankText   : 'Please Specify pin tries',
        },
        
        {
            id:'idEUsesPinOfTokenAppSeqNum',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>Uses Pin Of Token App Seq Num',
        //	xtype		: 'encriptionzonelookup',
            name: 'usesPinOfTokenAppSeqNum',
            hidden:false,
            xtype: 'numberfield',
            blankText   : 'Please Specify a value for Pin Of Token App Seq Num',
        },
        {
            id:'idEUsesPukOfTokenAppSeqNum',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>Uses Puk Of Token App Seq Num',
        //	xtype		: 'encriptionzonelookup',
            name: 'usesPukOfTokenAppSeqNum',
            hidden:false,
            xtype: 'numberfield',
            blankText   : 'Please Specify a value for Puk Of Token App Seq Num',
        },
        {
            id:'idEPinDeliveryMethodId',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>Pin Delivery Method Id',        	
            name: 'pinDeliveryMethodId',
            hidden:false,
            xtype		: 'pindeliverymethodlookup',            
            blankText   : 'Please Specify a Pin Delivery Method Id',
        },
        
        {
            id:'idEPukGenerationRuleId',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>Puk Generation Rule Id',        	
            name: 'pukGenerationRuleId',
            hidden:false,
            xtype		: 'pingenerationrulelookup',
            //
            blankText   : 'Please Specify a Puk Generation Rule Id',
        },        
        {
            id:'idEAllowPinChangeFlag',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>Allow Pin Change',
            name: 'allowPinChangeFlag',
            xtype: 'checkboxfield',
            hidden:false
        },
        {
            id:'idEAllowPukChangeFlag',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>Allow Puk Change',
            name: 'allowPukChangeFlag',
            xtype: 'checkboxfield',
            hidden:false
        },          
        {
            id:'idEPinGenerationKey',
            fieldLabel: '<span style="color:white;font-weight:bold">*</span>PIN Generation Key',
            name: 'pinGenerationKeyId',
            hidden:false,
            xtype: 'encryptionkeylookup',
            blankText   : 'Please Specify Pin Generation Key',
        },
	],
	dockedItems:
    [
        {
            id 		: 'idTokenAppProfilesEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            id		: 'idTokenAppProfilesEditStatusbar',
            xtype	: 'statusbar',
            dock	: 'bottom',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idTokenAppProfilesEdit'})
        },
    ],


	initComponent: function()
	{
        this.callParent(arguments);
    },

  });