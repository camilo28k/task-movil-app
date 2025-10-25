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
} from "@ionic/react";
import { useState, useEffect } from "react";
import { api } from "../services/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  usuarioEdit?: any;
  onSave: () => void;
}

const UsuarioForm: React.FC<Props> = ({ isOpen, onClose, usuarioEdit, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (usuarioEdit) {
      setNombre(usuarioEdit.nombre);
      setCorreo(usuarioEdit.correo);
      setPassword(usuarioEdit.password);
    } else {
      setNombre("");
      setCorreo("");
      setPassword("");
    }
  }, [usuarioEdit]);

  const handleSubmit = async () => {
    const usuario = { nombre, correo, password };
    if (usuarioEdit) {
      await api.put(`/usuarios/${usuarioEdit.id}`, usuario);
    } else {
      await api.post("/usuarios", usuario);
    }
    onSave();
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{usuarioEdit ? "Editar Usuario" : "Crear Usuario"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput value={nombre} onIonChange={(e) => setNombre(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Correo</IonLabel>
          <IonInput value={correo} onIonChange={(e) => setCorreo(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
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

export default UsuarioForm;
