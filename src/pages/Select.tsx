import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar, IonBackButton, IonButtons
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import {addCard, NewCardData} from "../service/cardRepository";

const SHOP_TEMPLATES = [
    {
        icon: '/logo/lidl.svg',
        title: 'Lidl',
        description: 'Сеть супермаркетов с низкими ценами'
    },
    {
        icon: '/logo/publix.png',
        title: 'Publix',
        description: 'Популярная сеть супермаркетов'
    },
    {
        icon: '/logo/sprouts.svg',
        title: 'Sprouts',
        description: 'Магазин натуральных и органических продуктов'
    },
    {
        icon: '/logo/target.svg',
        title: 'Target',
        description: 'Сеть магазинов с широким ассортиментом'
    },
    {
        icon: '/logo/walmart.svg',
        title: 'Walmart',
        description: 'Крупнейшая сеть супермаркетов в США'
    }
];

const Select: React.FC = () => {
    const history = useHistory();
    const location = useLocation<any>();

    const text = location.state?.text;
    const format = location.state?.format;

    const handleSelect = async (shop: typeof SHOP_TEMPLATES[number]) => {
        const newCard: NewCardData = {
            text,
            format,
            icon: shop.icon,
            title: shop.title,
            description: shop.description
        }

        await addCard(newCard);

        history.push('/list', newCard);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="transparent">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text={"Назад"} />
                    </IonButtons>
                    <IonTitle>Выберите магазин</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {SHOP_TEMPLATES.map((shop, index) => (
                        <IonItem
                            key={index}
                            button
                            onClick={() => handleSelect(shop)}
                        >
                            <IonAvatar slot="start">
                                <img src={shop.icon} alt={shop.title}/>
                            </IonAvatar>
                            <IonLabel>
                                <h1>{shop.title}</h1>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Select;