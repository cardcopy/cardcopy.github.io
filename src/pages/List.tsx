import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonButtons,
    useIonViewWillEnter, IonFooter, IonText
} from '@ionic/react';

import React, { useState } from "react";
import AddCardButton from "../components/AddCardButton";
import { Card, getCards, deleteCard } from "../service/cardRepository";
import CardItem from "../components/CardItem";

const List: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const appVersion = import.meta.env.VITE_APP_VERSION || 'Local env';

    useIonViewWillEnter(() => {
        loadCards();
    });

    const loadCards = async () => {
        const loadedCards = await getCards();
        setCards(loadedCards);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="transparent">
                    <IonTitle>Карточки</IonTitle>
                    <IonButtons slot="end">
                        <AddCardButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {cards.length > 0 &&
                    <IonList>
                        {cards.map(card => (
                            <CardItem card={card} onChanged={() => {loadCards()}} />
                        ))}
                    </IonList>
                }
            </IonContent>

            <IonFooter>
                <IonToolbar color="transparent">
                    <IonText style={{ display: 'block', textAlign: 'center', fontSize: '0.9em', color: '#666' }}>
                        Версия: {appVersion}
                    </IonText>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default List;