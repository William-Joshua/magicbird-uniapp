import { watchWithFilter } from '@vueuse/shared'
import { ref, unref, shallowRef } from 'vue'
import { useEventListener } from '@vueuse/core'

export const StorageSerializers = {
  boolean: {
    read: (v) => v === 'true',
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  }
}

/**
 * Reactive LocalStorage/SessionStorage.
 *
 * @see https://vueuse.org/useStorage
 * @param key
 * @param initialValue
 * @param options
 */
export function uselocalStore(key, initialValue, options = {}) {
  var _a
  const { flush = 'pre', deep = true, listenToStorageChanges = true, writeDefaults = true, shallow, eventFilter, onError = (e) => {
    console.error(e)
  } } = options
  const rawInit = unref(initialValue)
  const type = rawInit == null
    ? 'any'
    : rawInit instanceof Set
      ? 'set'
      : rawInit instanceof Map
        ? 'map'
        : typeof rawInit === 'boolean'
          ? 'boolean'
          : typeof rawInit === 'string'
            ? 'string'
            : typeof rawInit === 'object'
              ? 'object'
              : Array.isArray(rawInit)
                ? 'object'
                : !Number.isNaN(rawInit)
                  ? 'number'
                  : 'any'
  const data = shallow ? shallowRef(initialValue) : ref(initialValue)
  const serializer = (_a = options.serializer) !== null && _a !== void 0 ? _a : StorageSerializers[type]
  function read(event) {
    if (!uni || (event && event.key !== key)) { return }
    try {
      const rawValue = event ? event.newValue : uni.getStorageSync(key) || null
      if (rawValue == null) {
        data.value = rawInit
        if (writeDefaults && rawInit !== null) { uni.setStorageSync(key, serializer.write(rawInit)) }
      } else {
        data.value = serializer.read(rawValue)
      }
    } catch (e) {
      onError(e)
    }
  }
  read()
  if (window && listenToStorageChanges) { useEventListener(window, 'storage', e => setTimeout(() => read(e), 0)) }
  if (uni) {
    watchWithFilter(data, () => {
      try {
        if (data.value == null) { uni.removeStorageSync(key) } else { uni.setStorageSync(key, serializer.write(data.value)) }
      } catch (e) {
        onError(e)
      }
    }, {
      flush,
      deep,
      eventFilter
    })
  }
  return data
}
