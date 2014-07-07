Ext.define('Apm.store.PinDeliveryMethod',
{
	extend		: 'Ext.data.Store',
	id			: 'idPinDeliveryMethodStore',
	model		: 'Apm.model.PinDeliveryMethod',
	data   		:
				[
				 	{id : -1,       name: '&nbsp;'},
				 	{id : 0,       name: 'Default'},
					{id : 1,       name: 'No PIN-delivery required'},
					{id : 2,       name: 'PIN Mailer'},
					{id : 3,       name: 'PIN over SMS'},
					{id : 4,       name: 'PIN over SMS with SMS password'},
					{id : 5,       name: 'Web-bank'},
					{id : 6,       name: 'PIN Mailer letter without PIN'},
				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////
