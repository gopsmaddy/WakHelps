Ext.define('Apm.model.MyTest', 
{
	extend	: 'Ext.data.Model',
	id		: 'idMyTestModel',
	fields	: 
		[				
			{name: 'id'			, mapping: 'id'		, type: 'int'	, useNull: true},
			{name: 'name'		, mapping: 'name'		},
			{name: 'status' , mapping: 'status', type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
			{name: 'command'	, mapping: 'command'	},	
			{name: 'seconds'	, mapping: 'seconds',type: 'int'	},//,type: 'date', dateFormat: 'm/d/Y'},
			{name: 'lastrun'	, mapping: 'lastrun', type: 'date'	, dateFormat: 'timestamp'},
			{name: 'nextrun'	, mapping: 'lastrun', type: 'date'	, dateFormat: 'timestamp'},				
			//{name: 'replycount' , mapping: 'replycount'	, type: 'int'}, 
			//{name: 'lastpost'	, mapping: 'lastpost'	, type: 'date'	, dateFormat: 'timestamp'},								
		]
	
});	
