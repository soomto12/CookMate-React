export const icons = {
  menu: 'M4 6h16M4 12h16M4 18h16',
  back: 'M15 6l-6 6 6 6',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5',
  plus: 'M12 5v14M5 12h14',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3',
}

export const SUGGESTIONS = [
  'Milk', 'Eggs', 'Peanuts', 'Tree nuts', 'Soy', 'Wheat',
  'Fish', 'Shellfish', 'Sesame', 'Gluten', 'Corn', 'Mustard',
]

export const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase()
