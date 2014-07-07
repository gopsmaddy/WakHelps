var varSearchPanelHeight=300;
var varSearchPanelWidth=800;
var varSearchPanelStatus=true;

Ext.define('Apm.view.auditlog.Search',
{
    extend: 'Ext.form.Panel',
    alias : 'widget.auditlogsearch',

	requires:
	[
		'Ext.form.Panel',
        'Ext.tip.QuickTipManager',
        'Ext.ux.statusbar.StatusBar',
        'Ext.ux.form.field.DateTime',
        'Apm.view.SearchFooter',
	],

	id		: 'idAuditLogSearch',
	renderTo: 'divAuditLogCriteria',
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
            xtype: 'container',
            layout: 'hbox',
            defaultType: 'textfield',
            items:
            [
                {
                    id			: 'idSDateFrom',
                    labelAlign: 'top',
                    fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Date From',
                    xtype: 'datetimefield',
                    name		: 'dateFrom',
                    endDateField: 'idSDateTo',
                    size : 10,
                    width: 250
                },
                {
                    id: 'idSUsername',
                    labelAlign: 'top',
                    fieldLabel: 'User name',
                    name: 'username',
                    flex: 1,
                },
            ],
        },
        {
            xtype: 'splitter'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            defaultType: 'textfield',
            items:
            [
                {
                    id			: 'idSDateTo',
                    labelAlign: 'top',
                    fieldLabel	: '<span style="color:red;font-weight:bold">*</span>Date To',
                    xtype: 'datetimefield',
                    name		: 'dateTo',
                    startDateField: 'idSDateFrom',
                    size : 10,
                    width: 250
                },
                {
                    id: 'idSOriginator',
                    labelAlign: 'top',
                    fieldLabel: 'Originator',
                    name: 'originator',
                    flex: 1,
                },
            ],
        },
        {
            id		: 'idStart',
            name	: 'startDate',
            size : 0,
            hidden:true,
            x:0,
            y:100,
            width: 0,
        },
        {
            id		: 'idEnd',
            name	: 'endDate',
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

