import { useState } from 'react'
import { Estudiante } from '../types/estudiante'
import { ViewEstudianteModal } from './ViewEstudianteModal'
import { DeleteEstudianteModal } from './DeleteEstudianteModal'
import { getAvatarColor, getInitials } from '../utils'

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

const UserXIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="23" y1="11" x2="17" y2="17" />
    <line x1="17" y1="11" x2="23" y2="17" />
  </svg>
)

const nivelBadge: Record<string, string> = {
  Principiante: 'badge badge-principiante',
  Intermedio:   'badge badge-intermedio',
  Avanzado:     'badge badge-avanzado',
}

const espBadge: Record<string, string> = {
  Soprano:   'badge badge-soprano',
  Contralto: 'badge badge-contralto',
  Tenor:     'badge badge-tenor',
  Bajo:      'badge badge-bajo',
}

// ── Component ─────────────────────────────────────────────────────────────────
interface Props {
  estudiantes: Estudiante[] | undefined
  loading: boolean
  onEdit: (e: Estudiante) => void
  onDelete: (id: string) => void
  deleting?: boolean
}

export const EstudianteTable = ({
  estudiantes,
  loading,
  onEdit,
  onDelete,
  deleting = false,
}: Props) => {
  const [viewing, setViewing] = useState<Estudiante | null>(null)
  const [toDelete, setToDelete] = useState<Estudiante | null>(null)
  const [deletingLocal, setDeletingLocal] = useState(false)

  const confirmDelete = async (id: string) => {
    setDeletingLocal(true)
    await onDelete(id)
    setDeletingLocal(false)
    setToDelete(null)
  }

  // Loading
  if (loading) return (
    <div className="table-card">
      <div className="loading-wrap">
        <span className="loader" />
        Cargando estudiantes...
      </div>
    </div>
  )

  // Empty
  if (!estudiantes || estudiantes.length === 0) return (
    <div className="table-card">
      <div className="empty-wrap">
        <div className="empty-icon-wrap"><UserXIcon /></div>
        <p className="empty-title">Sin estudiantes registrados</p>
        <p className="empty-sub">Haz clic en "Nuevo Estudiante" para agregar el primero.</p>
      </div>
    </div>
  )

  return (
    <>
      <div className="table-card">
        <div className="table-card-header">
          <span className="table-card-title">Estudiantes</span>
          <span className="record-badge">{estudiantes.length} registros</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Especialidad</th>
                <th className="col-phone">Teléfono</th>
                <th>Nivel</th>
                <th>Estado</th>
                <th style={{ textAlign: 'right', paddingRight: '18px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((est) => (
                <tr key={est.id}>
                  {/* Estudiante */}
                  <td>
                    <div className="student-cell">
                      <div
                        className="avatar"
                        style={{ background: getAvatarColor(est.nombre) }}
                      >
                        {getInitials(est.nombre)}
                      </div>
                      <div>
                        <div className="student-name">{est.nombre}</div>
                        <div className="student-email">{est.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Especialidad */}
                  <td>
                    <span className={espBadge[est.especialidad] ?? 'badge'}>
                      {est.especialidad}
                    </span>
                  </td>

                  {/* Teléfono */}
                  <td className="col-phone" style={{ color: est.telefono ? 'var(--zinc-300)' : 'var(--text-3)' }}>
                    {est.telefono || '—'}
                  </td>

                  {/* Nivel */}
                  <td>
                    <span className={nivelBadge[est.nivel] ?? 'badge'}>
                      {est.nivel}
                    </span>
                  </td>

                  {/* Estado */}
                  <td>
                    <span className={`badge ${est.estado === 'Activo' ? 'badge-activo' : 'badge-inactivo'}`}>
                      <span className={`dot ${est.estado === 'Activo' ? 'dot-green' : 'dot-gray'}`} />
                      {est.estado}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td>
                    <div className="actions">
                      <button
                        id={`view-${est.id}`}
                        className="act-btn act-btn-view"
                        title="Ver detalles"
                        onClick={() => setViewing(est)}
                      >
                        <EyeIcon />
                      </button>
                      <button
                        id={`edit-${est.id}`}
                        className="act-btn act-btn-edit"
                        title="Editar"
                        onClick={() => onEdit(est)}
                        disabled={deleting}
                      >
                        <EditIcon />
                      </button>
                      <button
                        id={`del-${est.id}`}
                        className="act-btn act-btn-del"
                        title="Eliminar"
                        onClick={() => setToDelete(est)}
                        disabled={deleting}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ViewEstudianteModal estudiante={viewing} onClose={() => setViewing(null)} />
      <DeleteEstudianteModal
        estudiante={toDelete}
        loading={deletingLocal || deleting}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </>
  )
}
