export let _activeRequests = 1; // Number of ongoing API requests
let _setLoading = null; // Setter function for global loading state

/**
 * Called by the provider to pass in the setState function.
 * @param {function(boolean)} fn - The setState function from the provider
 */
export function setGlobalLoaderSetter(fn) {
  _setLoading = fn;
}

export function setUpdateActiveRequest(activeRequestCount) {
  _activeRequests = activeRequestCount;
  _updateLoadingState();
}
/**
 * Internal helper to update global loading state based on active requests
 */
export function _updateLoadingState() {
  if (typeof _setLoading !== "function") return;
  _setLoading(_activeRequests > 0);
}
export function decrementActiveRequests() {
  _activeRequests = Math.max(0, _activeRequests - 1);
  _updateLoadingState();
}
export function incrementActiveRequests() {
  _activeRequests = Math.max(0, _activeRequests + 1);
  _updateLoadingState();
}
/**
 * apiFetch: a wrapper around fetch to manage global loading
 * Usage: await apiFetch("/api/endpoint", { method: "POST", body: JSON.stringify(...) })
 */

export async function apiFetch(input, init = {}, options = {}) {
  const { loading = false, loadingControl = false, headers = {} } = options;
  if (loading) {
    incrementActiveRequests();
  }

  try {
    // Add default headers (Content-Type JSON)
    const defaultHeaders = headers ?? {
      "Content-Type": "application/json",
    };

    const merged =
      init && init.headers
        ? { ...init, headers: { ...defaultHeaders, ...init.headers } }
        : { ...init, headers: defaultHeaders };

    const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/" + input,
      merged
    );

    // Request may succeed or fail, finally block will decrease counter
    return res;
  } catch (err) {
    // Rethrow the error but still decrement the activeRequests counter
    throw err;
  } finally {
    if (loading && !loadingControl) {
      decrementActiveRequests();
    }
  }
}
