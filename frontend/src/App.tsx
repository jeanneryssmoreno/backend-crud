import { useState, useEffect } from 'react'
import { Estudiante } from './types/estudiante'
import { EstudianteForm } from './components/EstudianteForm'
import { EstudianteTable } from './components/EstudianteTable'
import {
  useEstudiantes,
  useCreateEstudiante,
  useUpdateEstudiante,
  useDeleteEstudiante,
} from './hooks/useEstudiantes'
import './App.css'

// ── SVG icons ────────────────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const MusicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
  </svg>
)

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
)



// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [formOpen, setFormOpen] = useState(false)
  const [selected, setSelected] = useState<Estudiante | undefined>()
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null)
  
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light-theme')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.add('light-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const { data: estudiantes, isLoading, isError, error } = useEstudiantes()
  const createMutation = useCreateEstudiante()
  const updateMutation = useUpdateEstudiante()
  const deleteMutation = useDeleteEstudiante()
  const isProcessing = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 3500)
    return () => clearTimeout(id)
  }, [toast])

  const showToast = (type: 'success' | 'error', msg: string) => setToast({ type, msg })

  const openNew  = () => { setSelected(undefined); setFormOpen(true) }
  const openEdit = (e: Estudiante) => { setSelected(e); setFormOpen(true) }
  const closeForm = () => { setFormOpen(false); setSelected(undefined) }

  const handleSubmit = async (data: any) => {
    try {
      if (selected) {
        await updateMutation.mutateAsync({ id: selected.id, data })
        showToast('success', 'Estudiante actualizado correctamente.')
      } else {
        await createMutation.mutateAsync(data)
        showToast('success', 'Estudiante creado correctamente.')
      }
      closeForm()
    } catch {
      showToast('error', 'Ocurrió un error. Por favor intenta de nuevo.')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
      showToast('success', 'Estudiante eliminado correctamente.')
    } catch {
      showToast('error', 'No se pudo eliminar. Intenta de nuevo.')
    }
  }

  // stats
  const total       = estudiantes?.length ?? 0
  const activos     = estudiantes?.filter((e) => e.estado === 'Activo').length ?? 0
  const avanzados   = estudiantes?.filter((e) => e.nivel === 'Avanzado').length ?? 0
  const inactivos   = total - activos

  return (
    <div className="app-wrapper">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">
            <div className="brand-icon">
              <MusicIcon />
            </div>
            <span className="brand-text">Academia de Canto</span>
            <div className="brand-sep" />
            <span className="brand-sub">Gestión de Estudiantes</span>
          </div>

          <div className="navbar-actions">
            <button 
              className="btn-theme" 
              onClick={() => setIsDark(!isDark)} 
              title={isDark ? "Modo Claro" : "Modo Oscuro"}
              aria-label="Cambiar tema"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button id="btn-nuevo" className="btn-new" onClick={openNew} disabled={isProcessing}>
              <PlusIcon /> Nuevo Estudiante
            </button>
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="main-content">

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Total</div>
            <div className="stat-value">{total}</div>
            <div className="stat-sub">estudiantes registrados</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Activos</div>
            <div className="stat-value">{activos}</div>
            <div className="stat-sub">en curso</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Inactivos</div>
            <div className="stat-value">{inactivos}</div>
            <div className="stat-sub">pausados</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avanzados</div>
            <div className="stat-value">{avanzados}</div>
            <div className="stat-sub">nivel experto</div>
          </div>
        </div>

        {/* Alerts */}
        {isError && (
          <div className="alert alert-error">
            <ErrorIcon />
            Error al cargar: {error instanceof Error ? error.message : 'Error desconocido'}
          </div>
        )}
        {toast && (
          <div className={`alert alert-${toast.type}`}>
            {toast.type === 'success' ? <OkIcon /> : <ErrorIcon />}
            {toast.msg}
          </div>
        )}

        {/* Table */}
        <EstudianteTable
          estudiantes={estudiantes}
          loading={isLoading}
          onEdit={openEdit}
          onDelete={handleDelete}
          deleting={deleteMutation.isPending}
        />
      </main>

      {/* ── Footer ── */}
      <footer className="app-footer">
        Academia de Canto · Sistema de Gestión &copy; {new Date().getFullYear()}
      </footer>

      {/* ── Form Modal ── */}
      <EstudianteForm
        open={formOpen}
        onClose={closeForm}
        onSubmit={handleSubmit}
        initialData={selected}
        loading={isProcessing}
      />
    </div>
  )
}

// tiny inline icons for alerts
const OkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const ErrorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

export default App
