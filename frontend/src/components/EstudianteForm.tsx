import { useState, useEffect } from 'react'
import { CreateEstudianteInput, UpdateEstudianteInput, Estudiante } from '../types/estudiante'

// ── Icons ─────────────────────────────────────────────────────────────────────
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Default ───────────────────────────────────────────────────────────────────
const blank: CreateEstudianteInput = {
  nombre: '',
  email: '',
  telefono: '',
  nivel: 'Principiante',
  especialidad: 'Soprano',
  estado: 'Activo',
}

// ── Component ─────────────────────────────────────────────────────────────────
interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (data: CreateEstudianteInput | UpdateEstudianteInput) => void
  initialData?: Estudiante
  loading?: boolean
}

export const EstudianteForm = ({ open, onClose, onSubmit, initialData, loading = false }: Props) => {
  const [form, setForm] = useState<CreateEstudianteInput>(blank)
  const [errors, setErrors] = useState<Partial<Record<keyof CreateEstudianteInput, string>>>({})

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              nombre:       initialData.nombre,
              email:        initialData.email,
              telefono:     initialData.telefono ?? '',
              nivel:        initialData.nivel,
              especialidad: initialData.especialidad,
              estado:       initialData.estado,
            }
          : blank
      )
      setErrors({})
    }
  }, [open, initialData])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name as keyof CreateEstudianteInput])
      setErrors((p) => ({ ...p, [name]: '' }))
  }

  const validate = () => {
    const e: typeof errors = {}
    if (!form.nombre.trim())  e.nombre = 'El nombre es requerido.'
    if (!form.email.trim())   e.email  = 'El email es requerido.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email  = 'Ingresa un email válido.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  const handleClose = () => {
    if (loading) return
    setForm(blank)
    setErrors({})
    onClose()
  }

  if (!open) return null

  const isEdit = !!initialData

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={isEdit ? 'Editar estudiante' : 'Nuevo estudiante'}>

        <div className="modal-head">
          <span className="modal-head-title">{isEdit ? 'Editar Estudiante' : 'Nuevo Estudiante'}</span>
          <button className="close-btn" onClick={handleClose} disabled={loading} aria-label="Cerrar">
            <XIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">

              {/* Nombre */}
              <div className="field full">
                <label className="field-label" htmlFor="f-nombre">Nombre completo <span style={{color:'var(--red-400)'}}>*</span></label>
                <input
                  id="f-nombre"
                  className="field-input"
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={onChange}
                  placeholder="Ej: María González"
                  disabled={loading}
                  autoComplete="off"
                />
                {errors.nombre && <span className="field-err">{errors.nombre}</span>}
              </div>

              {/* Email */}
              <div className="field full">
                <label className="field-label" htmlFor="f-email">Correo electrónico <span style={{color:'var(--red-400)'}}>*</span></label>
                <input
                  id="f-email"
                  className="field-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Ej: maria@gmail.com"
                  disabled={loading}
                  autoComplete="off"
                />
                {errors.email && <span className="field-err">{errors.email}</span>}
              </div>

              {/* Teléfono */}
              <div className="field full">
                <label className="field-label" htmlFor="f-tel">Teléfono <span style={{color:'var(--text-3)', fontWeight:400}}>(opcional)</span></label>
                <input
                  id="f-tel"
                  className="field-input"
                  type="tel"
                  name="telefono"
                  value={form.telefono ?? ''}
                  onChange={onChange}
                  placeholder="Ej: +58 412 000 0000"
                  disabled={loading}
                />
              </div>

              {/* Nivel */}
              <div className="field">
                <label className="field-label" htmlFor="f-nivel">Nivel</label>
                <select id="f-nivel" className="field-select" name="nivel" value={form.nivel} onChange={onChange} disabled={loading}>
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>

              {/* Especialidad */}
              <div className="field">
                <label className="field-label" htmlFor="f-esp">Especialidad</label>
                <select id="f-esp" className="field-select" name="especialidad" value={form.especialidad} onChange={onChange} disabled={loading}>
                  <option value="Soprano">Soprano</option>
                  <option value="Contralto">Contralto</option>
                  <option value="Tenor">Tenor</option>
                  <option value="Bajo">Bajo</option>
                </select>
              </div>

              {/* Estado */}
              <div className="field">
                <label className="field-label" htmlFor="f-estado">Estado</label>
                <select id="f-estado" className="field-select" name="estado" value={form.estado} onChange={onChange} disabled={loading}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

            </div>
          </div>

          <div className="modal-foot">
            <button type="button" className="btn btn-ghost" onClick={handleClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading && <span className="btn-spin" />}
              {loading ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear Estudiante'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
