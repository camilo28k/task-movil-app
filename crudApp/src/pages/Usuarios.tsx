import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import UsuarioForm from "../components/UsuarioForm";

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState<any | null>(null);

  const obtenerUsuarios = async () => {
    const res = await api.get("/usuarios");
    setUsuarios(res.data);
  };

  const eliminarUsuario = async (id: number) => {
    await api.delete(`/usuarios/${id}`);
    obtenerUsuarios();
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton
          expand="block"
          onClick={() => {
            setUsuarioEdit(null);
            setIsModalOpen(true);
          }}
        >
          Crear Usuario
        </IonButton>

        <IonList>
          {usuarios.map((u) => (
            <IonItem key={u.id}>
              <IonLabel>
                <h2>{u.nombre}</h2>
                <p>{u.correo}</p>
              </IonLabel>
              <IonButton
                color="primary"
                onClick={() => {
                  setUsuarioEdit(u);
                  setIsModalOpen(true);
                }}
              >
                Editar
              </IonButton>
              <IonButton color="danger" onClick={() => eliminarUsuario(u.id)}>
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <UsuarioForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          usuarioEdit={usuarioEdit}
          onSave={obtenerUsuarios}
        />
      </IonContent>
    </IonPage>
  );
};

export default Usuarios;
