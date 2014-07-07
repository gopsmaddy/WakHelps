function checkFileSize(inputFile)
{
	var max = 20 * 1024 * 1024; // 20MB
    var msg="";
    //alert(inputFile.files[0].size);
	if (inputFile.files)
    {
        if(inputFile.files[0].size > max)
        {
            fileName=inputFile.files[0].name;            
            inputFile.value=null; // Clears the field.            
            msg = "error.fileupload.sizeLimitExceeded";           
        } 
        else if(inputFile.files[0].size == 0)
        {
            fileName=inputFile.files[0].name;            
            inputFile.value=null; // Clears the field.            
            msg = "error.fileupload.emptyFile"; 
        }
        if(msg.length > 0)
        {
            ajaxFunction("error",msg,"",""); 
        } 
	}
}

function toBin(str)
{
 var st,i,j,d;
 var arr = [];
 var len = str.length;
 for (i = 1; i<=len; i++)
 {
                //reverse so its like a stack
  d = str.charCodeAt(len-i);
  for (j = 0; j < 8; j++)
  {
   st = d%2 == '0' ? "class='zero'" : ""
   arr.push(d%2);
   d = Math.floor(d/2);
  }
 }
        //reverse all bits again.
 return arr.reverse().join("");
}

function getFilename(input_file_id)
{
  file = document.getElementById(input_file_id).value;
  if (file.indexOf('/') > -1) file = file.substring(file.lastIndexOf('/') + 1);
  else if (file.indexOf('\\') > -1) file = file.substring(file.lastIndexOf('\\') + 1);
  return file;
}
function confirmUpdate()
{
    if (!confirm('Are you sure you want to proceed?'))
    {
        return false;
    }
    else
    {
        cursorChange();
        return true;
    }
}

function cursorChange() 
{
    document.body.style.cursor="wait";
}