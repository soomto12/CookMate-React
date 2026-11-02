import { Link } from "react-router-dom";
import heroBowl from "../assets/Fresh Grilled Chicken Power Bowl.png";
import { useState } from "react";
import AppSidebar from "../components/AppSidebar";
import Icon from "../components/Icon";
import QuickTips from "../components/QuickTips";
import PopularRecipes from "../components/PopularRecipes";

const homeIcons = {
  search: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.5-4.5",
  bell: "M6 9a6 6 0 1112 0c0 5 2 6 2 7H4c0-1 2-2 2-7zM10 20a2 2 0 004 0",
  menu: "M4 6h16M4 12h16M4 18h16",
  sun: "M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
};

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen font-jakarta">
      <AppSidebar
        current="/app"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="min-w-0 flex-1 bg-gradient-to-br from-white via-emerald-50/40 to-emerald-50">
        <header className="flex flex-col gap-5 px-4 py-4 sm:px-8 sm:py-6 lg:px-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="sidebar"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-green-800 text-green-800 transition hover:bg-green-50 lg:hidden"
            >
              <Icon d={homeIcons.menu} className="h-5 w-5" />
            </button>
            <form role="search" className="relative min-w-0 max-w-xl flex-1">
              <label htmlFor="home-search" className="sr-only">
                Search for recipes
              </label>
              <Icon
                d={homeIcons.search}
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              />
              <input
                id="home-search"
                type="search"
                placeholder="Search for recipes..."
                className="w-full rounded-2xl border border-emerald-50 bg-white py-3.5 pl-12 pr-4 text-sm text-stone-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
              />
            </form>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label="Notifications"
                className="flex h-11 w-11 items-center justify-center rounded-full text-green-950 transition hover:bg-emerald-100/70"
              >
                <Icon d={homeIcons.bell} className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Toggle theme"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100/70 text-green-900 transition hover:bg-emerald-200/70"
              >
                <Icon d={homeIcons.sun} className="h-6 w-6" />
              </button>
            </div>
          </div>

          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-emerald-50 to-emerald-100/70 shadow-xl shadow-green-900/5 ring-1 ring-emerald-100/60">
            <div className="relative z-10 flex flex-col gap-5 px-6 py-8 sm:px-10 sm:py-12 md:w-[55%] lg:w-1/2">
              <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-green-950 sm:text-4xl lg:text-5xl">
                Discover Delicious Meals with{" "}
                <span className="text-green-700">Mealio</span>
              </h1>
              <p className="max-w-sm text-sm leading-6 text-slate-600 sm:text-base">
                Turn your ingredients into amazing recipes or explore popular
                dishes below.
              </p>
              <Link
                to="/generate"
                className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-green-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-900 sm:text-base"
              >
                Generate Recipe
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <img
              src={heroBowl}
              alt="Fresh grilled chicken power bowl"
              className="h-56 w-full object-cover object-right sm:h-72 md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[60%] md:[-webkit-mask-image:linear-gradient(to_right,transparent,black_35%)] md:[mask-image:linear-gradient(to_right,transparent,black_35%)]"
            />
          </section>
        </header>

        <main>
          <PopularRecipes />
          <QuickTips />
        </main>
      </div>
    </div>
  );
}

export default Home;
