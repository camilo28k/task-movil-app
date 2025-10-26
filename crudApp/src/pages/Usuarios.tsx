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

// 👇 Definimos la interfaz Usuario
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState<Usuario | null>(null);

  const obtenerUsuarios = async () => {
    try {
      const res = await api.get<Usuario[]>("/usuarios"); 
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const eliminarUsuario = async (id: number) => {
    try {
      await api.delete(`/usuarios/${id}`);
      obtenerUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
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
