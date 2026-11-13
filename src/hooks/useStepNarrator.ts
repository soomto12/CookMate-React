import { useCallback, useEffect, useRef, useState } from 'react'

export type NarratorStatus = 'idle' | 'speaking' | 'paused'

const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined

/**
 * Reads a list of instruction steps aloud with the browser's Web Speech API,
 * one utterance per step so the current step can be highlighted.
 */
function useStepNarrator(steps: string[]) {
  const [status, setStatus] = useState<NarratorStatus>('idle')
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  // Bumped on every start/stop so callbacks from cancelled utterances are ignored.
  const runId = useRef(0)
  const stepsRef = useRef(steps)
  stepsRef.current = steps

  const supported = !!synth && typeof SpeechSynthesisUtterance !== 'undefined'

  const stop = useCallback(() => {
    runId.current += 1
    synth?.cancel()
    setStatus('idle')
    setCurrentIndex(null)
  }, [])

  const speakFrom = useCallback(
    (index: number, run: number) => {
      if (!synth || run !== runId.current) return
      const list = stepsRef.current
      if (index >= list.length) {
        setStatus('idle')
        setCurrentIndex(null)
        return
      }

      const utterance = new SpeechSynthesisUtterance(`Step ${index + 1}. ${list[index]}`)
      utterance.rate = 0.95
      utterance.onstart = () => {
        if (run !== runId.current) return
        setCurrentIndex(index)
        setStatus('speaking')
      }
      utterance.onend = () => speakFrom(index + 1, run)
      utterance.onerror = (e) => {
        if (run !== runId.current) return
        if (e.error === 'interrupted' || e.error === 'canceled') return
        setStatus('idle')
        setCurrentIndex(null)
      }
      synth.speak(utterance)
    },
    [],
  )

  /** Start reading from a given step (defaults to the first). */
  const play = useCallback(
    (fromIndex = 0) => {
      if (!synth) return
      runId.current += 1
      synth.cancel()
      setCurrentIndex(fromIndex)
      setStatus('speaking')
      speakFrom(fromIndex, runId.current)
    },
    [speakFrom],
  )

  const pause = useCallback(() => {
    if (!synth) return
    synth.pause()
    setStatus('paused')
  }, [])

  const resume = useCallback(() => {
    if (!synth) return
    synth.resume()
    setStatus('speaking')
  }, [])

  // Stop speaking when the component unmounts (e.g. modal closed, page change).
  useEffect(() => () => {
    runId.current += 1
    synth?.cancel()
  }, [])

  return { supported, status, currentIndex, play, pause, resume, stop }
}

export default useStepNarrator
