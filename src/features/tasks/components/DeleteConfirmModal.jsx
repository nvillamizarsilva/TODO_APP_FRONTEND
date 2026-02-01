import { Modal, Button, Alert, ProgressBar } from 'react-bootstrap';

function DeleteConfirmModal({
  show,
  task,
  confirmStep,
  loading,
  onConfirmStep1,
  onConfirmStep2,
  onCancel,
}) {
  if (!task) return null;

  return (
    <Modal 
      show={show} 
      onHide={onCancel} 
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="d-flex align-items-center text-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Eliminar Tarea
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <small className={confirmStep >= 1 ? 'text-primary fw-bold' : 'text-muted'}>
              Paso 1: Confirmar
            </small>
            <small className={confirmStep >= 2 ? 'text-danger fw-bold' : 'text-muted'}>
              Paso 2: Eliminar
            </small>
          </div>
          <ProgressBar 
            now={confirmStep === 1 ? 50 : 100} 
            variant={confirmStep === 1 ? 'primary' : 'danger'}
            animated={loading}
          />
        </div>

        <Alert variant="secondary" className="mb-4">
          <div className="mb-2">
            <strong>
              <i className="bi bi-card-heading me-2"></i>
              {task.title}
            </strong>
          </div>
          {task.description && (
            <small className="text-muted">{task.description}</small>
          )}
        </Alert>

        {confirmStep === 1 ? (
          <div className="text-center">
            <i className="bi bi-question-circle display-4 text-warning mb-3 d-block"></i>
            <h5>¿Estás seguro?</h5>
            <p className="text-muted mb-0">
              Estás a punto de eliminar esta tarea. Esta acción requiere una confirmación adicional.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <i className="bi bi-exclamation-octagon display-4 text-danger mb-3 d-block"></i>
            <h5 className="text-danger">Última advertencia</h5>
            <p className="text-muted mb-0">
              <strong>Esta acción es irreversible.</strong>
              <br />
              La tarea será eliminada permanentemente y no podrá recuperarse.
            </p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button 
          variant="outline-secondary" 
          onClick={onCancel}
          disabled={loading}
        >
          <i className="bi bi-x-lg me-1"></i>
          Cancelar
        </Button>

        {confirmStep === 1 ? (
          <Button 
            variant="warning" 
            onClick={onConfirmStep1}
            disabled={loading}
          >
            <i className="bi bi-arrow-right me-1"></i>
            Sí, continuar
          </Button>
        ) : (
          <Button 
            variant="danger" 
            onClick={onConfirmStep2}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Eliminando...
              </>
            ) : (
              <>
                <i className="bi bi-trash3-fill me-1"></i>
                Eliminar definitivamente
              </>
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModal;
