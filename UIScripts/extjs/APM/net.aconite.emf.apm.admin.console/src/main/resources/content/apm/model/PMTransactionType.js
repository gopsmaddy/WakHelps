Ext.define('Apm.model.PMTransactionType', 
{
	extend	: 'Ext.data.Model',
	id		: 'idPMTransactionTypeModel',
	fields	: 
	[				
		{name: 'id'		, mapping: 'id'	, type: 'int'	, useNull: true},		
		{name: 'name'	, mapping: 'name'},
	]
	
});	
