function renderToVerificationMethodLookup(value)
{
	if(Ext.StoreMgr.lookup('VerificationMethod')!=null && Ext.StoreMgr.lookup('VerificationMethod').findRecord('id', value)!=null && Ext.StoreMgr.lookup('VerificationMethod').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('VerificationMethod').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToEncryptionKeyLookup(value)
{
	if(Ext.StoreMgr.lookup('EncryptionKey')!=null && Ext.StoreMgr.lookup('EncryptionKey').findRecord('id', value)!=null && Ext.StoreMgr.lookup('EncryptionKey').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('EncryptionKey').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToPanGenerationRuleLookup(value)
{
	if(Ext.StoreMgr.lookup('PanGenerationRule')!=null && Ext.StoreMgr.lookup('PanGenerationRule').findRecord('id', value)!=null && Ext.StoreMgr.lookup('PanGenerationRule').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('PanGenerationRule').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToPinGenerationRuleLookup(value)
{
	if(Ext.StoreMgr.lookup('PinGenerationRule')!=null && Ext.StoreMgr.lookup('PinGenerationRule').findRecord('id', value)!=null && Ext.StoreMgr.lookup('PinGenerationRule').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('PinGenerationRule').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToEncryptionZoneLookup(value)
{
	if(Ext.StoreMgr.lookup('EncryptionZone')!=null && Ext.StoreMgr.lookup('EncryptionZone').findRecord('id', value)!=null && Ext.StoreMgr.lookup('EncryptionZone').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('EncryptionZone').findRecord('id', value).get('name'));
	else
		return value;
};


Ext.define('Apm.view.tokenappprofiles.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.tokenappprofileslist',

	requires:
	[

		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Pagingbar',
        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
        'Ext.data.StoreManager',
        'Apm.view.lookup.VerificationMethod',
        'Apm.view.lookup.EncryptionKey',
        'Apm.view.lookup.PanGenerationRule',

	],

	id		: 'idTokenAppProfilesList',
    title 	: 'Token App Profiles',
	store	: 'TokenAppProfiles',
	renderTo: 'divTokenAppProfilesResults',
	hidden	: true,

    initComponent: function()
	{
        this.columns =
		[
				{
                    xtype: 'actioncolumn',
                    width:50,
                    sortable: false,
                    items:
                    [

                        {
                            itemId	: 'idColumnEdit',
                            tooltip	: 'Edit',
                            icon	: Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS') ? varIconEdit : Ext.BLANK_IMAGE_URL,
                            disabled: !Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS'),
                            handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
                            {
                                this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);
                            }
                        },
                        {icon: varIconGap},
                        {
                           itemId	: 'idColumnDelete',
                           tooltip	: 'Delete',
                           icon	: Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS') ? varIconDelete : Ext.BLANK_IMAGE_URL,
                           disabled: !Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS'),
                           handler : function(grid, rowIndex, colIndex, node, e, record, rowNode)
                           {
                               this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, record, node);
                           },
                       },

                    ]
                },
			//	{id: 'idGID',                   header: "ID",dataIndex: 'id',width: 50,sortable: true,align: 'left',},
				{id: 'idGName',                 header: "Name",dataIndex: 'name',flex:  1,sortable: true,width: 100,align: 'left', },
				{id: 'idGTPId',                 header: "Token Product Id",dataIndex: 'tokenProductId',width: 50,sortable: true,align: 'left',},
				{id: 'idGAppSeqNum',            header: "App Seq Num",dataIndex: 'appSequenceNumber',width: 50,sortable: true,align: 'left',},
				{id: 'idGStatus',               header: "Active",dataIndex: 'status',flex:  1,sortable: true,width: 50,align: 'center',stopSelection: true,},
				{id: 'idGDefAppFlg',            header: "Default App",dataIndex: 'defaultAppFlag',flex:  1,sortable: false,width: 50,align: 'center',stopSelection: true,},
				{id: 'idGPinReqFlg',            header: "Pin Required",dataIndex: 'pinRequiredFlag',flex:  1,sortable: false,width: 50,align: 'center',stopSelection: true,},
				{id: 'idGPINLength',            header: "PIN Length",dataIndex: 'pinLength',flex:  1,sortable: false,width: 50,align: 'left',},
				{id: 'idGPINVMID',              header: "PIN Verification Method ID",dataIndex: 'pinVerificationMethodId',flex:  1,sortable: false,width: 50,align: 'left',renderer: renderToVerificationMethodLookup,},
				{id: 'idGPINVKID',              header: "PIN Verification Key ID",dataIndex: 'pinVerificationKeyId',flex:  1,sortable: false,width: 50,align: 'left',renderer: renderToEncryptionKeyLookup,},
				{id: 'idGPINNoOfTries',         header: "PIN Tries Number",dataIndex: 'pinTriesNumber',flex:  1,sortable: false,width: 50,align: 'left',},
				{id: 'idGPUKReqFlg',            header: "PUK Required",dataIndex: 'pukRequiredFlag',flex:  1,sortable: false,width: 50,align: 'center',stopSelection: true,},
				{id: 'idGPUKLength',            header: "PUK Length",dataIndex: 'pukLength',flex:  1,sortable: false,width: 50,align: 'left',},
				{id: 'idGPINGenerationRuleID',  header: "PIN Generation Rule",dataIndex: 'pinGenerationRuleId',flex:  1,sortable: false,width: 50,align: 'left',renderer: renderToPinGenerationRuleLookup,},
				{id: 'idGPANGenerationRuleID',  header: "PAN Generation Rule",dataIndex: 'panGenerationRuleId',flex:  1,sortable: false,width: 50,align: 'left',renderer: renderToPanGenerationRuleLookup,},
				{id: 'idGExpiryInDays',         header: "Expiry In days",dataIndex: 'expiryInDays',flex:  1,sortable: false,width: 50,align: 'left',},
				{id: 'idGImportEncZoneID',      header: "Import encryption Zone ID",	dataIndex: 'importEncryptionZoneId', flex:  1, sortable: false,	width: 50, align: 'left', renderer: renderToEncryptionZoneLookup,},
				{id: 'idGExportEncZoneID',      header: "Export encryption Zone ID", dataIndex: 'exportEncryptionZoneId',flex:  1,sortable: false,width: 50,align: 'left',renderer: renderToEncryptionZoneLookup,},

			]


        this.callParent(arguments);

        Ext.getCmp('idTokenAppProfilesTBar').setVisible(Apm.app.hasRole('ADMINISTRATION/TOKEN PRODUCTS'));
    },
    viewConfig: {emptyText: 'No records to display.'},

    //width: 700,
    autoWidth: true,

    height: 200,
    //autoHeight:true,

    collapsible: true,
    loadMask: true,

    //selModel: {pruneRemoved: false},
    selModel: {selType: 'rowmodel'},
    //selModel: { selType: 'cellmodel'},

    multiSelect: false,
    stripeRows: true,
    plugins: [varTokenAppProfilesCellEditing],
    //plugins: [rowEditing],

	//bbar: 'Pagingbar',
	//tbar: apmSchedulerTBar,
	dockedItems:
	[
		{
			id 		: 'idTokenAppProfilesTBar',
			xtype	: 'apptoolbar',
			dock	: 'top',
			hidden	: false,
		},
		{
			id 		: 'idTokenAppProfilesBBar',
			xtype	: 'apppagingbar',
			store	: 'TokenAppProfiles',
			dock	: 'bottom',
			hidden	: false,
		},

	]
});