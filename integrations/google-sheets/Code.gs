// Frontend-only website receiver: runs entirely on Google Apps Script.
// No Node API, database password, shared browser secret or service-account key.
const CONFIG = {
  spreadsheetId: '1tpG637BoiOutcXQsLd_iBrEF27lo0hr3Wkmeekjk88s',
  sheetName: 'Website Enquiries',
  maxPerMinute: 30
};
const HEADERS = ['Inquiry ID', 'Received (IST)', 'Name', 'Email', 'Business / Website', 'Service', 'Project Message', 'Privacy Consent', 'Source', 'Status', 'Payload Hash'];
const SERVICES = ['Web design','Website development','SEO & organic growth','Digital strategy','Social media management','Ads & performance marketing','Web hosting & cloud','Branding & content','Maintenance & support','A little bit of everything'];
function hash_(value) { return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,value,Utilities.Charset.UTF_8).map(function(b){return ('0'+((b+256)%256).toString(16)).slice(-2);}).join(''); }
function safe_(value) { const text=String(value||'');return /^\s*[=+@-]/.test(text)?"'"+text:text; }
function allowedOrigins_() {
  const configured=PropertiesService.getScriptProperties().getProperty('ALLOWED_ORIGINS') || '';
  return ['http://localhost:5173','http://127.0.0.1:5173','http://localhost:4173','http://127.0.0.1:4173'].concat(configured.split(',').map(function(s){return s.trim();}).filter(Boolean));
}
function reply_(data, result) {
  const receipt={type:'esgrow:inquiry-receipt',requestId:data && data.inquiry && data.inquiry.requestId,nonce:data && data.nonce,ok:result.ok===true,message:result.message || ''};
  const origin=data && typeof data.origin==='string' && /^https?:\/\/[^/]+$/.test(data.origin)?data.origin:null;
  if(!origin) return HtmlService.createHtmlOutput('Invalid enquiry request.');
  const payload=JSON.stringify(receipt).replace(/</g,'\\u003c');
  const target=JSON.stringify(origin).replace(/</g,'\\u003c');
  return HtmlService.createHtmlOutput('<!doctype html><html><head><meta charset="utf-8"></head><body><p>Enquiry processed. You can return to the website.</p><script>window.top.postMessage('+payload+','+target+');<\/script></body></html>').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function sheet_() {
 const book=SpreadsheetApp.openById(CONFIG.spreadsheetId);
 let sheet=book.getSheetByName(CONFIG.sheetName);
 if(!sheet) sheet=book.insertSheet(CONFIG.sheetName);
 if(sheet.getLastRow()===0){
  sheet.getRange(1,1,1,HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#183d2c').setFontColor('#ffffff');
  sheet.setFrozenRows(1);sheet.setColumnWidth(1,280);sheet.setColumnWidth(2,170);sheet.setColumnWidths(3,4,200);sheet.setColumnWidth(7,400);sheet.setColumnWidths(8,3,150);sheet.hideColumns(11);
 }
 if(JSON.stringify(sheet.getRange(1,1,1,HEADERS.length).getValues()[0])!==JSON.stringify(HEADERS))throw new Error('Header mismatch');
 return sheet;
}
function setup(){const sheet=sheet_();SpreadsheetApp.flush();console.log('Frontend enquiry receiver ready: '+sheet.getName());}
function doGet(){return ContentService.createTextOutput(JSON.stringify({ok:true,service:'ESGROW frontend enquiry receiver',protocol:2})).setMimeType(ContentService.MimeType.JSON);}
function doPost(e){
 let data=null,lock;
 try{
  if(!e||!e.parameter||typeof e.parameter.payload!=='string'||e.parameter.payload.length>30000)return reply_(null,{ok:false});
  data=JSON.parse(e.parameter.payload);
  if(data.protocol!==2||typeof data.nonce!=='string'||!/^[a-f0-9-]{36}$/i.test(data.nonce))return reply_(data,{ok:false,message:'Invalid request. Please refresh the form.'});
  if(allowedOrigins_().indexOf(data.origin)===-1)return reply_(data,{ok:false,message:'This website address is not configured for enquiry delivery yet. Please contact the studio directly.'});
  const value=data.inquiry;
  if(!value||value.website||value.consent!==true||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value.requestId||''))return reply_(data,{ok:false,message:'Please complete the form and accept the privacy notice.'});
  const limits={name:100,email:254,business:200,service:100,message:5000};
  for(const key in limits){if(typeof value[key]!=='string'||value[key].length>limits[key])return reply_(data,{ok:false,message:'Please enter valid text in each field.'});value[key]=value[key].trim();}
  if(!value.name||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)||value.message.length<15||SERVICES.indexOf(value.service)===-1)return reply_(data,{ok:false,message:'Please enter your name, a valid email, a service and at least 15 characters about your project.'});
  lock=LockService.getScriptLock();
  if(!lock.tryLock(10000))return reply_(data,{ok:false,message:'The enquiry receiver is busy. Please try again shortly.'});
  const sheet=sheet_();
  const digest=hash_(JSON.stringify([value.name,value.email,value.business,value.service,value.message,value.consent]));
  const existing=sheet.getLastRow()>1?sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(value.requestId).matchEntireCell(true).findNext():null;
  if(existing){
   if(sheet.getRange(existing.getRow(),11).getValue()!==digest)return reply_(data,{ok:false,message:'Please refresh the form before sending a different enquiry.'});
   return reply_(data,{ok:true});
  }
  const cache=CacheService.getScriptCache(),bucket='enquiries:'+Math.floor(Date.now()/60000),count=Number(cache.get(bucket)||0);
  if(count>=CONFIG.maxPerMinute)return reply_(data,{ok:false,message:'We’re receiving many enquiries right now. Please try again in a minute or contact the studio directly.'});
  cache.put(bucket,String(count+1),120);
  const row=[value.requestId,Utilities.formatDate(new Date(),'Asia/Kolkata','yyyy-MM-dd HH:mm:ss'),safe_(value.name),safe_(value.email),safe_(value.business),safe_(value.service),safe_(value.message),'Agreed','ESGROW website','New',digest];
  sheet.getRange(sheet.getLastRow()+1,1,1,HEADERS.length).setNumberFormat('@').setValues([row]).setVerticalAlignment('top').setWrap(true);
  SpreadsheetApp.flush();
  return reply_(data,{ok:true});
 }catch(error){console.error('Enquiry receiver failed. Check sheet access and headers.');return reply_(data,{ok:false,message:'We couldn’t save your enquiry. Please try again or contact the studio directly.'});}
 finally{if(lock&&lock.hasLock())lock.releaseLock();}
}
