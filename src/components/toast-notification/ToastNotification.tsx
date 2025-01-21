import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../../store/notifications/notificationSice';
import { getFontStyles } from '../design-system/Typography';

const ToastContainer = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Toast = styled.div<{ type: 'success' | 'error' | 'warning' | 'info' }>`
  min-width: 300px;
  padding: 16px;
  background-color: ${props => props.theme.toastColors[props.type]};
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
  ${({ theme }) => getFontStyles('r_16')(theme)};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  margin-left: 16px;
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