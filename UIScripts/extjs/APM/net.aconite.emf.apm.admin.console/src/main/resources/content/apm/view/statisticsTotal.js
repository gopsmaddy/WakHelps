Ext.define('Apm.view.statisticsTotal' ,
{
	extend	: 'Ext.form.Label',
    alias 	: 'widget.statisticsLabel',
    readOnly : true,

    initComponent: function(){
        var store = Ext.getStore('TransactionStatistics');
        store.on('load', function() {
            if(store.getCount() > 0){
                //Calculate the page total.
                var sumInStore = 0;
                store.each(function(item){
                       sumInStore += item.get('quantity');
                })

                this.setText("Total transactions this page: " + sumInStore +
                             " - Total Transactions : " + store.getAt(0).get('grandTotal'));
                this.show();
            }
        }, this);
        this.callParent(arguments);
    },									

});


