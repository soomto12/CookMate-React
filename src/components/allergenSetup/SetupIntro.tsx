/** Shield icon, page title and the short explanation. */
function SetupIntro() {
  return (
    <>
      <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl text-green-700">
        <svg
          viewBox="0 0 24 24"
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2.5 4.5 5.5v5.6c0 4.4 3 8.3 7.5 10.4 4.5-2.1 7.5-6 7.5-10.4V5.5L12 2.5Z" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      </div>
      <h1 className="mt-4 font-jakarta text-3xl font-extrabold tracking-tight text-stone-900 sm:text-[2rem]">
        Tell us about your allergies
      </h1>
      <p className="mt-3 max-w-md text-base leading-7 text-stone-600">
        This helps us suggest safe recipes and avoid ingredients that could harm you.
      </p>
    </>
  )
}

export default SetupIntro
