var varSearchPanelHeight=300;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.dataextractlog.Search',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.dataextractlogsearch',

	requires:
	[
        'Ext.form.Panel',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        'Ext.ux.form.field.DateTime',
        'Ext.ux.form.MultiSelect',
        'Apm.view.SearchFooter',
    ],

	id		: 'idDataExtractLogSearch',
	renderTo: 'divDataExtractLogCriteria',
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
    layout: 'absolute',
    fieldDefaults:
    {
        labelAlign: 'left',
        labelWidth: 30,
        anchor: '100%'
    },

	items:
    [
        {
            id			: 'idSDateFrom',
            labelAlign: 'top',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Date From',
            xtype: 'datetimefield',
            name		: 'dateFrom',
            endDateField: 'idSDateTo',

            x:10,
            y:10,
            width: 175
        },
         {
            id			: 'idSDateTo',
            labelAlign: 'top',
            fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Date To',
            xtype: 'datetimefield',
            startDateField: 'idSDateFrom',
            name		: 'dateTo',
            x:205,
            y:10,
            width: 175
        },
        {
            id: 'idExtractType',
            labelAlign: 'top',
            fieldLabel	: '<span style="color:white;font-weight:bold">*</span>Extract Type',
            xtype: 'multiselect',
            store: 'DataExtractLogType',
            valueField: 'id',
            displayField: 'name',
            name:'types',
            //readOnly	: true,
            disabled: false,
            x:10,
            y:65,
            width: 100,
            height:100,
        } ,
        {
                    id			: 'idStart',
                    name		: 'startDate',
                    size : 0,
                    hidden:true,
                    x:0,
                    y:100,
                    width: 0,
                },
                {
                    id			: 'idEnd',
                    name		: 'endDate',
                    hidden:true,
                    size : 0,
                    x:0,
                    y:100,
                    width: 0,
                },
    ],

  dockedItems:
    [
         {
            id 		: 'idDataExtractLogSearchFooter',
            xtype	: 'searchfooter',
            dock	: 'bottom',
            ui		: 'footer',
            hidden	: false
        },
        {
            xtype: 'statusbar',
            dock: 'bottom',
            id: 'idDataExtractLogStatusbar',
        },

    ],

	initComponent: function()
	{
        this.callParent(arguments);

    },

});

