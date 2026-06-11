export default function Modal({ type, title, message, extra, onClose }) {
  const isSuccess = type === 'success'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
          <span className="text-2xl">{isSuccess ? '✓' : '✕'}</span>
        </div>
        <h3 className={`text-center text-lg font-bold mb-1 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
          {title}
        </h3>
        <p className="text-center text-sm text-gray-600 mb-4">{message}</p>
        {extra && (
          <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 mb-4 space-y-1">
            {extra}
          </div>
        )}
        <button
          onClick={onClose}
          className={`w-full py-2.5 rounded-xl font-semibold text-white transition-colors ${isSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
        >
          Close
        </button>
      </div>
    </div>
  )
}
