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
import TareaForm from "../components/TareaForm";

// 👇 Definimos la interfaz Tarea
interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
}

const Tareas: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tareaEdit, setTareaEdit] = useState<Tarea | null>(null);

  const obtenerTareas = async () => {
    try {
      const res = await api.get<Tarea[]>("/tareas");
      setTareas(res.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const eliminarTarea = async (id: number) => {
    try {
      await api.delete(`/tareas/${id}`);
      obtenerTareas();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton
          expand="block"
          onClick={() => {
            setTareaEdit(null);
            setIsModalOpen(true);
          }}
        >
          Crear Tarea
        </IonButton>

        <IonList>
          {tareas.map((t) => (
            <IonItem key={t.id}>
              <IonLabel>
                <h2>{t.titulo}</h2>
                <p>{t.descripcion}</p>
              </IonLabel>
              <IonButton
                color="primary"
                onClick={() => {
                  setTareaEdit(t);
                  setIsModalOpen(true);
                }}
              >
                Editar
              </IonButton>
              <IonButton color="danger" onClick={() => eliminarTarea(t.id)}>
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <TareaForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tareaEdit={tareaEdit}
          onSave={obtenerTareas}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tareas;
 
