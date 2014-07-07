Ext.define('Apm.model.MyTest', 
{
	extend	: 'Ext.data.Model',
	id		: 'idMyTestModel',
	fields: 
		[
            'title', 'forumtitle', 'forumid', 'username', 
			{
                name: 'replycount',
                type: 'int'
            }, 
			{
                name: 'lastpost',
                mapping: 'lastpost',
                type: 'date',
                dateFormat: 'timestamp'
            },
            'lastposter', 'excerpt', 'threadid'
        ],
	
	
});	
