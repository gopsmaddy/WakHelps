Ext.define('Apm.model.DataExtractLogType',
{
	extend	: 'Ext.data.Model',
	id		: 'idDataExtractLogTypeModel',
	fields	: 
	[				
		{name: 'id'		, mapping: 'id'	, type: 'int'	, useNull: true},		
		{name: 'name'	, mapping: 'name'},
	]
});
