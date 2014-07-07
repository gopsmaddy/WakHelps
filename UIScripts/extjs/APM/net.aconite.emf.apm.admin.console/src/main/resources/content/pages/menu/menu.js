//temporary json data to help build the menu, we will need to have code to get the actual json from 
//the rest api
//ADMIN MAIN CONSOLE

//var menu_json;
//$.getJSON(urlMenuData, function(json)
//{
//  menu_json = json;
//});

//var menu_json='{"menu":[{"Title":"Administration","link":"#","submenu":[{"Title":"Token products","link":"../tokenproducts/tokenproducts.html","submenu":[]},{"Title":"Token product groups","link":"../tokenproductgroups/tokenproductgroups.html","submenu":[]},{"Title":"Issuers","link":"../issuer/issuer.html","submenu":[]},{"Title":"Institutions","link":"../institution/institution.html","submenu":[]},{"Title":"Task Scheduler","link":"../scheduler/scheduler.html","submenu":[]},{"Title":"Encryption","link":"#","submenu":[{"Title":"DES Keys","link":"#","submenu":[{"Title":"Keys","link":"/admin/console/crypto/pages/key/key.html","submenu":[]},{"Title":"Import Keys","link":"/admin/console/crypto/pages/desimportkey/desimportkey.html","submenu":[]},{"Title":"Export Keys","link":"/admin/console/crypto/pages/desexportkey/desexportkey.html","submenu":[]}]},{"Title":"RSA Keys","link":"#","submenu":[{"Title":"Keys","link":"/admin/console/crypto/pages/rsakey/rsakey.html","submenu":[]},{"Title":"Export Keys","link":"/admin/console/crypto/pages/rsaexportkey/rsaexportkey.html","submenu":[]}]},{"Title":"Encryption Zones","link":"/admin/console/crypto/pages/encryptionzone/encryptionzone.html","submenu":[]},{"Title":"HSMs","link":"/admin/console/crypto/pages/hsm/hsm.html","submenu":[]},{"Title":"LMKs","link":"/admin/console/crypto/pages/lmk/lmk.html","submenu":[]}]},{"Title":"Interfaces","link":"#","submenu":[{"Title":"Interfaces","link":"../interface/interface.html","submenu":[]},{"Title":"Personalisation Bureaus","link":"../interface/persoBureau.html","submenu":[]}]},{"Title":"System Configuration","link":"../sysconfig/sysconfig.html","submenu":[]},{"Title":"Dictionaries","link":"#","submenu":[{"Title":"Countries","link":"../country/country.html","submenu":[]},{"Title":"PM Response Codes","link":"../pmresponsecode/pmresponsecode.html","submenu":[]},{"Title":"PM Transaction types","link":"../pmtransactiontype/pmtransactiontype.html","submenu":[]}]}]},{"Title":"Monitoring","link":"#","submenu":[{"Title":"System Monitor","link":"#","submenu":[]},{"Title":"Audit Log","link":"#","submenu":[]},{"Title":"Data Extraction Log","link":"#","submenu":[]}]},{"Title":"Transactions","link":"#","submenu":[{"Title":"Transaction Query","link":"../transactionquery/transactionquery.html","submenu":[]},{"Title":"Consolidated Transaction Statistics","link":"#","submenu":[]}]},{"Title":"Tokens","link":"#","submenu":[{"Title":"Manage Tokens","link":"../managetokens/managetokens.html","submenu":[]},{"Title":"Token Statistics Report","link":"#","submenu":[]}]},{"Title":"Help","link":"#","submenu":[{"Title":"Help","link":"help.html","submenu":[]},{"Title":"About","link":"#","submenu":[]}]},{"Title":"Logout","link":"/admin/system/j_spring_security_logout","submenu":[]}]}';


var strLayout = "<ul id=\"navigation\">"  

//this method is the one that is called on the document ready method within js for each page.
function buildNavigation(obj){

	buildMenuItems(obj);
	$('#nav').append(strLayout);
	$('li').last().addClass("last");
}

//building the top level of the menu, eg. the main navigation
function buildMenuItems(menuArray){						
	$.each(menuArray, function() {					
		$.each(this, function(k, v) {
		strLayout = strLayout + "<li><a href=\""+v.link+"\">"+v.title+"</a>"
			var subMenu = v.submenu;
			if(subMenu.length>0){
				buildTheSubMenu(subMenu);
			}else{
				strLayout = strLayout + "</li>"
			}										
		});
		strLayout = strLayout + "</ul>"					
	});
	return strLayout;
}	

//recursive function to build sub menus			
function buildTheSubMenu(theList){
	strLayout = strLayout + "<ul>"
	for(var i = 0; i < theList.length; i++)
	{
		if(theList[i].title=="Help"){
			//var selectedhelpurl="../../../apmhelp/pages/help/help.html?id="+(document.getElementById('pageId').value);
			var selectedhelpurl="../../../../help/console/help.html?id="+(document.getElementById('pageId').value);
			
			strLayout = strLayout +("<li><a target=\"_blank\" href=\""+selectedhelpurl+"\" onclick=\"window.open("+selectedhelpurl+",'popup','width=585,height=400');return false;\">"+theList[i].title + "</a>");
		}
		else{
			if(theList[i].submenu.length>0){
				strLayout = strLayout +("<li><a href=\""+theList[i].link+"\">"+theList[i].title  + "  &raquo; </a>");
				buildTheSubMenu(theList[i].submenu);
			}else{
				strLayout = strLayout +("<li><a href=\""+theList[i].link+"\">"+theList[i].title  + "</a>");
			}			
		}					
	}
	strLayout = strLayout + "</li></ul>"
	return strLayout;
}

 $(document).ready(function() {	 
	 $.getJSON("/admin/menu/menu", function(data) {
		 buildNavigation(data)
	 });	 
 });