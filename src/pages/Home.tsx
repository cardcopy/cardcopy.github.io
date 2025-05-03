import { useRef, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSpinner,
    IonText,
} from '@ionic/react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const reader = new BrowserMultiFormatReader();

const Home: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [busy, setBusy] = useState(false);
    const [value, setValue] = useState<string | null>(null);

    const startScan = async () => {
        setBusy(true);
        setValue(null);
        try {
            const res = await reader.decodeOnceFromVideoDevice(
                undefined, // auto‑select rear camera
                videoRef.current!
            );
            setValue(res.getText());
        } catch (e) {
            console.error(e);
        } finally {
            setBusy(false);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Scan QR</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <video ref={videoRef} style={{ width: '100%', maxHeight: '60vh' }} />

                {busy ? (
                    <IonSpinner />
                ) : (
                    <IonButton expand="block" onClick={startScan}>
                        Start scan
                    </IonButton>
                )}

                {value && (
                    <IonText color="primary">
                        <p>Scanned: <b>{value}</b></p>
                    </IonText>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Home;