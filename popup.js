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

var tabId_re = /tabId=([0-9]+)/;
var match = tabId_re.exec(window.location.hash);
if (match) {
  var hist = chrome.extension.getBackgroundPage().History[match[1]];
  var table = document.createElement("table");
  for (var i=0; i < hist.length; i++) {
    var r = table.insertRow(-1);

    var date = "";
    if (i == hist.length - 1 ||
        (hist[i][0].toLocaleDateString() != hist[i+1][0].toLocaleDateString())) {
      date = hist[i][0].toLocaleDateString();
    }
    r.insertCell(-1).textContent = date;

    r.insertCell(-1).textContent = hist[i][0].toLocaleTimeString();

    var end_time;
    if (i == 0) {
      end_time = new Date();
    } else {
      end_time = hist[i-1][0];
    }
    r.insertCell(-1).textContent = FormatDuration(end_time - hist[i][0]);

    var a = document.createElement("a");
    a.textContent = hist[i][1];
    a.setAttribute("href", hist[i][1]);
    a.setAttribute("target", "_blank");
    r.insertCell(-1).appendChild(a);
  }
  document.body.appendChild(table);
}
