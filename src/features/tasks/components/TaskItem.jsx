import { Card, Button, Badge, Form } from 'react-bootstrap';

function TaskItem({ task, onEdit, onDelete, onToggleComplete, disabled }) {
  return (
    <Card 
      className={`mb-3 border-0 shadow-sm task-card ${task.isCompleted ? 'task-completed' : ''}`}
      style={{
        borderLeft: `4px solid ${task.isCompleted ? '#198754' : '#0d6efd'}`,
        transition: 'all 0.3s ease',
        opacity: task.isCompleted ? 0.85 : 1,
      }}
    >
      <Card.Body className="d-flex align-items-start gap-3">
        <Form.Check
          type="checkbox"
          checked={task.isCompleted || false}
          onChange={() => onToggleComplete(task)}
          disabled={disabled}
          className="mt-1"
          style={{ transform: 'scale(1.3)' }}
        />

        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 
              className={`mb-0 ${task.isCompleted ? 'text-decoration-line-through text-muted' : ''}`}
              style={{ fontWeight: 600 }}
            >
              {task.title}
            </h5>
            <Badge 
              bg={task.isCompleted ? 'success' : 'primary'} 
              className="ms-2"
              pill
            >
              {task.isCompleted ? 'Completada' : 'Pendiente'}
            </Badge>
          </div>
          
          {task.description && (
            <p 
              className={`mb-0 ${task.isCompleted ? 'text-muted text-decoration-line-through' : 'text-secondary'}`}
              style={{ fontSize: '0.95rem' }}
            >
              {task.description}
            </p>
          )}

          <small className="text-muted mt-2 d-block">
            <i className="bi bi-hash"></i> ID: {task.id}
          </small>
        </div>

        <div className="d-flex flex-column gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => onEdit(task)}
            disabled={disabled}
            title="Edit"
          >
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(task)}
            disabled={disabled}
            title="Delete"
          >
            <i className="bi bi-trash3"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TaskItem;
