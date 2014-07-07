IOP = {

	form : Ext.extend(Ext.FormPanel, {
		
		// Custom
		showLoad: true,
		mappings: null,
		name: null,
		record: 'List',
		success: '@success',
		// End Custom
		
		// Defaults
		border: false,
		labelWidth: 75, // label settings here cascade unless overridden
    	renderTo: 'form',
		height: 160,
		width: 250,
		defaults: {width: 150},
		defaultType: 'textfield',
		items: null,
		// End Defaults
	
		initComponent: function()
		{
			Ext.apply(this, Ext.apply(this.initialConfig, {
				reader: new Ext.data.XmlReader({
					record: this.record,
					success: this.success
				}, this.mappings),
				waitMsgTarget: this.showLoad,
				listeners : {
					afterrender: function(form)
					{
						var config = {
							method: 'GET'
						};
						if(form.showLoad)
							config.waitMsg = 'Loading...';
						form.load(config);
					},
					actionfailed: function(form, action)
					{
						var doc = action.response.responseXML;
						var responseTag = doc.getElementsByTagName('response');
						var msg = (responseTag[0] && responseTag[0].textContent) || 'Error Loading Form';
						this.el.mask(msg);
					}
				}
			}));
			IOP.form.superclass.initComponent.call(this);
		}
	}),

	grid : Ext.extend(Ext.grid.GridPanel, {
		
		// Custom
		url: null,
		showLoad: true,
		mappings: null,
		name: null,
		record: 'List',
		success: '@success',
		// End Custom
		
		// Defaults
		autoWidth : true,
		height : 300,
		renderTo : 'grid',
		columns: null,
		// End Defaults
		
		initComponent: function()
		{
			Ext.apply(this, Ext.apply(this.initialConfig, {
				store : new Ext.data.XmlStore({
					// load using HTTP
					url : this.url,
					method : 'GET',
			
					// the return will be XML, so lets set up a reader
					// records will have an "Item" tag
					record : this.record,
					success: this.success,
					// set up the fields mapping into the xml doc
					// The first needs mapping, the others are very basic
					fields: this.mappings,
					listeners : {
						exception: function(proxy, type, action, options, arg)
						{
							var doc = options.reader.xmlData;
							var responseTag = doc.getElementsByTagName('response');
							var msg = (responseTag[0] && responseTag[0].textContent) || 'Error Loading Grid';
							this.grid.body.mask(msg);
						}
					}
				}),
				loadMask: this.showLoad,
				listeners : {
					afterrender: function(grid)
					{
						grid.getStore().grid = grid;
						grid.getStore().load();
					}
				}
			}));
			IOP.grid.superclass.initComponent.call(this);
		}
	})

};
Ext.reg('iopgrid', IOP.grid);
Ext.reg('iopform', IOP.form);