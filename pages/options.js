// Saves options to chrome.storage
function save_options() {
  var matchingUrl = document.getElementById('matching_url').value;
  var xpath = document.getElementById('xpath').value;
  var spreadSheetPostUrl = document.getElementById('spread_sheet_post_url').value;
  var spreadSheetPostToken = document.getElementById('spread_sheet_post_token').value;
  chrome.storage.local.set({
    matchingUrl: matchingUrl,
    xpath: xpath,
    spreadSheetPostUrl: spreadSheetPostUrl,
    spreadSheetPostToken: spreadSheetPostToken
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value.
  chrome.storage.local.get({
    matchingUrl: '',
    xpath: '',
    spreadSheetPostUrl: '',
    spreadSheetPostToken: ''
  }, function(items) {
    document.getElementById('matching_url').value = items.matchingUrl;
    document.getElementById('xpath').value = items.xpath;
    document.getElementById('spread_sheet_post_url').value = items.spreadSheetPostUrl;
    document.getElementById('spread_sheet_post_token').value = items.spreadSheetPostToken;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restore_options();
  document.getElementById('save').addEventListener('click', save_options);
});