import { css, keyframes } from 'styled-components';

export const media = ({
    desktop: (...args) => css`
        @media (max-width: 1200px) {
            ${ css(...args) }
        }
    `,

    tablet: (...args) => css`
        @media (max-width: 992px) {
            ${ css(...args) }
        }
    `,

    mobile: (...args) => css`
        @media (max-width: 600px) {
            ${ css(...args) }
        }
    `
});

export const transitions = {
    stretchOut: keyframes`
        0%{
            opacity: 0;
            transform: scale(0.25,0.25);
        }
        100% {
            opacity: 1;
            transform: scale(1, 1);
        }
    `,
    shrinkIn: keyframes`
        0% {
            opacity: 1;
            transform: scale(1,1);
        }
        100% {
            opacity: 1;
            transform: scale(0.25,0.25);
        }
    `
}