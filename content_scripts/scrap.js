var setting = {
  matching_url: '',
  xpath: ''
}

chrome.storage.local.get(setting, function(items) {
  setting['matching_url'] = items.matching_url;
  setting['xpath'] = items.xpath;
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if ((new RegExp(setting['matching_url'])).test(document.URL)) {
    if (result = document.getTextByXPath(setting['xpath'])) {
      return sendResponse(result);
    }
  }

  sendResponse('scraping failed...');
});

document.getTextByXPath = function(xpath) {
  var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  return element && element.textContent;
}
