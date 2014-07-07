Ext.define('Ext.ux.form.field.DateTime',
{
	extend:'Ext.form.FieldContainer',
	mixins: 
	{
		field: 'Ext.form.field.Field'
	},
	alias: 'widget.datetimefield',
	layout: 'hbox',
	width: 200,
	height: 22,
	combineErrors: true,
	    dateCfg:{},
	timeCfg:{},

	initComponent: function() 
	{
		var me = this;
		me.buildField();
		me.callParent();
		this.dateField = this.down('datefield')
		this.timeField = this.down('timefield')
		me.initField();
	},

	//@private
	buildField: function()
	{
		this.items = [
		
			Ext.apply(
                {
                    xtype: 'datefield',
                    vtype: 'date',
                    allowBlank: false,
                    blankText: 'Date is required.',
                    format: 'Y-m-d',
                    width: 100,
                    flex: 2
                },this.dateCfg),
                Ext.apply(
                {
                    xtype: 'timefield',
                    vtype: 'time',
                    allowBlank: false,
                    blankText: 'Time is required.',
                    format: 'H:i',
                    width: 80,
                    flex: 1
                },this.timeCfg)

		]
	},

	getValue: function() 
	{
		var value,date = this.dateField.getSubmitValue(),time = this.timeField.getSubmitValue();
		if(date){
			if(time){
				var format = this.getFormat()
				value = Ext.Date.parse(date + ' ' + time,format)
			}else{
				value = this.dateField.getValue()
			}
		}
		return value
	},

	setValue: function(value)
	{
		this.dateField.setValue(value)
		this.timeField.setValue(value)
	},

	setMinValue: function(value){
		this.dateField.setMinValue(value)
	},

	getSubmitData: function()
	{
		var value = this.getValue()
		var format = this.getFormat()
		return value ? Ext.Date.format(value, format) : null;
	},

	getFormat: function()
	{
		return (this.dateField.submitFormat || this.dateField.format) + " " + (this.timeField.submitFormat || this.timeField.format)
	}


});