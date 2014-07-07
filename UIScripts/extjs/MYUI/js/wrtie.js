Ext.define('Writer.Grid', 
{
    extend: 'Ext.grid.Panel',
    alias: 'widget.writergrid',

    requires: 
	[
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function()
	{

        this.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, 
		{
            iconCls: 'icon-grid',
            frame: true,
            plugins: [this.editing],
            dockedItems: 
			[
			{
                xtype: 'toolbar',
                items: 
				[
					{
						iconCls: 'icon-add',
						text: 'Add',
						scope: this,
						handler: this.onAddClick
					}, 
					{
						iconCls: 'icon-delete',
						text: 'Delete',
						disabled: true,
						itemId: 'delete',
						scope: this,
						handler: this.onDeleteClick
					}
				]
            }, 
			{
                weight: 2,
                xtype: 'toolbar',
                dock: 'bottom',
                items: 
				[
				{
                    xtype: 'tbtext',
                    text: '<b>@cfg</b>'
                },
				'|', 
				{
                    text: 'autoSync',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will execute Ajax requests as soon as a Record becomes dirty.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.autoSync = pressed;
                    }
                }, {
                    text: 'batch',
                    enableToggle: true,
                    pressed: true,
                    tooltip: 'When enabled, Store will batch all records for each type of CRUD verb into a single Ajax request.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().batchActions = pressed;
                    }
                }, {
                    text: 'writeAllFields',
                    enableToggle: true,
                    pressed: false,
                    tooltip: 'When enabled, Writer will write *all* fields to the server -- not just those that changed.',
                    scope: this,
                    toggleHandler: function(btn, pressed){
                        this.store.getProxy().getWriter().writeAllFields = pressed;
                    }
                }]
            }, {
                weight: 1,
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'icon-save',
                    text: 'Sync',
                    scope: this,
                    handler: this.onSync
                }]
            }],
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                dataIndex: 'id'
            }, {
                header: 'Email',
                flex: 1,
                sortable: true,
                dataIndex: 'email',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'First',
                width: 100,
                sortable: true,
                dataIndex: 'first',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Last',
                width: 100,
                sortable: true,
                dataIndex: 'last',
                field: {
                    type: 'textfield'
                }
            }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
    },

    onSync: function(){
        this.store.sync();
    },

    onDeleteClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function(){
        var rec = new Writer.Person({
            first: '',
            last: '',
            email: ''
        }), edit = this.editing;

        edit.cancelEdit();
        this.store.insert(0, rec);
        edit.startEditByPosition({
            row: 0,
            column: 1
        });
    }
});

Ext.define('Writer.Person', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'email', 'first', 'last'],
    validations: [{
        type: 'length',
        field: 'email',
        min: 1
    }, {
        type: 'length',
        field: 'first',
        min: 1
    }, {
        type: 'length',
        field: 'last',
        min: 1
    }]
});

Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);

Ext.onReady(function()
{
    Ext.tip.QuickTipManager.init();
    /*
    Ext.create('Ext.button.Button', 
	{
        margin: '0 0 20 20',
        text: 'Reset sample database back to initial state',
        renderTo: document.body,
        tooltip: 'The sample database is stored in the session, including any changes you make. Click this button to reset the sample database to the initial state',
        handler: function(){
            Ext.getBody().mask('Resetting...');
            Ext.Ajax.request({
                url: 'app.php/example/reset',
                callback: function(options, success, response) {
                    Ext.getBody().unmask();
                    
                    var didReset = true,
                        o;
                    
                    if (success) {
                        try {
                            o = Ext.decode(response.responseText);
                            didReset = o.success === true;
                        } catch (e) {
                            didReset = false;
                        }
                    } else {
                        didReset = false;
                    }
                    
                    if (didReset) {
                        store.load();
                        main.down('#form').setActiveRecord(null);
                        Ext.example.msg('Reset', 'Reset successful');
                    } else {
                        Ext.MessageBox.alert('Error', 'Unable to reset example database');
                    }
                    
                }
            });
        }
    })
    */
    var store = Ext.create('Ext.data.Store', 
	{
        model: 'Writer.Person',
        autoLoad: true,
        autoSync: true,
        proxy: 
		{
            type: 'ajax',
            api: 
			{
                read: 'app.php/users/view',
                create: 'app.php/users/create',
                update: 'app.php/users/update',
                destroy: 'app.php/users/destroy'
            },
            reader: 
			{
                type: 'json',
                successProperty: 'success',
                root: 'data',
                messageProperty: 'message'
            },
            writer: 
			{
                type: 'json',
                writeAllFields: false,
                root: 'data'
            },
            listeners: 
			{
                exception: function(proxy, response, operation)
				{
                    Ext.MessageBox.show(
					{
                        title: 'REMOTE EXCEPTION',
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        },
        listeners: 
		{
            write: function(proxy, operation)
			{
                if (operation.action == 'destroy') 
				{
                    main.child('#form').setActiveRecord(null);
                }
                Ext.example.msg(operation.action, operation.resultSet.message);
            }
        }
    });

    var main = Ext.create('Ext.form.Panel', 
	{
        padding: '0 0 0 20',
        width: 500,
        height: 450,
        renderTo: 'divSchedulerResults',
        layout: 
		{
            type: 'vbox',
            align: 'stretch'
        },
        items: 
		[
			{
				itemId: 'form',
				xtype: 'writerform',
				height: 150,
				margins: '0 0 10 0',
				listeners: 
				{
					create: function(form, data)
					{
						store.insert(0, data);
					}
				}
			}, 
			{
				itemId: 'grid',
				xtype: 'writergrid',
				title: 'User List',
				flex: 1,
				store: store,
				listeners: 
				{
					selectionchange: function(selModel, selected) 
					{
						main.child('#form').setActiveRecord(selected[0] || null);
					}
				}
			}
		]
    }
	);
});
