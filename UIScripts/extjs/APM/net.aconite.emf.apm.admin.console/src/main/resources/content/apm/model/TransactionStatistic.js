Ext.define('Apm.model.TransactionStatistic',
{
	extend	: 'Ext.data.Model',
	id		: 'idTransactionStatisticsModel',
	fields: 
			[				
				{name: 'systemDateTime',	mapping: 'systemDateTime'},
				{name: 'issuer', mapping: 'issuer'},
				{name: 'tokenProduct', mapping: 'tokenProduct'},
				{name: 'status', mapping: 'status'},
				{name: 'transactionType', mapping: 'transactionType'},
				{name: 'responseCode', mapping: 'responseCode'},
				{name: 'quantity', mapping: 'quantity'} ,
				{name: 'grandTotal', mapping: 'grandTotal'}
			]
	
});