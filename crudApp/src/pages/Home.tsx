import { IonButton, IonContent, IonPage, IonTitle, IonToolbar, IonHeader } from "@ionic/react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CRUD App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => history.push("/usuarios")}>
          Usuarios
        </IonButton>
        <IonButton expand="block" color="secondary" onClick={() => history.push("/tareas")}>
          Tareas
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
