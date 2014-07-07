	
	var apmNameField= Ext.create('Ext.form.field.checkboxlistcombo',	
	{
		typeAhead: true,
		triggerAction: 'all',
		selectOnTab: true,
		store: 
		[
			['pinmailer','Pin Mailer'],
			['tokenimportfeedback','Token Import Feedback'],
			['tokenorderfeedback','Token Order Feedback']						
		],
		lazyRender: true,
		listClass: 'x-combo-list-small'
	});
	
	var apmNameField3= Ext.create('Ext.form.field.ComboBox',	
	{
		typeAhead: true,
		triggerAction: 'all',
		selectOnTab: true,
		store: 
		[
			['pinmailer','Pin Mailer'],
			['tokenimportfeedback','Token Import Feedback'],
			['tokenorderfeedback','Token Order Feedback']						
		],
		lazyRender: true,
		listClass: 'x-combo-list-small'
	});
	