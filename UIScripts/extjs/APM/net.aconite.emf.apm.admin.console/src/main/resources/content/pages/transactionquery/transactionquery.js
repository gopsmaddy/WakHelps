
 //Setting up Grid Rendering
 	Ext.application(
{
	//requires: 'Ext.container.Viewport',
	
    name: 'Apm',

    roles : [ ],

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
		'TransactionQuery'
	],
	
	hasRole : function(role)
    {
        return Ext.Array.contains(this.roles, role);
    },

    createForm: function()
    {
        Ext.create('Ext.form.Panel',
        {
            //layout: 'fit',
            items:
            [
                {xtype: 'transactionquerysearch'},
                {xtype: 'transactionquerylist'},
                {xtype: 'transactionquerydetail'},
            ]
        });
    },

	launch: function() 
	{
        Apm.app = this;

        Ext.create('Apm.view.Currentuser',
        {
            ApmApp : this,
        }).getCurrentUserAndBuildForm();
	}
	
});
 



  