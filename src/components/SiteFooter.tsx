function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <span className="inline-flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight text-stone-900">
            <span className="text-3xl">👨‍🍳</span>
            Meal<span className="text-amber-700">io</span>
          </span>

          <p className="text-sm text-stone-600">
            © {new Date().getFullYear()} Mealio. The Digital Kitchen Hearth.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500 md:justify-end">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Help Center</span>
            <span>Community Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter