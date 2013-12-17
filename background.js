var History = {};

chrome.browserAction.setTitle({ 'title': '?'});
chrome.browserAction.setBadgeText({ 'text': '?'});
chrome.browserAction.setBadgeBackgroundColor({ 'color': "#666" });

function FormatDuration(d) {
  var minutes = Math.floor(d / (60 * 1000));
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
  return description;
}

function HandleChange(tabId, changeInfo, tab) {
  if ("url" in changeInfo) {
    chrome.extension.getBackgroundPage().console.log("Tab changed: ", tabId, changeInfo);
    var now = new Date();
    if (!(tabId in History)) {
      History[tabId] = [];
    }
    History[tabId].unshift([now, changeInfo.url]);
    var title = "";
    for (var i=0; i < History[tabId].length; i++) {
      var t = History[tabId][i][0]
      if (i < History[tabId].length - 1) {
        if (History[tabId][i][0].toLocaleDateString() != History[tabId][i+1][0].toLocaleDateString()) {
          title += t.toLocaleDateString() + " ";
        }
        title += t.toLocaleTimeString() + " ";
        title += FormatDuration(History[tabId][i][0] - History[tabId][i+1][0]) + " ";
      } else {
        title += t.toLocaleDateString() + " " + t.toLocaleTimeString() + " ";
      }
      title += History[tabId][i][1] + "\n";
    }
    chrome.browserAction.setBadgeText({ 'tabId': tabId, 'text': '0m'});
    chrome.browserAction.setTitle({ 'tabId': tabId, 'title': title});
  }
}

function UpdateBadges() {
  var now = new Date();
  for (tabId in History) {
    var description = FormatDuration(now - History[tabId][0][0]);
    chrome.browserAction.setBadgeText({ 'tabId': parseInt(tabId), 'text': description});
  }
}

setInterval(UpdateBadges, 3000);

chrome.tabs.onUpdated.addListener(HandleChange);
