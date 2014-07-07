Ext.define('Apm.store.EncryptionKey',
{
	extend		: 'Ext.data.Store',
	id			: 'idEncryptionKeyStore',
	model		: 'Apm.model.EncryptionKey',
	data   		:
				[
				 	{id : 0,       name: '&nbsp;'},
				//	{id : 1,       name: 'APM.ZPK.DKI01 (Zone PIN Key - APM zone)'},
				//	{id : 2,       name: 'APM.ZONE.PAN.KEY.DKI01 (Zone PAN Key - APM zone)'},
				//	{id : 3,       name: 'APM.ZONE.PUK.KEY.DKI01'},
				//	{id : 4,       name: 'LKPMS.T.ZMK.DKI01 (Key Export Key - test 01)'},
				//	{id : 5,       name: 'NORDEAFI.T.LKPINMAILER.ZPK.DKI01 (Zone PIN Key - APM-PIN-mailer bureau zone))'},
				//	{id : 6,       name: 'NORDEAFI.T.MIGRATION.ZPK.DKI01 (Zone PIN Key - APM-Import zone)'},
				//	{id : 7,       name: 'NORDEAFI.T.PMSAFFINA.ZPK.DKI01 (Zone PIN Key - APM-Export zone)'},
					{id : 8,       name: 'NORDEAFI.T.PVVAB.DKI01 (PIN Verification Key - test 01)'},
				],
	sorters: [{property: 'name', direction: 'asc'}]	
});	
///////////////////////////////////////////////////

