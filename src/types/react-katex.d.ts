declare module 'react-katex' {
    import { CSSProperties } from 'react';

    export const InlineMath: React.FC<{ math: string; style?: CSSProperties }>;
    export const BlockMath: React.FC<{ math: string; style?: CSSProperties }>;
}