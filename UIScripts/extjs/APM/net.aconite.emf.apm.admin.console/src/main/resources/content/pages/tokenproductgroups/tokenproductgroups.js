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
		'TokenProductGroups'
	],

    hasRole : function(role)
    {
        return Ext.Array.contains(this.roles, role);
    },

    createForm: function()
    {
        Ext.create('Ext.form.Panel',
        {
            items:
            [
                {xtype: 'tokenproductgroupssearch'},
                {xtype: 'tokenproductgroupslist'},
                {xtype: 'tokenproductgroupsedit'},
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
