import Icon from '../Icon'
import { icons } from '../../generateConstants'

function GenerateButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-800 to-green-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-green-900/20 transition hover:from-green-900 hover:to-green-800 disabled:opacity-60"
    >
      <Icon d={icons.sparkles} className="h-5 w-5" />
      {loading ? 'Finding meals...' : 'Generate Recipe'}
      <span aria-hidden="true">&rarr;</span>
    </button>
  )
}

export default GenerateButton
