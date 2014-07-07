Ext.Ajax.timeout = 60000;
Ext.QuickTips.init();

Ext.onReady(function() {

	var grid = new IOP.grid({
		url : 'proxy.jsp?action=bafunds&user=001IN000001&pass=Passw0rd',
		mappings : [			
			{name : 'fund_Long', mapping : 'Desc'},
			{name : 'fund_short', mapping : 'Code'},
			{name : 'value', mapping : 'Ccy > ISOCode'}
		],
		columns: [{
			id : 'fund_Long',
			header : 'Fund Long Name',
			dataIndex : 'fund_Long',
			width : 250,
			sortable : true,
			align : 'left'
		}, {
			header : 'Fund Short Name',
			dataIndex : 'fund_short',
			width : 150,
			sortable : true,
			align : 'left'
		}, {
			header : 'Value',
			dataIndex : 'value',
			width : 100,
			sortable : true,
			align : 'left'
		}],
		autoExpandColumn: 'fund_Long'
	});

});