import { BrowserMultiFormatReader } from '@zxing/browser';

export async function scanFromFile(file: File): Promise<string | null> {
    const url = URL.createObjectURL(file);
    const reader = new BrowserMultiFormatReader();

    try {
        const res = await reader.decodeFromImageUrl(url);
        return res.getText();
    } catch {
        return null;
    } finally {
        URL.revokeObjectURL(url);
    }
}