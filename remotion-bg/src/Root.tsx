import { Composition } from 'remotion';
import { BackgroundLoop } from './BackgroundLoop';
import React from 'react';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="BackgroundLoop"
                component={BackgroundLoop}
                durationInFrames={600}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
