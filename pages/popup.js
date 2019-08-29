chrome.tabs.getSelected(null, function(tab) {
  var spreadSheetPostUrl = ''
  var spreadSheetPostToken = ''
  chrome.storage.local.get({
    spreadSheetPostUrl: '',
    spreadSheetPostToken: ''
  }, function(items) {
    spreadSheetPostUrl = items.spreadSheetPostUrl;
    spreadSheetPostToken = items.spreadSheetPostToken;
  });

  chrome.tabs.sendMessage(tab.id, null, function(msg) {
    document.getElementById("result").innerHTML = msg['result'];

    var requestBody = {
      'token': spreadSheetPostToken,
      'parameter': {
        'sheet': msg['matchingUrl'],
        'data': {}
      }
    };
    requestBody['parameter']['data'][msg['xpath']] = msg['result'];

    fetch(spreadSheetPostUrl, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(requestBody)
    });
  });
});
