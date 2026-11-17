/* reCAPTCHA v3 — loads the Google script once and mints a token per submit.
   Hardened: each step is time-bounded and the execute step retries once. */

const TOKEN_TIMEOUT_MS = 10_000

let scriptPromise = null

function withTimeout(promise, ms, message) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms)
    promise.then(
      value => { clearTimeout(timer); resolve(value) },
      err => { clearTimeout(timer); reject(err) }
    )
  })
}

function loadRecaptcha(siteKey) {
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha)
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
      script.async = true
      script.defer = true
      script.onload = () => resolve(window.grecaptcha)
      script.onerror = () => {
        scriptPromise = null
        reject(new Error('Failed to load reCAPTCHA'))
      }
      document.head.appendChild(script)
    })
  }
  return scriptPromise
}

async function executeToken(grecaptcha, siteKey, action) {
  return withTimeout(grecaptcha.execute(siteKey, { action }), TOKEN_TIMEOUT_MS,
    'reCAPTCHA token request timed out')
}

export async function getCaptchaToken(siteKey, action = 'contact') {
  const grecaptcha = await withTimeout(loadRecaptcha(siteKey), TOKEN_TIMEOUT_MS,
    'reCAPTCHA script failed to load')
  await withTimeout(new Promise(resolve => grecaptcha.ready(resolve)), TOKEN_TIMEOUT_MS,
    'reCAPTCHA failed to become ready')

  try {
    return await executeToken(grecaptcha, siteKey, action)
  } catch {
    // One retry — v3 can spuriously reject on a slow or contested connection.
    return executeToken(grecaptcha, siteKey, action)
  }
}