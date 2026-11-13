import type { RecipeStep } from '../../types'
import { icons } from '../../recipesConstants'
import useStepNarrator from '../../hooks/useStepNarrator'
import Icon from '../Icon'
import SectionHeading from './SectionHeading'

const controlBtn =
  'inline-flex items-center gap-1.5 rounded-full border border-green-600 px-3 py-1 text-xs font-bold text-green-700 transition hover:bg-green-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500'

function InstructionsList({ steps }: { steps: RecipeStep[] }) {
  const ordered = [...steps].sort((a, b) => a.order - b.order)
  const { supported, status, currentIndex, play, pause, resume, stop } = useStepNarrator(
    ordered.map((s) => s.instruction),
  )

  return (
    <section aria-labelledby="instructions-heading">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SectionHeading id="instructions-heading" icon={icons.info}>
          Instructions
        </SectionHeading>

        {supported && ordered.length > 0 && (
          <div className="flex items-center gap-2">
            {status === 'idle' && (
              <button type="button" className={controlBtn} onClick={() => play(0)}>
                <Icon d={icons.speaker} className="h-4 w-4" />
                Read aloud
              </button>
            )}
            {status === 'speaking' && (
              <button type="button" className={controlBtn} onClick={pause}>
                <Icon d={icons.pause} className="h-4 w-4" />
                Pause
              </button>
            )}
            {status === 'paused' && (
              <button type="button" className={controlBtn} onClick={resume}>
                <Icon d={icons.play} className="h-4 w-4" />
                Resume
              </button>
            )}
            {status !== 'idle' && (
              <button type="button" className={controlBtn} onClick={stop}>
                <Icon d={icons.stop} className="h-4 w-4" />
                Stop
              </button>
            )}
          </div>
        )}
      </div>

      <ol className="mt-4 grid gap-3.5">
        {ordered.map((step, i) => {
          const active = currentIndex === i
          return (
            <li
              key={step.id ?? step.order}
              aria-current={active ? 'step' : undefined}
              className={`flex items-start gap-3 rounded-lg text-sm font-semibold leading-6 text-stone-800 transition-colors sm:text-base ${
                active ? '-mx-2 bg-green-50 px-2 py-1 ring-1 ring-green-200' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white"
              >
                {i + 1}
              </span>
              <span className="flex-1">{step.instruction}</span>
              {supported && (
                <button
                  type="button"
                  onClick={() => play(i)}
                  aria-label={`Read step ${i + 1} aloud`}
                  title="Read from this step"
                  className="mt-0.5 shrink-0 rounded-full p-1 text-green-600 hover:bg-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  <Icon d={icons.speaker} className="h-4 w-4" />
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}

export default InstructionsList
