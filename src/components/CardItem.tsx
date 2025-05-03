import {
    IonItem,
    IonAvatar,
    IonLabel,
    useIonActionSheet,
    useIonAlert
} from '@ionic/react';

import React from "react";
import { Card, deleteCard, updateCard } from "../service/cardRepository";
import { createOutline, trashOutline } from "ionicons/icons";

interface CardItemProps {
    card: Card;
    onChanged: () => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onChanged }) => {
    const [presentActionSheet] = useIonActionSheet();
    const [presentAlert] = useIonAlert();

    const handleLongPress = () => {
        presentActionSheet({
            header: `Изменить '${card.title}'`,
            buttons: [
                {
                    text: 'Переименовать',
                    icon: createOutline,
                    handler: () => {
                        showRenameAlert();
                    }
                },
                {
                    text: 'Удалить',
                    icon: trashOutline,
                    role: 'destructive',
                    handler: async () => {
                        await deleteCard(card.id);
                        onChanged();
                    }
                },
                {
                    text: 'Отмена',
                    role: 'cancel'
                }
            ]
        });
    };

    const showRenameAlert = () => {
        presentAlert({
            header: 'Новое имя',
            inputs: [
                {
                    name: 'newTitle',
                    type: 'text',
                    value: card.title
                }
            ],
            buttons: [
                {
                    text: 'Сохранить',
                    handler: async (data) => {
                        const newTitle = data.newTitle?.trim();
                        if (newTitle && newTitle !== card.title) {
                            await updateCard({ ...card, title: newTitle });
                            onChanged();
                        }
                    }
                },
                {
                    text: 'Отмена',
                    role: 'cancel'
                }
            ]
        });
    };

    return (
        <IonItem
            routerLink={`/show/${card.id}`}
            onContextMenu={(e) => {
                e.preventDefault();
                handleLongPress();
            }}
        >
            <IonAvatar slot="start">
                <img src={card.icon} alt={card.title} />
            </IonAvatar>

            <IonLabel>
                <h1>{card.title || card.text}</h1>
            </IonLabel>
        </IonItem>
    );
};

export default CardItem;