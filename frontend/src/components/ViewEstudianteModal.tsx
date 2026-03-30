import { Estudiante } from '../types/estudiante'
import { getAvatarColor, getInitials, formatDate } from '../utils'

const nivelClass: Record<string, string> = {
  Principiante: 'badge badge-principiante',
  Intermedio:   'badge badge-intermedio',
  Avanzado:     'badge badge-avanzado',
}

const espClass: Record<string, string> = {
  Soprano:   'badge badge-soprano',
  Contralto: 'badge badge-contralto',
  Tenor:     'badge badge-tenor',
  Bajo:      'badge badge-bajo',
}

// ── Close Icon ────────────────────────────────────────────────────────────────
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Component ─────────────────────────────────────────────────────────────────
interface Props {
  estudiante: Estudiante | null
  onClose: () => void
}

export const ViewEstudianteModal = ({ estudiante, onClose }: Props) => {
  if (!estudiante) return null

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Detalle del estudiante">

        <div className="modal-head">
          <span className="modal-head-title">Detalle del Estudiante</span>
          <button className="close-btn" onClick={onClose} aria-label="Cerrar"><XIcon /></button>
        </div>

        <div className="modal-body">
          {/* Header con avatar */}
          <div className="view-header">
            <div
              className="view-avatar"
              style={{ background: getAvatarColor(estudiante.nombre) }}
            >
              {getInitials(estudiante.nombre)}
            </div>
            <div>
              <div className="view-name">{estudiante.nombre}</div>
              <div className="view-email">{estudiante.email}</div>
              <div className="view-tags">
                <span className={nivelClass[estudiante.nivel] ?? 'badge'}>{estudiante.nivel}</span>
                <span className={espClass[estudiante.especialidad] ?? 'badge'}>{estudiante.especialidad}</span>
                <span className={`badge ${estudiante.estado === 'Activo' ? 'badge-activo' : 'badge-inactivo'}`}>
                  <span className={`dot ${estudiante.estado === 'Activo' ? 'dot-green' : 'dot-gray'}`} />
                  {estudiante.estado}
                </span>
              </div>
            </div>
          </div>

          {/* Grid de detalles */}
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-lbl">Teléfono</div>
              <div className="detail-val">{estudiante.telefono || 'No registrado'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-lbl">Inscripción</div>
              <div className="detail-val">{formatDate(estudiante.fechaInscripcion)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-lbl">Creado</div>
              <div className="detail-val">{formatDate(estudiante.createdAt)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-lbl">Actualizado</div>
              <div className="detail-val">{formatDate(estudiante.updatedAt)}</div>
            </div>
            <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
              <div className="detail-lbl">ID</div>
              <div className="detail-val-mono">{estudiante.id}</div>
            </div>
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
