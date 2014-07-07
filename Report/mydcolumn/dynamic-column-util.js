//this method is used to convert the MS JSON date format to the ExtJS Grid Date Column Value
function dateFormatter(dt)
{
    /// <summary>this method is used to convert the MS JSON date format to the ExtJS Grid Date Column Value</summary>
    /// <param name="dt">Actual JSON Date Value</param>
    try
    {
        //microsoft JSON date format needs to convert into Javascript date
        var newdata = dt.replace(/\/Date\((-?[0-9]+)([+-][0-9]+)?\)\//g, "new Date($1)");
        newdata = eval('(' + newdata + ')');
        return newdata.format('m/d/Y');
    }
    catch (e)
    {
        return dt;
    }
}
