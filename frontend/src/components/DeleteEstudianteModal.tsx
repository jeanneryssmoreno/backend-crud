import { Estudiante } from '../types/estudiante'

// ── Icons ─────────────────────────────────────────────────────────────────────
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const AlertTriangle = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const SpinIcon = () => (
  <span className="btn-spin" />
)

// ── Component ─────────────────────────────────────────────────────────────────
interface Props {
  estudiante: Estudiante | null
  loading?: boolean
  onClose: () => void
  onConfirm: (id: string) => void
}

export const DeleteEstudianteModal = ({ estudiante, loading = false, onClose, onConfirm }: Props) => {
  if (!estudiante) return null

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-sm" role="dialog" aria-modal="true" aria-label="Confirmar eliminación">

        <div className="modal-head">
          <span className="modal-head-title">Eliminar estudiante</span>
          <button className="close-btn" onClick={onClose} disabled={loading} aria-label="Cerrar">
            <XIcon />
          </button>
        </div>

        <div className="modal-body" style={{ textAlign: 'center', paddingTop: '24px', paddingBottom: '8px' }}>
          <div className="del-icon-ring">
            <AlertTriangle />
          </div>
          <p className="del-title">¿Confirmar eliminación?</p>
          <p className="del-desc">
            Vas a eliminar permanentemente a{' '}
            <span className="del-name">{estudiante.nombre}</span>.
            {' '}Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onConfirm(estudiante.id)}
            disabled={loading}
          >
            {loading ? <><SpinIcon /> Eliminando...</> : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
