var setting = {
  matching_url: '',
  xpath: ''
}

chrome.storage.local.get(setting, function(items) {
  setting['matching_url'] = items.matching_url;
  setting['xpath'] = items.xpath;
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  sendResponse(setting['matching_url'] + "\n" + setting['xpath']);
});