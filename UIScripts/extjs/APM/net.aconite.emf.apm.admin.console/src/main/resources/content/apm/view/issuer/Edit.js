var varEditPanelHeight=300;
var varEditPanelWidth=600;
var varEditPanelStatus=true;

Ext.define('Apm.view.issuer.Edit',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.issueredit',
	
	requires: 
	[
			
		'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',

        'Ext.ux.form.field.DateTime',
        'Apm.view.EditorFooter',
        'Apm.view.lookup.Institution',
         'Apm.view.lookup.Country',
	],
	

						
	id		: 'idIssuerEdit',
	renderTo: 'divIssuerEdit',	
	title	: 'Issuer Details',
	hidden	: true,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    //frame	: true,
    width	: (varEditPanelWidth-30),
    height	: (varEditPanelHeight-60),
    bodyPadding: 5,
    fieldDefaults:
    {
        labelAlign: 'left',
        labelWidth: 120,
        anchor: '100%'
    },
	items: 
    [
        {
            xtype		: 'displayfield',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Id',
            name		: 'id',
            value		: '<span style="color:black;">Id will be generated</span>',

        },
        {
            id			: 'idEName',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Issuer Name',
            blankText   : 'Name is required',
            name		: 'name',
            allowBlank	: false,
            readOnly	: false,
			maxLength	: 128,
			enforceMaxLength: true,
        },
        {
            id			: 'idEInstitution',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Institution',
            blankText   : 'Institution is required',
            xtype		: 'institutionlookup',
            name		: 'institutionId',
            allowBlank	: false,
            readOnly	: false,
        },
        {
            id			: 'idECountry',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Country',
            blankText   : 'Country is required',
            xtype		: 'countrylookup',
            name		: 'countryId',
            allowBlank	: false,
            readOnly	: false,
        },

    ],
	
    dockedItems:
    [
         {
            id 		: 'idIssuerEditFooter',
            xtype	: 'editorfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idIssuerEditStatusbar',
            //defaultText: 'Ready',
           // plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idIssuerEdit'})
        }

    ],
		
	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

