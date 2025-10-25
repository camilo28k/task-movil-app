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

const Tareas: React.FC = () => {
  const [tareas, setTareas] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tareaEdit, setTareaEdit] = useState<any | null>(null);

  const obtenerTareas = async () => {
    const res = await api.get("/tareas");
    setTareas(res.data);
  };

  const eliminarTarea = async (id: number) => {
    await api.delete(`/tareas/${id}`);
    obtenerTareas();
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
