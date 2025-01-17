import React, { useEffect } from "react";
import styled from "styled-components";
import { H1 } from "../design-system/Typography";

const ContentArea = styled.div`
  padding: ${props => props.theme.spacing(3)};
`;

const Title = styled(H1)`
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
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