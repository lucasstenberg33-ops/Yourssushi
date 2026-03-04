import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';

export const BackgroundLoop: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Create slowly drifting, breathing orbs
    // Orb 1: Deep Red / Crimson
    const orb1X = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [20, 80, 20], { extrapolateRight: 'clamp' });
    const orb1Y = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [30, 70, 30], { extrapolateRight: 'clamp' });
    const orb1Scale = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [1, 1.2, 1], { extrapolateRight: 'clamp' });

    // Orb 2: Burgundy / Obsidian
    const orb2X = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [80, 20, 80], { extrapolateRight: 'clamp' });
    const orb2Y = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [70, 20, 70], { extrapolateRight: 'clamp' });
    const orb2Scale = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [1.1, 0.9, 1.1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: '#0f0a0a', overflow: 'hidden' }}>
            {/* Orb 1 */}
            <div style={{
                position: 'absolute',
                left: `${orb1X}%`,
                top: `${orb1Y}%`,
                width: '800px',
                height: '800px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(145, 19, 38, 0.15) 0%, transparent 60%)',
                transform: `translate(-50%, -50%) scale(${orb1Scale})`,
                filter: 'blur(60px)',
            }} />

            {/* Orb 2 */}
            <div style={{
                position: 'absolute',
                left: `${orb2X}%`,
                top: `${orb2Y}%`,
                width: '1000px',
                height: '1000px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(86, 10, 32, 0.2) 0%, transparent 70%)',
                transform: `translate(-50%, -50%) scale(${orb2Scale})`,
                filter: 'blur(80px)',
            }} />

            {/* Subtle Noise Texture Overlay */}
            <AbsoluteFill style={{
                opacity: 0.05,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
            }} />
        </AbsoluteFill>
    );
};
