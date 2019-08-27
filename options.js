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

function save_options() {
  localStorage["history_size"] = document.getElementById("history_size").value;
  localStorage["notify"] = document.getElementById("notify").checked;
  localStorage["notify_max"] = document.getElementById("notify_max").value;

  var blacklist = document.getElementById("notify_blacklist").value.split('\n').filter(line => line)
  localStorage["notify_blacklist"] = blacklist.join(',');

  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function restore_options() {
  var history_size = localStorage["history_size"];
  var notify = localStorage["notify"];
  var notify_max = localStorage["notify_max"];
  var notify_blacklist = localStorage["notify_blacklist"];

  if (!history_size) {
    return;
  }

  document.getElementById("history_size").value = history_size;
  document.getElementById("notify").checked = notify;
  document.getElementById("notify_max").value = notify_max;
  document.getElementById("notify_blacklist").value = notify_blacklist ? notify_blacklist.split(',').join('\n') : '';
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
