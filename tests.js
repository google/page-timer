/*
 * Copyright 2017 Google Inc. All rights reserved.
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

var common = require('./common.js');
var assert = require('assert');

assert.strictEqual(common.FormatDuration(-1), "?");
assert.strictEqual(common.FormatDuration(0), "0:00");
assert.strictEqual(common.FormatDuration(59499), "0:59");
assert.strictEqual(common.FormatDuration(60000), "1:00");
assert.strictEqual(common.FormatDuration(3599499), "59:59");
assert.strictEqual(common.FormatDuration(3600000), "1:00");
assert.strictEqual(common.FormatDuration(7199499), "1:59");
assert.strictEqual(common.FormatDuration(7200000), "2:00");

console.log("All tests passed");
