import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonButtons,
    useIonViewWillEnter
} from '@ionic/react';

import React, { useState } from "react";
import AddCardButton from "../components/AddCardButton";
import { Card, getCards, deleteCard } from "../service/cardRepository";
import CardItem from "../components/CardItem";

const List: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);

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
        </IonPage>
    );
};

export default List;