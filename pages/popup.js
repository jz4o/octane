chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, null, function(msg) {
    document.getElementById("result").innerHTML = msg;
  });
});
