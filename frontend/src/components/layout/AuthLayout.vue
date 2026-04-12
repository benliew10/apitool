<template>
  <div class="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 dark:bg-dark-950 lg:flex-row">
    <!-- Brand panel (desktop) -->
    <aside
      class="relative hidden w-full flex-none flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-800 via-primary-900 to-slate-950 px-10 py-12 text-white lg:flex lg:max-w-[min(44%,520px)]"
    >
      <div class="pointer-events-none absolute inset-0">
        <div
          class="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl"
        />
        <div
          class="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        />
        <div
          class="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]"
        />
      </div>

      <div class="relative z-10">
        <template v-if="settingsLoaded">
          <div
            class="mb-6 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/20 backdrop-blur-sm"
          >
            <img :src="siteLogo || '/logo.png'" alt="" class="h-full w-full object-contain p-1" />
          </div>
          <h1 class="text-3xl font-semibold tracking-tight text-white">
            {{ siteName }}
          </h1>
          <p class="mt-3 max-w-sm text-sm leading-relaxed text-primary-100/90">
            {{ siteSubtitle }}
          </p>
        </template>
      </div>

      <p class="relative z-10 text-xs text-primary-200/70">
        {{ siteName }} · Secure sign-in
      </p>
    </aside>

    <!-- Form column -->
    <div
      class="relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8 lg:px-12"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-slate-50/90 to-slate-100/80 dark:from-dark-950 dark:via-dark-950 dark:to-dark-900"
      />
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.08),transparent)]"
      />

      <div class="relative z-10 w-full max-w-[420px]">
        <!-- Mobile / tablet brand -->
        <div v-if="settingsLoaded" class="mb-8 text-center lg:hidden">
          <div
            class="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-primary-500/25 ring-1 ring-gray-200/80 dark:ring-dark-600"
          >
            <img :src="siteLogo || '/logo.png'" alt="" class="h-full w-full object-contain" />
          </div>
          <h1 class="text-gradient text-2xl font-bold tracking-tight">
            {{ siteName }}
          </h1>
          <p class="mt-1.5 text-sm text-gray-500 dark:text-dark-400">
            {{ siteSubtitle }}
          </p>
        </div>

        <div
          class="card-glass rounded-2xl border border-slate-200/80 p-6 shadow-xl shadow-slate-900/5 dark:border-dark-600/60 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)] sm:p-8"
        >
          <slot />
        </div>

        <div
          v-if="$slots.footer"
          class="mt-6 text-center text-sm text-gray-500 dark:text-dark-400"
        >
          <slot name="footer" />
        </div>

        <div class="mt-8 text-center text-xs text-gray-400 dark:text-dark-500">
          &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'Sub2API')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'Subscription to API Conversion Platform')
const settingsLoaded = computed(() => appStore.publicSettingsLoaded)

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  appStore.fetchPublicSettings()
})
</script>

<style scoped>
.text-gradient {
  @apply bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent;
}
</style>
