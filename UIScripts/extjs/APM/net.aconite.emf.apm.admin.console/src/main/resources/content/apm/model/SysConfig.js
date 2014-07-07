Ext.define('Apm.model.SysConfig', 
{
	extend	: 'Ext.data.Model',
	id		: 'idSysConfigModel',
	fields	: 
	[				
		{name: 'id'	, mapping: 'id'},
		{name: 'name'	, mapping: 'name'},
		{name: 'descr'	, mapping: 'descr'},
		{name: 'value'	, mapping: 'value'},
		{name: 'status' , mapping: 'status', type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
	]

});	
