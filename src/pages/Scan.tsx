import React, { useEffect, useRef, useState } from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    useIonAlert, IonBackButton, IonButtons
} from '@ionic/react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useHistory } from 'react-router';

const FORMAT_MAP: Record<string, string> = {
    '11': 'qrcode',
    '14': 'upca'
};

const Scan: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [presentAlert] = useIonAlert();
    const history = useHistory();

    useEffect(() => {
        const reader = new BrowserMultiFormatReader();
        let active = true;

        const startScan = async () => {
            try {
                await reader.decodeFromVideoDevice(undefined, videoRef.current!, (result, error) => {
                    if (result && active) {
                        const formatCode = result.getBarcodeFormat().valueOf() + "";
                        const format = FORMAT_MAP[formatCode];

                        active = false;

                        history.push('/select', {
                            text: result.getText(),
                            format
                        });
                    }
                });
            } catch (err) {
                presentAlert({
                    header: 'Ошибка камеры',
                    message: 'Не удалось получить доступ к камере.',
                    buttons: ['Закрыть']
                });
            }
        };

        startScan();

        return () => {
            active = false;
        };
    }, [history, presentAlert]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="transparent">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" text={"Назад"} />
                    </IonButtons>
                    <IonTitle>Сканирование</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <video
                    ref={videoRef}
                    style={{ width: '100%', height: 'auto' }}
                    muted
                    playsInline
                />
            </IonContent>
        </IonPage>
    );
};

export default Scan;