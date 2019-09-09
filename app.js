/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "146e1cb444eef6de85fb";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/lit-element/lib/css-tag.js":
/*!*************************************************!*\
  !*** ./node_modules/lit-element/lib/css-tag.js ***!
  \*************************************************/
/*! exports provided: supportsAdoptingStyleSheets, CSSResult, unsafeCSS, css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"supportsAdoptingStyleSheets\", function() { return supportsAdoptingStyleSheets; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CSSResult\", function() { return CSSResult; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unsafeCSS\", function() { return unsafeCSS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"css\", function() { return css; });\n/**\n@license\nCopyright (c) 2019 The Polymer Project Authors. All rights reserved.\nThis code may only be used under the BSD style license found at\nhttp://polymer.github.io/LICENSE.txt The complete set of authors may be found at\nhttp://polymer.github.io/AUTHORS.txt The complete set of contributors may be\nfound at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as\npart of the polymer project is also subject to an additional IP rights grant\nfound at http://polymer.github.io/PATENTS.txt\n*/\nconst supportsAdoptingStyleSheets = ('adoptedStyleSheets' in Document.prototype) &&\n    ('replace' in CSSStyleSheet.prototype);\nconst constructionToken = Symbol();\nclass CSSResult {\n    constructor(cssText, safeToken) {\n        if (safeToken !== constructionToken) {\n            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');\n        }\n        this.cssText = cssText;\n    }\n    // Note, this is a getter so that it's lazy. In practice, this means\n    // stylesheets are not created until the first element instance is made.\n    get styleSheet() {\n        if (this._styleSheet === undefined) {\n            // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet\n            // is constructable.\n            if (supportsAdoptingStyleSheets) {\n                this._styleSheet = new CSSStyleSheet();\n                this._styleSheet.replaceSync(this.cssText);\n            }\n            else {\n                this._styleSheet = null;\n            }\n        }\n        return this._styleSheet;\n    }\n    toString() {\n        return this.cssText;\n    }\n}\n/**\n * Wrap a value for interpolation in a css tagged template literal.\n *\n * This is unsafe because untrusted CSS text can be used to phone home\n * or exfiltrate data to an attacker controlled site. Take care to only use\n * this with trusted input.\n */\nconst unsafeCSS = (value) => {\n    return new CSSResult(String(value), constructionToken);\n};\nconst textFromCSSResult = (value) => {\n    if (value instanceof CSSResult) {\n        return value.cssText;\n    }\n    else if (typeof value === 'number') {\n        return value;\n    }\n    else {\n        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`);\n    }\n};\n/**\n * Template tag which which can be used with LitElement's `style` property to\n * set element styles. For security reasons, only literal string values may be\n * used. To incorporate non-literal values `unsafeCSS` may be used inside a\n * template string part.\n */\nconst css = (strings, ...values) => {\n    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);\n    return new CSSResult(cssText, constructionToken);\n};\n//# sourceMappingURL=css-tag.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-element/lib/css-tag.js?");

/***/ }),

/***/ "./node_modules/lit-element/lib/decorators.js":
/*!****************************************************!*\
  !*** ./node_modules/lit-element/lib/decorators.js ***!
  \****************************************************/
/*! exports provided: customElement, property, query, queryAll, eventOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"customElement\", function() { return customElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"property\", function() { return property; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"query\", function() { return query; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"queryAll\", function() { return queryAll; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"eventOptions\", function() { return eventOptions; });\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\nconst legacyCustomElement = (tagName, clazz) => {\n    window.customElements.define(tagName, clazz);\n    // Cast as any because TS doesn't recognize the return type as being a\n    // subtype of the decorated class when clazz is typed as\n    // `Constructor<HTMLElement>` for some reason.\n    // `Constructor<HTMLElement>` is helpful to make sure the decorator is\n    // applied to elements however.\n    // tslint:disable-next-line:no-any\n    return clazz;\n};\nconst standardCustomElement = (tagName, descriptor) => {\n    const { kind, elements } = descriptor;\n    return {\n        kind,\n        elements,\n        // This callback is called once the class is otherwise fully defined\n        finisher(clazz) {\n            window.customElements.define(tagName, clazz);\n        }\n    };\n};\n/**\n * Class decorator factory that defines the decorated class as a custom element.\n *\n * @param tagName the name of the custom element to define\n */\nconst customElement = (tagName) => (classOrDescriptor) => (typeof classOrDescriptor === 'function') ?\n    legacyCustomElement(tagName, classOrDescriptor) :\n    standardCustomElement(tagName, classOrDescriptor);\nconst standardProperty = (options, element) => {\n    // When decorating an accessor, pass it through and add property metadata.\n    // Note, the `hasOwnProperty` check in `createProperty` ensures we don't\n    // stomp over the user's accessor.\n    if (element.kind === 'method' && element.descriptor &&\n        !('value' in element.descriptor)) {\n        return Object.assign({}, element, { finisher(clazz) {\n                clazz.createProperty(element.key, options);\n            } });\n    }\n    else {\n        // createProperty() takes care of defining the property, but we still\n        // must return some kind of descriptor, so return a descriptor for an\n        // unused prototype field. The finisher calls createProperty().\n        return {\n            kind: 'field',\n            key: Symbol(),\n            placement: 'own',\n            descriptor: {},\n            // When @babel/plugin-proposal-decorators implements initializers,\n            // do this instead of the initializer below. See:\n            // https://github.com/babel/babel/issues/9260 extras: [\n            //   {\n            //     kind: 'initializer',\n            //     placement: 'own',\n            //     initializer: descriptor.initializer,\n            //   }\n            // ],\n            initializer() {\n                if (typeof element.initializer === 'function') {\n                    this[element.key] = element.initializer.call(this);\n                }\n            },\n            finisher(clazz) {\n                clazz.createProperty(element.key, options);\n            }\n        };\n    }\n};\nconst legacyProperty = (options, proto, name) => {\n    proto.constructor\n        .createProperty(name, options);\n};\n/**\n * A property decorator which creates a LitElement property which reflects a\n * corresponding attribute value. A `PropertyDeclaration` may optionally be\n * supplied to configure property features.\n *\n * @ExportDecoratedItems\n */\nfunction property(options) {\n    // tslint:disable-next-line:no-any decorator\n    return (protoOrDescriptor, name) => (name !== undefined) ?\n        legacyProperty(options, protoOrDescriptor, name) :\n        standardProperty(options, protoOrDescriptor);\n}\n/**\n * A property decorator that converts a class property into a getter that\n * executes a querySelector on the element's renderRoot.\n *\n * @ExportDecoratedItems\n */\nfunction query(selector) {\n    return (protoOrDescriptor, \n    // tslint:disable-next-line:no-any decorator\n    name) => {\n        const descriptor = {\n            get() {\n                return this.renderRoot.querySelector(selector);\n            },\n            enumerable: true,\n            configurable: true,\n        };\n        return (name !== undefined) ?\n            legacyQuery(descriptor, protoOrDescriptor, name) :\n            standardQuery(descriptor, protoOrDescriptor);\n    };\n}\n/**\n * A property decorator that converts a class property into a getter\n * that executes a querySelectorAll on the element's renderRoot.\n *\n * @ExportDecoratedItems\n */\nfunction queryAll(selector) {\n    return (protoOrDescriptor, \n    // tslint:disable-next-line:no-any decorator\n    name) => {\n        const descriptor = {\n            get() {\n                return this.renderRoot.querySelectorAll(selector);\n            },\n            enumerable: true,\n            configurable: true,\n        };\n        return (name !== undefined) ?\n            legacyQuery(descriptor, protoOrDescriptor, name) :\n            standardQuery(descriptor, protoOrDescriptor);\n    };\n}\nconst legacyQuery = (descriptor, proto, name) => {\n    Object.defineProperty(proto, name, descriptor);\n};\nconst standardQuery = (descriptor, element) => ({\n    kind: 'method',\n    placement: 'prototype',\n    key: element.key,\n    descriptor,\n});\nconst standardEventOptions = (options, element) => {\n    return Object.assign({}, element, { finisher(clazz) {\n            Object.assign(clazz.prototype[element.key], options);\n        } });\n};\nconst legacyEventOptions = \n// tslint:disable-next-line:no-any legacy decorator\n(options, proto, name) => {\n    Object.assign(proto[name], options);\n};\n/**\n * Adds event listener options to a method used as an event listener in a\n * lit-html template.\n *\n * @param options An object that specifis event listener options as accepted by\n * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.\n *\n * Current browsers support the `capture`, `passive`, and `once` options. See:\n * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters\n *\n * @example\n *\n *     class MyElement {\n *\n *       clicked = false;\n *\n *       render() {\n *         return html`<div @click=${this._onClick}`><button></button></div>`;\n *       }\n *\n *       @eventOptions({capture: true})\n *       _onClick(e) {\n *         this.clicked = true;\n *       }\n *     }\n */\nconst eventOptions = (options) => \n// Return value typed as any to prevent TypeScript from complaining that\n// standard decorator function signature does not match TypeScript decorator\n// signature\n// TODO(kschaaf): unclear why it was only failing on this decorator and not\n// the others\n((protoOrDescriptor, name) => (name !== undefined) ?\n    legacyEventOptions(options, protoOrDescriptor, name) :\n    standardEventOptions(options, protoOrDescriptor));\n//# sourceMappingURL=decorators.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-element/lib/decorators.js?");

/***/ }),

/***/ "./node_modules/lit-element/lib/updating-element.js":
/*!**********************************************************!*\
  !*** ./node_modules/lit-element/lib/updating-element.js ***!
  \**********************************************************/
/*! exports provided: defaultConverter, notEqual, UpdatingElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultConverter\", function() { return defaultConverter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"notEqual\", function() { return notEqual; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UpdatingElement\", function() { return UpdatingElement; });\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\nvar _a;\n/**\n * When using Closure Compiler, JSCompiler_renameProperty(property, object) is\n * replaced at compile time by the munged name for object[property]. We cannot\n * alias this function, so we have to use a small shim that has the same\n * behavior when not compiling.\n */\nwindow.JSCompiler_renameProperty =\n    (prop, _obj) => prop;\nconst defaultConverter = {\n    toAttribute(value, type) {\n        switch (type) {\n            case Boolean:\n                return value ? '' : null;\n            case Object:\n            case Array:\n                // if the value is `null` or `undefined` pass this through\n                // to allow removing/no change behavior.\n                return value == null ? value : JSON.stringify(value);\n        }\n        return value;\n    },\n    fromAttribute(value, type) {\n        switch (type) {\n            case Boolean:\n                return value !== null;\n            case Number:\n                return value === null ? null : Number(value);\n            case Object:\n            case Array:\n                return JSON.parse(value);\n        }\n        return value;\n    }\n};\n/**\n * Change function that returns true if `value` is different from `oldValue`.\n * This method is used as the default for a property's `hasChanged` function.\n */\nconst notEqual = (value, old) => {\n    // This ensures (old==NaN, value==NaN) always returns false\n    return old !== value && (old === old || value === value);\n};\nconst defaultPropertyDeclaration = {\n    attribute: true,\n    type: String,\n    converter: defaultConverter,\n    reflect: false,\n    hasChanged: notEqual\n};\nconst microtaskPromise = Promise.resolve(true);\nconst STATE_HAS_UPDATED = 1;\nconst STATE_UPDATE_REQUESTED = 1 << 2;\nconst STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;\nconst STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;\nconst STATE_HAS_CONNECTED = 1 << 5;\n/**\n * The Closure JS Compiler doesn't currently have good support for static\n * property semantics where \"this\" is dynamic (e.g.\n * https://github.com/google/closure-compiler/issues/3177 and others) so we use\n * this hack to bypass any rewriting by the compiler.\n */\nconst finalized = 'finalized';\n/**\n * Base element class which manages element properties and attributes. When\n * properties change, the `update` method is asynchronously called. This method\n * should be supplied by subclassers to render updates as desired.\n */\nclass UpdatingElement extends HTMLElement {\n    constructor() {\n        super();\n        this._updateState = 0;\n        this._instanceProperties = undefined;\n        this._updatePromise = microtaskPromise;\n        this._hasConnectedResolver = undefined;\n        /**\n         * Map with keys for any properties that have changed since the last\n         * update cycle with previous values.\n         */\n        this._changedProperties = new Map();\n        /**\n         * Map with keys of properties that should be reflected when updated.\n         */\n        this._reflectingProperties = undefined;\n        this.initialize();\n    }\n    /**\n     * Returns a list of attributes corresponding to the registered properties.\n     * @nocollapse\n     */\n    static get observedAttributes() {\n        // note: piggy backing on this to ensure we're finalized.\n        this.finalize();\n        const attributes = [];\n        // Use forEach so this works even if for/of loops are compiled to for loops\n        // expecting arrays\n        this._classProperties.forEach((v, p) => {\n            const attr = this._attributeNameForProperty(p, v);\n            if (attr !== undefined) {\n                this._attributeToPropertyMap.set(attr, p);\n                attributes.push(attr);\n            }\n        });\n        return attributes;\n    }\n    /**\n     * Ensures the private `_classProperties` property metadata is created.\n     * In addition to `finalize` this is also called in `createProperty` to\n     * ensure the `@property` decorator can add property metadata.\n     */\n    /** @nocollapse */\n    static _ensureClassProperties() {\n        // ensure private storage for property declarations.\n        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {\n            this._classProperties = new Map();\n            // NOTE: Workaround IE11 not supporting Map constructor argument.\n            const superProperties = Object.getPrototypeOf(this)._classProperties;\n            if (superProperties !== undefined) {\n                superProperties.forEach((v, k) => this._classProperties.set(k, v));\n            }\n        }\n    }\n    /**\n     * Creates a property accessor on the element prototype if one does not exist.\n     * The property setter calls the property's `hasChanged` property option\n     * or uses a strict identity check to determine whether or not to request\n     * an update.\n     * @nocollapse\n     */\n    static createProperty(name, options = defaultPropertyDeclaration) {\n        // Note, since this can be called by the `@property` decorator which\n        // is called before `finalize`, we ensure storage exists for property\n        // metadata.\n        this._ensureClassProperties();\n        this._classProperties.set(name, options);\n        // Do not generate an accessor if the prototype already has one, since\n        // it would be lost otherwise and that would never be the user's intention;\n        // Instead, we expect users to call `requestUpdate` themselves from\n        // user-defined accessors. Note that if the super has an accessor we will\n        // still overwrite it\n        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {\n            return;\n        }\n        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;\n        Object.defineProperty(this.prototype, name, {\n            // tslint:disable-next-line:no-any no symbol in index\n            get() {\n                return this[key];\n            },\n            set(value) {\n                const oldValue = this[name];\n                this[key] = value;\n                this._requestUpdate(name, oldValue);\n            },\n            configurable: true,\n            enumerable: true\n        });\n    }\n    /**\n     * Creates property accessors for registered properties and ensures\n     * any superclasses are also finalized.\n     * @nocollapse\n     */\n    static finalize() {\n        // finalize any superclasses\n        const superCtor = Object.getPrototypeOf(this);\n        if (!superCtor.hasOwnProperty(finalized)) {\n            superCtor.finalize();\n        }\n        this[finalized] = true;\n        this._ensureClassProperties();\n        // initialize Map populated in observedAttributes\n        this._attributeToPropertyMap = new Map();\n        // make any properties\n        // Note, only process \"own\" properties since this element will inherit\n        // any properties defined on the superClass, and finalization ensures\n        // the entire prototype chain is finalized.\n        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {\n            const props = this.properties;\n            // support symbols in properties (IE11 does not support this)\n            const propKeys = [\n                ...Object.getOwnPropertyNames(props),\n                ...(typeof Object.getOwnPropertySymbols === 'function') ?\n                    Object.getOwnPropertySymbols(props) :\n                    []\n            ];\n            // This for/of is ok because propKeys is an array\n            for (const p of propKeys) {\n                // note, use of `any` is due to TypeSript lack of support for symbol in\n                // index types\n                // tslint:disable-next-line:no-any no symbol in index\n                this.createProperty(p, props[p]);\n            }\n        }\n    }\n    /**\n     * Returns the property name for the given attribute `name`.\n     * @nocollapse\n     */\n    static _attributeNameForProperty(name, options) {\n        const attribute = options.attribute;\n        return attribute === false ?\n            undefined :\n            (typeof attribute === 'string' ?\n                attribute :\n                (typeof name === 'string' ? name.toLowerCase() : undefined));\n    }\n    /**\n     * Returns true if a property should request an update.\n     * Called when a property value is set and uses the `hasChanged`\n     * option for the property if present or a strict identity check.\n     * @nocollapse\n     */\n    static _valueHasChanged(value, old, hasChanged = notEqual) {\n        return hasChanged(value, old);\n    }\n    /**\n     * Returns the property value for the given attribute value.\n     * Called via the `attributeChangedCallback` and uses the property's\n     * `converter` or `converter.fromAttribute` property option.\n     * @nocollapse\n     */\n    static _propertyValueFromAttribute(value, options) {\n        const type = options.type;\n        const converter = options.converter || defaultConverter;\n        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);\n        return fromAttribute ? fromAttribute(value, type) : value;\n    }\n    /**\n     * Returns the attribute value for the given property value. If this\n     * returns undefined, the property will *not* be reflected to an attribute.\n     * If this returns null, the attribute will be removed, otherwise the\n     * attribute will be set to the value.\n     * This uses the property's `reflect` and `type.toAttribute` property options.\n     * @nocollapse\n     */\n    static _propertyValueToAttribute(value, options) {\n        if (options.reflect === undefined) {\n            return;\n        }\n        const type = options.type;\n        const converter = options.converter;\n        const toAttribute = converter && converter.toAttribute ||\n            defaultConverter.toAttribute;\n        return toAttribute(value, type);\n    }\n    /**\n     * Performs element initialization. By default captures any pre-set values for\n     * registered properties.\n     */\n    initialize() {\n        this._saveInstanceProperties();\n        // ensures first update will be caught by an early access of\n        // `updateComplete`\n        this._requestUpdate();\n    }\n    /**\n     * Fixes any properties set on the instance before upgrade time.\n     * Otherwise these would shadow the accessor and break these properties.\n     * The properties are stored in a Map which is played back after the\n     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome\n     * (<=41), properties created for native platform properties like (`id` or\n     * `name`) may not have default values set in the element constructor. On\n     * these browsers native properties appear on instances and therefore their\n     * default value will overwrite any element default (e.g. if the element sets\n     * this.id = 'id' in the constructor, the 'id' will become '' since this is\n     * the native platform default).\n     */\n    _saveInstanceProperties() {\n        // Use forEach so this works even if for/of loops are compiled to for loops\n        // expecting arrays\n        this.constructor\n            ._classProperties.forEach((_v, p) => {\n            if (this.hasOwnProperty(p)) {\n                const value = this[p];\n                delete this[p];\n                if (!this._instanceProperties) {\n                    this._instanceProperties = new Map();\n                }\n                this._instanceProperties.set(p, value);\n            }\n        });\n    }\n    /**\n     * Applies previously saved instance properties.\n     */\n    _applyInstanceProperties() {\n        // Use forEach so this works even if for/of loops are compiled to for loops\n        // expecting arrays\n        // tslint:disable-next-line:no-any\n        this._instanceProperties.forEach((v, p) => this[p] = v);\n        this._instanceProperties = undefined;\n    }\n    connectedCallback() {\n        this._updateState = this._updateState | STATE_HAS_CONNECTED;\n        // Ensure first connection completes an update. Updates cannot complete\n        // before connection and if one is pending connection the\n        // `_hasConnectionResolver` will exist. If so, resolve it to complete the\n        // update, otherwise requestUpdate.\n        if (this._hasConnectedResolver) {\n            this._hasConnectedResolver();\n            this._hasConnectedResolver = undefined;\n        }\n    }\n    /**\n     * Allows for `super.disconnectedCallback()` in extensions while\n     * reserving the possibility of making non-breaking feature additions\n     * when disconnecting at some point in the future.\n     */\n    disconnectedCallback() {\n    }\n    /**\n     * Synchronizes property values when attributes change.\n     */\n    attributeChangedCallback(name, old, value) {\n        if (old !== value) {\n            this._attributeToProperty(name, value);\n        }\n    }\n    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {\n        const ctor = this.constructor;\n        const attr = ctor._attributeNameForProperty(name, options);\n        if (attr !== undefined) {\n            const attrValue = ctor._propertyValueToAttribute(value, options);\n            // an undefined value does not change the attribute.\n            if (attrValue === undefined) {\n                return;\n            }\n            // Track if the property is being reflected to avoid\n            // setting the property again via `attributeChangedCallback`. Note:\n            // 1. this takes advantage of the fact that the callback is synchronous.\n            // 2. will behave incorrectly if multiple attributes are in the reaction\n            // stack at time of calling. However, since we process attributes\n            // in `update` this should not be possible (or an extreme corner case\n            // that we'd like to discover).\n            // mark state reflecting\n            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;\n            if (attrValue == null) {\n                this.removeAttribute(attr);\n            }\n            else {\n                this.setAttribute(attr, attrValue);\n            }\n            // mark state not reflecting\n            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;\n        }\n    }\n    _attributeToProperty(name, value) {\n        // Use tracking info to avoid deserializing attribute value if it was\n        // just set from a property setter.\n        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {\n            return;\n        }\n        const ctor = this.constructor;\n        const propName = ctor._attributeToPropertyMap.get(name);\n        if (propName !== undefined) {\n            const options = ctor._classProperties.get(propName) || defaultPropertyDeclaration;\n            // mark state reflecting\n            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;\n            this[propName] =\n                // tslint:disable-next-line:no-any\n                ctor._propertyValueFromAttribute(value, options);\n            // mark state not reflecting\n            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;\n        }\n    }\n    /**\n     * This private version of `requestUpdate` does not access or return the\n     * `updateComplete` promise. This promise can be overridden and is therefore\n     * not free to access.\n     */\n    _requestUpdate(name, oldValue) {\n        let shouldRequestUpdate = true;\n        // If we have a property key, perform property update steps.\n        if (name !== undefined) {\n            const ctor = this.constructor;\n            const options = ctor._classProperties.get(name) || defaultPropertyDeclaration;\n            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {\n                if (!this._changedProperties.has(name)) {\n                    this._changedProperties.set(name, oldValue);\n                }\n                // Add to reflecting properties set.\n                // Note, it's important that every change has a chance to add the\n                // property to `_reflectingProperties`. This ensures setting\n                // attribute + property reflects correctly.\n                if (options.reflect === true &&\n                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {\n                    if (this._reflectingProperties === undefined) {\n                        this._reflectingProperties = new Map();\n                    }\n                    this._reflectingProperties.set(name, options);\n                }\n            }\n            else {\n                // Abort the request if the property should not be considered changed.\n                shouldRequestUpdate = false;\n            }\n        }\n        if (!this._hasRequestedUpdate && shouldRequestUpdate) {\n            this._enqueueUpdate();\n        }\n    }\n    /**\n     * Requests an update which is processed asynchronously. This should\n     * be called when an element should update based on some state not triggered\n     * by setting a property. In this case, pass no arguments. It should also be\n     * called when manually implementing a property setter. In this case, pass the\n     * property `name` and `oldValue` to ensure that any configured property\n     * options are honored. Returns the `updateComplete` Promise which is resolved\n     * when the update completes.\n     *\n     * @param name {PropertyKey} (optional) name of requesting property\n     * @param oldValue {any} (optional) old value of requesting property\n     * @returns {Promise} A Promise that is resolved when the update completes.\n     */\n    requestUpdate(name, oldValue) {\n        this._requestUpdate(name, oldValue);\n        return this.updateComplete;\n    }\n    /**\n     * Sets up the element to asynchronously update.\n     */\n    async _enqueueUpdate() {\n        // Mark state updating...\n        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;\n        let resolve;\n        let reject;\n        const previousUpdatePromise = this._updatePromise;\n        this._updatePromise = new Promise((res, rej) => {\n            resolve = res;\n            reject = rej;\n        });\n        try {\n            // Ensure any previous update has resolved before updating.\n            // This `await` also ensures that property changes are batched.\n            await previousUpdatePromise;\n        }\n        catch (e) {\n            // Ignore any previous errors. We only care that the previous cycle is\n            // done. Any error should have been handled in the previous update.\n        }\n        // Make sure the element has connected before updating.\n        if (!this._hasConnected) {\n            await new Promise((res) => this._hasConnectedResolver = res);\n        }\n        try {\n            const result = this.performUpdate();\n            // If `performUpdate` returns a Promise, we await it. This is done to\n            // enable coordinating updates with a scheduler. Note, the result is\n            // checked to avoid delaying an additional microtask unless we need to.\n            if (result != null) {\n                await result;\n            }\n        }\n        catch (e) {\n            reject(e);\n        }\n        resolve(!this._hasRequestedUpdate);\n    }\n    get _hasConnected() {\n        return (this._updateState & STATE_HAS_CONNECTED);\n    }\n    get _hasRequestedUpdate() {\n        return (this._updateState & STATE_UPDATE_REQUESTED);\n    }\n    get hasUpdated() {\n        return (this._updateState & STATE_HAS_UPDATED);\n    }\n    /**\n     * Performs an element update. Note, if an exception is thrown during the\n     * update, `firstUpdated` and `updated` will not be called.\n     *\n     * You can override this method to change the timing of updates. If this\n     * method is overridden, `super.performUpdate()` must be called.\n     *\n     * For instance, to schedule updates to occur just before the next frame:\n     *\n     * ```\n     * protected async performUpdate(): Promise<unknown> {\n     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));\n     *   super.performUpdate();\n     * }\n     * ```\n     */\n    performUpdate() {\n        // Mixin instance properties once, if they exist.\n        if (this._instanceProperties) {\n            this._applyInstanceProperties();\n        }\n        let shouldUpdate = false;\n        const changedProperties = this._changedProperties;\n        try {\n            shouldUpdate = this.shouldUpdate(changedProperties);\n            if (shouldUpdate) {\n                this.update(changedProperties);\n            }\n        }\n        catch (e) {\n            // Prevent `firstUpdated` and `updated` from running when there's an\n            // update exception.\n            shouldUpdate = false;\n            throw e;\n        }\n        finally {\n            // Ensure element can accept additional updates after an exception.\n            this._markUpdated();\n        }\n        if (shouldUpdate) {\n            if (!(this._updateState & STATE_HAS_UPDATED)) {\n                this._updateState = this._updateState | STATE_HAS_UPDATED;\n                this.firstUpdated(changedProperties);\n            }\n            this.updated(changedProperties);\n        }\n    }\n    _markUpdated() {\n        this._changedProperties = new Map();\n        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;\n    }\n    /**\n     * Returns a Promise that resolves when the element has completed updating.\n     * The Promise value is a boolean that is `true` if the element completed the\n     * update without triggering another update. The Promise result is `false` if\n     * a property was set inside `updated()`. If the Promise is rejected, an\n     * exception was thrown during the update.\n     *\n     * To await additional asynchronous work, override the `_getUpdateComplete`\n     * method. For example, it is sometimes useful to await a rendered element\n     * before fulfilling this Promise. To do this, first await\n     * `super._getUpdateComplete()`, then any subsequent state.\n     *\n     * @returns {Promise} The Promise returns a boolean that indicates if the\n     * update resolved without triggering another update.\n     */\n    get updateComplete() {\n        return this._getUpdateComplete();\n    }\n    /**\n     * Override point for the `updateComplete` promise.\n     *\n     * It is not safe to override the `updateComplete` getter directly due to a\n     * limitation in TypeScript which means it is not possible to call a\n     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target\n     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).\n     * This method should be overridden instead. For example:\n     *\n     *   class MyElement extends LitElement {\n     *     async _getUpdateComplete() {\n     *       await super._getUpdateComplete();\n     *       await this._myChild.updateComplete;\n     *     }\n     *   }\n     */\n    _getUpdateComplete() {\n        return this._updatePromise;\n    }\n    /**\n     * Controls whether or not `update` should be called when the element requests\n     * an update. By default, this method always returns `true`, but this can be\n     * customized to control when to update.\n     *\n     * * @param _changedProperties Map of changed properties with old values\n     */\n    shouldUpdate(_changedProperties) {\n        return true;\n    }\n    /**\n     * Updates the element. This method reflects property values to attributes.\n     * It can be overridden to render and keep updated element DOM.\n     * Setting properties inside this method will *not* trigger\n     * another update.\n     *\n     * * @param _changedProperties Map of changed properties with old values\n     */\n    update(_changedProperties) {\n        if (this._reflectingProperties !== undefined &&\n            this._reflectingProperties.size > 0) {\n            // Use forEach so this works even if for/of loops are compiled to for\n            // loops expecting arrays\n            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));\n            this._reflectingProperties = undefined;\n        }\n    }\n    /**\n     * Invoked whenever the element is updated. Implement to perform\n     * post-updating tasks via DOM APIs, for example, focusing an element.\n     *\n     * Setting properties inside this method will trigger the element to update\n     * again after this update cycle completes.\n     *\n     * * @param _changedProperties Map of changed properties with old values\n     */\n    updated(_changedProperties) {\n    }\n    /**\n     * Invoked when the element is first updated. Implement to perform one time\n     * work on the element after update.\n     *\n     * Setting properties inside this method will trigger the element to update\n     * again after this update cycle completes.\n     *\n     * * @param _changedProperties Map of changed properties with old values\n     */\n    firstUpdated(_changedProperties) {\n    }\n}\n_a = finalized;\n/**\n * Marks class as having finished creating properties.\n */\nUpdatingElement[_a] = true;\n//# sourceMappingURL=updating-element.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-element/lib/updating-element.js?");

/***/ }),

/***/ "./node_modules/lit-element/lit-element.js":
/*!*************************************************!*\
  !*** ./node_modules/lit-element/lit-element.js ***!
  \*************************************************/
/*! exports provided: html, svg, TemplateResult, SVGTemplateResult, LitElement, defaultConverter, notEqual, UpdatingElement, customElement, property, query, queryAll, eventOptions, supportsAdoptingStyleSheets, CSSResult, unsafeCSS, css */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LitElement\", function() { return LitElement; });\n/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-html */ \"./node_modules/lit-html/lit-html.js\");\n/* harmony import */ var lit_html_lib_shady_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html/lib/shady-render.js */ \"./node_modules/lit-html/lib/shady-render.js\");\n/* harmony import */ var _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/updating-element.js */ \"./node_modules/lit-element/lib/updating-element.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"defaultConverter\", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__[\"defaultConverter\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"notEqual\", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__[\"notEqual\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"UpdatingElement\", function() { return _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__[\"UpdatingElement\"]; });\n\n/* harmony import */ var _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/decorators.js */ \"./node_modules/lit-element/lib/decorators.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"customElement\", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__[\"customElement\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"property\", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__[\"property\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"query\", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__[\"query\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"queryAll\", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__[\"queryAll\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"eventOptions\", function() { return _lib_decorators_js__WEBPACK_IMPORTED_MODULE_3__[\"eventOptions\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"html\", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__[\"html\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"svg\", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__[\"svg\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TemplateResult\", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__[\"TemplateResult\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SVGTemplateResult\", function() { return lit_html__WEBPACK_IMPORTED_MODULE_0__[\"SVGTemplateResult\"]; });\n\n/* harmony import */ var _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/css-tag.js */ \"./node_modules/lit-element/lib/css-tag.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"supportsAdoptingStyleSheets\", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__[\"supportsAdoptingStyleSheets\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"CSSResult\", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__[\"CSSResult\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"unsafeCSS\", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__[\"unsafeCSS\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"css\", function() { return _lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__[\"css\"]; });\n\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n\n\n\n\n\n\n\n\n// IMPORTANT: do not change the property name or the assignment expression.\n// This line will be used in regexes to search for LitElement usage.\n// TODO(justinfagnani): inject version number at build time\n(window['litElementVersions'] || (window['litElementVersions'] = []))\n    .push('2.2.1');\n/**\n * Minimal implementation of Array.prototype.flat\n * @param arr the array to flatten\n * @param result the accumlated result\n */\nfunction arrayFlat(styles, result = []) {\n    for (let i = 0, length = styles.length; i < length; i++) {\n        const value = styles[i];\n        if (Array.isArray(value)) {\n            arrayFlat(value, result);\n        }\n        else {\n            result.push(value);\n        }\n    }\n    return result;\n}\n/** Deeply flattens styles array. Uses native flat if available. */\nconst flattenStyles = (styles) => styles.flat ? styles.flat(Infinity) : arrayFlat(styles);\nclass LitElement extends _lib_updating_element_js__WEBPACK_IMPORTED_MODULE_2__[\"UpdatingElement\"] {\n    /** @nocollapse */\n    static finalize() {\n        // The Closure JS Compiler does not always preserve the correct \"this\"\n        // when calling static super methods (b/137460243), so explicitly bind.\n        super.finalize.call(this);\n        // Prepare styling that is stamped at first render time. Styling\n        // is built from user provided `styles` or is inherited from the superclass.\n        this._styles =\n            this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ?\n                this._getUniqueStyles() :\n                this._styles || [];\n    }\n    /** @nocollapse */\n    static _getUniqueStyles() {\n        // Take care not to call `this.styles` multiple times since this generates\n        // new CSSResults each time.\n        // TODO(sorvell): Since we do not cache CSSResults by input, any\n        // shared styles will generate new stylesheet objects, which is wasteful.\n        // This should be addressed when a browser ships constructable\n        // stylesheets.\n        const userStyles = this.styles;\n        const styles = [];\n        if (Array.isArray(userStyles)) {\n            const flatStyles = flattenStyles(userStyles);\n            // As a performance optimization to avoid duplicated styling that can\n            // occur especially when composing via subclassing, de-duplicate styles\n            // preserving the last item in the list. The last item is kept to\n            // try to preserve cascade order with the assumption that it's most\n            // important that last added styles override previous styles.\n            const styleSet = flatStyles.reduceRight((set, s) => {\n                set.add(s);\n                // on IE set.add does not return the set.\n                return set;\n            }, new Set());\n            // Array.from does not work on Set in IE\n            styleSet.forEach((v) => styles.unshift(v));\n        }\n        else if (userStyles) {\n            styles.push(userStyles);\n        }\n        return styles;\n    }\n    /**\n     * Performs element initialization. By default this calls `createRenderRoot`\n     * to create the element `renderRoot` node and captures any pre-set values for\n     * registered properties.\n     */\n    initialize() {\n        super.initialize();\n        this.renderRoot =\n            this.createRenderRoot();\n        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the\n        // element's getRootNode(). While this could be done, we're choosing not to\n        // support this now since it would require different logic around de-duping.\n        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {\n            this.adoptStyles();\n        }\n    }\n    /**\n     * Returns the node into which the element should render and by default\n     * creates and returns an open shadowRoot. Implement to customize where the\n     * element's DOM is rendered. For example, to render into the element's\n     * childNodes, return `this`.\n     * @returns {Element|DocumentFragment} Returns a node into which to render.\n     */\n    createRenderRoot() {\n        return this.attachShadow({ mode: 'open' });\n    }\n    /**\n     * Applies styling to the element shadowRoot using the `static get styles`\n     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where\n     * available and will fallback otherwise. When Shadow DOM is polyfilled,\n     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM\n     * is available but `adoptedStyleSheets` is not, styles are appended to the\n     * end of the `shadowRoot` to [mimic spec\n     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).\n     */\n    adoptStyles() {\n        const styles = this.constructor._styles;\n        if (styles.length === 0) {\n            return;\n        }\n        // There are three separate cases here based on Shadow DOM support.\n        // (1) shadowRoot polyfilled: use ShadyCSS\n        // (2) shadowRoot.adoptedStyleSheets available: use it.\n        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after\n        // rendering\n        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {\n            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);\n        }\n        else if (_lib_css_tag_js__WEBPACK_IMPORTED_MODULE_4__[\"supportsAdoptingStyleSheets\"]) {\n            this.renderRoot.adoptedStyleSheets =\n                styles.map((s) => s.styleSheet);\n        }\n        else {\n            // This must be done after rendering so the actual style insertion is done\n            // in `update`.\n            this._needsShimAdoptedStyleSheets = true;\n        }\n    }\n    connectedCallback() {\n        super.connectedCallback();\n        // Note, first update/render handles styleElement so we only call this if\n        // connected after first update.\n        if (this.hasUpdated && window.ShadyCSS !== undefined) {\n            window.ShadyCSS.styleElement(this);\n        }\n    }\n    /**\n     * Updates the element. This method reflects property values to attributes\n     * and calls `render` to render DOM via lit-html. Setting properties inside\n     * this method will *not* trigger another update.\n     * * @param _changedProperties Map of changed properties with old values\n     */\n    update(changedProperties) {\n        super.update(changedProperties);\n        const templateResult = this.render();\n        if (templateResult instanceof lit_html__WEBPACK_IMPORTED_MODULE_0__[\"TemplateResult\"]) {\n            this.constructor\n                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });\n        }\n        // When native Shadow DOM is used but adoptedStyles are not supported,\n        // insert styling after rendering to ensure adoptedStyles have highest\n        // priority.\n        if (this._needsShimAdoptedStyleSheets) {\n            this._needsShimAdoptedStyleSheets = false;\n            this.constructor._styles.forEach((s) => {\n                const style = document.createElement('style');\n                style.textContent = s.cssText;\n                this.renderRoot.appendChild(style);\n            });\n        }\n    }\n    /**\n     * Invoked on each update to perform rendering tasks. This method must return\n     * a lit-html TemplateResult. Setting properties inside this method will *not*\n     * trigger the element to update.\n     */\n    render() {\n    }\n}\n/**\n * Ensure this class is marked as `finalized` as an optimization ensuring\n * it will not needlessly try to `finalize`.\n *\n * Note this property name is a string to prevent breaking Closure JS Compiler\n * optimizations. See updating-element.ts for more information.\n */\nLitElement['finalized'] = true;\n/**\n * Render method used to render the lit-html TemplateResult to the element's\n * DOM.\n * @param {TemplateResult} Template to render.\n * @param {Element|DocumentFragment} Node into which to render.\n * @param {String} Element name.\n * @nocollapse\n */\nLitElement.render = lit_html_lib_shady_render_js__WEBPACK_IMPORTED_MODULE_1__[\"render\"];\n//# sourceMappingURL=lit-element.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-element/lit-element.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/default-template-processor.js":
/*!*****************************************************************!*\
  !*** ./node_modules/lit-html/lib/default-template-processor.js ***!
  \*****************************************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DefaultTemplateProcessor\", function() { return DefaultTemplateProcessor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultTemplateProcessor\", function() { return defaultTemplateProcessor; });\n/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts.js */ \"./node_modules/lit-html/lib/parts.js\");\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * Creates Parts when a template is instantiated.\n */\nclass DefaultTemplateProcessor {\n    /**\n     * Create parts for an attribute-position binding, given the event, attribute\n     * name, and string literals.\n     *\n     * @param element The element containing the binding\n     * @param name  The attribute name\n     * @param strings The string literals. There are always at least two strings,\n     *   event for fully-controlled bindings with a single expression.\n     */\n    handleAttributeExpressions(element, name, strings, options) {\n        const prefix = name[0];\n        if (prefix === '.') {\n            const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__[\"PropertyCommitter\"](element, name.slice(1), strings);\n            return committer.parts;\n        }\n        if (prefix === '@') {\n            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__[\"EventPart\"](element, name.slice(1), options.eventContext)];\n        }\n        if (prefix === '?') {\n            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__[\"BooleanAttributePart\"](element, name.slice(1), strings)];\n        }\n        const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__[\"AttributeCommitter\"](element, name, strings);\n        return committer.parts;\n    }\n    /**\n     * Create parts for a text-position binding.\n     * @param templateFactory\n     */\n    handleTextExpression(options) {\n        return new _parts_js__WEBPACK_IMPORTED_MODULE_0__[\"NodePart\"](options);\n    }\n}\nconst defaultTemplateProcessor = new DefaultTemplateProcessor();\n//# sourceMappingURL=default-template-processor.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/default-template-processor.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/directive.js":
/*!************************************************!*\
  !*** ./node_modules/lit-html/lib/directive.js ***!
  \************************************************/
/*! exports provided: directive, isDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"directive\", function() { return directive; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isDirective\", function() { return isDirective; });\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\nconst directives = new WeakMap();\n/**\n * Brands a function as a directive factory function so that lit-html will call\n * the function during template rendering, rather than passing as a value.\n *\n * A _directive_ is a function that takes a Part as an argument. It has the\n * signature: `(part: Part) => void`.\n *\n * A directive _factory_ is a function that takes arguments for data and\n * configuration and returns a directive. Users of directive usually refer to\n * the directive factory as the directive. For example, \"The repeat directive\".\n *\n * Usually a template author will invoke a directive factory in their template\n * with relevant arguments, which will then return a directive function.\n *\n * Here's an example of using the `repeat()` directive factory that takes an\n * array and a function to render an item:\n *\n * ```js\n * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`\n * ```\n *\n * When `repeat` is invoked, it returns a directive function that closes over\n * `items` and the template function. When the outer template is rendered, the\n * return directive function is called with the Part for the expression.\n * `repeat` then performs it's custom logic to render multiple items.\n *\n * @param f The directive factory function. Must be a function that returns a\n * function of the signature `(part: Part) => void`. The returned function will\n * be called with the part object.\n *\n * @example\n *\n * import {directive, html} from 'lit-html';\n *\n * const immutable = directive((v) => (part) => {\n *   if (part.value !== v) {\n *     part.setValue(v)\n *   }\n * });\n */\nconst directive = (f) => ((...args) => {\n    const d = f(...args);\n    directives.set(d, true);\n    return d;\n});\nconst isDirective = (o) => {\n    return typeof o === 'function' && directives.has(o);\n};\n//# sourceMappingURL=directive.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/directive.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/dom.js":
/*!******************************************!*\
  !*** ./node_modules/lit-html/lib/dom.js ***!
  \******************************************/
/*! exports provided: isCEPolyfill, reparentNodes, removeNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isCEPolyfill\", function() { return isCEPolyfill; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reparentNodes\", function() { return reparentNodes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeNodes\", function() { return removeNodes; });\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n * True if the custom elements polyfill is in use.\n */\nconst isCEPolyfill = window.customElements !== undefined &&\n    window.customElements.polyfillWrapFlushCallback !==\n        undefined;\n/**\n * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),\n * into another container (could be the same container), before `before`. If\n * `before` is null, it appends the nodes to the container.\n */\nconst reparentNodes = (container, start, end = null, before = null) => {\n    while (start !== end) {\n        const n = start.nextSibling;\n        container.insertBefore(start, before);\n        start = n;\n    }\n};\n/**\n * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from\n * `container`.\n */\nconst removeNodes = (container, start, end = null) => {\n    while (start !== end) {\n        const n = start.nextSibling;\n        container.removeChild(start);\n        start = n;\n    }\n};\n//# sourceMappingURL=dom.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/dom.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/modify-template.js":
/*!******************************************************!*\
  !*** ./node_modules/lit-html/lib/modify-template.js ***!
  \******************************************************/
/*! exports provided: removeNodesFromTemplate, insertNodeIntoTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeNodesFromTemplate\", function() { return removeNodesFromTemplate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"insertNodeIntoTemplate\", function() { return insertNodeIntoTemplate; });\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ \"./node_modules/lit-html/lib/template.js\");\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n * @module shady-render\n */\n\nconst walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;\n/**\n * Removes the list of nodes from a Template safely. In addition to removing\n * nodes from the Template, the Template part indices are updated to match\n * the mutated Template DOM.\n *\n * As the template is walked the removal state is tracked and\n * part indices are adjusted as needed.\n *\n * div\n *   div#1 (remove) <-- start removing (removing node is div#1)\n *     div\n *       div#2 (remove)  <-- continue removing (removing node is still div#1)\n *         div\n * div <-- stop removing since previous sibling is the removing node (div#1,\n * removed 4 nodes)\n */\nfunction removeNodesFromTemplate(template, nodesToRemove) {\n    const { element: { content }, parts } = template;\n    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);\n    let partIndex = nextActiveIndexInTemplateParts(parts);\n    let part = parts[partIndex];\n    let nodeIndex = -1;\n    let removeCount = 0;\n    const nodesToRemoveInTemplate = [];\n    let currentRemovingNode = null;\n    while (walker.nextNode()) {\n        nodeIndex++;\n        const node = walker.currentNode;\n        // End removal if stepped past the removing node\n        if (node.previousSibling === currentRemovingNode) {\n            currentRemovingNode = null;\n        }\n        // A node to remove was found in the template\n        if (nodesToRemove.has(node)) {\n            nodesToRemoveInTemplate.push(node);\n            // Track node we're removing\n            if (currentRemovingNode === null) {\n                currentRemovingNode = node;\n            }\n        }\n        // When removing, increment count by which to adjust subsequent part indices\n        if (currentRemovingNode !== null) {\n            removeCount++;\n        }\n        while (part !== undefined && part.index === nodeIndex) {\n            // If part is in a removed node deactivate it by setting index to -1 or\n            // adjust the index as needed.\n            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;\n            // go to the next active part.\n            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);\n            part = parts[partIndex];\n        }\n    }\n    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));\n}\nconst countNodes = (node) => {\n    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;\n    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);\n    while (walker.nextNode()) {\n        count++;\n    }\n    return count;\n};\nconst nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {\n    for (let i = startIndex + 1; i < parts.length; i++) {\n        const part = parts[i];\n        if (Object(_template_js__WEBPACK_IMPORTED_MODULE_0__[\"isTemplatePartActive\"])(part)) {\n            return i;\n        }\n    }\n    return -1;\n};\n/**\n * Inserts the given node into the Template, optionally before the given\n * refNode. In addition to inserting the node into the Template, the Template\n * part indices are updated to match the mutated Template DOM.\n */\nfunction insertNodeIntoTemplate(template, node, refNode = null) {\n    const { element: { content }, parts } = template;\n    // If there's no refNode, then put node at end of template.\n    // No part indices need to be shifted in this case.\n    if (refNode === null || refNode === undefined) {\n        content.appendChild(node);\n        return;\n    }\n    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);\n    let partIndex = nextActiveIndexInTemplateParts(parts);\n    let insertCount = 0;\n    let walkerIndex = -1;\n    while (walker.nextNode()) {\n        walkerIndex++;\n        const walkerNode = walker.currentNode;\n        if (walkerNode === refNode) {\n            insertCount = countNodes(node);\n            refNode.parentNode.insertBefore(node, refNode);\n        }\n        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {\n            // If we've inserted the node, simply adjust all subsequent parts\n            if (insertCount > 0) {\n                while (partIndex !== -1) {\n                    parts[partIndex].index += insertCount;\n                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);\n                }\n                return;\n            }\n            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);\n        }\n    }\n}\n//# sourceMappingURL=modify-template.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/modify-template.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/part.js":
/*!*******************************************!*\
  !*** ./node_modules/lit-html/lib/part.js ***!
  \*******************************************/
/*! exports provided: noChange, nothing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noChange\", function() { return noChange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nothing\", function() { return nothing; });\n/**\n * @license\n * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n * A sentinel value that signals that a value was handled by a directive and\n * should not be written to the DOM.\n */\nconst noChange = {};\n/**\n * A sentinel value that signals a NodePart to fully clear its content.\n */\nconst nothing = {};\n//# sourceMappingURL=part.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/part.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/parts.js":
/*!********************************************!*\
  !*** ./node_modules/lit-html/lib/parts.js ***!
  \********************************************/
/*! exports provided: isPrimitive, isIterable, AttributeCommitter, AttributePart, NodePart, BooleanAttributePart, PropertyCommitter, PropertyPart, EventPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isPrimitive\", function() { return isPrimitive; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isIterable\", function() { return isIterable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AttributeCommitter\", function() { return AttributeCommitter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AttributePart\", function() { return AttributePart; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NodePart\", function() { return NodePart; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BooleanAttributePart\", function() { return BooleanAttributePart; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PropertyCommitter\", function() { return PropertyCommitter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PropertyPart\", function() { return PropertyPart; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EventPart\", function() { return EventPart; });\n/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directive.js */ \"./node_modules/lit-html/lib/directive.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ \"./node_modules/lit-html/lib/dom.js\");\n/* harmony import */ var _part_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./part.js */ \"./node_modules/lit-html/lib/part.js\");\n/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-instance.js */ \"./node_modules/lit-html/lib/template-instance.js\");\n/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-result.js */ \"./node_modules/lit-html/lib/template-result.js\");\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.js */ \"./node_modules/lit-html/lib/template.js\");\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n * @module lit-html\n */\n\n\n\n\n\n\nconst isPrimitive = (value) => {\n    return (value === null ||\n        !(typeof value === 'object' || typeof value === 'function'));\n};\nconst isIterable = (value) => {\n    return Array.isArray(value) ||\n        // tslint:disable-next-line:no-any\n        !!(value && value[Symbol.iterator]);\n};\n/**\n * Writes attribute values to the DOM for a group of AttributeParts bound to a\n * single attibute. The value is only set once even if there are multiple parts\n * for an attribute.\n */\nclass AttributeCommitter {\n    constructor(element, name, strings) {\n        this.dirty = true;\n        this.element = element;\n        this.name = name;\n        this.strings = strings;\n        this.parts = [];\n        for (let i = 0; i < strings.length - 1; i++) {\n            this.parts[i] = this._createPart();\n        }\n    }\n    /**\n     * Creates a single part. Override this to create a differnt type of part.\n     */\n    _createPart() {\n        return new AttributePart(this);\n    }\n    _getValue() {\n        const strings = this.strings;\n        const l = strings.length - 1;\n        let text = '';\n        for (let i = 0; i < l; i++) {\n            text += strings[i];\n            const part = this.parts[i];\n            if (part !== undefined) {\n                const v = part.value;\n                if (isPrimitive(v) || !isIterable(v)) {\n                    text += typeof v === 'string' ? v : String(v);\n                }\n                else {\n                    for (const t of v) {\n                        text += typeof t === 'string' ? t : String(t);\n                    }\n                }\n            }\n        }\n        text += strings[l];\n        return text;\n    }\n    commit() {\n        if (this.dirty) {\n            this.dirty = false;\n            this.element.setAttribute(this.name, this._getValue());\n        }\n    }\n}\n/**\n * A Part that controls all or part of an attribute value.\n */\nclass AttributePart {\n    constructor(committer) {\n        this.value = undefined;\n        this.committer = committer;\n    }\n    setValue(value) {\n        if (value !== _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"] && (!isPrimitive(value) || value !== this.value)) {\n            this.value = value;\n            // If the value is a not a directive, dirty the committer so that it'll\n            // call setAttribute. If the value is a directive, it'll dirty the\n            // committer if it calls setValue().\n            if (!Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[\"isDirective\"])(value)) {\n                this.committer.dirty = true;\n            }\n        }\n    }\n    commit() {\n        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[\"isDirective\"])(this.value)) {\n            const directive = this.value;\n            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"];\n            directive(this);\n        }\n        if (this.value === _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"]) {\n            return;\n        }\n        this.committer.commit();\n    }\n}\n/**\n * A Part that controls a location within a Node tree. Like a Range, NodePart\n * has start and end locations and can set and update the Nodes between those\n * locations.\n *\n * NodeParts support several value types: primitives, Nodes, TemplateResults,\n * as well as arrays and iterables of those types.\n */\nclass NodePart {\n    constructor(options) {\n        this.value = undefined;\n        this.__pendingValue = undefined;\n        this.options = options;\n    }\n    /**\n     * Appends this part into a container.\n     *\n     * This part must be empty, as its contents are not automatically moved.\n     */\n    appendInto(container) {\n        this.startNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[\"createMarker\"])());\n        this.endNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[\"createMarker\"])());\n    }\n    /**\n     * Inserts this part after the `ref` node (between `ref` and `ref`'s next\n     * sibling). Both `ref` and its next sibling must be static, unchanging nodes\n     * such as those that appear in a literal section of a template.\n     *\n     * This part must be empty, as its contents are not automatically moved.\n     */\n    insertAfterNode(ref) {\n        this.startNode = ref;\n        this.endNode = ref.nextSibling;\n    }\n    /**\n     * Appends this part into a parent part.\n     *\n     * This part must be empty, as its contents are not automatically moved.\n     */\n    appendIntoPart(part) {\n        part.__insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[\"createMarker\"])());\n        part.__insert(this.endNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[\"createMarker\"])());\n    }\n    /**\n     * Inserts this part after the `ref` part.\n     *\n     * This part must be empty, as its contents are not automatically moved.\n     */\n    insertAfterPart(ref) {\n        ref.__insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__[\"createMarker\"])());\n        this.endNode = ref.endNode;\n        ref.endNode = this.startNode;\n    }\n    setValue(value) {\n        this.__pendingValue = value;\n    }\n    commit() {\n        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[\"isDirective\"])(this.__pendingValue)) {\n            const directive = this.__pendingValue;\n            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"];\n            directive(this);\n        }\n        const value = this.__pendingValue;\n        if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"]) {\n            return;\n        }\n        if (isPrimitive(value)) {\n            if (value !== this.value) {\n                this.__commitText(value);\n            }\n        }\n        else if (value instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_4__[\"TemplateResult\"]) {\n            this.__commitTemplateResult(value);\n        }\n        else if (value instanceof Node) {\n            this.__commitNode(value);\n        }\n        else if (isIterable(value)) {\n            this.__commitIterable(value);\n        }\n        else if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__[\"nothing\"]) {\n            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__[\"nothing\"];\n            this.clear();\n        }\n        else {\n            // Fallback, will render the string representation\n            this.__commitText(value);\n        }\n    }\n    __insert(node) {\n        this.endNode.parentNode.insertBefore(node, this.endNode);\n    }\n    __commitNode(value) {\n        if (this.value === value) {\n            return;\n        }\n        this.clear();\n        this.__insert(value);\n        this.value = value;\n    }\n    __commitText(value) {\n        const node = this.startNode.nextSibling;\n        value = value == null ? '' : value;\n        // If `value` isn't already a string, we explicitly convert it here in case\n        // it can't be implicitly converted - i.e. it's a symbol.\n        const valueAsString = typeof value === 'string' ? value : String(value);\n        if (node === this.endNode.previousSibling &&\n            node.nodeType === 3 /* Node.TEXT_NODE */) {\n            // If we only have a single text node between the markers, we can just\n            // set its value, rather than replacing it.\n            // TODO(justinfagnani): Can we just check if this.value is primitive?\n            node.data = valueAsString;\n        }\n        else {\n            this.__commitNode(document.createTextNode(valueAsString));\n        }\n        this.value = value;\n    }\n    __commitTemplateResult(value) {\n        const template = this.options.templateFactory(value);\n        if (this.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_3__[\"TemplateInstance\"] &&\n            this.value.template === template) {\n            this.value.update(value.values);\n        }\n        else {\n            // Make sure we propagate the template processor from the TemplateResult\n            // so that we use its syntax extension, etc. The template factory comes\n            // from the render function options so that it can control template\n            // caching and preprocessing.\n            const instance = new _template_instance_js__WEBPACK_IMPORTED_MODULE_3__[\"TemplateInstance\"](template, value.processor, this.options);\n            const fragment = instance._clone();\n            instance.update(value.values);\n            this.__commitNode(fragment);\n            this.value = instance;\n        }\n    }\n    __commitIterable(value) {\n        // For an Iterable, we create a new InstancePart per item, then set its\n        // value to the item. This is a little bit of overhead for every item in\n        // an Iterable, but it lets us recurse easily and efficiently update Arrays\n        // of TemplateResults that will be commonly returned from expressions like:\n        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.\n        // If _value is an array, then the previous render was of an\n        // iterable and _value will contain the NodeParts from the previous\n        // render. If _value is not an array, clear this part and make a new\n        // array for NodeParts.\n        if (!Array.isArray(this.value)) {\n            this.value = [];\n            this.clear();\n        }\n        // Lets us keep track of how many items we stamped so we can clear leftover\n        // items from a previous render\n        const itemParts = this.value;\n        let partIndex = 0;\n        let itemPart;\n        for (const item of value) {\n            // Try to reuse an existing part\n            itemPart = itemParts[partIndex];\n            // If no existing part, create a new one\n            if (itemPart === undefined) {\n                itemPart = new NodePart(this.options);\n                itemParts.push(itemPart);\n                if (partIndex === 0) {\n                    itemPart.appendIntoPart(this);\n                }\n                else {\n                    itemPart.insertAfterPart(itemParts[partIndex - 1]);\n                }\n            }\n            itemPart.setValue(item);\n            itemPart.commit();\n            partIndex++;\n        }\n        if (partIndex < itemParts.length) {\n            // Truncate the parts array so _value reflects the current state\n            itemParts.length = partIndex;\n            this.clear(itemPart && itemPart.endNode);\n        }\n    }\n    clear(startNode = this.startNode) {\n        Object(_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"removeNodes\"])(this.startNode.parentNode, startNode.nextSibling, this.endNode);\n    }\n}\n/**\n * Implements a boolean attribute, roughly as defined in the HTML\n * specification.\n *\n * If the value is truthy, then the attribute is present with a value of\n * ''. If the value is falsey, the attribute is removed.\n */\nclass BooleanAttributePart {\n    constructor(element, name, strings) {\n        this.value = undefined;\n        this.__pendingValue = undefined;\n        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {\n            throw new Error('Boolean attributes can only contain a single expression');\n        }\n        this.element = element;\n        this.name = name;\n        this.strings = strings;\n    }\n    setValue(value) {\n        this.__pendingValue = value;\n    }\n    commit() {\n        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[\"isDirective\"])(this.__pendingValue)) {\n            const directive = this.__pendingValue;\n            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"];\n            directive(this);\n        }\n        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"]) {\n            return;\n        }\n        const value = !!this.__pendingValue;\n        if (this.value !== value) {\n            if (value) {\n                this.element.setAttribute(this.name, '');\n            }\n            else {\n                this.element.removeAttribute(this.name);\n            }\n            this.value = value;\n        }\n        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"];\n    }\n}\n/**\n * Sets attribute values for PropertyParts, so that the value is only set once\n * even if there are multiple parts for a property.\n *\n * If an expression controls the whole property value, then the value is simply\n * assigned to the property under control. If there are string literals or\n * multiple expressions, then the strings are expressions are interpolated into\n * a string first.\n */\nclass PropertyCommitter extends AttributeCommitter {\n    constructor(element, name, strings) {\n        super(element, name, strings);\n        this.single =\n            (strings.length === 2 && strings[0] === '' && strings[1] === '');\n    }\n    _createPart() {\n        return new PropertyPart(this);\n    }\n    _getValue() {\n        if (this.single) {\n            return this.parts[0].value;\n        }\n        return super._getValue();\n    }\n    commit() {\n        if (this.dirty) {\n            this.dirty = false;\n            // tslint:disable-next-line:no-any\n            this.element[this.name] = this._getValue();\n        }\n    }\n}\nclass PropertyPart extends AttributePart {\n}\n// Detect event listener options support. If the `capture` property is read\n// from the options object, then options are supported. If not, then the thrid\n// argument to add/removeEventListener is interpreted as the boolean capture\n// value so we should only pass the `capture` property.\nlet eventOptionsSupported = false;\ntry {\n    const options = {\n        get capture() {\n            eventOptionsSupported = true;\n            return false;\n        }\n    };\n    // tslint:disable-next-line:no-any\n    window.addEventListener('test', options, options);\n    // tslint:disable-next-line:no-any\n    window.removeEventListener('test', options, options);\n}\ncatch (_e) {\n}\nclass EventPart {\n    constructor(element, eventName, eventContext) {\n        this.value = undefined;\n        this.__pendingValue = undefined;\n        this.element = element;\n        this.eventName = eventName;\n        this.eventContext = eventContext;\n        this.__boundHandleEvent = (e) => this.handleEvent(e);\n    }\n    setValue(value) {\n        this.__pendingValue = value;\n    }\n    commit() {\n        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__[\"isDirective\"])(this.__pendingValue)) {\n            const directive = this.__pendingValue;\n            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"];\n            directive(this);\n        }\n        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"]) {\n            return;\n        }\n        const newListener = this.__pendingValue;\n        const oldListener = this.value;\n        const shouldRemoveListener = newListener == null ||\n            oldListener != null &&\n                (newListener.capture !== oldListener.capture ||\n                    newListener.once !== oldListener.once ||\n                    newListener.passive !== oldListener.passive);\n        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);\n        if (shouldRemoveListener) {\n            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);\n        }\n        if (shouldAddListener) {\n            this.__options = getOptions(newListener);\n            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);\n        }\n        this.value = newListener;\n        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__[\"noChange\"];\n    }\n    handleEvent(event) {\n        if (typeof this.value === 'function') {\n            this.value.call(this.eventContext || this.element, event);\n        }\n        else {\n            this.value.handleEvent(event);\n        }\n    }\n}\n// We copy options because of the inconsistent behavior of browsers when reading\n// the third argument of add/removeEventListener. IE11 doesn't support options\n// at all. Chrome 41 only reads `capture` if the argument is an object.\nconst getOptions = (o) => o &&\n    (eventOptionsSupported ?\n        { capture: o.capture, passive: o.passive, once: o.once } :\n        o.capture);\n//# sourceMappingURL=parts.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/parts.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/render.js":
/*!*********************************************!*\
  !*** ./node_modules/lit-html/lib/render.js ***!
  \*********************************************/
/*! exports provided: parts, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parts\", function() { return parts; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./node_modules/lit-html/lib/dom.js\");\n/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts.js */ \"./node_modules/lit-html/lib/parts.js\");\n/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-factory.js */ \"./node_modules/lit-html/lib/template-factory.js\");\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n * @module lit-html\n */\n\n\n\nconst parts = new WeakMap();\n/**\n * Renders a template result or other value to a container.\n *\n * To update a container with new values, reevaluate the template literal and\n * call `render` with the new result.\n *\n * @param result Any value renderable by NodePart - typically a TemplateResult\n *     created by evaluating a template tag like `html` or `svg`.\n * @param container A DOM parent to render to. The entire contents are either\n *     replaced, or efficiently updated if the same result type was previous\n *     rendered there.\n * @param options RenderOptions for the entire render tree rendered to this\n *     container. Render options must *not* change between renders to the same\n *     container, as those changes will not effect previously rendered DOM.\n */\nconst render = (result, container, options) => {\n    let part = parts.get(container);\n    if (part === undefined) {\n        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"removeNodes\"])(container, container.firstChild);\n        parts.set(container, part = new _parts_js__WEBPACK_IMPORTED_MODULE_1__[\"NodePart\"](Object.assign({ templateFactory: _template_factory_js__WEBPACK_IMPORTED_MODULE_2__[\"templateFactory\"] }, options)));\n        part.appendInto(container);\n    }\n    part.setValue(result);\n    part.commit();\n};\n//# sourceMappingURL=render.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/render.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/shady-render.js":
/*!***************************************************!*\
  !*** ./node_modules/lit-html/lib/shady-render.js ***!
  \***************************************************/
/*! exports provided: html, svg, TemplateResult, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./node_modules/lit-html/lib/dom.js\");\n/* harmony import */ var _modify_template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modify-template.js */ \"./node_modules/lit-html/lib/modify-template.js\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render.js */ \"./node_modules/lit-html/lib/render.js\");\n/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-factory.js */ \"./node_modules/lit-html/lib/template-factory.js\");\n/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-instance.js */ \"./node_modules/lit-html/lib/template-instance.js\");\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.js */ \"./node_modules/lit-html/lib/template.js\");\n/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lit-html.js */ \"./node_modules/lit-html/lit-html.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"html\", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_6__[\"html\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"svg\", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_6__[\"svg\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TemplateResult\", function() { return _lit_html_js__WEBPACK_IMPORTED_MODULE_6__[\"TemplateResult\"]; });\n\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n * Module to add shady DOM/shady CSS polyfill support to lit-html template\n * rendering. See the [[render]] method for details.\n *\n * @module shady-render\n * @preferred\n */\n/**\n * Do not remove this comment; it keeps typedoc from misplacing the module\n * docs.\n */\n\n\n\n\n\n\n\n// Get a key to lookup in `templateCaches`.\nconst getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;\nlet compatibleShadyCSSVersion = true;\nif (typeof window.ShadyCSS === 'undefined') {\n    compatibleShadyCSSVersion = false;\n}\nelse if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {\n    console.warn(`Incompatible ShadyCSS version detected. ` +\n        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +\n        `@webcomponents/shadycss@1.3.1.`);\n    compatibleShadyCSSVersion = false;\n}\n/**\n * Template factory which scopes template DOM using ShadyCSS.\n * @param scopeName {string}\n */\nconst shadyTemplateFactory = (scopeName) => (result) => {\n    const cacheKey = getTemplateCacheKey(result.type, scopeName);\n    let templateCache = _template_factory_js__WEBPACK_IMPORTED_MODULE_3__[\"templateCaches\"].get(cacheKey);\n    if (templateCache === undefined) {\n        templateCache = {\n            stringsArray: new WeakMap(),\n            keyString: new Map()\n        };\n        _template_factory_js__WEBPACK_IMPORTED_MODULE_3__[\"templateCaches\"].set(cacheKey, templateCache);\n    }\n    let template = templateCache.stringsArray.get(result.strings);\n    if (template !== undefined) {\n        return template;\n    }\n    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_5__[\"marker\"]);\n    template = templateCache.keyString.get(key);\n    if (template === undefined) {\n        const element = result.getTemplateElement();\n        if (compatibleShadyCSSVersion) {\n            window.ShadyCSS.prepareTemplateDom(element, scopeName);\n        }\n        template = new _template_js__WEBPACK_IMPORTED_MODULE_5__[\"Template\"](result, element);\n        templateCache.keyString.set(key, template);\n    }\n    templateCache.stringsArray.set(result.strings, template);\n    return template;\n};\nconst TEMPLATE_TYPES = ['html', 'svg'];\n/**\n * Removes all style elements from Templates for the given scopeName.\n */\nconst removeStylesFromLitTemplates = (scopeName) => {\n    TEMPLATE_TYPES.forEach((type) => {\n        const templates = _template_factory_js__WEBPACK_IMPORTED_MODULE_3__[\"templateCaches\"].get(getTemplateCacheKey(type, scopeName));\n        if (templates !== undefined) {\n            templates.keyString.forEach((template) => {\n                const { element: { content } } = template;\n                // IE 11 doesn't support the iterable param Set constructor\n                const styles = new Set();\n                Array.from(content.querySelectorAll('style')).forEach((s) => {\n                    styles.add(s);\n                });\n                Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__[\"removeNodesFromTemplate\"])(template, styles);\n            });\n        }\n    });\n};\nconst shadyRenderSet = new Set();\n/**\n * For the given scope name, ensures that ShadyCSS style scoping is performed.\n * This is done just once per scope name so the fragment and template cannot\n * be modified.\n * (1) extracts styles from the rendered fragment and hands them to ShadyCSS\n * to be scoped and appended to the document\n * (2) removes style elements from all lit-html Templates for this scope name.\n *\n * Note, <style> elements can only be placed into templates for the\n * initial rendering of the scope. If <style> elements are included in templates\n * dynamically rendered to the scope (after the first scope render), they will\n * not be scoped and the <style> will be left in the template and rendered\n * output.\n */\nconst prepareTemplateStyles = (scopeName, renderedDOM, template) => {\n    shadyRenderSet.add(scopeName);\n    // If `renderedDOM` is stamped from a Template, then we need to edit that\n    // Template's underlying template element. Otherwise, we create one here\n    // to give to ShadyCSS, which still requires one while scoping.\n    const templateElement = !!template ? template.element : document.createElement('template');\n    // Move styles out of rendered DOM and store.\n    const styles = renderedDOM.querySelectorAll('style');\n    const { length } = styles;\n    // If there are no styles, skip unnecessary work\n    if (length === 0) {\n        // Ensure prepareTemplateStyles is called to support adding\n        // styles via `prepareAdoptedCssText` since that requires that\n        // `prepareTemplateStyles` is called.\n        //\n        // ShadyCSS will only update styles containing @apply in the template\n        // given to `prepareTemplateStyles`. If no lit Template was given,\n        // ShadyCSS will not be able to update uses of @apply in any relevant\n        // template. However, this is not a problem because we only create the\n        // template for the purpose of supporting `prepareAdoptedCssText`,\n        // which doesn't support @apply at all.\n        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);\n        return;\n    }\n    const condensedStyle = document.createElement('style');\n    // Collect styles into a single style. This helps us make sure ShadyCSS\n    // manipulations will not prevent us from being able to fix up template\n    // part indices.\n    // NOTE: collecting styles is inefficient for browsers but ShadyCSS\n    // currently does this anyway. When it does not, this should be changed.\n    for (let i = 0; i < length; i++) {\n        const style = styles[i];\n        style.parentNode.removeChild(style);\n        condensedStyle.textContent += style.textContent;\n    }\n    // Remove styles from nested templates in this scope.\n    removeStylesFromLitTemplates(scopeName);\n    // And then put the condensed style into the \"root\" template passed in as\n    // `template`.\n    const content = templateElement.content;\n    if (!!template) {\n        Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__[\"insertNodeIntoTemplate\"])(template, condensedStyle, content.firstChild);\n    }\n    else {\n        content.insertBefore(condensedStyle, content.firstChild);\n    }\n    // Note, it's important that ShadyCSS gets the template that `lit-html`\n    // will actually render so that it can update the style inside when\n    // needed (e.g. @apply native Shadow DOM case).\n    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);\n    const style = content.querySelector('style');\n    if (window.ShadyCSS.nativeShadow && style !== null) {\n        // When in native Shadow DOM, ensure the style created by ShadyCSS is\n        // included in initially rendered output (`renderedDOM`).\n        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);\n    }\n    else if (!!template) {\n        // When no style is left in the template, parts will be broken as a\n        // result. To fix this, we put back the style node ShadyCSS removed\n        // and then tell lit to remove that node from the template.\n        // There can be no style in the template in 2 cases (1) when Shady DOM\n        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM\n        // is in use ShadyCSS removes the style if it contains no content.\n        // NOTE, ShadyCSS creates its own style so we can safely add/remove\n        // `condensedStyle` here.\n        content.insertBefore(condensedStyle, content.firstChild);\n        const removes = new Set();\n        removes.add(condensedStyle);\n        Object(_modify_template_js__WEBPACK_IMPORTED_MODULE_1__[\"removeNodesFromTemplate\"])(template, removes);\n    }\n};\n/**\n * Extension to the standard `render` method which supports rendering\n * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)\n * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used\n * or when the webcomponentsjs\n * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.\n *\n * Adds a `scopeName` option which is used to scope element DOM and stylesheets\n * when native ShadowDOM is unavailable. The `scopeName` will be added to\n * the class attribute of all rendered DOM. In addition, any style elements will\n * be automatically re-written with this `scopeName` selector and moved out\n * of the rendered DOM and into the document `<head>`.\n *\n * It is common to use this render method in conjunction with a custom element\n * which renders a shadowRoot. When this is done, typically the element's\n * `localName` should be used as the `scopeName`.\n *\n * In addition to DOM scoping, ShadyCSS also supports a basic shim for css\n * custom properties (needed only on older browsers like IE11) and a shim for\n * a deprecated feature called `@apply` that supports applying a set of css\n * custom properties to a given location.\n *\n * Usage considerations:\n *\n * * Part values in `<style>` elements are only applied the first time a given\n * `scopeName` renders. Subsequent changes to parts in style elements will have\n * no effect. Because of this, parts in style elements should only be used for\n * values that will never change, for example parts that set scope-wide theme\n * values or parts which render shared style elements.\n *\n * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a\n * custom element's `constructor` is not supported. Instead rendering should\n * either done asynchronously, for example at microtask timing (for example\n * `Promise.resolve()`), or be deferred until the first time the element's\n * `connectedCallback` runs.\n *\n * Usage considerations when using shimmed custom properties or `@apply`:\n *\n * * Whenever any dynamic changes are made which affect\n * css custom properties, `ShadyCSS.styleElement(element)` must be called\n * to update the element. There are two cases when this is needed:\n * (1) the element is connected to a new parent, (2) a class is added to the\n * element that causes it to match different custom properties.\n * To address the first case when rendering a custom element, `styleElement`\n * should be called in the element's `connectedCallback`.\n *\n * * Shimmed custom properties may only be defined either for an entire\n * shadowRoot (for example, in a `:host` rule) or via a rule that directly\n * matches an element with a shadowRoot. In other words, instead of flowing from\n * parent to child as do native css custom properties, shimmed custom properties\n * flow only from shadowRoots to nested shadowRoots.\n *\n * * When using `@apply` mixing css shorthand property names with\n * non-shorthand names (for example `border` and `border-width`) is not\n * supported.\n */\nconst render = (result, container, options) => {\n    if (!options || typeof options !== 'object' || !options.scopeName) {\n        throw new Error('The `scopeName` option is required.');\n    }\n    const scopeName = options.scopeName;\n    const hasRendered = _render_js__WEBPACK_IMPORTED_MODULE_2__[\"parts\"].has(container);\n    const needsScoping = compatibleShadyCSSVersion &&\n        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&\n        !!container.host;\n    // Handle first render to a scope specially...\n    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);\n    // On first scope render, render into a fragment; this cannot be a single\n    // fragment that is reused since nested renders can occur synchronously.\n    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;\n    Object(_render_js__WEBPACK_IMPORTED_MODULE_2__[\"render\"])(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));\n    // When performing first scope render,\n    // (1) We've rendered into a fragment so that there's a chance to\n    // `prepareTemplateStyles` before sub-elements hit the DOM\n    // (which might cause them to render based on a common pattern of\n    // rendering in a custom element's `connectedCallback`);\n    // (2) Scope the template with ShadyCSS one time only for this scope.\n    // (3) Render the fragment into the container and make sure the\n    // container knows its `part` is the one we just rendered. This ensures\n    // DOM will be re-used on subsequent renders.\n    if (firstScopeRender) {\n        const part = _render_js__WEBPACK_IMPORTED_MODULE_2__[\"parts\"].get(renderContainer);\n        _render_js__WEBPACK_IMPORTED_MODULE_2__[\"parts\"].delete(renderContainer);\n        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)\n        // that should apply to `renderContainer` even if the rendered value is\n        // not a TemplateInstance. However, it will only insert scoped styles\n        // into the document if `prepareTemplateStyles` has already been called\n        // for the given scope name.\n        const template = part.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_4__[\"TemplateInstance\"] ?\n            part.value.template :\n            undefined;\n        prepareTemplateStyles(scopeName, renderContainer, template);\n        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"removeNodes\"])(container, container.firstChild);\n        container.appendChild(renderContainer);\n        _render_js__WEBPACK_IMPORTED_MODULE_2__[\"parts\"].set(container, part);\n    }\n    // After elements have hit the DOM, update styling if this is the\n    // initial render to this container.\n    // This is needed whenever dynamic changes are made so it would be\n    // safest to do every render; however, this would regress performance\n    // so we leave it up to the user to call `ShadyCSS.styleElement`\n    // for dynamic changes.\n    if (!hasRendered && needsScoping) {\n        window.ShadyCSS.styleElement(container.host);\n    }\n};\n//# sourceMappingURL=shady-render.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/shady-render.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/template-factory.js":
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/lib/template-factory.js ***!
  \*******************************************************/
/*! exports provided: templateFactory, templateCaches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"templateFactory\", function() { return templateFactory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"templateCaches\", function() { return templateCaches; });\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ \"./node_modules/lit-html/lib/template.js\");\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n\n/**\n * The default TemplateFactory which caches Templates keyed on\n * result.type and result.strings.\n */\nfunction templateFactory(result) {\n    let templateCache = templateCaches.get(result.type);\n    if (templateCache === undefined) {\n        templateCache = {\n            stringsArray: new WeakMap(),\n            keyString: new Map()\n        };\n        templateCaches.set(result.type, templateCache);\n    }\n    let template = templateCache.stringsArray.get(result.strings);\n    if (template !== undefined) {\n        return template;\n    }\n    // If the TemplateStringsArray is new, generate a key from the strings\n    // This key is shared between all templates with identical content\n    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_0__[\"marker\"]);\n    // Check if we already have a Template for this key\n    template = templateCache.keyString.get(key);\n    if (template === undefined) {\n        // If we have not seen this key before, create a new Template\n        template = new _template_js__WEBPACK_IMPORTED_MODULE_0__[\"Template\"](result, result.getTemplateElement());\n        // Cache the Template for this key\n        templateCache.keyString.set(key, template);\n    }\n    // Cache all future queries for this TemplateStringsArray\n    templateCache.stringsArray.set(result.strings, template);\n    return template;\n}\nconst templateCaches = new Map();\n//# sourceMappingURL=template-factory.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/template-factory.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/template-instance.js":
/*!********************************************************!*\
  !*** ./node_modules/lit-html/lib/template-instance.js ***!
  \********************************************************/
/*! exports provided: TemplateInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TemplateInstance\", function() { return TemplateInstance; });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./node_modules/lit-html/lib/dom.js\");\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ \"./node_modules/lit-html/lib/template.js\");\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n * @module lit-html\n */\n\n\n/**\n * An instance of a `Template` that can be attached to the DOM and updated\n * with new values.\n */\nclass TemplateInstance {\n    constructor(template, processor, options) {\n        this.__parts = [];\n        this.template = template;\n        this.processor = processor;\n        this.options = options;\n    }\n    update(values) {\n        let i = 0;\n        for (const part of this.__parts) {\n            if (part !== undefined) {\n                part.setValue(values[i]);\n            }\n            i++;\n        }\n        for (const part of this.__parts) {\n            if (part !== undefined) {\n                part.commit();\n            }\n        }\n    }\n    _clone() {\n        // There are a number of steps in the lifecycle of a template instance's\n        // DOM fragment:\n        //  1. Clone - create the instance fragment\n        //  2. Adopt - adopt into the main document\n        //  3. Process - find part markers and create parts\n        //  4. Upgrade - upgrade custom elements\n        //  5. Update - set node, attribute, property, etc., values\n        //  6. Connect - connect to the document. Optional and outside of this\n        //     method.\n        //\n        // We have a few constraints on the ordering of these steps:\n        //  * We need to upgrade before updating, so that property values will pass\n        //    through any property setters.\n        //  * We would like to process before upgrading so that we're sure that the\n        //    cloned fragment is inert and not disturbed by self-modifying DOM.\n        //  * We want custom elements to upgrade even in disconnected fragments.\n        //\n        // Given these constraints, with full custom elements support we would\n        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect\n        //\n        // But Safari dooes not implement CustomElementRegistry#upgrade, so we\n        // can not implement that order and still have upgrade-before-update and\n        // upgrade disconnected fragments. So we instead sacrifice the\n        // process-before-upgrade constraint, since in Custom Elements v1 elements\n        // must not modify their light DOM in the constructor. We still have issues\n        // when co-existing with CEv0 elements like Polymer 1, and with polyfills\n        // that don't strictly adhere to the no-modification rule because shadow\n        // DOM, which may be created in the constructor, is emulated by being placed\n        // in the light DOM.\n        //\n        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,\n        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade\n        // in one step.\n        //\n        // The Custom Elements v1 polyfill supports upgrade(), so the order when\n        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,\n        // Connect.\n        const fragment = _dom_js__WEBPACK_IMPORTED_MODULE_0__[\"isCEPolyfill\"] ?\n            this.template.element.content.cloneNode(true) :\n            document.importNode(this.template.element.content, true);\n        const stack = [];\n        const parts = this.template.parts;\n        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null\n        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);\n        let partIndex = 0;\n        let nodeIndex = 0;\n        let part;\n        let node = walker.nextNode();\n        // Loop through all the nodes and parts of a template\n        while (partIndex < parts.length) {\n            part = parts[partIndex];\n            if (!Object(_template_js__WEBPACK_IMPORTED_MODULE_1__[\"isTemplatePartActive\"])(part)) {\n                this.__parts.push(undefined);\n                partIndex++;\n                continue;\n            }\n            // Progress the tree walker until we find our next part's node.\n            // Note that multiple parts may share the same node (attribute parts\n            // on a single element), so this loop may not run at all.\n            while (nodeIndex < part.index) {\n                nodeIndex++;\n                if (node.nodeName === 'TEMPLATE') {\n                    stack.push(node);\n                    walker.currentNode = node.content;\n                }\n                if ((node = walker.nextNode()) === null) {\n                    // We've exhausted the content inside a nested template element.\n                    // Because we still have parts (the outer for-loop), we know:\n                    // - There is a template in the stack\n                    // - The walker will find a nextNode outside the template\n                    walker.currentNode = stack.pop();\n                    node = walker.nextNode();\n                }\n            }\n            // We've arrived at our part's node.\n            if (part.type === 'node') {\n                const part = this.processor.handleTextExpression(this.options);\n                part.insertAfterNode(node.previousSibling);\n                this.__parts.push(part);\n            }\n            else {\n                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));\n            }\n            partIndex++;\n        }\n        if (_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"isCEPolyfill\"]) {\n            document.adoptNode(fragment);\n            customElements.upgrade(fragment);\n        }\n        return fragment;\n    }\n}\n//# sourceMappingURL=template-instance.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/template-instance.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/template-result.js":
/*!******************************************************!*\
  !*** ./node_modules/lit-html/lib/template-result.js ***!
  \******************************************************/
/*! exports provided: TemplateResult, SVGTemplateResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TemplateResult\", function() { return TemplateResult; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SVGTemplateResult\", function() { return SVGTemplateResult; });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./node_modules/lit-html/lib/dom.js\");\n/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ \"./node_modules/lit-html/lib/template.js\");\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n * @module lit-html\n */\n\n\nconst commentMarker = ` ${_template_js__WEBPACK_IMPORTED_MODULE_1__[\"marker\"]} `;\n/**\n * The return type of `html`, which holds a Template and the values from\n * interpolated expressions.\n */\nclass TemplateResult {\n    constructor(strings, values, type, processor) {\n        this.strings = strings;\n        this.values = values;\n        this.type = type;\n        this.processor = processor;\n    }\n    /**\n     * Returns a string of HTML used to create a `<template>` element.\n     */\n    getHTML() {\n        const l = this.strings.length - 1;\n        let html = '';\n        let isCommentBinding = false;\n        for (let i = 0; i < l; i++) {\n            const s = this.strings[i];\n            // For each binding we want to determine the kind of marker to insert\n            // into the template source before it's parsed by the browser's HTML\n            // parser. The marker type is based on whether the expression is in an\n            // attribute, text, or comment poisition.\n            //   * For node-position bindings we insert a comment with the marker\n            //     sentinel as its text content, like <!--{{lit-guid}}-->.\n            //   * For attribute bindings we insert just the marker sentinel for the\n            //     first binding, so that we support unquoted attribute bindings.\n            //     Subsequent bindings can use a comment marker because multi-binding\n            //     attributes must be quoted.\n            //   * For comment bindings we insert just the marker sentinel so we don't\n            //     close the comment.\n            //\n            // The following code scans the template source, but is *not* an HTML\n            // parser. We don't need to track the tree structure of the HTML, only\n            // whether a binding is inside a comment, and if not, if it appears to be\n            // the first binding in an attribute.\n            const commentOpen = s.lastIndexOf('<!--');\n            // We're in comment position if we have a comment open with no following\n            // comment close. Because <-- can appear in an attribute value there can\n            // be false positives.\n            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&\n                s.indexOf('-->', commentOpen + 1) === -1;\n            // Check to see if we have an attribute-like sequence preceeding the\n            // expression. This can match \"name=value\" like structures in text,\n            // comments, and attribute values, so there can be false-positives.\n            const attributeMatch = _template_js__WEBPACK_IMPORTED_MODULE_1__[\"lastAttributeNameRegex\"].exec(s);\n            if (attributeMatch === null) {\n                // We're only in this branch if we don't have a attribute-like\n                // preceeding sequence. For comments, this guards against unusual\n                // attribute values like <div foo=\"<!--${'bar'}\">. Cases like\n                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch\n                // below.\n                html += s + (isCommentBinding ? commentMarker : _template_js__WEBPACK_IMPORTED_MODULE_1__[\"nodeMarker\"]);\n            }\n            else {\n                // For attributes we use just a marker sentinel, and also append a\n                // $lit$ suffix to the name to opt-out of attribute-specific parsing\n                // that IE and Edge do for style and certain SVG attributes.\n                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +\n                    attributeMatch[2] + _template_js__WEBPACK_IMPORTED_MODULE_1__[\"boundAttributeSuffix\"] + attributeMatch[3] +\n                    _template_js__WEBPACK_IMPORTED_MODULE_1__[\"marker\"];\n            }\n        }\n        html += this.strings[l];\n        return html;\n    }\n    getTemplateElement() {\n        const template = document.createElement('template');\n        template.innerHTML = this.getHTML();\n        return template;\n    }\n}\n/**\n * A TemplateResult for SVG fragments.\n *\n * This class wraps HTML in an `<svg>` tag in order to parse its contents in the\n * SVG namespace, then modifies the template to remove the `<svg>` tag so that\n * clones only container the original fragment.\n */\nclass SVGTemplateResult extends TemplateResult {\n    getHTML() {\n        return `<svg>${super.getHTML()}</svg>`;\n    }\n    getTemplateElement() {\n        const template = super.getTemplateElement();\n        const content = template.content;\n        const svgElement = content.firstChild;\n        content.removeChild(svgElement);\n        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"reparentNodes\"])(content, svgElement.firstChild);\n        return template;\n    }\n}\n//# sourceMappingURL=template-result.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/template-result.js?");

/***/ }),

/***/ "./node_modules/lit-html/lib/template.js":
/*!***********************************************!*\
  !*** ./node_modules/lit-html/lib/template.js ***!
  \***********************************************/
/*! exports provided: marker, nodeMarker, markerRegex, boundAttributeSuffix, Template, isTemplatePartActive, createMarker, lastAttributeNameRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"marker\", function() { return marker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nodeMarker\", function() { return nodeMarker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"markerRegex\", function() { return markerRegex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"boundAttributeSuffix\", function() { return boundAttributeSuffix; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Template\", function() { return Template; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isTemplatePartActive\", function() { return isTemplatePartActive; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createMarker\", function() { return createMarker; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"lastAttributeNameRegex\", function() { return lastAttributeNameRegex; });\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n * An expression marker with embedded unique key to avoid collision with\n * possible text in templates.\n */\nconst marker = `{{lit-${String(Math.random()).slice(2)}}}`;\n/**\n * An expression marker used text-positions, multi-binding attributes, and\n * attributes with markup-like text values.\n */\nconst nodeMarker = `<!--${marker}-->`;\nconst markerRegex = new RegExp(`${marker}|${nodeMarker}`);\n/**\n * Suffix appended to all bound attribute names.\n */\nconst boundAttributeSuffix = '$lit$';\n/**\n * An updateable Template that tracks the location of dynamic parts.\n */\nclass Template {\n    constructor(result, element) {\n        this.parts = [];\n        this.element = element;\n        const nodesToRemove = [];\n        const stack = [];\n        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null\n        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);\n        // Keeps track of the last index associated with a part. We try to delete\n        // unnecessary nodes, but we never want to associate two different parts\n        // to the same index. They must have a constant node between.\n        let lastPartIndex = 0;\n        let index = -1;\n        let partIndex = 0;\n        const { strings, values: { length } } = result;\n        while (partIndex < length) {\n            const node = walker.nextNode();\n            if (node === null) {\n                // We've exhausted the content inside a nested template element.\n                // Because we still have parts (the outer for-loop), we know:\n                // - There is a template in the stack\n                // - The walker will find a nextNode outside the template\n                walker.currentNode = stack.pop();\n                continue;\n            }\n            index++;\n            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {\n                if (node.hasAttributes()) {\n                    const attributes = node.attributes;\n                    const { length } = attributes;\n                    // Per\n                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,\n                    // attributes are not guaranteed to be returned in document order.\n                    // In particular, Edge/IE can return them out of order, so we cannot\n                    // assume a correspondence between part index and attribute index.\n                    let count = 0;\n                    for (let i = 0; i < length; i++) {\n                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {\n                            count++;\n                        }\n                    }\n                    while (count-- > 0) {\n                        // Get the template literal section leading up to the first\n                        // expression in this attribute\n                        const stringForPart = strings[partIndex];\n                        // Find the attribute name\n                        const name = lastAttributeNameRegex.exec(stringForPart)[2];\n                        // Find the corresponding attribute\n                        // All bound attributes have had a suffix added in\n                        // TemplateResult#getHTML to opt out of special attribute\n                        // handling. To look up the attribute value we also need to add\n                        // the suffix.\n                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;\n                        const attributeValue = node.getAttribute(attributeLookupName);\n                        node.removeAttribute(attributeLookupName);\n                        const statics = attributeValue.split(markerRegex);\n                        this.parts.push({ type: 'attribute', index, name, strings: statics });\n                        partIndex += statics.length - 1;\n                    }\n                }\n                if (node.tagName === 'TEMPLATE') {\n                    stack.push(node);\n                    walker.currentNode = node.content;\n                }\n            }\n            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {\n                const data = node.data;\n                if (data.indexOf(marker) >= 0) {\n                    const parent = node.parentNode;\n                    const strings = data.split(markerRegex);\n                    const lastIndex = strings.length - 1;\n                    // Generate a new text node for each literal section\n                    // These nodes are also used as the markers for node parts\n                    for (let i = 0; i < lastIndex; i++) {\n                        let insert;\n                        let s = strings[i];\n                        if (s === '') {\n                            insert = createMarker();\n                        }\n                        else {\n                            const match = lastAttributeNameRegex.exec(s);\n                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {\n                                s = s.slice(0, match.index) + match[1] +\n                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];\n                            }\n                            insert = document.createTextNode(s);\n                        }\n                        parent.insertBefore(insert, node);\n                        this.parts.push({ type: 'node', index: ++index });\n                    }\n                    // If there's no text, we must insert a comment to mark our place.\n                    // Else, we can trust it will stick around after cloning.\n                    if (strings[lastIndex] === '') {\n                        parent.insertBefore(createMarker(), node);\n                        nodesToRemove.push(node);\n                    }\n                    else {\n                        node.data = strings[lastIndex];\n                    }\n                    // We have a part for each match found\n                    partIndex += lastIndex;\n                }\n            }\n            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {\n                if (node.data === marker) {\n                    const parent = node.parentNode;\n                    // Add a new marker node to be the startNode of the Part if any of\n                    // the following are true:\n                    //  * We don't have a previousSibling\n                    //  * The previousSibling is already the start of a previous part\n                    if (node.previousSibling === null || index === lastPartIndex) {\n                        index++;\n                        parent.insertBefore(createMarker(), node);\n                    }\n                    lastPartIndex = index;\n                    this.parts.push({ type: 'node', index });\n                    // If we don't have a nextSibling, keep this node so we have an end.\n                    // Else, we can remove it to save future costs.\n                    if (node.nextSibling === null) {\n                        node.data = '';\n                    }\n                    else {\n                        nodesToRemove.push(node);\n                        index--;\n                    }\n                    partIndex++;\n                }\n                else {\n                    let i = -1;\n                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {\n                        // Comment node has a binding marker inside, make an inactive part\n                        // The binding won't work, but subsequent bindings will\n                        // TODO (justinfagnani): consider whether it's even worth it to\n                        // make bindings in comments work\n                        this.parts.push({ type: 'node', index: -1 });\n                        partIndex++;\n                    }\n                }\n            }\n        }\n        // Remove text binding nodes after the walk to not disturb the TreeWalker\n        for (const n of nodesToRemove) {\n            n.parentNode.removeChild(n);\n        }\n    }\n}\nconst endsWith = (str, suffix) => {\n    const index = str.length - suffix.length;\n    return index >= 0 && str.slice(index) === suffix;\n};\nconst isTemplatePartActive = (part) => part.index !== -1;\n// Allows `document.createComment('')` to be renamed for a\n// small manual size-savings.\nconst createMarker = () => document.createComment('');\n/**\n * This regex extracts the attribute name preceding an attribute-position\n * expression. It does this by matching the syntax allowed for attributes\n * against the string literal directly preceding the expression, assuming that\n * the expression is in an attribute-value position.\n *\n * See attributes in the HTML spec:\n * https://www.w3.org/TR/html5/syntax.html#elements-attributes\n *\n * \" \\x09\\x0a\\x0c\\x0d\" are HTML space characters:\n * https://www.w3.org/TR/html5/infrastructure.html#space-characters\n *\n * \"\\0-\\x1F\\x7F-\\x9F\" are Unicode control characters, which includes every\n * space character except \" \".\n *\n * So an attribute is:\n *  * The name: any character except a control character, space character, ('),\n *    (\"), \">\", \"=\", or \"/\"\n *  * Followed by zero or more space characters\n *  * Followed by \"=\"\n *  * Followed by zero or more space characters\n *  * Followed by:\n *    * Any character except space, ('), (\"), \"<\", \">\", \"=\", (`), or\n *    * (\") then any non-(\"), or\n *    * (') then any non-(')\n */\nconst lastAttributeNameRegex = /([ \\x09\\x0a\\x0c\\x0d])([^\\0-\\x1F\\x7F-\\x9F \"'>=/]+)([ \\x09\\x0a\\x0c\\x0d]*=[ \\x09\\x0a\\x0c\\x0d]*(?:[^ \\x09\\x0a\\x0c\\x0d\"'`<>=]*|\"[^\"]*|'[^']*))$/;\n//# sourceMappingURL=template.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lib/template.js?");

/***/ }),

/***/ "./node_modules/lit-html/lit-html.js":
/*!*******************************************!*\
  !*** ./node_modules/lit-html/lit-html.js ***!
  \*******************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor, directive, isDirective, removeNodes, reparentNodes, noChange, nothing, AttributeCommitter, AttributePart, BooleanAttributePart, EventPart, isIterable, isPrimitive, NodePart, PropertyCommitter, PropertyPart, parts, render, templateCaches, templateFactory, TemplateInstance, SVGTemplateResult, TemplateResult, createMarker, isTemplatePartActive, Template, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"html\", function() { return html; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"svg\", function() { return svg; });\n/* harmony import */ var _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/default-template-processor.js */ \"./node_modules/lit-html/lib/default-template-processor.js\");\n/* harmony import */ var _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/template-result.js */ \"./node_modules/lit-html/lib/template-result.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"DefaultTemplateProcessor\", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__[\"DefaultTemplateProcessor\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"defaultTemplateProcessor\", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__[\"defaultTemplateProcessor\"]; });\n\n/* harmony import */ var _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/directive.js */ \"./node_modules/lit-html/lib/directive.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"directive\", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__[\"directive\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isDirective\", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__[\"isDirective\"]; });\n\n/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dom.js */ \"./node_modules/lit-html/lib/dom.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"removeNodes\", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"removeNodes\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"reparentNodes\", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__[\"reparentNodes\"]; });\n\n/* harmony import */ var _lib_part_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/part.js */ \"./node_modules/lit-html/lib/part.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"noChange\", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__[\"noChange\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"nothing\", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__[\"nothing\"]; });\n\n/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/parts.js */ \"./node_modules/lit-html/lib/parts.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AttributeCommitter\", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__[\"AttributeCommitter\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"AttributePart\", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__[\"AttributePart\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BooleanAttributePart\", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__[\"BooleanAttributePart\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"EventPart\", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__[\"EventPart\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isIterable\", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__[\"isIterable\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isPrimitive\", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__[\"isPrimitive\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NodePart\", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__[\"NodePart\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"PropertyCommitter\", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__[\"PropertyCommitter\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"PropertyPart\", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__[\"PropertyPart\"]; });\n\n/* harmony import */ var _lib_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/render.js */ \"./node_modules/lit-html/lib/render.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"parts\", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__[\"parts\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__[\"render\"]; });\n\n/* harmony import */ var _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/template-factory.js */ \"./node_modules/lit-html/lib/template-factory.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"templateCaches\", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__[\"templateCaches\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"templateFactory\", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__[\"templateFactory\"]; });\n\n/* harmony import */ var _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/template-instance.js */ \"./node_modules/lit-html/lib/template-instance.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TemplateInstance\", function() { return _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__[\"TemplateInstance\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"SVGTemplateResult\", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__[\"SVGTemplateResult\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"TemplateResult\", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__[\"TemplateResult\"]; });\n\n/* harmony import */ var _lib_template_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/template.js */ \"./node_modules/lit-html/lib/template.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"createMarker\", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__[\"createMarker\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"isTemplatePartActive\", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__[\"isTemplatePartActive\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Template\", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__[\"Template\"]; });\n\n/**\n * @license\n * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at\n * http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at\n * http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at\n * http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at\n * http://polymer.github.io/PATENTS.txt\n */\n/**\n *\n * Main lit-html module.\n *\n * Main exports:\n *\n * -  [[html]]\n * -  [[svg]]\n * -  [[render]]\n *\n * @module lit-html\n * @preferred\n */\n/**\n * Do not remove this comment; it keeps typedoc from misplacing the module\n * docs.\n */\n\n\n\n\n// TODO(justinfagnani): remove line when we get NodePart moving methods\n\n\n\n\n\n\n\n\n// IMPORTANT: do not change the property name or the assignment expression.\n// This line will be used in regexes to search for lit-html usage.\n// TODO(justinfagnani): inject version number at build time\n(window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.1.2');\n/**\n * Interprets a template literal as an HTML template that can efficiently\n * render to and update a container.\n */\nconst html = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__[\"TemplateResult\"](strings, values, 'html', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__[\"defaultTemplateProcessor\"]);\n/**\n * Interprets a template literal as an SVG template that can efficiently\n * render to and update a container.\n */\nconst svg = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__[\"SVGTemplateResult\"](strings, values, 'svg', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__[\"defaultTemplateProcessor\"]);\n//# sourceMappingURL=lit-html.js.map\n\n//# sourceURL=webpack:///./node_modules/lit-html/lit-html.js?");

/***/ }),

/***/ "./src/components/app-link.js":
/*!************************************!*\
  !*** ./src/components/app-link.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\nclass AppLink extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      href: { type: String },\n      text: { type: String },\n      inactive: { type: Boolean }\n    };\n  }\n\n  render() {\n    return this.inactive ?\n      lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `<style>span {color: #BBBBBB;}</style><span>${this.text}</span>` :\n      lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `<style>a {color: #5555FF; cursor: pointer;}</style><a @click=\"${this.click}\">${this.text}</a>`;\n  }\n\n  click() {\n    window.dispatchEvent(new CustomEvent('link', { detail: this.href }));\n  }\n\n}\n\nwindow.customElements.define('app-link', AppLink);\n\n//# sourceURL=webpack:///./src/components/app-link.js?");

/***/ }),

/***/ "./src/components/def-popup.js":
/*!*************************************!*\
  !*** ./src/components/def-popup.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _source_info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./source-info.js */ \"./src/components/source-info.js\");\n/* harmony import */ var _services_definition_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/definition-service.js */ \"./src/services/definition-service.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\n\n\nclass DefPopup extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      language: { type: String },\n      work: { type: String },\n      word: { type: Object },\n      defs: { type: Array },\n      roots: { type: Array },\n      visible: { type: Boolean }\n    };\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n      <style>\n        #outer {\n          background-color: #fafcd1;\n          border-radius: 7px;\n          box-shadow: 3px 3px 1px -3px rgba(0,0,0,0.15);\n          padding: 15px;\n          width: 55%;\n          max-width: 300px;\n          max-height: 55%;\n          overflow: auto;\n          position: absolute;\n          right: 0;\n          left: 0;\n          top: 35%;\n          margin-right: auto;\n          margin-left: auto;\n          visibility: ${this.visible ? \"visible\" : \"hidden\"};\n        }\n        h2 {\n          margin-top: 5px\n        }\n      </style>\n      <div id=\"outer\" @click=\"${() => this.visible = false}\">\n        <h2>${this.defs[0].w}</h2>\n        <ul>\n        ${this.defs.map((def) =>\n          lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<li>${def.x}</li>`)}\n        </ul>\n        ${this.roots.length == 0 || this.roots[0].s !== this.defs[0].s ?\n          lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<source-info source=\"${this.defs[0].s}\"></source-info><br/>` : ``}\n        ${this.roots.length ?\n          lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<h2>${this.roots[0].w}</h2>\n          <ul>\n          ${this.roots.map((def) =>\n            lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<li>${def.x}</li>`)}\n          </ul>\n          <source-info source=\"${this.roots[0].s}\"></source-info>` : `` }\n      </div>\n    `;\n  }\n\n  constructor() {\n    super();\n    this.defs = [{ s: \"qr\" }];\n    this.roots = [];\n  }\n\n  set language(value) {\n    if (value) {\n      this.definitionService = _services_definition_service_js__WEBPACK_IMPORTED_MODULE_2__[\"DefinitionService\"].instance(value);\n    }\n  }\n\n  set word(value) {\n    if (value) {\n      this.definitionService.getDefinitions(value.word, value.type, this.work)\n        .then(function (defs) {\n          this.defs = defs.length ? defs : [{ s: \"qr\" }];\n        }.bind(this));\n      this.roots = [];\n      if (value.root) {\n        this.definitionService.getDefinitions(value.root, value.type, this.work)\n          .then(function (defs) {\n            this.roots = defs;\n          }.bind(this));\n      }\n      this.visible = true;\n    }\n  }\n}\n\nwindow.customElements.define('def-popup', DefPopup);\n\n//# sourceURL=webpack:///./src/components/def-popup.js?");

/***/ }),

/***/ "./src/components/lang-list.js":
/*!*************************************!*\
  !*** ./src/components/lang-list.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _app_link_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-link.js */ \"./src/components/app-link.js\");\n/* harmony import */ var _services_word_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/word-service.js */ \"./src/services/word-service.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\n\n\nclass LangList extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      languages: Array\n    };\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n      <style>a {color: #5555FF; cursor: pointer;}</style>\n      <div>\n        <h2>Available Languages</h2>\n        <ul>\n        ${Object.keys(this.languages).map(i =>\n          lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<li><img height=\"20\" width=\"30\" src=\"${i}/flag.png\"> <a data-code=\"${i}\" @click=\"${this.click}\">${this.languages[i]}</a></li>`)}\n        </ul>\n      </div>\n    `;\n  }\n\n  constructor() {\n    super();\n    this.languages = [];\n    fetch(\"/sites.json\")\n    .then(function (response) { return response.json(); })\n    .then(function (json) {\n    \tconsole.log(json);\n    \tthis.languages = json;\n    }.bind(this));\n  }\n\n  click(evt) {\n    const code = evt.target.dataset.code;\n    _services_word_service_js__WEBPACK_IMPORTED_MODULE_2__[\"WordService\"].instance(code).loadWordlist('/' + code + '/def/hifrq.json')\n      .then(function () {\n        window.dispatchEvent(new CustomEvent('link', { detail: `/${code}/titles` }));\n      });\n    evt.preventDefault();\n  }\n\n}\n\nwindow.customElements.define('lang-list', LangList);\n\n//# sourceURL=webpack:///./src/components/lang-list.js?");

/***/ }),

/***/ "./src/components/more-button.js":
/*!***************************************!*\
  !*** ./src/components/more-button.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\nclass MoreButton extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n      <style>\n      button {\n        background-color: #5555FF;\n        border: none;\n        color: #FFFFFF;\n        padding: 12px 16px;\n        font-size: 16px;\n      }\n      button:hover {\n        background-color: #7777FF;\n        cursor: pointer;\n      }\n      </style>\n      <button>&gt;</button>\n    `;\n  }\n}\n\nwindow.customElements.define('more-button', MoreButton);\n\n//# sourceURL=webpack:///./src/components/more-button.js?");

/***/ }),

/***/ "./src/components/qr-app.js":
/*!**********************************!*\
  !*** ./src/components/qr-app.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _app_link_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-link.js */ \"./src/components/app-link.js\");\n/* harmony import */ var _lang_list_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lang-list.js */ \"./src/components/lang-list.js\");\n/* harmony import */ var _read_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./read-view.js */ \"./src/components/read-view.js\");\n/* harmony import */ var _title_list_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./title-list.js */ \"./src/components/title-list.js\");\n/* harmony import */ var _title_toc_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./title-toc.js */ \"./src/components/title-toc.js\");\n/* harmony import */ var _vocab_list_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vocab-list.js */ \"./src/components/vocab-list.js\");\n/* harmony import */ var _qr_router_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./qr-router.js */ \"./src/components/qr-router.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\n\n\n\n\n\n\n\nclass QrApp extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      // URL segment properties\n      language: { type: String },\n      command: { type: String },\n      work: { type: String }, // id of the current title\n      chapter: { type: String }, // id of current chapter\n      statpath: { type: String }\n    };\n  }\n\n  constructor() {\n    super();\n    this.views = {};\n    window.onpopstate = function () {\n      this.route(location.hash.substring(1));\n    }.bind(this);\n    window.addEventListener('link', (e) => {\n      this.redirect(e.detail);\n    });\n    this.language = \"\";\n    this.work = \"\";\n    this.chapter = \"\";\n  }\n\n  firstUpdated(props) {\n    super.firstUpdated(props);\n    this.route(location.hash.substring(1));\n  }\n\n  findView(name) {\n    if (!this.views[name]) {\n      this.views[name] = document.createElement(name);\n    }\n    return this.views[name];\n  }\n\n  redirect(dest) {\n    history.pushState({}, \"\", \"#\" + dest);\n    this.route(dest);\n  }\n\n  route(dest) {\n    const [, lang, command, work, chapter] = dest.split(\"/\");\n    this.language = lang ? lang : \"\";\n    this.command = command ? command : \"home\";\n    this.work = work ? work : \"\";\n    this.chapter = chapter ? chapter : \"\";\n    // console.log(\"routing\", this.language, this.command, this.work, this.chapter);\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n            <style>\n            :host {\n              font-family: sans-serif;\n            }\n            .bubble {\n              background-color: #ffffff;\n              border-radius: 7px;\n              box-shadow: 10px 10px 5px -10px rgba(0,0,0,0.25);\n              margin: 10px;\n              padding: 17px;\n            }\n            .navbar {\n              font-weight: bold;\n            }\n            .outer {\n              margin-left: auto;\n              margin-right: auto;\n              max-width: 700px;\n            }\n            .statcounter { display: none; }\n            </style>\n            <div class=\"outer\">\n            <div class=\"bubble navbar\">\n              <app-link href='/' text='QR'></app-link>\n              <app-link href='/${this.language}/titles' text='Titles' ?inactive=\"${!this.language}\"></app-link>\n              <app-link href='/${this.language}/toc/${this.work}' text='TOC' ?inactive=\"${!this.work}\"></app-link>\n              <app-link href='/${this.language}/vocab/${this.work}' text='Vocab' ?inactive=\"${!this.language}\"></app-link>\n            </div>\n            <div class=\"bubble\">\n            <qr-router page=\"${this.command}\">\n              <div slot=\"home\">\n                <lang-list></lang-list>\n              </div>\n              <div slot=\"titles\">\n                <title-list language=\"${this.language}\" chapter=\"${this.chapter}\"></title-list>\n              </div>\n              <div slot=\"toc\">\n                <title-toc language=\"${this.language}\" work=\"${this.work}\"></title-toc>\n              </div>\n              <div slot=\"read\">\n                <read-view language=\"${this.language}\" work=\"${this.work}\" chapter=\"${this.chapter}\"\n                    @chapter-complete=\"${this.nextChapter}\" @work-complete=\"${this.showTitles}\"></read-view>\n              </div>\n              <div slot=\"vocab\">\n                <vocab-view language=\"${this.language}\" work=\"${this.work}\" chapter=\"${this.chapter}\"></vocab-view>\n              </div>\n            </qr-router>\n          </div>\n          <img class=\"statcounter\" src=\"${this.statpath}\">\n          </div>`;\n  }\n\n  nextChapter(evt) {\n    const next = evt.detail;\n    this.redirect(\"/\" + this.language + \"/read/\" + this.work + \"/\" + next);\n  }\n\n  showTitles() {\n    this.redirect(`/${this.language}/titles`);\n  }\n}\n\ncustomElements.define('qr-app', QrApp);\n\n//# sourceURL=webpack:///./src/components/qr-app.js?");

/***/ }),

/***/ "./src/components/qr-router.js":
/*!*************************************!*\
  !*** ./src/components/qr-router.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\nclass QrRouter extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      page: { type: String }\n    };\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `<slot name=\"${this.page}\"></slot>`;\n  }\n}\n\ncustomElements.define('qr-router', QrRouter);\n\n//# sourceURL=webpack:///./src/components/qr-router.js?");

/***/ }),

/***/ "./src/components/quiz-view.js":
/*!*************************************!*\
  !*** ./src/components/quiz-view.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _source_info_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./source-info.js */ \"./src/components/source-info.js\");\n/* harmony import */ var _services_definition_service_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/definition-service.js */ \"./src/services/definition-service.js\");\n/* harmony import */ var _services_word_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/word-service.js */ \"./src/services/word-service.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\n\n\n\nconst OPTIONS_COUNT = 3;\n\nclass QuizView extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      choice: Array, // definition choices\n      language: String, // language code\n      word: Object, // current quiz word\n      sources: Array, // def attribution sources\n      colors: Array, // choice highlight colors\n      complete: Boolean,\n      correct: Boolean\n    };\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n      <style>\n      .choice {\n        border: 1px solid #CCCCCC;\n        margin-top: 3px;\n        border-radius: 7px;\n        cursor: pointer;\n      }\n      .right { background-color: green; }\n      .wrong { background-color: red; }\n      </style>\n      <div>\n        <h3>${this.word.word}</h3>\n        ${this.choice.map((val, i) =>\n          lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<div class=\"choice ${this.selected[i]}\" data-choice=\"${i}\" @click=\"${this.choose}\">\n          <ul>${val.map((txt) => lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<li>${txt}</li>`)}\n          </ul>\n          </div>`)}\n      </div>\n      <br/>\n      ${Object.keys(this.sources).map((val, i) =>\n        lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<source-info label=\"definition source\" source=\"${val}\"></source-info>`)}\n      <br/>\n      <more-button @click=\"${this.finished}\"></more-button>\n    `;\n  }\n\n  constructor() {\n    super();\n    this.sources = [];\n    this._word = {};\n    this.reset();\n  }\n\n  reset() {\n    this.complete = false;\n    this.correct = false;\n    this.choice = Array(OPTIONS_COUNT);\n    this.selected = Array(OPTIONS_COUNT);\n    this.sources = {};\n  }\n\n  set language(value) {\n    this.definitionService = _services_definition_service_js__WEBPACK_IMPORTED_MODULE_2__[\"DefinitionService\"].instance(value);\n    this.wordService = _services_word_service_js__WEBPACK_IMPORTED_MODULE_3__[\"WordService\"].instance(value);\n  }\n\n  get word() { return this._word; }\n\n  set word(value) {\n    if (value) {\n      const oldValue = this._word;\n      this._word = JSON.parse(value);\n      this.reset();\n      this.addWord(this._word, true);\n      for (var i = 0; i < OPTIONS_COUNT - 1; i++) {\n        this.addWord(this.wordService.randomWord(this._word.type), false);\n      }\n      this.requestUpdate('word', oldValue);\n    }\n  }\n\n  randomIndex() {\n    const open = [];\n    for (var i = 0; i < OPTIONS_COUNT; i++) {\n      if (!this.choice[i]) {\n        open.push(i);\n      }\n    }\n    return open[Math.floor(Math.random() * Math.floor(open.length))];\n  }\n\n  addWord(word, correct) {\n    this.definitionService.getDefinitions(word.word, word.type)\n      .then(function (defs) {\n        const index = this.randomIndex();\n        if (correct) { this.answer = index; }\n        if (defs.length) {\n          this.choice[index] = defs.map(item => item.x).slice(0, 3);\n          defs.map(item => this.sources[item.s] = true);\n          this.requestUpdate();\n        } else {\n          this.choice[index] = [\"[none of the above]\"];\n          this.requestUpdate();\n        }\n      }.bind(this));\n  }\n\n  finished() {\n    if (this.correct) {\n      this.wordService.add(this.word);\n    }\n    this.dispatchEvent(new CustomEvent('complete', { detail: this.correct }));\n  }\n\n  choose(evt) {\n    if (!this.complete) {\n      // find choice on outer element\n      let elem = evt.target;\n      let choice = elem.dataset.choice;\n      while (!choice) {\n        elem = elem.parentElement;\n        choice = elem.dataset.choice;\n      }\n      const index = parseInt(choice);\n      this.correct = this.answer === index;\n      this.selected[index] = this.correct ? \"right\" : \"wrong\";\n      this.complete = true;\n      this.requestUpdate();\n    }\n  }\n}\n\nwindow.customElements.define('quiz-view', QuizView); // needed?\n\n//# sourceURL=webpack:///./src/components/quiz-view.js?");

/***/ }),

/***/ "./src/components/read-view.js":
/*!*************************************!*\
  !*** ./src/components/read-view.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _text_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text-view.js */ \"./src/components/text-view.js\");\n/* harmony import */ var _quiz_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quiz-view.js */ \"./src/components/quiz-view.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\n\n\nclass ReadView extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      language: { type: String },\n      work: { type: String },\n      chapter: { type: String },\n      mode: { type: String },\n      quizword: { type: Object }\n    };\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n    <qr-router page=\"${this.mode}\">\n      <div slot=\"quiz\">\n        <quiz-view language=\"${this.language}\" word=\"${this.quizword}\" @complete=\"${this.quizAnswer}\">\n        </quiz-view>\n      </div>\n      <div slot=\"read\">\n        <text-view id=\"text\" language=\"${this.language}\" work=\"${this.work}\" chapter=\"${this.chapter}\" @new-words=\"${this.startQuiz}\">\n        </text-view>\n      </div>\n    `;\n  }\n\n  constructor() {\n    super();\n    this.quizword = \"\";\n    this.quizMode(false);\n  }\n\n  quizMode(b) {\n    this.mode = b ? \"quiz\" : \"read\";\n  }\n\n  nextWord() {\n    return JSON.stringify(this.words.pop());\n  }\n\n  startQuiz(evt) {\n    if (evt.detail.length) {\n      this.words = evt.detail;\n      this.shuffle();\n      this.quizword = this.nextWord();\n      this.quizMode(true);\n    } else {\n      this.quizMode(false);\n    }\n  }\n\n  quizAnswer(evt) {\n    const success = evt.detail;\n    if (this.words.length > 0) {\n      this.quizword = this.nextWord();\n    } else {\n      this.quizMode(false);\n    }\n  }\n\n  shuffle() {\n    var i = 0,\n      j = 0,\n      w = null;\n    for (i = this.words.length - 1; i > 0; i--) {\n      j = Math.floor(Math.random() * (i + 1));\n      w = this.words[i];\n      this.words[i] = this.words[j];\n      this.words[j] = w;\n    }\n  }\n\n}\n\nwindow.customElements.define('read-view', ReadView);\n\n\n//# sourceURL=webpack:///./src/components/read-view.js?");

/***/ }),

/***/ "./src/components/source-info.js":
/*!***************************************!*\
  !*** ./src/components/source-info.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\nclass SourceInfo extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      source: String,\n      label: String,\n      info: Object\n    };\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n      <style>\n      .source {\n        font-size: 9pt;\n      }\n      .source a {\n        font-size: 7pt;\n        text-decoration: none;\n      }\n      </style>\n      ${this.info ?\n        lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<div class=\"source\">${this.label}: <i>${this.info.name}</i>\n        <a href=\"${this.info.llink}\">${this.info.license}</a></div>` : ``}`\n  }\n\n  constructor() {\n    super();\n    this.label = \"source\";\n    this.info = {};\n    // TODO: move mapping to external file\n    this.data = {\n      qr: {\n        name: \"quizreader.org\",\n        license: \"CC BY-NC-SA 4.0\",\n        llink: \"https://creativecommons.org/licenses/by-nc-sa/4.0/\"\n      },\n      wikt: {\n        name: \"wiktionary.org\",\n        license: \"CC BY-SA 3.0\",\n        llink: \"https://creativecommons.org/licenses/by-sa/3.0/\"\n      }\n    };\n  }\n\n  set source(value) {\n    if (value) {\n      this.info = this.data[value];\n    }\n  }\n\n}\n\nwindow.customElements.define('source-info', SourceInfo);\n\n//# sourceURL=webpack:///./src/components/source-info.js?");

/***/ }),

/***/ "./src/components/text-view.js":
/*!*************************************!*\
  !*** ./src/components/text-view.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _def_popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./def-popup.js */ \"./src/components/def-popup.js\");\n/* harmony import */ var _more_button_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./more-button.js */ \"./src/components/more-button.js\");\n/* harmony import */ var _services_word_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/word-service.js */ \"./src/services/word-service.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\n\n\n\nclass TextView extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      language: { type: String },\n      work: { type: String },\n      chapter: { type: String },\n      paragraph: { type: Number },\n      defWord: { type: String }\n    };\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n      <style>\n        #scroller { height: calc(100vh - 120px); overflow: auto; }\n        #content > :nth-child(n +${this.paragraph+1}) { display: none; }\n      </style>\n      <div id=\"scroller\">\n        <div id=\"content\">\n        </div>\n        <more-button @click=\"${this.next}\"></more-button>\n      </div>\n      <def-popup language=\"${this.language}\" work=\"${this.work}\" word=\"${this.defWord}\"></def-popup>`;\n  }\n\n  constructor() {\n    super();\n    this.file = 0;\n    this.paragraph = 0;\n    this.defWord = \"null\";\n  }\n\n  get language() { return this._language; }\n\n  set language(value) {\n    if (value) {\n      this._language = value;\n      this.wordService = _services_word_service_js__WEBPACK_IMPORTED_MODULE_3__[\"WordService\"].instance(value);\n    }\n  }\n\n  get work() { return this._work; }\n\n  set work(value) {\n    if (value) {\n      this._work = value;\n      fetch(this.language + '/txt/' + value + '/toc.json')\n        .then(function (response) { return response.json(); })\n        .then(function (json) {\n          this.filecount = json.length;\n          this.wordService.loadWordlist(this.language + '/txt/' + value + '/cognates.json');\n        }.bind(this));\n    }\n  }\n\n  get chapter() { return this._chapter; }\n\n  set chapter(value) {\n    if (value) {\n      this._chapter = value;\n      const file = (\"000\" + value).substr(-3, 3);\n      const path = this.language + \"/txt/\" + this.work + \"/t\" + file + \".html\";\n      this.docInfo = [];\n      fetch(path)\n        .then(function (response) {\n          return response.text();\n        })\n        .then(function (html) {\n          const content = this.shadowRoot.getElementById(\"content\");\n          content.innerHTML = html;\n          for (const para of content.children) {\n            let hash = {};\n            let linkList = para.querySelectorAll(\"a\");\n            for (const link of linkList) {\n              const base = this.baseWord(link);\n              link.addEventListener('click', this.showDef.bind(this));\n              link.title = base;\n              const key = base + \":\" + link.dataset.type;\n              hash[key] = true;\n            }\n            const keys = [];\n            for (const key in hash) {\n              let [word, type] = key.split(\":\");\n              keys.push({ word: word, type: type });\n            }\n            this.docInfo.push(keys);\n          }\n          // show up to paragraph with unknown words\n          this.paragraph = 0;\n          let unknown = this.unknownWords(this.docInfo[0]);\n          while (unknown.length == 0 && this.paragraph++ < this.docInfo.length - 1) {\n            unknown = this.unknownWords(this.docInfo[this.paragraph]);\n          }\n          // start quiz if 1st paragraph is unknown\n          let quizWords = [];\n          if (!this.paragraph) {\n            this.paragraph++;\n            quizWords = unknown;\n          }\n          this.dispatchEvent(new CustomEvent('new-words', { detail: quizWords }));\n        }.bind(this));\n    }\n  }\n\n  baseWord(elem) {\n    if (elem.dataset.base) {\n      return elem.dataset.base;\n    } else if (elem.dataset.word) {\n      return elem.dataset.word;\n    } else {\n      return elem.textContent;\n    }\n  }\n\n  next() {\n    // no more paragraphs in this file\n    if (this.paragraph == this.docInfo.length) {\n      // request next file if exists\n      if (this.chapter < this.filecount) {\n        const nextFile = parseInt(this.chapter) + 1;\n        // save bookmark position\n        localStorage.setItem(\"bkmk-\" + this.work, nextFile);\n        // notify chapter complete\n        this.dispatchEvent(new CustomEvent('chapter-complete', { bubbles: true, composed: true, detail: nextFile }));\n      }\n      // no more files - finished with title\n      else {\n        alert(\"fin\");\n        // remove bookmarker\n        localStorage.removeItem(\"bkmk-\" + this.work);\n        // notify title complete\n        this.dispatchEvent(new CustomEvent('work-complete', { bubbles: true, composed: true }));\n      }\n    } else {\n      let newWords = [];\n      while (newWords.length == 0 && this.paragraph < this.docInfo.length) {\n        newWords = newWords.concat(this.unknownWords(this.docInfo[this.paragraph++]));\n      }\n      this.dispatchEvent(new CustomEvent('new-words', { detail: newWords }));\n    }\n  }\n\n  unknownWords(list) {\n    return list.filter(item => { return item.type != 'M' && !this.wordService.isKnown(item); });\n  }\n\n  showDef(evt) {\n    const elem = evt.target;\n    const word = elem.dataset.word;\n    this.defWord = JSON.stringify({\n      word: word ? word : elem.textContent,\n      root: elem.dataset.base,\n      type: elem.dataset.type\n    });\n  }\n}\n\nwindow.customElements.define('text-view', TextView);\n\n//# sourceURL=webpack:///./src/components/text-view.js?");

/***/ }),

/***/ "./src/components/title-list.js":
/*!**************************************!*\
  !*** ./src/components/title-list.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _app_link_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-link.js */ \"./src/components/app-link.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\n\nclass TitleList extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      language: { type: String },\n      chapter: { type: String },\n      titles: Array\n    };\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n      <div>\n        <h2><img height=\"20\" width=\"30\" src=\"${this.language}/flag.png\"/> Available Titles</h2>\n        <ul>\n        ${this.titles.map(item =>\n          lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<li><app-link href=\"/${this.language}/read/${item.path}/${item.chapter}\" text=\"${item.name}\"></app-link></li>`)}\n        </ul>\n      </div>\n    `;\n  }\n\n  constructor() {\n    super();\n    this.language = \"\";\n    this.titles = [];\n  }\n\n  get language() { return this._lang; }\n\n  set language(value) {\n    if (value) {\n      const oldValue = this._lang;\n      this._lang = value;\n      fetch(value + '/txt/idx.json')\n        .then(function (response) { return response.json(); })\n        .then(function (json) {\n          const titles = [];\n          for (const path in json) {\n            titles.push({\n              path: path,\n              name: json[path],\n              chapter: this.bookmark(path)\n            });\n            this.titles = titles;\n          }\n        }.bind(this));\n      this.requestUpdate('language', oldValue);\n    }\n  }\n\n  set chapter(value) { this.refresh(); }\n\n  refresh() {\n    for (const title of this.titles) {\n      title.chapter = this.bookmark(title.path);\n    }\n    this.requestUpdate();\n  }\n\n  bookmark(path) {\n    // look up existing bookmark\n    const data = localStorage.getItem(\"bkmk-\" + path);\n    return data ? data : 0;\n  }\n\n}\n\nwindow.customElements.define('title-list', TitleList);\n\n//# sourceURL=webpack:///./src/components/title-list.js?");

/***/ }),

/***/ "./src/components/title-toc.js":
/*!*************************************!*\
  !*** ./src/components/title-toc.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _app_link_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-link.js */ \"./src/components/app-link.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\n\nclass TitleToc extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      language: String,\n      work: String,\n      title: String,\n      files: Array\n    };\n  }\n\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n      <div>\n        <h2>Contents</h2>\n        <ul>\n        ${this.files.map((val, i) =>\n          lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<li><app-link href=\"/${this.language}/read/${this.title}/${i+1}\" text=\"${val}\"></app-link></li>`)}\n        </ul>\n      </div>\n    `;\n  }\n\n  constructor() {\n    super();\n    this.files = [];\n  }\n\n  get language() { return this._language; }\n\n  set language(value) {\n    this._language = value;\n  }\n\n  set work(value) {\n    if (value) {\n      const title = value.split('/')[0];\n      if (title != this.title) {\n        this.title = title;\n        fetch(this.language + '/txt/' + this.title + '/toc.json')\n          .then(function (response) { return response.json(); })\n          .then(function (json) {\n            this.files = json;\n          }.bind(this));\n      }\n    }\n  }\n\n}\n\nwindow.customElements.define('title-toc', TitleToc);\n\n//# sourceURL=webpack:///./src/components/title-toc.js?");

/***/ }),

/***/ "./src/components/vocab-list.js":
/*!**************************************!*\
  !*** ./src/components/vocab-list.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lit_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit-element */ \"./node_modules/lit-element/lit-element.js\");\n/* harmony import */ var _def_popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./def-popup.js */ \"./src/components/def-popup.js\");\n/* harmony import */ var _text_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./text-view.js */ \"./src/components/text-view.js\");\n/* harmony import */ var _services_word_service_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/word-service.js */ \"./src/services/word-service.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\n\n\n\nclass VocabView extends lit_element__WEBPACK_IMPORTED_MODULE_0__[\"LitElement\"] {\n\n  static get properties() {\n    return {\n      language: { type: String },\n      work: { type: String },\n      chapter: { type: String },\n      words: { type: Array },\n      defWord: { type: String }\n    };\n  }\n  render() {\n    return lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"] `\n      <style>\n        #scroller { height: calc(100vh - 155px); overflow: auto; }\n        .A { border: 1px solid grey; background: #fffae9; }\n        .C { border: 1px solid grey; background: #f0dde1; }\n        .D { border: 1px solid grey; background: #fffae9; }\n        .N { border: 1px solid grey; background: #ddf2fe; }\n        .O { border: 1px solid grey; background: #efeef0; }\n        .P { border: 1px solid grey; background: #f0dde1; }\n        .T { border: 1px solid grey; background: #fffae9; }\n        .V { border: 1px solid grey; background: #ddfff1; }\n      </style>\n      <div id=\"scroller\">\n      <h2>Vocab</h2>\n      <h3>${this.words.length} entries</h3>\n      <div>\n       ${this.words.map(item =>\n         lit_element__WEBPACK_IMPORTED_MODULE_0__[\"html\"]`<a class=\"${item.type}\" @click=\"${() => this.defWord = JSON.stringify(item)}\">${item.word}</a> `)}\n      </div>\n      <def-popup language=\"${this.language}\" word=\"${this.defWord}\"></def-popup>\n      </div>\n    `;\n  }\n\n  constructor() {\n    super();\n    this.words = [];\n    this.defWord = \"null\";\n  }\n\n  get language() {\n    return this._language;\n  }\n\n  set language(lang) {\n    if (lang) {\n      this._language = lang;\n      this.wordService = _services_word_service_js__WEBPACK_IMPORTED_MODULE_3__[\"WordService\"].instance(lang);\n      this.refresh();\n    }\n  }\n\n  set work(value) {\n    if (value) {\n      this.refresh();\n    }\n  }\n\n  set chapter(value) {\n    if (value) {\n      this.refresh();\n    }\n  }\n\n  refresh() {\n    this.words = this.wordService.getAll();\n    this.words.sort(this.comparator);\n  }\n\n  comparator(word1, word2) {\n    return word1.word > word2.word;\n  }\n}\n\nwindow.customElements.define('vocab-view', VocabView);\n\n\n//# sourceURL=webpack:///./src/components/vocab-list.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_qr_app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/qr-app.js */ \"./src/components/qr-app.js\");\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n\nfunction component() {\n  const element = document.createElement('div');\n  element.innerHTML = \"<qr-app></qr-app>\";\n  return element;\n}\n\ndocument.body.style.margin = \"0px\";\ndocument.body.style['background-color'] = '#eeeeee';\ndocument.body.appendChild(component());\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/services/definition-service.js":
/*!********************************************!*\
  !*** ./src/services/definition-service.js ***!
  \********************************************/
/*! exports provided: DefinitionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DefinitionService\", function() { return DefinitionService; });\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n// module-scoped instance map\nlet services = {};\n\n/**\n * service to look up definitions\n */\nclass DefinitionService {\n  constructor(lang) {\n    this.language = lang;\n    // sources sorted by priority\n    this.sources = [\"qr\", \"wikt\"]; // TODO: add current title\n  }\n\n  getDefinitions(word, type, source) {\n    const sources = this.sources.slice();\n    if (source) { sources.unshift(source); }\n    return fetch(this.defPath(word))\n      .then(function (response) { return response.json(); })\n      .then(function (json) {\n        const ret = [];\n        for (let source of sources) {\n          if (json[source]) {\n            for (let def of json[source]) {\n              if (def.t === type) {\n                def.w = word;\n                def.s = source;\n                ret.push(def);\n              }\n            }\n            if (ret.length) { return ret; }\n          }\n        }\n        return ret;\n      }.bind(this));\n  }\n\n  defPath(word) {\n    const dir = word.length < 2 ? word : word.substring(0, 2);\n    return \"/\" + this.language + \"/def/en/\" + dir + \"/\" + word + \".json\";\n  }\n\n  static instance(language) {\n    if (!services[language]) {\n      services[language] = new DefinitionService(language);\n    }\n    return services[language];\n  }\n}\n\n\n//# sourceURL=webpack:///./src/services/definition-service.js?");

/***/ }),

/***/ "./src/services/word-service.js":
/*!**************************************!*\
  !*** ./src/services/word-service.js ***!
  \**************************************/
/*! exports provided: WordService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WordService\", function() { return WordService; });\n/*\n * This file is part of QuizReader.\n *\n * QuizReader is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * QuizReader is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with QuizReader.  If not, see <http://www.gnu.org/licenses/>.\n */\n\n// module-scoped instance map\nlet services = {};\n\n/**\n * service to lookup and store known words\n */\nclass WordService {\n  constructor(language) {\n    this.lang = language;\n    const data = localStorage.getItem(\"knownWords-\" + this.lang);\n    this.knownWords = data ? JSON.parse(data) : [];\n  }\n\n  isKnown(word) {\n    return this.knownWords.some(item => this.matches(item, word));\n  }\n\n  matches(word1, word2) {\n    return word1.word === word2.word && word1.type === word2.type;\n  }\n\n  add(word) {\n    this.knownWords.push(word);\n    this.save();\n  }\n\n  getAll() {\n    return this.knownWords.slice(0);\n  }\n\n  randomWord(type) {\n    const typed = this.knownWords.filter(item => item.type === type);\n    return typed[Math.floor(Math.random() * Math.floor(typed.length))];\n  }\n\n  save() {\n    localStorage.setItem('knownWords-' + this.lang, JSON.stringify(this.knownWords));\n  }\n\n  loadWordlist(path) {\n    return fetch(path)\n      .then(function (response) { return response.json(); })\n      .then(function (json) {\n        const items = json.map(item => new Object({ word: item.w, type: item.t }));\n        this.knownWords = this.knownWords.concat(items.filter(item => !this.isKnown(item)));\n        this.save();\n        return json;\n      }.bind(this));\n  }\n\n  static instance(language) {\n    if (!services[language]) {\n      services[language] = new WordService(language);\n    }\n    return services[language];\n  }\n}\n\n//# sourceURL=webpack:///./src/services/word-service.js?");

/***/ })

/******/ });