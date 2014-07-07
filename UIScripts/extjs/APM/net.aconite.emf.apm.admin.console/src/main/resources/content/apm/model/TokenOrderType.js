Ext.define('Apm.model.TokenOrderType',
{
	extend	: 'Ext.data.Model',
	id		: 'idTokenOrderTypeModel',
	fields	: 
	[				
		{name: 'id'		,  mapping: 'id'	, type: 'int'	, useNull: true},
		{name: 'name'		, mapping: 'name'},
	]
	
});	
