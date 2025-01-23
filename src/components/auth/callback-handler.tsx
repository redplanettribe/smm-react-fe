import { useParams } from 'react-router-dom';
import LinkedinCallbackHandler from './Linkedin';

const SocialAuthCallback: React.FC = () => {
  const { platform } = useParams();
  switch (platform) {
    case 'linkedin':
      return <LinkedinCallbackHandler />;
    default:
      return null;
  }
};

export default SocialAuthCallback;
