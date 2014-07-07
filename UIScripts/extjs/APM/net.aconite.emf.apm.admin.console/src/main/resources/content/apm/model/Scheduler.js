Ext.define('Apm.model.Scheduler',
{
	extend	: 'Ext.data.Model',
	id		: 'idSchedulerModel',
	fields	:
		[
          //  {name: 'id'			    , mapping: 'id'		, type: 'int'	, useNull: true},
            {name: 'name'		    , mapping: 'name'		},
            {name: 'id'		    , mapping: 'id'		},
            {name: 'status' , mapping: 'status', type: 'bool', convert: function(v){return (v === "on" || v === true) ? true : false;}},
            {name: 'exeCommand'	    , mapping: 'exeCommand'	},
            {name: 'cronParameters'	, mapping: 'cronParameters'	},
            {name: 'lastRunTime'	, mapping: 'lastRunTime',type: 'int',useNull: true}, //type: 'date',dateFormat: 'timestamp'},
            {name: 'nextRunTime'	, mapping: 'nextRunTime',type: 'int',useNull: true}, //type: 'date',dateFormat: 'timestamp'},


		]

});
