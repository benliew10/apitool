/**
 * In-page logo (login, sidebar, etc.) — replace `frontend/public/logo.png`.
 */
export const DEFAULT_SITE_LOGO = '/logo.png'

/**
 * Browser tab icon only — separate file so caches don’t reuse old `/logo.png` for the tab.
 * Synced from `logo.png` on `vite` start and `vite build` (see `syncFaviconFromLogo` in vite.config).
 * If `site_logo` is set in admin, that URL is still used for the tab instead.
 */
export const DEFAULT_FAVICON = '/favicon.png'
