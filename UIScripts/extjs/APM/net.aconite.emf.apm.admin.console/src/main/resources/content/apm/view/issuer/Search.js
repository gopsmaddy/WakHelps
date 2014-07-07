var varSearchPanelHeight=220;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.issuer.Search',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.issuersearch',
	
	requires: 
	[
			
		'Ext.form.Panel',
        //'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        //'Ext.ux.statusbar.ValidationStatus',
        //'Ext.ux.form.field.DateTime',
		
        'Apm.view.SearchFooter',
        'Apm.view.lookup.Institution',
        //'Apm.view.lookup.Country',
	],
	

						
	id		: 'idIssuerSearch',
	renderTo: 'divIssuerSearch',	
	title	: 'Issuer Search Criteria',
	hidden	: false,
    activeRecord: null,
    defaultType: 'textfield',
    listClass: 'x-column-header-text',

    waitMsgTarget: true,
    //frame	: true,
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
            id			: 'idSName',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Issuer Name',
            blankText   : 'Name is required',
            name		: 'name',
            allowBlank	: true,
            readOnly	: false,
            maxLength	: 128,
            enforceMaxLength: true,
        },
        
    ],
	
    dockedItems:
    [
         {
            id 		: 'idIssuerSearchFooter',
            xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false,
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idIssuerSearchStatusbar',
            //defaultText: 'Ready',
            //plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'idIssuerSearch'})
        },

    ],
	
	initComponent: function() 
	{   
        this.callParent(arguments);
    },	
	
});

