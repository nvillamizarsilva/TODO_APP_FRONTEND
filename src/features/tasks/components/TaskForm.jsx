import { useState } from 'react';
import { Modal, Form, Button, Spinner, Alert } from 'react-bootstrap';

function TaskForm({
  show,
  onClose,
  onSubmit,
  editMode,
  initialData,
  loading,
  error,
}) {
  const getInitialFormData = () => ({
    title: initialData?.title || '',
    description: initialData?.description || '',
    isCompleted: initialData?.isCompleted || false,
  });

  const [formData, setFormData] = useState(getInitialFormData);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    const isTitleValid = formData.title.trim().length >= 3;
    
    if (form.checkValidity() === false || !isTitleValid) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    await onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({ title: '', description: '', isCompleted: false });
    setValidated(false);
    onClose();
  };

  const handleEnter = () => {
    setFormData(getInitialFormData());
    setValidated(false);
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      onEnter={handleEnter}
      centered
      backdrop="static"
      className="task-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center">
          <i className={`bi ${editMode ? 'bi-pencil-square' : 'bi-plus-circle'} me-2 text-primary`}></i>
          {editMode ? 'Editar Tarea' : 'Nueva Tarea'}
        </Modal.Title>
      </Modal.Header>
      
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </Alert>
          )}

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <i className="bi bi-card-heading me-2 text-primary"></i>
              Título
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="¿Qué necesitas hacer?"
              required
              minLength={3}
              disabled={loading}
              className="py-2"
              autoFocus
              isInvalid={validated && formData.title.trim().length < 3}
            />
            <Form.Control.Feedback type="invalid">
              {formData.title.trim().length === 0 
                ? 'El título es obligatorio' 
                : 'El título debe tener al menos 3 caracteres'}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <i className="bi bi-card-text me-2 text-primary"></i>
              Descripción
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Añade más detalles (opcional)"
              disabled={loading}
              className="py-2"
            />
          </Form.Group>

          {editMode && (
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="isCompleted"
                name="isCompleted"
                label={
                  <span className="fw-semibold">
                    <i className={`bi ${formData.isCompleted ? 'bi-check-circle-fill text-success' : 'bi-circle'} me-2`}></i>
                    {formData.isCompleted ? 'Tarea completada' : 'Marcar como completada'}
                  </span>
                }
                checked={formData.isCompleted}
                onChange={handleChange}
                disabled={loading}
              />
            </Form.Group>
          )}
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button 
            variant="outline-secondary" 
            onClick={handleClose}
            disabled={loading}
          >
            <i className="bi bi-x-lg me-1"></i>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={loading}
            className="px-4"
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              <>
                <i className={`bi ${editMode ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>
                {editMode ? 'Actualizar' : 'Crear Tarea'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TaskForm;
