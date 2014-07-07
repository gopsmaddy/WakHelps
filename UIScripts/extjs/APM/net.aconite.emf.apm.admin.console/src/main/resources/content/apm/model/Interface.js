Ext.define('Apm.model.Interface',
{
	extend	: 'Ext.data.Model',
	id		: 'idInterfaceModel',
	fields	:
	[
		{name: 'id'			, mapping: 'id'	, type: 'int'	, useNull: true},
		{name: 'name'		, mapping: 'name'},
		{name: 'interfaceTypeId'	, mapping: 'interfaceTypeId'},
		{name: 'institutionId'	, mapping: 'institutionId'},
		{name: 'encryptionZoneId'	, mapping: 'encryptionZoneId'},
		{name: 'ipAddress'	, mapping: 'ipAddress'},
		{name: 'ipPort'	, mapping: 'ipPort'},
		{name: 'timeout'	, mapping: 'timeout'},
		{name: 'keepAlive'	, mapping: 'keepAlive', type: 'bool', convert: function(v){
																				return (v === "on" || v === true) ? true : false;
																			}
        },
		{name: 'session'	, mapping: 'session', type: 'bool', convert: function(v){
																				return (v === "on" || v === true) ? true : false;
																			},
		},
		{name: 'ssl'	, mapping: 'ssl', type: 'bool', convert: function(v){
																				return (v === "on" || v === true) ? true : false;
																			},
		},
        {name: 'keystorePath'	, mapping: 'keystorePath'},
        {name: 'keystorePassword'	, mapping: 'keystorePassword'},
        {name: 'certificateAlias'	, mapping: 'certificateAlias'},
        {name: 'keyPassword'	, mapping: 'keyPassword'}
	]

});
