import { openDB, DBSchema } from 'idb';

interface CardDB extends DBSchema {
    cards: {
        key: string;
        value: Card;
    };
}

export interface Card {
    id: string;
    text: string;
    format: string;
    icon: string;
    title: string;
    description: string;
    created: number;
}

export interface NewCardData {
    text: string;
    format: string;
    icon: string;
    title?: string;
    description?: string;
}

const dbPromise = openDB<CardDB>('cardcopy', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('cards')) {
            db.createObjectStore('cards', { keyPath: 'id' });
        }
    },
});

export async function addCard(data: NewCardData): Promise<Card> {
    const db = await dbPromise;
    const card: Card = {
        id: crypto.randomUUID(),
        created: Date.now(),
        text: data.text,
        format: data.format,
        icon: data.icon,
        title: data.title?.trim() || '',
        description: data.description || ''
    };
    await db.add('cards', card);
    return card;
}

export async function getCards(): Promise<Card[]> {
    const db = await dbPromise;
    return db.getAll('cards');
}

export async function getCard(id: string): Promise<Card | undefined> {
    const db = await dbPromise;
    return db.get('cards', id);
}

export async function updateCard(card: Card): Promise<void> {
    const db = await dbPromise;
    await db.put('cards', card);
}

export async function deleteCard(id: string): Promise<void> {
    const db = await dbPromise;
    await db.delete('cards', id);
}
