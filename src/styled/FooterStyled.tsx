import styled from 'styled-components';

export const StyledFooter = styled.div`
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .text1{
        font-size: 1rem;
        font-family: Helvetica, Arial, sans-serif;
        text-align: center;
        color: #757677;
    }
    a{
        color: #757677;
        text-decoration: none;
        transition: color 0.3s ease-out, text-decoration 0.3s ease-out;

        &:hover{
            color: #ffffff;
            text-decoration: underline;
        }
    }
    .product-hunt-link{
        margin-top: 1rem;
    }
    .product-hunt-link img{
        width: 200px;
        height: 43px;
    }
`;

export const Button = styled.button`
    background-color: #ffb681;
    color: #000000;
    padding: 0.7rem 2rem;
    width: fit-content;
    font-size: 1rem;
    outline: none;
    border: 1px solid transparent;
    border-radius: 0.4rem;
    margin-bottom: 2rem;
    margin-top: 10rem;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? 0.3 : 1};

    > i{
        margin-left: 1rem;
    }
    .load{
        transform: rotate(0deg);
        animation: load 1s ease-out infinite both;
    }
    @keyframes load{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }

    &.for-mobile{
        display: none;
    }

    &:hover{
        background-color: ${props => !props.disabled && '#ffa665'};
        transition: background-color 0.3s ease-in;
    }

    @media screen and (max-width: 45em){
        &.for-mobile{
            display: block;
            margin-top: 2rem;

            .content{
                font-family: Helvetica, Arial, sans-serif;
                
                > i{
                    margin-left: 0.5rem;
                }

                .warn{
                    margin-top: 0.3rem;
                    font-size: 0.6rem;
                    font-style: italic;
                }
            }
        }
        &.for-desktop{
            display: none;
        }
    }
`;