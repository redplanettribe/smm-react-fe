import React, { useEffect } from "react";
import styled from "styled-components";

const ContentArea = styled.div`
  padding: ${props => props.theme.spacing(3)};
`;

const Title = styled.h1`
    color: ${props => props.theme.textColors.primary};
    margin-bottom: ${props => props.theme.spacing(1)};
`;

const Linkedin: React.FC = () => {

    useEffect(() => {
        // Get the code from URL
        const code = new URLSearchParams(window.location.search).get('code');
        console.log(code);
        const redirectURI = encodeURIComponent(import.meta.env.VITE_LINKEDIN_REDIRECT_URI);
        console.log(redirectURI);

        if (code) {
            // Immediately send it to your backend
            fetch('/api/auth/linkedin/callback', {
                method: 'POST',
                body: JSON.stringify({ code })
            })
                .then(response => response.json())
                .then(data => {
                    // Store any user session info
                    // Redirect to appropriate page
                    console.log(data);
                });
        }
    }, []);

    return (
        <ContentArea>
            <Title>Linkeding Callback</Title>

        </ContentArea>
    );
};

export default Linkedin;