Ext.application(
{
	//requires: 'Ext.container.Viewport',
	
    name: 'Apm',

    appFolder: '../../apm',
	
	// All the paths for custom classes
	paths: 
	{
		'Ext.ux': '../../lib/extjs/ux'
	},
	
	
	// automatically create an instance of apm.view.Viewport
	//autoCreateViewport: true,

	controllers: 
	[
		'MyTest'
	],
	
	
	launch: function() 
	{
		Ext.create('Ext.form.Panel', 
		{
			items: 
			[	
				{xtype: 'mytestsearch'},
				{xtype: 'mytestlist'},
				{xtype: 'mytestedit'},
            ]			
		});
	}
	
});
