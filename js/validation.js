function getObj(ele)
{return document.getElementById(ele);}
function validRequired(formField,fieldLabel)
{var result=true;if(formField.value=="")
{alert('Please enter a value for the "'+fieldLabel+'" field.');formField.focus();result=false;}
return result;}
function CheckName(formField,fieldLabel)
{re=/^[0-9.]+$/;if(re.test(formField.value))
{return true;}
else
{alert('Please Enter  "'+fieldLabel+'" .');formField.focus();return false;}}
function validDrpRequired(formField,fieldLabel)
{var result=true;if(formField.value=="")
{alert('Please select the "'+fieldLabel+'" .');formField.focus();result=false;}
return result;}
function ChkSplChar(formField,fieldLabel)
{var result=true;var iChars=" !@#$%^&*()+=-[]\\\';,./{}|\":<>?0123456789";var charCnt=0;for(var i=0;i<parseInt(formField.value.length);i++){if(iChars.indexOf(formField.value.charAt(i))!=-1){charCnt++;}}
if(charCnt>0)
{alert("Please enter "+fieldLabel);formField.focus();result=false;}
return result;}
function validEmail(formField,fieldLabel,required){var result=true;if(required&&!validRequired(formField,fieldLabel))
result=false;if(result&&((formField.value.length<3)||!isEmailAddr(formField.value))){alert("Please enter a complete email address in the form: yourname@yourdomain.com");formField.value="";formField.focus();result=false;}
return result;}
function isEmailAddr(email){var result=false;var theStr=new String(email);var index=theStr.indexOf("@");if(index>0)
{var pindex=theStr.indexOf(".",index);if((pindex>index+1)&&(theStr.length>pindex+1))
result=true;}
return result;}
function validatePhone(phoneField,format){var num=phoneField.value.replace(/[^\d]/g,'');if(num.length<=9){alert('Please enter a valid phone number');phoneField.focus();}else{switch(format){case'0':phoneField.value="("+num.substring(0,3)+")-"+num.substring(3,6)+"-"+num.substring(6);break;case'1':phoneField.value=num.substring(0,3)+"-"+num.substring(3,6)+"-"+num.substring(6);break;default:phoneField.value=num;break;}
return true;}}
function checkZip(z){if(document.images){z.value=z.value.replace(/\D+/,"");}
if(z.value.length!=6){alert("please Enter ZipCode");if(document.all||document.getElementById){z.style.background="yellow";}
z.focus();return(false);}
return(z.value);}
function drp(elem,helperMsg)
{if(elem.selectedIndex=="0")
{alert("Please Select "+helperMsg);elem.focus();return false;}
else
return true;}
function isNumberKey(evt)
{var charCode=(evt.which)?evt.which:event.keyCode
if(charCode>31&&(charCode<48||charCode>57))
return false;return true;}
function isCharKey(evt)
{var charCode=(evt.which)?evt.which:event.keyCode
if(charCode>31&&(charCode<48||charCode>57))
return true;return false;}
function ishtmltag(evt)
{var charCode=(evt.which)?evt.which:event.keyCode
if(charCode==60||charCode==62||charCode==39||charCode==34||charCode==123||charCode==125||charCode==91||charCode==93)
return false;return true;}
function MaxLength(maxLength,val)
{text=val;if(text.value.length>maxLength-10)
{text.value=text.value.substring(0,maxLength-10);}
var str=val.value;var find="[<>]";var regex=new RegExp(find,"g");text.value=str.replace(regex,'');}