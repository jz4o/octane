var setting = {
  matchingUrl: '',
  xpath: ''
}

chrome.storage.local.get(setting, function(items) {
  setting['matchingUrl'] = items.matchingUrl;
  setting['xpath'] = items.xpath;
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if ((new RegExp(setting['matchingUrl'])).test(document.URL)) {
    if (result = document.getTextByXPath(setting['xpath'])) {
      return sendResponse({
        matchingUrl: setting['matchingUrl'],
        xpath:       setting['xpath'],
        result:      result
      });
    }
  }

  sendResponse('scraping failed...');
});

document.getTextByXPath = function(xpath) {
  var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  return element && element.textContent;
}
