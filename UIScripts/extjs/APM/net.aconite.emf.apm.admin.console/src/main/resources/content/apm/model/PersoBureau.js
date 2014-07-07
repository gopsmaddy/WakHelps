Ext.define('Apm.model.PersoBureau',
{
	extend	: 'Ext.data.Model',
	id		: 'idPersoBureauModel',
	fields	:
	[
		{name: 'id'			, mapping: 'id'	, type: 'int'	, useNull: true},
		{name: 'name'		, mapping: 'name'},
		{name: 'code'	, mapping: 'code'},
		{name: 'destinationDirectory'	, mapping: 'destinationDirectory'},
		{name: 'encryptionZoneId'	, mapping: 'encryptionZoneId'},
		{name: 'extractPan'	, mapping: 'extractPan', type: 'bool', convert: function(v) {
																	return (v === "on" || v === true) ? true : false;
																   }
		},
		{name: 'extractPanDisplay'	, mapping: 'extractPanDisplay', type: 'bool', convert: function(v) {
																		return (v === "on" || v === true) ? true : false;
			   														}
		}
	]

});
