function renderToPinDeliveryMethodLookup(value)
{
	if(Ext.StoreMgr.lookup('PinDeliveryMethod')!=null && Ext.StoreMgr.lookup('PinDeliveryMethod').findRecord('id', value)!=null && Ext.StoreMgr.lookup('PinDeliveryMethod').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('PinDeliveryMethod').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToPinPukFlagLookup(value)
{
	if(Ext.StoreMgr.lookup('PinPukFlag')!=null && Ext.StoreMgr.lookup('PinPukFlag').findRecord('id', value)!=null && Ext.StoreMgr.lookup('PinPukFlag').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('PinPukFlag').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToTitleLookup(value)
{
	if(Ext.StoreMgr.lookup('Title')!=null && Ext.StoreMgr.lookup('Title').findRecord('id', value)!=null && Ext.StoreMgr.lookup('Title').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('Title').findRecord('id', value).get('name'));
	else
		return value;
};

function renderToCountryLookup(value)
{
	if(Ext.StoreMgr.lookup('Country')!=null && Ext.StoreMgr.lookup('Country').findRecord('id', value)!=null && Ext.StoreMgr.lookup('Country').findRecord('id', value).get('name')!=null)
		return Ext.String.format (Ext.StoreMgr.lookup('Country').findRecord('id', value).get('name'));
	else
		return value;
};

Ext.define('Apm.view.ordertoken.List' ,
{
    extend	: 'Ext.grid.Panel',
    alias 	: 'widget.ordertokenlist',

	requires: 
	[		
		'Ext.ux.CheckColumn',
        'Ext.selection.CellModel',

        'Apm.view.Toolbar',
        'Apm.view.Actioncolumn',
		'Ext.data.StoreManager',
	],
	
	id		: 'idOrderTokenList',
    title 	: 'Token Application',
	store	: 'TokenApp',
	hidden	: false,

	
    initComponent: function() 
	{
        this.columns = 
		[
			{
				xtype: 'actioncolumn',
				width:75,
				sortable: false,						
				items: 
				[
					{
						itemId	: 'idColumnEdit',	
						tooltip	: 'Edit',
						icon	: varIconEdit,
						disabled: false,
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode) 
						{
							this.fireEvent('itemclick', this, 'edit', grid, rowIndex, colIndex, record, node);							
						}						
					},
					{icon: varIconGap},
					{
						itemId	: 'idColumnDelete',						
						tooltip	: 'Delete',
						icon	: varIconDelete,
                        disabled: false,
						handler : function(grid, rowIndex, colIndex, node, e, record, rowNode) 
						{							
							this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, record, node);							
						},						
					},
				]
			},
            {id: 'idGRownumber',            header: "Row ID",                       xtype: 'rownumberer',               width: 50,      sortable: false,    hidden: varGridHideRowId},
			{id: 'idGPinDeliveryMethod',    header: "PIN Delivery Method",          dataIndex: 'pinDeliveryMethod',     flex:  1,       sortable: true,     hidden: false,     	align: 'left',      renderer: renderToPinDeliveryMethodLookup	},
			{id: 'idGPinPukFlag',           header: "PIN PUK Flag",                 dataIndex: 'pinPukFlag',            flex:  1,       sortable: true,     hidden: true,     	align: 'left',      renderer: renderToPinPukFlagLookup	},
			{id: 'idGSequenceNumber',       header: "Sequence Number",              dataIndex: 'sequenceNumber',        flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGPanId',                header: "PAN ID",                       dataIndex: 'panId',                 flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGPan',                  header: "PAN",                          dataIndex: 'pan',                   flex:  1,       sortable: true,     hidden: false,     	align: 'left'	},
			//{id: 'idGPanEncrypted',         header: "PAN Encrypted",                dataIndex: 'panEncrypted',          flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGPanSeqNumber',         header: "PAN Sequence Number",          dataIndex: 'panSeqNumber',          flex:  1,       sortable: true,     hidden: false,     	align: 'left'	},
			{id: 'idGPanExpiryDate',        header: "PAN Expiry Date",              dataIndex: 'panExpiryDate',         flex:  1,       sortable: true,     hidden: false,     	align: 'left',      renderer : Ext.util.Format.dateRenderer('Y-m-d')	},
			{id: 'idGPinId',                header: "PIN ID",                       dataIndex: 'pinId',                 flex:  1,       sortable: true,     hidden: false,     	align: 'left'	},
			{id: 'idGIssuerPinId',          header: "Issuer PIN ID",                dataIndex: 'issuerPinId',           flex:  1,       sortable: true,     hidden: false,     	align: 'left'	},
			{id: 'idGPukId',                header: "PUK ID",                       dataIndex: 'pukId',                 flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerPukId',          header: "Issuer PUK ID",                dataIndex: 'issuerPukId',           flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGPrevPanId',            header: "Previous PAN ID",              dataIndex: 'prevPanId',             flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGPrevPan',              header: "Previous PAN",                 dataIndex: 'prevPan',               flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			//{id: 'idGPrevPanEncrypted',     header: "Previous PAN Encrypted",       dataIndex: 'prevPanEncrypted',   flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGPrevPanSequenceNumber',header: "Previous PAN Sequence Number", dataIndex: 'prevPanSequenceNumber', flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGPrevPanExpiryDate',    header: "Previous PAN Expiry Date",     dataIndex: 'prevPanExpiryDate',     flex:  1,       sortable: true,     hidden: true,     	align: 'left',      renderer : Ext.util.Format.dateRenderer('Y-m-d')	},
			{id: 'idGMailingCode',          header: "Mailing Code",                 dataIndex: 'mailingCode',           flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGPriority',             header: "Priority",                     dataIndex: 'priority',              flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGMailerlanguageCode',   header: "Language Code",                dataIndex: 'mailerlanguageCode',   	flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGCompanyName',          header: "Company Name",                 dataIndex: 'companyName',           flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGCompanyContact',       header: "Company Contact",              dataIndex: 'companyContact',        flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGMailerPassThroughData',header: "Pass Through Data",            dataIndex: 'mailerPassThroughData', flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGTitle',                header: "Title",                 		dataIndex: 'title',                 flex:  1,       sortable: true,     hidden: true,     	align: 'left',      renderer : renderToTitleLookup	},
			{id: 'idGFirstName',            header: "First Name",                 	dataIndex: 'firstName',             flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGMiddleName',           header: "Middle Name",                 	dataIndex: 'middleName',            flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGLastName',             header: "Last Name",                 	dataIndex: 'lastName',              flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGHolderAddressLine1',   header: "Address Line 1",               dataIndex: 'holderAddressLine1',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGHolderAddressLine2',   header: "Address Line 2",               dataIndex: 'holderAddressLine2',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGHolderAddressLine3',   header: "Address Line 3",               dataIndex: 'holderAddressLine3',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGHolderAddressLine4',   header: "Address Line 4",               dataIndex: 'holderAddressLine4',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGHolderAddressLine5',   header: "Address Line 5",               dataIndex: 'holderAddressLine5',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGHolderAddressLine6',   header: "Address Line 6",               dataIndex: 'holderAddressLine6',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGHolderTown',           header: "Town",                		    dataIndex: 'holderTown',            flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGHolderPostCode',       header: "Post Code",                 	dataIndex: 'holderPostCode',        flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGHolderCountry',        header: "Country",                 		dataIndex: 'holderCountry',         flex:  1,       sortable: true,     hidden: true,     	align: 'left',      renderer : renderToCountryLookup	},
			{id: 'idGBranchCode',           header: "Branch Code",                 	dataIndex: 'branchCode',            flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGBranchName',           header: "Branch Name",                 	dataIndex: 'branchName',            flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerAddressLine1',   header: "Address Line 1",               dataIndex: 'issuerAddressLine1',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerAddressLine2',   header: "Address Line 2",               dataIndex: 'issuerAddressLine2',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerAddressLine3',   header: "Address Line 3",               dataIndex: 'issuerAddressLine3',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerAddressLine4',   header: "Address Line 4",               dataIndex: 'issuerAddressLine4',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerAddressLine5',   header: "Address Line 5",               dataIndex: 'issuerAddressLine5',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerAddressLine6',   header: "Address Line 6",               dataIndex: 'issuerAddressLine6',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerTown',           header: "Town",                 		dataIndex: 'issuerTown',            flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerPostCode',       header: "Post Code",                 	dataIndex: 'issuerPostCode',        flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGIssuerCountry',        header: "Country",                 		dataIndex: 'issuerCountry',         flex:  1,       sortable: true,     hidden: true,     	align: 'left',      renderer : renderToCountryLookup	},
			{id: 'idGMobilePhoneNumber',    header: "Mobile Phone Number",          dataIndex: 'mobilePhoneNumber',     flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGSmsLanguageCode',      header: "Language Code",                dataIndex: 'smsLanguageCode',       flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGSmsPassThroughData',   header: "Pass Through Data",            dataIndex: 'smsPassThroughData',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGCustomerCode',         header: "Customer Code",                dataIndex: 'customerCode',          flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
			{id: 'idGWebPassThroughData',   header: "Pass Through Data",            dataIndex: 'webPassThroughData',    flex:  1,       sortable: true,     hidden: true,     	align: 'left'	},
        ];

        this.callParent(arguments);
    },
	
	//viewConfig: {trackOver: false},
	viewConfig: {emptyText: 'No records to display.'},			
	
	//width: 700,
	autoWidth: true,
	
	height: 300,
	//autoHeight:true,
	
	collapsible: false,
	loadMask: true,
	
	//selModel: {pruneRemoved: false},
	selModel: {selType: 'rowmodel'},
	//selModel: { selType: 'cellmodel'},
	
	multiSelect: false,	
	stripeRows: true,
	
	//plugins: [varInstitutionCellEditing],
	//plugins: [rowEditing],

	dockedItems:
    [
        {
            xtype	: 'apptoolbar',
            dock	: 'top',
            hidden	: false,
        },
    ]
});