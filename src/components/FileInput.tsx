import { forwardRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { useHistory } from 'react-router';
import {useIonAlert} from "@ionic/react";

const FORMAT_MAP: Record<string, string> = {
    '11': 'qrcode',
    '14': 'upca'
};

const FileInput = forwardRef<HTMLInputElement, {}>((_, ref) => {
    const history = useHistory();
    const [presentAlert] = useIonAlert();

    async function handleOpenFile(e: any) {
        const file = e.target.files?.[0];
        const url = URL.createObjectURL(file);
        const reader = new BrowserMultiFormatReader();
        try {
            const res = await reader.decodeFromImageUrl(url);
            const formatCode = res.getBarcodeFormat().valueOf() + "";

            let format: string = FORMAT_MAP[formatCode];

            history.push('/select', {
                text: res.getText(),
                format
            });
        } catch {
            presentAlert({
                header: 'Ууупс!',
                message: 'Не могу найти код на фото',
                buttons: ['Закрыть'],
            });
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    return (
        <input
            ref={ref}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleOpenFile}
        />
    );
});

export default FileInput;