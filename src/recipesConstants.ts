import type { Recipe } from './types'

export const icons = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  back: 'M19 12H5M11 6l-6 6 6 6',
  bookmark: 'M7 4h10a1 1 0 011 1v15l-6-4-6 4V5a1 1 0 011-1z',
  share:
    'M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5',
  clock: 'M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
  cutlery: 'M7 3v4a2 2 0 004 0V3M9 9v12M17 3c-1.4 2-2 4-2 6h4c0-2-.6-4-2-6zM17 9v12',
  pot: 'M4 11h16v6a3 3 0 01-3 3H7a3 3 0 01-3-3v-6zM2 11h20M8 7c0-1 1-1 1-2s-1-1-1-2M13 7c0-1 1-1 1-2s-1-1-1-2',
  people:
    'M16 19v-1a4 4 0 00-4-4H7a4 4 0 00-4 4v1M9.5 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7M21 19v-1a4 4 0 00-3-3.9M16.5 4.2a4 4 0 010 7.6',
  cart: 'M3 4h2l2.4 10.4a1 1 0 001 .6h8.2a1 1 0 001-.8L19 8H6M9 20h.01M17 20h.01',
  info: 'M12 3a9 9 0 100 18 9 9 0 000-18zM12 8h.01M11 12h1v4h1',
  check: 'M5.5 12.5l4 4 9-9',
  chart: 'M5 20V10M12 20V4M19 20v-6M3 20h18',
  chef: 'M7 14a4 4 0 01-1-7.9A5 5 0 0116 5a4 4 0 011 8.1V20H7v-6zM7 17h10',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z',
  sparkles:
    'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
}

export const formatDifficulty = (difficulty: NonNullable<Recipe['difficulty']>) =>
  difficulty.charAt(0) + difficulty.slice(1).toLowerCase()

export const itemKey = (item: { id?: string; name: string }) => item.id ?? item.name

export const iconButtonClass =
  'flex h-10 w-10 items-center justify-center rounded-full text-green-900 transition hover:bg-emerald-50'
