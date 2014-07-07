Ext.define('Apm.view.Currentuser',
{
    url : '/admin/system/userdetails',
    method : 'get',
    ApmApp: null,
    me : null,

    constructor: function(apmapp)
    {
        me = this;
        this.ApmApp = apmapp;
    },

    onFailure : function(title, response, options)
    {
        Ext.MessageBox.show(
        {
            title : title,
            msg : response,
            width : 400,
            icon : Ext.Msg.WARNING,
            buttons : Ext.Msg.OK
        });
    },

    success : function(response, opts)
    {
        try
        {
            var result = Ext.decode(response.responseText);
            var record = result.records[0];

            var items = [];
            items.push('System&nbsp;:&nbsp;'+record.system + '&nbsp;&nbsp;<br/>Username&nbsp;:&nbsp;'+record.username+'&nbsp;&nbsp;');
            Ext.get('divCurrentUser').update(items.join(''));

            var perms = record.permissions;
            for (var i = 0; i < perms.length; i += 1)
            {
                me.ApmApp.ApmApp.roles.push(perms[i]);
            }

            me.ApmApp.ApmApp.username = record.username;

            me.ApmApp.ApmApp.createForm();
        }
        catch (e)
        {
            me.onFailure('User Service Failure', e, opts);
        }
    },

    failure : function(response, opts)
    {
        me.onFailure('User Service Failure', response, opts);
    },

    getCurrentUserAndBuildForm: function()
    {
        Ext.Ajax.request(
        {
            success: me.success,
            failure: me.failure,
            url: me.url,
            method: me.method,
            defaultHeaders :
            {
              'Content-Type' : 'application/json; charset=utf-8'
            }
        });
    }
});


