import React, { useState } from 'react';
import {useHistory, useLocation} from 'react-router';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    IonAvatar,
    IonList,
    IonFooter, IonToggle, IonLabel, IonNote
} from '@ionic/react';
import AnyCode from '../components/AnyCode';
import {addCard, NewCardData} from "../service/cardRepository";

import './New.css'

const New: React.FC = () => {
    const history = useHistory();
    const location = useLocation<NewCardData>();
    const data = location.state;

    const [title, setTitle] = useState(data.title ?? '');
    const [description, setDescription] = useState(data.description ?? '');

    const handleSave = async () => {
        await addCard({
            ...data,
            title,
            description
        });

        history.replace('/list', {});
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text="Назад" />
                    </IonButtons>
                    <IonTitle>Копия</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <div id="code-container">
                    <AnyCode value={data.text} format={data.format}/>
                </div>

                <div id="avatar-container">
                    <IonAvatar>
                        <img style={{borderRadius: 0}} alt="Icon" src={data.icon} />
                    </IonAvatar>
                </div>

                <IonList>
                    <IonItem>
                        <IonInput
                            label="Название"
                            labelPlacement="stacked"
                            clearInput={true}
                            placeholder="Введите название магазина"
                            value={title}
                            onIonChange={e => setTitle(e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Описание"
                            labelPlacement="stacked"
                            clearInput={true}
                            placeholder="Введите описание магазина"
                            value={description}
                            onIonChange={e => setDescription(e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                </IonList>
            </IonContent>

            <IonFooter>
                <IonToolbar color="transparent">
                    <IonButton expand="block" onClick={handleSave}>
                        Сохранить
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default New;