import React, { useRef, useEffect } from 'react';
import bwipjs from '@bwip-js/browser';

export interface AnyCodeProps {
    value: string;
    format: string;
}

const AnyCode: React.FC<AnyCodeProps> = ({ value, format }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        try {
            bwipjs.toCanvas(canvas, {
                bcid: format,
                text: value,
                scale: 5,
                includetext: true,
                backgroundcolor: 'FFFFFF',
                barcolor: '000000',
                textcolor: '000000'
            });
        } catch (e) {
            console.error('bwip-js render error:', e);
        }
    }, [value, format]);

    return <canvas ref={canvasRef} style={{width: '100%'}} />;
};

export default AnyCode;
