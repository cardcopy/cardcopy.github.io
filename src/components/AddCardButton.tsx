import {useRef} from 'react';
import {
    IonButton,
    IonIcon,
    useIonActionSheet,
} from '@ionic/react';
import {add, camera, image} from 'ionicons/icons';

import FileInput from "./FileInput";
import {useHistory} from "react-router";

function buildPicker(onCamera: () => any, onFile: () => any) {
    return {
        header: 'Добавить карточку',
        buttons: [
            {
                text: 'Камера',
                icon: camera,
                handler: onCamera,
            },
            {
                text: 'Файл',
                icon: image,
                handler: onFile,
            },
            {text: 'Отмена', role: 'cancel'},
        ],
    }
}

const AddCardButton: React.FC = () => {
    const [present] = useIonActionSheet();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const history = useHistory();

    function openPicker() {
        return present(buildPicker(
            () => history.push("/scan", {}),
            () => fileInputRef.current?.click()
        ))
    }

    return (
        <>
            <IonButton onClick={openPicker}>
                <IonIcon icon={add}/>
            </IonButton>

            <FileInput ref={fileInputRef}/>
        </>
    );
};

export default AddCardButton;