import { useParams } from 'react-router-dom';
import LinkedinCallbackHandler from './Linkedin';
import XCallbackHandler from './X';

const SocialAuthCallback: React.FC = () => {
  const { platform } = useParams();
  switch (platform) {
    case 'linkedin':
      return <LinkedinCallbackHandler />;
    case 'x':
      return <XCallbackHandler />;
    default:
      return null;
  }
};

export default SocialAuthCallback;
