Ext.define('Apm.model.TokenAppStatus',
{
	extend	: 'Ext.data.Model',
	id		: 'idTokenAppStatusModel',
	fields	: 
	[				
		{name: 'id'		,  mapping: 'id'	, type: 'int'	, useNull: true},
		{name: 'name'	, mapping: 'name'},
	]
	
});	
