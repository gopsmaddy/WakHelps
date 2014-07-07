Ext.define('Apm.model.Country', 
{
	extend	: 'Ext.data.Model',
	id		: 'idCountryModel',
	fields	: 
	[				
		{name: 'id'		, mapping: 'id'	, type: 'int'	, useNull: true},
		{name: 'name'		, mapping: 'name'},			
		{name: 'timezone'	, mapping: 'timezone'},
	]
	
});	
