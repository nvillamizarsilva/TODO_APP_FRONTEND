import { Container, Row, Col, Card, Button, Toast, ToastContainer, ProgressBar } from 'react-bootstrap';
import {
  TaskProvider,
  TaskList,
  TaskForm,
  DeleteConfirmModal,
  useTaskPresenter,
} from './features/tasks';

function TaskApp() {
  const {
    tasks,
    selectedTask,
    loading,
    error,
    successMessage,
    stats,
    showForm,
    editMode,
    showDeleteModal,
    taskToDelete,
    deleteConfirmStep,
    filter,
    searchTerm,
    handleOpenCreateForm,
    handleOpenEditForm,
    handleCloseForm,
    handleSubmitForm,
    handleToggleComplete,
    handleRequestDelete,
    handleConfirmDeleteStep1,
    handleConfirmDeleteStep2,
    handleCancelDelete,
    setFilter,
    setSearchTerm,
    clearError,
    clearSuccess,
  } = useTaskPresenter();

  return (
    <div className="min-vh-100 bg-gradient-custom py-4">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col lg={10} xl={8}>
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-primary bg-gradient p-4" style={{ color: '#5B5F97' }}>
                <Row className="align-items-center">
                  <Col>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-check2-square display-5 me-3"></i>
                      <div>
                        <h1 className="mb-0 fw-bold">TaskMaster</h1>
                        <p className="mb-0" style={{ opacity: 0.7 }}>Organiza tu día, conquista tus metas</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="light"
                      size="lg"
                      onClick={handleOpenCreateForm}
                      className="shadow-sm px-4"
                    >
                      <i className="bi bi-plus-lg me-2"></i>
                      Nueva Tarea
                    </Button>
                  </Col>
                </Row>
              </div>

              <Card.Body className="bg-light py-3">
                <Row className="text-center g-3">
                  <Col xs={6} md={3}>
                    <div className="stats-item">
                      <i className="bi bi-collection text-primary fs-4"></i>
                      <h3 className="mb-0 fw-bold">{stats.total}</h3>
                      <small className="text-muted">Total</small>
                    </div>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="stats-item">
                      <i className="bi bi-clock text-warning fs-4"></i>
                      <h3 className="mb-0 fw-bold text-warning">{stats.pending}</h3>
                      <small className="text-muted">Pendientes</small>
                    </div>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="stats-item">
                      <i className="bi bi-check-circle text-success fs-4"></i>
                      <h3 className="mb-0 fw-bold text-success">{stats.completed}</h3>
                      <small className="text-muted">Completadas</small>
                    </div>
                  </Col>
                  <Col xs={6} md={3}>
                    <div className="stats-item">
                      <i className="bi bi-graph-up text-info fs-4"></i>
                      <h3 className="mb-0 fw-bold text-info">{stats.completionRate}%</h3>
                      <small className="text-muted">Progreso</small>
                    </div>
                  </Col>
                </Row>
                {stats.total > 0 && (
                  <ProgressBar 
                    now={stats.completionRate} 
                    variant="success"
                    className="mt-3"
                    style={{ height: '8px' }}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <TaskList
              tasks={tasks}
              loading={loading}
              error={error}
              filter={filter}
              searchTerm={searchTerm}
              stats={stats}
              onEdit={handleOpenEditForm}
              onDelete={handleRequestDelete}
              onToggleComplete={handleToggleComplete}
              onFilterChange={setFilter}
              onSearchChange={setSearchTerm}
              onClearError={clearError}
            />
          </Col>
        </Row>

        <TaskForm
          show={showForm}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          editMode={editMode}
          initialData={selectedTask}
          loading={loading}
          error={error}
        />

        <DeleteConfirmModal
          show={showDeleteModal}
          task={taskToDelete}
          confirmStep={deleteConfirmStep}
          loading={loading}
          onConfirmStep1={handleConfirmDeleteStep1}
          onConfirmStep2={handleConfirmDeleteStep2}
          onCancel={handleCancelDelete}
        />

        <ToastContainer position="bottom-end" className="p-3">
          <Toast
            show={!!successMessage}
            onClose={clearSuccess}
            delay={3000}
            autohide
            bg="success"
          >
            <Toast.Header closeButton={false}>
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              <strong className="me-auto">Éxito</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {successMessage}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>

      <footer className="text-center mt-5 pb-3">
        <small className="text-muted">
          <i className="bi bi-heart-fill text-danger mx-1"></i>
          TaskMaster - React + Bootstrap
        </small>
      </footer>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <TaskApp />
    </TaskProvider>
  );
}

export default App;
