import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonText, IonBackButton, IonButtons, IonAvatar
} from '@ionic/react';

import { Card, getCard } from "../service/cardRepository";
import AnyCode from "../components/AnyCode";

interface RouteParams {
    id: string;
}

const Show: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [card, setCard] = useState<Card | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const loadedCard = await getCard(id);
            setCard(loadedCard ?? null);
            setLoading(false);
        };

        load();
    }, [id]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="transparent">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text={"Назад"} />
                    </IonButtons>
                    <IonTitle>
                        {card?.icon && (
                            <img
                                src={card.icon}
                                alt=""
                                style={{ height: "24px", verticalAlign: "middle", marginRight: "8px" }}
                            />
                        )}
                        {card?.title}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen scrollY={false}>
                {loading && (
                    <div style={{ textAlign: 'center', marginTop: '50%' }}>
                        <IonSpinner />
                    </div>
                )}

                {!loading && card && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', paddingLeft: '1vw', paddingRight: '1vw' }}>
                        <AnyCode format={card.format} value={card.text} />
                    </div>
                )}

                {!loading && !card && (
                    <IonText color="danger">
                        <p style={{ textAlign: 'center' }}>Карточка не найдена.</p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Show;