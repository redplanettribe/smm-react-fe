import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../design-system/Modal';
import Button from '../design-system/Button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modal/modalSlice';
import { AppDispatch } from '../../store/store';
import { removeRoleFromUser, selectActiveProject } from '../../store/projects/projectSlice';
import { getFontStyles } from '../design-system/Typography';
import { PROJECT_ROLES } from '../../api/project/types';
import { projectApi } from '../../api/project/project-api';
import { mapToRoleID } from '../utility/MapRoleIDs';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const Select = styled.select`
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 6px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  background-color: ${(props) => props.theme.bgColors.secondary};
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('m_14')(theme)};
`;

interface RemoveRoleModalProps {
  userId: string;
  userName: string;
}

const RemoveRoleModal: React.FC<RemoveRoleModalProps> = ({ userId, userName }) => {
  const [userRoles, setUserRoles] = useState<number[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const activeProject = useSelector(selectActiveProject);

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!activeProject) return;

      try {
        const roles = await projectApi.getUserRoles({
          projectID: activeProject.id,
          userID: userId,
        });
        // Convert string roles to numbers and filter out any invalid roles
        const numericRoles = roles.map((role) => mapToRoleID(role));

        setUserRoles(numericRoles);
        if (numericRoles.length > 0) {
          setSelectedRole(numericRoles[0]);
        }
      } catch (error) {
        console.error('Failed to fetch user roles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRoles();
  }, [activeProject, userId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || selectedRole === null) return;

    dispatch(removeRoleFromUser(activeProject.id, userId, selectedRole));
    dispatch(closeModal());
  };

  if (isLoading) {
    return (
      <Modal title={`Remove Role from ${userName}`}>
        <div>Loading roles...</div>
      </Modal>
    );
  }

  if (userRoles.length === 0) {
    return (
      <Modal title={`Remove Role from ${userName}`}>
        <div>No roles available to remove.</div>
        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    );
  }

  return (
    <Modal title={`Remove Role from ${userName}`}>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Select Role to Remove</Label>
          <Select
            value={selectedRole || ''}
            onChange={(e) => setSelectedRole(Number(e.target.value))}
          >
            {userRoles.map((roleId) => (
              <option key={roleId} value={roleId}>
                {PROJECT_ROLES[roleId as keyof typeof PROJECT_ROLES]}
              </option>
            ))}
          </Select>
        </div>

        <ButtonGroup>
          <Button variant="off" onClick={() => dispatch(closeModal())}>
            Cancel
          </Button>
          <Button type="submit">Remove Role</Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default RemoveRoleModal;
