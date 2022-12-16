import { i as isSymbol, a as isObject, b as baseGet, r as root, c as isString, n as noop, w as watch, t as tryOnScopeDispose, d as resolveUnref, e as identity, f as isClient, g as getStyle, h as computed, j as fromPairs, k as getCurrentInstance, u as useGlobalConfig, l as unref, m as isRef, o as ref, p as buildProps, q as definePropType, s as isNumber, v as defineComponent, x as markRaw, y as full_screen_default, z as scale_to_original_default, A as useNamespace, B as effectScope, C as shallowRef, D as nextTick, E as onMounted, F as openBlock, G as createBlock, H as createVNode, I as withCtx, J as createBaseVNode, K as normalizeClass, L as normalizeStyle, M as withModifiers, N as createCommentVNode, O as ElIcon, P as close_default, Q as createElementBlock, R as Fragment, S as arrow_left_default, T as arrow_right_default, U as zoom_out_default, V as zoom_in_default, W as resolveDynamicComponent, X as refresh_left_default, Y as refresh_right_default, Z as renderList, _ as withDirectives, $ as vShow, a0 as renderSlot, a1 as Transition, a2 as Teleport, a3 as _export_sfc$1, a4 as withInstall, a5 as useAttrs$1, a6 as mergeProps, a7 as isElement, a8 as isString$1, a9 as toDisplayString, aa as useThrottleFn, ab as ElButton, ac as ElCard, ad as ElRow, ae as createTextVNode, af as pushScopeId, ag as popScopeId } from "./index.js";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet(object, path);
  return result === void 0 ? defaultValue : result;
}
var now = function() {
  return root.Date.now();
};
const now$1 = now;
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$1());
  }
  function debounced() {
    var time = now$1(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
function unrefElement(elRef) {
  var _a;
  const plain = resolveUnref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = isClient ? window : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (isString(args[0]) || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (!el)
      return;
    cleanups.push(...events.flatMap((event) => {
      return listeners.map((listener) => register(el, event, listener));
    }));
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
_global[globalKey];
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity
}, _TransitionPresets);
const isInContainer = (el, container) => {
  if (!isClient || !el || !container)
    return false;
  const elRect = el.getBoundingClientRect();
  let containerRect;
  if (container instanceof Element) {
    containerRect = container.getBoundingClientRect();
  } else {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  }
  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
};
const keysOf = (arr) => Object.keys(arr);
const isScroll = (el, isVertical) => {
  if (!isClient)
    return false;
  const key = {
    undefined: "overflow",
    true: "overflow-y",
    false: "overflow-x"
  }[String(isVertical)];
  const overflow = getStyle(el, key);
  return ["scroll", "auto", "overlay"].some((s) => overflow.includes(s));
};
const getScrollContainer = (el, isVertical) => {
  if (!isClient)
    return;
  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent))
      return window;
    if (isScroll(parent, isVertical))
      return parent;
    parent = parent.parentNode;
  }
  return parent;
};
const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
};
const isFirefox = () => isClient && /firefox/i.test(window.navigator.userAgent);
const mutable = (val) => val;
const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
const useAttrs = (params = {}) => {
  const { excludeListeners = false, excludeKeys } = params;
  const allExcludeKeys = computed(() => {
    return ((excludeKeys == null ? void 0 : excludeKeys.value) || []).concat(DEFAULT_EXCLUDE_KEYS);
  });
  const instance = getCurrentInstance();
  if (!instance) {
    return computed(() => ({}));
  }
  return computed(() => {
    var _a;
    return fromPairs(Object.entries((_a = instance.proxy) == null ? void 0 : _a.$attrs).filter(([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))));
  });
};
var English = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  }
};
const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));
const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
  var _a;
  return `${(_a = option == null ? void 0 : option[key]) != null ? _a : `{${key}}`}`;
});
const buildLocaleContext = (locale) => {
  const lang = computed(() => unref(locale).name);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale)
  };
};
const useLocale = () => {
  const locale = useGlobalConfig("locale");
  return buildLocaleContext(computed(() => locale.value || English));
};
const zIndex = ref(0);
const useZIndex = () => {
  const initialZIndex = useGlobalConfig("zIndex", 2e3);
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value);
  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  };
};
const imageViewerProps = buildProps({
  urlList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  infinite: {
    type: Boolean,
    default: true
  },
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  teleported: {
    type: Boolean,
    default: false
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  }
});
const imageViewerEmits = {
  close: () => true,
  switch: (index) => isNumber(index)
};
const _hoisted_1$2 = ["src"];
const __default__$1 = defineComponent({
  name: "ElImageViewer"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: imageViewerProps,
  emits: imageViewerEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const modes = {
      CONTAIN: {
        name: "contain",
        icon: markRaw(full_screen_default)
      },
      ORIGINAL: {
        name: "original",
        icon: markRaw(scale_to_original_default)
      }
    };
    const mousewheelEventName = isFirefox() ? "DOMMouseScroll" : "mousewheel";
    const { t } = useLocale();
    const ns = useNamespace("image-viewer");
    const { nextZIndex } = useZIndex();
    const wrapper = ref();
    const imgRefs = ref([]);
    const scopeEventListener = effectScope();
    const loading = ref(true);
    const activeIndex = ref(props.initialIndex);
    const mode = shallowRef(modes.CONTAIN);
    const transform = ref({
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    });
    const isSingle = computed(() => {
      const { urlList } = props;
      return urlList.length <= 1;
    });
    const isFirst = computed(() => {
      return activeIndex.value === 0;
    });
    const isLast = computed(() => {
      return activeIndex.value === props.urlList.length - 1;
    });
    const currentImg = computed(() => {
      return props.urlList[activeIndex.value];
    });
    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value;
      let translateX = offsetX / scale;
      let translateY = offsetY / scale;
      switch (deg % 360) {
        case 90:
        case -270:
          [translateX, translateY] = [translateY, -translateX];
          break;
        case 180:
        case -180:
          [translateX, translateY] = [-translateX, -translateY];
          break;
        case 270:
        case -90:
          [translateX, translateY] = [-translateY, translateX];
          break;
      }
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: enableTransition ? "transform .3s" : ""
      };
      if (mode.value.name === modes.CONTAIN.name) {
        style.maxWidth = style.maxHeight = "100%";
      }
      return style;
    });
    const computedZIndex = computed(() => {
      return isNumber(props.zIndex) ? props.zIndex : nextZIndex();
    });
    function hide() {
      unregisterEventListener();
      emit("close");
    }
    function registerEventListener() {
      const keydownHandler = throttle((e) => {
        switch (e.code) {
          case EVENT_CODE.esc:
            props.closeOnPressEscape && hide();
            break;
          case EVENT_CODE.space:
            toggleMode();
            break;
          case EVENT_CODE.left:
            prev();
            break;
          case EVENT_CODE.up:
            handleActions("zoomIn");
            break;
          case EVENT_CODE.right:
            next();
            break;
          case EVENT_CODE.down:
            handleActions("zoomOut");
            break;
        }
      });
      const mousewheelHandler = throttle((e) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          handleActions("zoomIn", {
            zoomRate: 1.2,
            enableTransition: false
          });
        } else {
          handleActions("zoomOut", {
            zoomRate: 1.2,
            enableTransition: false
          });
        }
      });
      scopeEventListener.run(() => {
        useEventListener(document, "keydown", keydownHandler);
        useEventListener(document, mousewheelEventName, mousewheelHandler);
      });
    }
    function unregisterEventListener() {
      scopeEventListener.stop();
    }
    function handleImgLoad() {
      loading.value = false;
    }
    function handleImgError(e) {
      loading.value = false;
      e.target.alt = t("el.image.error");
    }
    function handleMouseDown(e) {
      if (loading.value || e.button !== 0 || !wrapper.value)
        return;
      transform.value.enableTransition = false;
      const { offsetX, offsetY } = transform.value;
      const startX = e.pageX;
      const startY = e.pageY;
      const dragHandler = throttle((ev) => {
        transform.value = {
          ...transform.value,
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY
        };
      });
      const removeMousemove = useEventListener(document, "mousemove", dragHandler);
      useEventListener(document, "mouseup", () => {
        removeMousemove();
      });
      e.preventDefault();
    }
    function reset() {
      transform.value = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    }
    function toggleMode() {
      if (loading.value)
        return;
      const modeNames = keysOf(modes);
      const modeValues = Object.values(modes);
      const currentMode = mode.value.name;
      const index = modeValues.findIndex((i) => i.name === currentMode);
      const nextIndex = (index + 1) % modeNames.length;
      mode.value = modes[modeNames[nextIndex]];
      reset();
    }
    function setActiveItem(index) {
      const len = props.urlList.length;
      activeIndex.value = (index + len) % len;
    }
    function prev() {
      if (isFirst.value && !props.infinite)
        return;
      setActiveItem(activeIndex.value - 1);
    }
    function next() {
      if (isLast.value && !props.infinite)
        return;
      setActiveItem(activeIndex.value + 1);
    }
    function handleActions(action, options = {}) {
      if (loading.value)
        return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 1.4,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      switch (action) {
        case "zoomOut":
          if (transform.value.scale > 0.2) {
            transform.value.scale = Number.parseFloat((transform.value.scale / zoomRate).toFixed(3));
          }
          break;
        case "zoomIn":
          if (transform.value.scale < 7) {
            transform.value.scale = Number.parseFloat((transform.value.scale * zoomRate).toFixed(3));
          }
          break;
        case "clockwise":
          transform.value.deg += rotateDeg;
          break;
        case "anticlockwise":
          transform.value.deg -= rotateDeg;
          break;
      }
      transform.value.enableTransition = enableTransition;
    }
    watch(currentImg, () => {
      nextTick(() => {
        const $img = imgRefs.value[0];
        if (!($img == null ? void 0 : $img.complete)) {
          loading.value = true;
        }
      });
    });
    watch(activeIndex, (val) => {
      reset();
      emit("switch", val);
    });
    onMounted(() => {
      var _a, _b;
      registerEventListener();
      (_b = (_a = wrapper.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    });
    expose({
      setActiveItem
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, {
        to: "body",
        disabled: !_ctx.teleported
      }, [
        createVNode(Transition, {
          name: "viewer-fade",
          appear: ""
        }, {
          default: withCtx(() => [
            createBaseVNode("div", {
              ref_key: "wrapper",
              ref: wrapper,
              tabindex: -1,
              class: normalizeClass(unref(ns).e("wrapper")),
              style: normalizeStyle({ zIndex: unref(computedZIndex) })
            }, [
              createBaseVNode("div", {
                class: normalizeClass(unref(ns).e("mask")),
                onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.hideOnClickModal && hide(), ["self"]))
              }, null, 2),
              createCommentVNode(" CLOSE "),
              createBaseVNode("span", {
                class: normalizeClass([unref(ns).e("btn"), unref(ns).e("close")]),
                onClick: hide
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(close_default))
                  ]),
                  _: 1
                })
              ], 2),
              createCommentVNode(" ARROW "),
              !unref(isSingle) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("span", {
                  class: normalizeClass([
                    unref(ns).e("btn"),
                    unref(ns).e("prev"),
                    unref(ns).is("disabled", !_ctx.infinite && unref(isFirst))
                  ]),
                  onClick: prev
                }, [
                  createVNode(unref(ElIcon), null, {
                    default: withCtx(() => [
                      createVNode(unref(arrow_left_default))
                    ]),
                    _: 1
                  })
                ], 2),
                createBaseVNode("span", {
                  class: normalizeClass([
                    unref(ns).e("btn"),
                    unref(ns).e("next"),
                    unref(ns).is("disabled", !_ctx.infinite && unref(isLast))
                  ]),
                  onClick: next
                }, [
                  createVNode(unref(ElIcon), null, {
                    default: withCtx(() => [
                      createVNode(unref(arrow_right_default))
                    ]),
                    _: 1
                  })
                ], 2)
              ], 64)) : createCommentVNode("v-if", true),
              createCommentVNode(" ACTIONS "),
              createBaseVNode("div", {
                class: normalizeClass([unref(ns).e("btn"), unref(ns).e("actions")])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(unref(ns).e("actions__inner"))
                }, [
                  createVNode(unref(ElIcon), {
                    onClick: _cache[1] || (_cache[1] = ($event) => handleActions("zoomOut"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(zoom_out_default))
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ElIcon), {
                    onClick: _cache[2] || (_cache[2] = ($event) => handleActions("zoomIn"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(zoom_in_default))
                    ]),
                    _: 1
                  }),
                  createBaseVNode("i", {
                    class: normalizeClass(unref(ns).e("actions__divider"))
                  }, null, 2),
                  createVNode(unref(ElIcon), { onClick: toggleMode }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(unref(mode).icon)))
                    ]),
                    _: 1
                  }),
                  createBaseVNode("i", {
                    class: normalizeClass(unref(ns).e("actions__divider"))
                  }, null, 2),
                  createVNode(unref(ElIcon), {
                    onClick: _cache[3] || (_cache[3] = ($event) => handleActions("anticlockwise"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(refresh_left_default))
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ElIcon), {
                    onClick: _cache[4] || (_cache[4] = ($event) => handleActions("clockwise"))
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(refresh_right_default))
                    ]),
                    _: 1
                  })
                ], 2)
              ], 2),
              createCommentVNode(" CANVAS "),
              createBaseVNode("div", {
                class: normalizeClass(unref(ns).e("canvas"))
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.urlList, (url, i) => {
                  return withDirectives((openBlock(), createElementBlock("img", {
                    ref_for: true,
                    ref: (el) => imgRefs.value[i] = el,
                    key: url,
                    src: url,
                    style: normalizeStyle(unref(imgStyle)),
                    class: normalizeClass(unref(ns).e("img")),
                    onLoad: handleImgLoad,
                    onError: handleImgError,
                    onMousedown: handleMouseDown
                  }, null, 46, _hoisted_1$2)), [
                    [vShow, i === activeIndex.value]
                  ]);
                }), 128))
              ], 2),
              renderSlot(_ctx.$slots, "default")
            ], 6)
          ]),
          _: 3
        })
      ], 8, ["disabled"]);
    };
  }
});
var ImageViewer = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/image-viewer/src/image-viewer.vue"]]);
const ElImageViewer = withInstall(ImageViewer);
const imageProps = buildProps({
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  src: {
    type: String,
    default: ""
  },
  fit: {
    type: String,
    values: ["", "contain", "cover", "fill", "none", "scale-down"],
    default: ""
  },
  loading: {
    type: String,
    values: ["eager", "lazy"]
  },
  lazy: {
    type: Boolean,
    default: false
  },
  scrollContainer: {
    type: definePropType([String, Object])
  },
  previewSrcList: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  previewTeleported: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  infinite: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  }
});
const imageEmits = {
  load: (evt) => evt instanceof Event,
  error: (evt) => evt instanceof Event,
  switch: (val) => isNumber(val),
  close: () => true,
  show: () => true
};
const _hoisted_1$1 = ["src", "loading"];
const _hoisted_2$1 = { key: 0 };
const __default__ = defineComponent({
  name: "ElImage",
  inheritAttrs: false
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: imageProps,
  emits: imageEmits,
  setup(__props, { emit }) {
    const props = __props;
    let prevOverflow = "";
    const { t } = useLocale();
    const ns = useNamespace("image");
    const rawAttrs = useAttrs$1();
    const attrs = useAttrs();
    const imageSrc = ref();
    const hasLoadError = ref(false);
    const isLoading = ref(true);
    const showViewer = ref(false);
    const container = ref();
    const _scrollContainer = ref();
    const supportLoading = isClient && "loading" in HTMLImageElement.prototype;
    let stopScrollListener;
    let stopWheelListener;
    const containerStyle = computed(() => rawAttrs.style);
    const imageStyle = computed(() => {
      const { fit } = props;
      if (isClient && fit) {
        return { objectFit: fit };
      }
      return {};
    });
    const preview = computed(() => {
      const { previewSrcList } = props;
      return Array.isArray(previewSrcList) && previewSrcList.length > 0;
    });
    const imageIndex = computed(() => {
      const { previewSrcList, initialIndex } = props;
      let previewIndex = initialIndex;
      if (initialIndex > previewSrcList.length - 1) {
        previewIndex = 0;
      }
      return previewIndex;
    });
    const isManual = computed(() => {
      if (props.loading === "eager")
        return false;
      return !supportLoading && props.loading === "lazy" || props.lazy;
    });
    const loadImage = () => {
      if (!isClient)
        return;
      isLoading.value = true;
      hasLoadError.value = false;
      imageSrc.value = props.src;
    };
    function handleLoad(event) {
      isLoading.value = false;
      hasLoadError.value = false;
      emit("load", event);
    }
    function handleError(event) {
      isLoading.value = false;
      hasLoadError.value = true;
      emit("error", event);
    }
    function handleLazyLoad() {
      if (isInContainer(container.value, _scrollContainer.value)) {
        loadImage();
        removeLazyLoadListener();
      }
    }
    const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200);
    async function addLazyLoadListener() {
      var _a;
      if (!isClient)
        return;
      await nextTick();
      const { scrollContainer } = props;
      if (isElement(scrollContainer)) {
        _scrollContainer.value = scrollContainer;
      } else if (isString$1(scrollContainer) && scrollContainer !== "") {
        _scrollContainer.value = (_a = document.querySelector(scrollContainer)) != null ? _a : void 0;
      } else if (container.value) {
        _scrollContainer.value = getScrollContainer(container.value);
      }
      if (_scrollContainer.value) {
        stopScrollListener = useEventListener(_scrollContainer, "scroll", lazyLoadHandler);
        setTimeout(() => handleLazyLoad(), 100);
      }
    }
    function removeLazyLoadListener() {
      if (!isClient || !_scrollContainer.value || !lazyLoadHandler)
        return;
      stopScrollListener == null ? void 0 : stopScrollListener();
      _scrollContainer.value = void 0;
    }
    function wheelHandler(e) {
      if (!e.ctrlKey)
        return;
      if (e.deltaY < 0) {
        e.preventDefault();
        return false;
      } else if (e.deltaY > 0) {
        e.preventDefault();
        return false;
      }
    }
    function clickHandler() {
      if (!preview.value)
        return;
      stopWheelListener = useEventListener("wheel", wheelHandler, {
        passive: false
      });
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      showViewer.value = true;
      emit("show");
    }
    function closeViewer() {
      stopWheelListener == null ? void 0 : stopWheelListener();
      document.body.style.overflow = prevOverflow;
      showViewer.value = false;
      emit("close");
    }
    function switchViewer(val) {
      emit("switch", val);
    }
    watch(() => props.src, () => {
      if (isManual.value) {
        isLoading.value = true;
        hasLoadError.value = false;
        removeLazyLoadListener();
        addLazyLoadListener();
      } else {
        loadImage();
      }
    });
    onMounted(() => {
      if (isManual.value) {
        addLazyLoadListener();
      } else {
        loadImage();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "container",
        ref: container,
        class: normalizeClass([unref(ns).b(), _ctx.$attrs.class]),
        style: normalizeStyle(unref(containerStyle))
      }, [
        imageSrc.value !== void 0 && !hasLoadError.value ? (openBlock(), createElementBlock("img", mergeProps({ key: 0 }, unref(attrs), {
          src: imageSrc.value,
          loading: _ctx.loading,
          style: unref(imageStyle),
          class: [
            unref(ns).e("inner"),
            unref(preview) && unref(ns).e("preview"),
            isLoading.value && unref(ns).is("loading")
          ],
          onClick: clickHandler,
          onLoad: handleLoad,
          onError: handleError
        }), null, 16, _hoisted_1$1)) : createCommentVNode("v-if", true),
        isLoading.value || hasLoadError.value ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(unref(ns).e("wrapper"))
        }, [
          isLoading.value ? renderSlot(_ctx.$slots, "placeholder", { key: 0 }, () => [
            createBaseVNode("div", {
              class: normalizeClass(unref(ns).e("placeholder"))
            }, null, 2)
          ]) : hasLoadError.value ? renderSlot(_ctx.$slots, "error", { key: 1 }, () => [
            createBaseVNode("div", {
              class: normalizeClass(unref(ns).e("error"))
            }, toDisplayString(unref(t)("el.image.error")), 3)
          ]) : createCommentVNode("v-if", true)
        ], 2)) : createCommentVNode("v-if", true),
        unref(preview) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          showViewer.value ? (openBlock(), createBlock(unref(ElImageViewer), {
            key: 0,
            "z-index": _ctx.zIndex,
            "initial-index": unref(imageIndex),
            infinite: _ctx.infinite,
            "url-list": _ctx.previewSrcList,
            "hide-on-click-modal": _ctx.hideOnClickModal,
            teleported: _ctx.previewTeleported,
            "close-on-press-escape": _ctx.closeOnPressEscape,
            onClose: closeViewer,
            onSwitch: switchViewer
          }, {
            default: withCtx(() => [
              _ctx.$slots.viewer ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
                renderSlot(_ctx.$slots, "viewer")
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["z-index", "initial-index", "infinite", "url-list", "hide-on-click-modal", "teleported", "close-on-press-escape"])) : createCommentVNode("v-if", true)
        ], 64)) : createCommentVNode("v-if", true)
      ], 6);
    };
  }
});
var Image = /* @__PURE__ */ _export_sfc$1(_sfc_main$1, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/image/src/image.vue"]]);
const ElImage = withInstall(Image);
const elImage = "";
const elImageViewer = "";
const SelectDocumentView_vue_vue_type_style_index_0_scoped_0b9429f6_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-0b9429f6"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "header" }, [
  /* @__PURE__ */ createBaseVNode("h1", null, "Select Document")
], -1));
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  slot: "header",
  class: "clearfix"
}, [
  /* @__PURE__ */ createBaseVNode("h2", null, "Passport")
], -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h1", null, "Select", -1));
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "clearfix" }, [
  /* @__PURE__ */ createBaseVNode("h2", null, "National ID Card")
], -1));
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", {
  slot: "header",
  class: "clearfix"
}, [
  /* @__PURE__ */ createBaseVNode("h2", null, "Driving License")
], -1));
const _sfc_main = {
  __name: "SelectDocumentView",
  setup(__props) {
    let selectDocument = (document2) => {
      console.log("select document hit", document2);
    };
    return (_ctx, _cache) => {
      const _component_el_image = ElImage;
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_row = ElRow;
      return openBlock(), createBlock(_component_el_card, { class: "main-card" }, {
        header: withCtx(() => [
          _hoisted_1
        ]),
        default: withCtx(() => [
          createVNode(_component_el_row, { class: "document-row" }, {
            default: withCtx(() => [
              createVNode(_component_el_card, {
                shadow: "never",
                class: "box-card"
              }, {
                default: withCtx(() => [
                  _hoisted_2,
                  createVNode(_component_el_image, {
                    src: "https://qgen-identity.s3.eu-central-1.amazonaws.com/passport.png",
                    fit: "cover"
                  }),
                  createVNode(_component_el_button, {
                    plain: "",
                    onClick: _cache[0] || (_cache[0] = ($event) => unref(selectDocument)("passport"))
                  }, {
                    default: withCtx(() => [
                      _hoisted_3
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_row, { class: "document-row" }, {
            default: withCtx(() => [
              createVNode(_component_el_card, {
                shadow: "never",
                class: "box-card"
              }, {
                header: withCtx(() => [
                  _hoisted_4
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_image, {
                    src: "https://qgen-identity.s3.eu-central-1.amazonaws.com/id-card.png",
                    fit: "cover"
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: _cache[1] || (_cache[1] = ($event) => unref(selectDocument)("id-card"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Select")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_row, { class: "document-row" }, {
            default: withCtx(() => [
              createVNode(_component_el_card, {
                shadow: "never",
                class: "box-card"
              }, {
                default: withCtx(() => [
                  _hoisted_5,
                  createVNode(_component_el_image, {
                    src: "https://qgen-identity.s3.eu-central-1.amazonaws.com/driving-license.png",
                    fit: "cover"
                  }),
                  createVNode(_component_el_button, {
                    type: "primary",
                    onClick: _cache[2] || (_cache[2] = ($event) => unref(selectDocument)("driving-license"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Select")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
const SelectDocumentView = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0b9429f6"]]);
export {
  SelectDocumentView as default
};
