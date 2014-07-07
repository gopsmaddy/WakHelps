Ext.define('Apm.model.InterfaceType',
{
	extend	: 'Ext.data.Model',
	id		: 'idInterfaceTypeModel',
	fields	:
	[
		{name: 'id'			, mapping: 'id'	, type: 'int'	, useNull: true},
		{name: 'name'		, mapping: 'name'},
	]

});
