Ext.define('Apm.model.TokenStatistic',
{
	extend	: 'Ext.data.Model',
	id		: 'idTokenStatisticsModel',
	fields: 
			[				
				{name: 'tokenProductName',	mapping: 'tokenProductName'},
				{name: 'issuerName', mapping: 'issuerName'},
				{name: 'status', mapping: 'status'},
				{name: 'quantity', mapping: 'quantity'} ,
			]
	
});	
