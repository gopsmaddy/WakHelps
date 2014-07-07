
Ext.ux.PageSizePlugin = function(config) 
{
    Ext.apply(this, config);

    Ext.ux.PageSizePlugin.superclass.constructor.call
    (
    	this, 
	    {
	       store: new Ext.data.SimpleStore
	        (
		        {
		            fields: ['Name', 'Key'],
		            data: [['10', 10], ['20', 20], ['30', 30], ['40', 40],  ['50', 50]]
		        }
	        ),
	        //store:myPageSizeStore,
	        mode: 'local',
	        displayField: 'Name',
	        valueField: 'Key',
	        allowBlank: false,
	        triggerAction: 'all',
	        width: 50,
	        maskRe: /[0-9]/
	    }
	   );
};

Ext.extend
(
	Ext.ux.PageSizePlugin, Ext.form.ComboBox, 
	{
	    beforeText:'Show',
	    afterText:'Rows/Page',
	    init: function(paging) 
	    {
	        paging.on('render', this.onInitView, this);
	    },
	    
	    onInitView: function(paging) 
	    {
	        paging.add('-', this.beforeText, this, this.afterText);
	        this.setValue(paging.pageSize);
	        this.on('select', this.onPageSizeChanged, paging);
	        this.on
	        ('specialkey', function(combo, e) 
		        {
		            if(13 === e.getKey()) 
		            {
		                this.onPageSizeChanged.call(paging, this);        
		            }
		        }
	        );	
	    },	
	    onPageSizeChanged: function(combo) 
	    {
	        this.pageSize = parseInt(combo.getRawValue(), 0);
	        this.doLoad(0);
	    }
	}
);
// end of file  