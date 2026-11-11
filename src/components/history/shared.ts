export const icons = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  history: 'M3.5 12a8.5 8.5 0 108.5-8.5A8.4 8.4 0 005.7 6.3M3 3.5v3.8h3.8M12 7.5V12l3 1.8',
  calendar:
    'M7 3v4M17 3v4M4 9.5h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  dots: 'M12 6h.01M12 12h.01M12 18h.01',
  chef: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z',
  sparkles:
    'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
}

export const formatDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null
