function filterInput(e, allowedChars)
{
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;

    //Check for control characters = don't want to filter them (but we MAY want to filter space)!!!!
    if ((code <= 48) && (code != 32))
    {
        return true;
    }

    var keyPressed = String.fromCharCode(code);

    if (allowedChars.indexOf(keyPressed) < 0)
    {
        if (document.all)
        {
            e.cancelBubble = true;
            e.returnValue = false;
        }
        else
        {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    return true;
}

function getObj(name)
{
    if (document.getElementById)
    {
        //this.obj = document.getElementById(name);
        //this.style = document.getElementById(name).style;
        return document.getElementById(name);
    }
    else if (document.all)
    {
        //this.obj = document.all[name];
        //this.style = document.all[name].style;
        return document.all[name];
    }
    else if (document.layers)
    {
        //this.obj = getObjNN4(document,name);
        //this.style = this.obj;
        return getObjNN4(document, name);
    }
}

function getObjNN4(obj, name)
{
    var x = obj.layers;
    var foundLayer;
    for (var i = 0; i < x.length; i++)
    {
        if (x[i].id == name)
            foundLayer = x[i];
        else if (x[i].layers.length)
            var tmp = getObjNN4(x[i], name);
        if (tmp) foundLayer = tmp;
    }
    return foundLayer;
}

function showtip(current, e, text)
{
    var posx = 0;
    var posy = 0;
    var tooltip = getObj("tooltip");

    if (!e) var e = window.event;
    if (!obj) var obj = (e.target) ? e.target : e.srcElement;

    var winscroll = document.body.scrollLeft

    tooltip.innerHTML = '<div>' + text + '</div>';

    var tooltipWidth = tooltip.offsetWidth;
    var windowWidth = document.body.clientWidth;

    if (e.pageX || e.pageY)
    {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY)
    {
        posx = e.clientX + document.body.scrollLeft;
        posy = e.clientY + document.body.scrollTop + 2;
    }

    if ((posx + tooltipWidth) > windowWidth)
    {
        posx = document.body.scrollLeft + 10;
    }

    tooltip.style.left = posx + "px";
    tooltip.style.top = posy + "px";
    tooltip.style.visibility = 'visible';
}

function hidetip()
{
    var tooltip = getObj("tooltip");
    tooltip.innerHTML = '';
    tooltip.style.visibility = "hidden";
}
