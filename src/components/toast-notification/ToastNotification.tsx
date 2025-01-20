import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../../store/notifications/notificationSice';

const ToastContainer = styled.div`
  position: fixed;
  top: ${props => props.theme.spacing(2)};
  right: ${props => props.theme.spacing(2)};
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing(1)};
`;

const Toast = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' }>`
  min-width: 300px;
  padding: ${props => props.theme.spacing(2)};
  background-color: ${props => props.theme.toast[props.type]};
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ToastMessage = styled.p`
  color: white;
  margin: 0;
  font-size: ${props => props.theme.fontSizes.body};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: ${props => props.theme.spacing(1)};
  margin-left: ${props => props.theme.spacing(2)};
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const ToastNotification: React.FC = () => {
    const notifications = useSelector((state: RootState) =>
        state.notifications.notifications
    );
    const dispatch = useDispatch();

    return (
        <ToastContainer>
            {notifications.map((notification) => (
                <Toast key={notification.id} type={notification.type}>
                    <ToastMessage>{notification.message}</ToastMessage>
                    <CloseButton onClick={() => dispatch(removeNotification(notification.id))}>
                        ✕
                    </CloseButton>
                </Toast>
            ))}
        </ToastContainer>
    );
};

export default ToastNotification;