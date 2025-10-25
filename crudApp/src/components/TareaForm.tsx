import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  IonCheckbox,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { api } from "../services/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tareaEdit?: any;
  onSave: () => void;
}

const TareaForm: React.FC<Props> = ({ isOpen, onClose, tareaEdit, onSave }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completada, setCompletada] = useState(false);

  useEffect(() => {
    if (tareaEdit) {
      setTitulo(tareaEdit.titulo);
      setDescripcion(tareaEdit.descripcion);
      setCompletada(tareaEdit.completada);
    } else {
      setTitulo("");
      setDescripcion("");
      setCompletada(false);
    }
  }, [tareaEdit]);

  const handleSubmit = async () => {
    const tarea = { titulo, descripcion, completada };
    if (tareaEdit) {
      await api.put(`/tareas/${tareaEdit.id}`, tarea);
    } else {
      await api.post("/tareas", tarea);
    }
    onSave();
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{tareaEdit ? "Editar Tarea" : "Crear Tarea"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput value={titulo} onIonChange={(e) => setTitulo(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Descripción</IonLabel>
          <IonInput value={descripcion} onIonChange={(e) => setDescripcion(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel>Completada</IonLabel>
          <IonCheckbox checked={completada} onIonChange={(e) => setCompletada(e.detail.checked)} />
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" onClick={handleSubmit}>
          Guardar
        </IonButton>
        <IonButton expand="block" color="medium" onClick={onClose}>
          Cancelar
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default TareaForm;
