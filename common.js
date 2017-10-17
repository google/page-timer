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

"use strict";

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
