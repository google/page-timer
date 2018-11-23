/*
 * Copyright 2013 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var History = {};

chrome.browserAction.setBadgeText({ 'text': '?'});
chrome.browserAction.setBadgeBackgroundColor({ 'color': "#777" });

function Update(t, tabId, url) {
  if (!url) {
    return;
  }
  if (tabId in History) {
    if (url == History[tabId][0][1]) {
      return;
    }
  } else {
    History[tabId] = [];
  }
  History[tabId].unshift([t, url]);

  var history_limit = parseInt(localStorage["history_size"]);
  if (! history_limit) {
    history_limit = 23;
  }
  while (History[tabId].length > history_limit) {
    History[tabId].pop();
  }

  chrome.browserAction.setBadgeText({ 'tabId': tabId, 'text': '0:00'});
  chrome.browserAction.setPopup({ 'tabId': tabId, 'popup': "popup.html#tabId=" + tabId});
}

function HandleUpdate(tabId, changeInfo, tab) {
  Update(new Date(), tabId, changeInfo.url);
}

function HandleRemove(tabId, removeInfo) {
  delete History[tabId];
}

function HandleReplace(addedTabId, removedTabId) {
  var t = new Date();
  delete History[removedTabId];
  chrome.tabs.get(addedTabId, function(tab) {
    Update(t, addedTabId, tab.url);
  });
}


function UpdateBadges() {
  var now = new Date();
  for (tabId in History) {
    var background = chrome.extension.getBackgroundPage();
    var description = FormatDuration(now - History[tabId][0][0]);
    chrome.browserAction.setBadgeText({ 'tabId': parseInt(tabId), 'text': description});

    var timeDiff = now - History[tabId][0][0];
    var timeDiffSeconds = Math.floor(timeDiff / 1000);

    var minutes = parseInt(description.split(':')[0]);
    var seconds = parseInt(description.split(':')[1]);
    var notify = Boolean(localStorage['notify']);
    var notify_max = parseInt(localStorage['notify_max']);
    notify_max = isNaN(notify_max) ? 5 : notify_max;
    
    var blacklist = localStorage['notify_blacklist'] ? localStorage['notify_blacklist'].split(',') : [];
    var currentUrl = (History[tabId][0][1]);
    var isBlacklisted = false;

    var implicitBlacklist = ['chrome://', 'chrome-extension://'];

    implicitBlacklistMatches = implicitBlacklist.filter(item => currentUrl.includes(item));
    blacklistMatches = blacklist.filter(item => currentUrl.includes(item));
    isBlacklisted = implicitBlacklistMatches.length > 0 || blacklistMatches.length > 0;

    // background.console.log({ isBlacklisted, blacklistMatches, currentUrl, minutes, seconds, timeDiffSeconds });

    if (notify && !isBlacklisted && minutes > 0 && seconds === 0 && minutes <= notify_max && timeDiffSeconds < 3600) {
      var notification = new Audio('ding.mp3');
      for (var i = 1; i <= minutes; i++) {
        var wait = i * 500;
        setTimeout(function () { notification.play() }, wait);
      }
    }
  }
}

setInterval(UpdateBadges, 1000);

chrome.tabs.onUpdated.addListener(HandleUpdate);
chrome.tabs.onRemoved.addListener(HandleRemove);
chrome.tabs.onReplaced.addListener(HandleReplace);
