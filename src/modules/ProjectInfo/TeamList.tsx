import styled from 'styled-components';
import { getFontStyles } from '../../components/design-system/Typography';
import Button from '../../components/design-system/Button';
import { useState } from 'react';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectTeam } from '../../store/projects/projectSlice';
import IconThreeDotsHorizontal from '../../assets/icons/ThreeDotsHorizontal';
import { openModal } from '../../store/modal/modalSlice';

const TeamMember = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  padding: 16px;

  &:hover .remove-button {
    opacity: 1;
  }
`;

const OptionsButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px;
  height: auto;
  min-width: auto;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const OptionsMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 32px;
  right: 8px;
  background-color: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 150px;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const OptionItem = styled.div`
  padding: 12px 16px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.bgColors.secondary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.dividerColor};
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const MemberName = styled.div`
  color: ${(props) => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('m_14')(theme)};
`;

const MemberEmail = styled.div`
  color: ${(props) => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_12')(theme)};
`;

const InlineDescriptions = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 4px;
  color: ${(props) => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_14')(theme)};
`;

const TeamList: React.FC = () => {
  const team = useSelector(selectTeam);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  return (
    <Container>
      {team.map((member) => (
        <TeamMember key={member.id}>
          <OptionsButton
            className="remove-button"
            variant="off"
            onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
          >
            <IconThreeDotsHorizontal size={16} />
          </OptionsButton>
          <OptionsMenu $isOpen={openMenuId === member.id}>
            <OptionItem
              onClick={() => {
                setOpenMenuId(null);
                dispatch(
                  openModal({
                    type: 'CONFIRM_REMOVE_USER',
                    props: { userId: member.id, userName: member.name },
                  })
                );
              }}
            >
              Remove User
            </OptionItem>
            <OptionItem
              onClick={() => {
                setOpenMenuId(null);
                dispatch(
                  openModal({
                    type: 'ADD_ROLE',
                    props: { userId: member.id, userName: member.name },
                  })
                );
              }}
            >
              Add Role
            </OptionItem>
            <OptionItem
              onClick={() => {
                setOpenMenuId(null);
                dispatch(
                  openModal({
                    type: 'REMOVE_ROLE',
                    props: {
                      userId: member.id,
                      userName: member.name,
                    },
                  })
                );
              }}
            >
              Remove Role
            </OptionItem>
          </OptionsMenu>
          <MemberName>{member.name}</MemberName>
          <MemberEmail>{member.email}</MemberEmail>
          <InlineDescriptions>
            {member.defaultUser && <>Default User, </>}
            {member.role}
          </InlineDescriptions>
        </TeamMember>
      ))}
    </Container>
  );
};

export default TeamList;
