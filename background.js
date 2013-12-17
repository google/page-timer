var LastChange = {};

chrome.browserAction.setTitle({ 'title': '?'});
chrome.browserAction.setBadgeText({ 'text': '?'});
chrome.browserAction.setBadgeBackgroundColor({ 'color': "#666" });

function HandleChange(tabId, changeInfo, tab) {
  if ("url" in changeInfo) {
    chrome.extension.getBackgroundPage().console.log("Tab changed: ", tabId, changeInfo);
    var now = new Date();
    LastChange[tabId] = now;
    chrome.browserAction.setTitle({ 'tabId': tabId, 'title': now.toString()});
    chrome.browserAction.setBadgeText({ 'tabId': tabId, 'text': '0m'});
  }
}

function UpdateBadges() {
  var now = new Date();
  for (tabId in LastChange) {
    var minutes = Math.floor((now - LastChange[tabId]) / (60 * 1000));
    var description;
    if (minutes < 60) {
      description = minutes + "m";
    } else {
      var hours = Math.floor(minutes / 60);
      var display_minutes = minutes % 60;
      if (display_minutes < 10) {
        display_minutes = "0" + display_minutes;
      }
      description = hours + ":" + display_minutes;
    }
    chrome.browserAction.setBadgeText({ 'tabId': parseInt(tabId), 'text': description});
  }
}

setInterval(UpdateBadges, 3000);

chrome.tabs.onUpdated.addListener(HandleChange);
