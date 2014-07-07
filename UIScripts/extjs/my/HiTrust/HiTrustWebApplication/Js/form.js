Ext.Ajax.timeout = 60000;
Ext.QuickTips.init();

Ext.onReady(function() {

	var form = new IOP.form({
		url: 'proxy.jsp?action=baprofiles&user=001IN000001&pass=Passw0rd',
		height: 200,
		mappings: [
			{name: 'title', mapping: 'RelNo'},
			{name: 'name', mapping: 'GivenName'},
			{name: 'surname', mapping: 'Name'},
			{name: 'status', mapping: 'Status/Desc'}
		],
		items: [{
			xtype: 'panel',
			border: false,
			html: '<h2>Investor Details</h2><br>'
		},{
			fieldLabel: 'Title',
			name: 'title',
			readOnly: true
		},{
			fieldLabel: 'Name',
			name: 'name',
			readOnly: true
		},{
			fieldLabel: 'Surname',
			name: 'surname',
			readOnly: true
		},{
			fieldLabel: 'Status',
			name: 'status',
			readOnly: true
		},
		new Ext.form.ComboBox
		(
			{
				
				store: new Ext.data.XmlStore({
					storeId: 'fundPricesStore',
					url: 'proxy.jsp?action=bafunds&user=001IN000001&pass=Passw0rd', 
					method:'GET',
					record: 'List',
					idPath: 'Desc',
					totalRecords: '@TotalResults',
					fields: [
								{
									name: 'fundName', mapping: 'Desc'
								}
							]
							}),
				name: 'fundName',
				displayField: 'fundName',
				valueField: 'fundName',
				fieldLabel: 'Fund Name',
				anchor:'95%',
				typeAhead: true,
				mode: 'remote',
				triggerAction: 'all',
				emptyText:'Select a Fund Name...',
				selectOnFocus:true,
				width:120
				
			}
		)
		
		
		]
	});

});