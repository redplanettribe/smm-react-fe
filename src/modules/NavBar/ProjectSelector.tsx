import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ChevronDownIcon from "../../assets/icons/ChevronDown";
import { projectApi } from "../../api/project/project-api";
import { Project } from "../../api/project/types";
import { getFontStyles } from "../../components/design-system/Typography";
import { setSelectedProject } from "../../store/projects/projectSlice";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import IconPlus from "../../assets/icons/Plus";
import { openModal } from "../../store/modal/modalSlice";

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const ProjectTrigger = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: ${props => props.theme.bgColors.secondary};
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.bgColors.primary};
    }
`;

const ProjectName = styled.span`
    ${({ theme }) => getFontStyles('m_14')(theme)};
    color: ${props => props.theme.textColors.primary};
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background-color: ${props => props.theme.bgColors.primary};
    border: 1px solid ${props => props.theme.dividerColor};
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    display: ${props => (props.$isOpen ? 'block' : 'none')};
    z-index: 1000;
`;

const MenuItem = styled.div`
    padding: 16px;
    ${({ theme }) => getFontStyles('r_14')(theme)};
    color: ${props => props.theme.textColors.primary};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.bgColors.secondary};
    }

    &:not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.dividerColor};
    }
`;

const CreateProjectButton = styled(MenuItem)`
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid ${props => props.theme.dividerColor};
`;

const ProjectSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch: AppDispatch = useDispatch();
    const projectName = useSelector((state: RootState) => state.project.activeProject.name) || 'Select Project';

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleExpand = async () => {
        try {
            const projectList = await projectApi.getProjects();
            setProjects(projectList);
            setIsOpen(!isOpen);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const handleSelectProject = (project: Project) => {
        console.log('Selected project:', project);
        dispatch(setSelectedProject(project.id));
        setIsOpen(false);
    };

    const handleCreateProject = () => {
        console.log('Create Project clicked');
        dispatch(openModal({ type: 'CREATE_PROJECT' }));
    };

    return (
        <Container ref={menuRef}>
            <ProjectTrigger onClick={handleExpand}>
                <ChevronDownIcon />
                <ProjectName>{projectName}</ProjectName>
            </ProjectTrigger>

            <DropdownMenu $isOpen={isOpen}>
                <CreateProjectButton onClick={handleCreateProject}>
                    <IconPlus />
                    Create Project
                </CreateProjectButton>
                {projects && projects.map(project => (
                    <MenuItem
                        key={project.id}
                        onClick={() => handleSelectProject(project)}
                    >
                        {project.name}
                    </MenuItem>
                ))}
            </DropdownMenu>
        </Container>
    );
};

export default ProjectSelector;