// ESGROW STUDIO enquiry receiver. Deploy as a web app, executing as the owner.
// Only a SHA-256 digest is stored here. The actual secret stays on the Node server.
const CONFIG = {
  spreadsheetId: '1tpG637BoiOutcXQsLd_iBrEF27lo0hr3Wkmeekjk88s',
  sheetName: 'Website Enquiries',
  secretHash: '1c30af65fb601e4cae4bdd3be7fd12af610272827f5f16d0c9661f63b20fd132'
};
const HEADERS = ['Inquiry ID', 'Received (IST)', 'Name', 'Email', 'Business / Website', 'Service', 'Project Message', 'Privacy Consent', 'Source', 'Status', 'Payload Hash'];
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function hash_(value) { return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8).map(function(b) { return ('0' + ((b + 256) % 256).toString(16)).slice(-2); }).join(''); }
function safe_(value) { const text=String(value || ''); return /^[\s]*[=+@-]/.test(text) ? "'" + text : text; }
function sheet_() {
  const book=SpreadsheetApp.openById(CONFIG.spreadsheetId);
  let sheet=book.getSheetByName(CONFIG.sheetName);
  if (!sheet) sheet=book.insertSheet(CONFIG.sheetName);
  if (sheet.getLastRow()===0) {
    sheet.getRange(1,1,1,HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#183d2c').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1,280); sheet.setColumnWidth(2,170); sheet.setColumnWidths(3,4,200); sheet.setColumnWidth(7,400); sheet.setColumnWidths(8,3,150);
    sheet.hideColumns(11);
  }
  const actual=sheet.getRange(1,1,1,HEADERS.length).getValues()[0];
  if (JSON.stringify(actual)!==JSON.stringify(HEADERS)) throw new Error('Header mismatch');
  return sheet;
}
function setup() { const sheet=sheet_(); SpreadsheetApp.flush(); console.log('Enquiry receiver ready: ' + sheet.getName()); }
function doGet() { return json_({ok:true,service:'ESGROW enquiry receiver'}); }
function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length>30000) return json_({ok:false,error:'Invalid request'});
    const data=JSON.parse(e.postData.contents);
    if (typeof data.secret!=='string' || hash_(data.secret)!==CONFIG.secretHash) return json_({ok:false,error:'Unauthorized'});
    lock=LockService.getScriptLock();
    if (!lock.tryLock(10000)) return json_({ok:false,error:'Receiver busy'});
    const sheet=sheet_();
    if (data.action==='health') return json_({ok:true,ready:true});
    const value=data.inquiry;
    if (!value || !/^[a-f0-9-]{36}$/i.test(value.requestId || '') || value.consent!==true) return json_({ok:false,error:'Invalid inquiry'});
    const limits={name:100,email:254,business:200,service:100,message:5000};
    for (const key in limits) if(typeof value[key]!=='string' || value[key].length>limits[key]) return json_({ok:false,error:'Invalid inquiry'});
    if (!value.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email) || value.message.trim().length<15) return json_({ok:false,error:'Invalid inquiry'});
    const digest=hash_(JSON.stringify([value.name,value.email,value.business,value.service,value.message,value.consent]));
    const existing=sheet.getLastRow()>1 ? sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(value.requestId).matchEntireCell(true).findNext() : null;
    if(existing) {
      if(sheet.getRange(existing.getRow(),11).getValue()!==digest) return json_({ok:false,error:'Request ID conflict'});
      return json_({ok:true,requestId:value.requestId,duplicate:true});
    }
    const row=[value.requestId,Utilities.formatDate(new Date(),'Asia/Kolkata','yyyy-MM-dd HH:mm:ss'),safe_(value.name),safe_(value.email),safe_(value.business),safe_(value.service),safe_(value.message),'Agreed','ESGROW website','New',digest];
    const range=sheet.getRange(sheet.getLastRow()+1,1,1,HEADERS.length);
    range.setNumberFormat('@').setValues([row]).setVerticalAlignment('top').setWrap(true);
    SpreadsheetApp.flush();
    return json_({ok:true,requestId:value.requestId});
  } catch(error) {
    console.error('Enquiry receiver failed. Check sheet access and column headers.');
    return json_({ok:false,error:'Unable to save inquiry'});
  } finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}
