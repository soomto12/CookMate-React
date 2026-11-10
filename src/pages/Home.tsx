import { Link } from "react-router-dom";
import heroBowl from "../assets/Fresh Grilled Chicken Power Bowl.png";
import { useState } from "react";
import AppSidebar from "../components/AppSidebar";
import Icon from "../components/Icon";
import UserMenu from "../components/UserMenu";
import QuickTips from "../components/QuickTips";
import PopularRecipes from "../components/PopularRecipes";

const homeIcons = {
  menu: "M4 6h16M4 12h16M4 18h16",
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

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <UserMenu />
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
