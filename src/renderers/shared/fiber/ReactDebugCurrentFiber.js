/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDebugCurrentFiber
 * @flow
 */

'use strict';

import type {Fiber} from 'ReactFiber';

type LifeCyclePhase = 'render' | 'getChildContext';

var {ReactDebugCurrentFrame} = require('ReactGlobalSharedState');

if (__DEV__) {
  var getComponentName = require('getComponentName');
  var {
    getStackAddendumByWorkInProgressFiber,
  } = require('ReactFiberComponentTreeHook');
}

function getCurrentFiberOwnerName(): string | null {
  if (__DEV__) {
    const fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    if (fiber._debugOwner != null) {
      return getComponentName(fiber._debugOwner);
    }
  }
  return null;
}

function getCurrentFiberStackAddendum(): string | null {
  if (__DEV__) {
    const fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    // Safe because if current fiber exists, we are reconciling,
    // and it is guaranteed to be the work-in-progress version.
    return getStackAddendumByWorkInProgressFiber(fiber);
  }
  return null;
}

function resetCurrentFiber() {
  ReactDebugCurrentFrame.getCurrentStack = null;
  ReactDebugCurrentFiber.current = null;
  ReactDebugCurrentFiber.phase = null;
}

function setCurrentFiber(fiber: Fiber) {
  ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum;
  ReactDebugCurrentFiber.current = fiber;
  ReactDebugCurrentFiber.phase = null;
}

function setCurrentPhase(phase: LifeCyclePhase | null) {
  ReactDebugCurrentFiber.phase = phase;
}

var ReactDebugCurrentFiber = {
  current: (null: Fiber | null),
  phase: (null: LifeCyclePhase | null),
  resetCurrentFiber,
  setCurrentFiber,
  setCurrentPhase,
  getCurrentFiberOwnerName,
  getCurrentFiberStackAddendum,
};

module.exports = ReactDebugCurrentFiber;
