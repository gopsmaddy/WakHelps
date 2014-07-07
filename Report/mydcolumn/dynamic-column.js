//*****************************************
//ExtJS method for dynamic columns
//*****************************************
Ext.data.DynamicJsonReader = function(config)
{
	var recordType = this.getRecordType(this.meta.root);
    Ext.data.DynamicJsonReader.superclass.constructor.call(this, config, recordType);
};

Ext.extend(Ext.data.DynamicJsonReader, Ext.data.JsonReader, 
{
    getRecordType: function(data)
    {
        var i = 0, arr = [];
        for (var name in data[0]) { arr[i++] = name; } // is there a built-in to do this?

        this.recordType = Ext.data.Record.create(arr);
        return this.recordType;
    },

    readRecords: function(o)
    { // this is just the same as base class, with call to getRecordType injected
        this.jsonData = o;
        var s = this.meta;
        var sid = s.id;

        var totalRecords = 0;
        if (s.totalProperty)
        {
            var v = parseInt(eval("o." + s.totalProperty), 10);
            if (!isNaN(v))
            {
                totalRecords = v;
            }
        }
        var root = s.root ? eval("o." + s.root) : o;

        var recordType = this.getRecordType(root);
        var fields = recordType.prototype.fields;

        var records = [];
        for (var i = 0; i < root.length; i++)
        {
            var n = root[i];
            var values = {};
            var id = (n[sid] !== undefined && n[sid] !== "" ? n[sid] : null);
            for (var j = 0, jlen = fields.length; j < jlen; j++)
            {
                var f = fields.items[j];
                var map = f.mapping || f.name;
                var v = n[map] !== undefined ? n[map] : f.defaultValue;
                v = f.convert(v);
                values[f.name] = v;
            }
            var record = new recordType(values, id);
            record.json = n;
            records[records.length] = record;
        }
        return 
		{
            records: records,
            totalRecords: totalRecords || records.length,
            totalProperty: 'totalRecords'
        };
    }
});

Ext.grid.DynamicColumnModel = function(store)
{
    var cols = [];
    var recordType = store.recordType;
    var fields = recordType.prototype.fields;

    //for dynamic columns we need to return the columnInfo from server so we can build the columns here.
    //in this example, the ResultData is a JSON object, returned from the server which contains a ColumnInfo
    //object with "fields" collection. Each Field in Fields Collection holds the information column
    //we are using the "renderer" here as well to show one important feature of displaying the MVC JSon Date
    $.each(store.reader.jsonData.ResultData.columnInfo.fields, function(index, metaValue)
    {
        cols[index] = 
		{ 
			header: metaValue.header, 
			dataIndex: metaValue.dataIndex, 
			width: metaValue.width,
            sortable: metaValue.sortable, 
			hidden: metaValue.hidden,
            renderer: function(dtData) { if (metaValue.renderer) { return eval(metaValue.renderer + "('" + dtData + "')"); } else return dtData; }
        };
    });

    Ext.grid.DynamicColumnModel.superclass.constructor.call(this, cols);
};
Ext.extend(Ext.grid.DynamicColumnModel, Ext.grid.ColumnModel, {});
//*****************************************
//End of dynamic columns
//*****************************************
