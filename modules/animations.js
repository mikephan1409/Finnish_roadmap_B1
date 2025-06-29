import { animate } from 'https://esm.run/framer-motion@11.2.11';

export function fadeIn(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        animate(el, { opacity: [0, 1] }, { duration: 0.8, ease: 'easeOut' });
    });
}

export function staggerUp(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        animate(
            el, 
            { opacity: [0, 1], y: [20, 0] },
            { duration: 0.5, delay: index * 0.1, ease: 'easeOut' }
        );
    });
}