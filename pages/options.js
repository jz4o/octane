// Saves options to chrome.storage
function save_options() {
  var matchingUrl = document.getElementById('matching_url').value;
  var xpath = document.getElementById('xpath').value;
  chrome.storage.local.set({
    matchingUrl: matchingUrl,
    xpath: xpath,
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
    xpath: ''
  }, function(items) {
    document.getElementById('matching_url').value = items.matchingUrl;
    document.getElementById('xpath').value = items.xpath;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restore_options();
  document.getElementById('save').addEventListener('click', save_options);
});