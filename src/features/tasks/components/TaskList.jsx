import { Container, Row, Col, Card, Spinner, Alert, InputGroup, Form, ButtonGroup, Button } from 'react-bootstrap';
import TaskItem from './TaskItem';

function TaskList({
  tasks,
  loading,
  error,
  filter,
  searchTerm,
  stats,
  onEdit,
  onDelete,
  onToggleComplete,
  onFilterChange,
  onSearchChange,
  onClearError,
}) {
  return (
    <Container fluid className="px-0">
      <Card className="mb-4 border-0 shadow-sm bg-light">
        <Card.Body>
          <Row className="align-items-center g-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Buscar tareas..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="border-start-0"
                  style={{ boxShadow: 'none' }}
                />
                {searchTerm && (
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => onSearchChange('')}
                  >
                    <i className="bi bi-x-lg"></i>
                  </Button>
                )}
              </InputGroup>
            </Col>
            <Col md={6}>
              <ButtonGroup className="w-100">
                <Button
                  variant={filter === 'all' ? 'primary' : 'outline-primary'}
                  onClick={() => onFilterChange('all')}
                >
                  <i className="bi bi-list-task me-1"></i>
                  Todas ({stats.total})
                </Button>
                <Button
                  variant={filter === 'pending' ? 'warning' : 'outline-warning'}
                  onClick={() => onFilterChange('pending')}
                >
                  <i className="bi bi-clock me-1"></i>
                  Pendientes ({stats.pending})
                </Button>
                <Button
                  variant={filter === 'completed' ? 'success' : 'outline-success'}
                  onClick={() => onFilterChange('completed')}
                >
                  <i className="bi bi-check-circle me-1"></i>
                  Completadas ({stats.completed})
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" dismissible onClose={onClearError} className="shadow-sm">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </Alert>
      )}

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Cargando tareas...</p>
        </div>
      )}

      {!loading && tasks.length === 0 && (
        <Card className="border-0 shadow-sm text-center py-5">
          <Card.Body>
            <i className="bi bi-inbox display-1 text-muted mb-3 d-block"></i>
            <h4 className="text-muted">No hay tareas</h4>
            <p className="text-secondary">
              {searchTerm || filter !== 'all'
                ? 'No se encontraron tareas con los filtros actuales'
                : 'Comienza creando tu primera tarea'}
            </p>
          </Card.Body>
        </Card>
      )}

      {!loading && tasks.length > 0 && (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
              disabled={loading}
            />
          ))}
        </div>
      )}
    </Container>
  );
}

export default TaskList;
