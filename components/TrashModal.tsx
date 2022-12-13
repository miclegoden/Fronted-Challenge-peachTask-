import React, { FunctionComponent, useEffect } from 'react'
import { Task } from '@prisma/client'
import styled from 'styled-components'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { useGetTasks, useDeleteAll } from 'queries'
import axios from 'axios'
import NoTasks from 'components/NoTasks'
import { MdCheck, MdRestoreFromTrash } from 'react-icons/md'

export interface ModalProps {
  isShown: boolean
  hide: () => void
  modalContent: JSX.Element
  headerText: string
  setGoTrash: Function
  goTrash: Task[]
}

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  outline: 0;
`
const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`
const StyledModal = styled.div`
  z-index: 100;
  width: 400px;
  height: auto;

  background: white;
  position: relative;
  margin: auto;
  border-radius: 8px;
`

const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
`

const HeaderText = styled.div`
  align-self: center;

  font-size: x-large;
`

const CloseButton = styled.button`
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
  }
`

const Content = styled.div`
  padding: 10px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
`

const Trash = styled.button`
  background: var(--color-secondary-100);
  color: var(--color-black-200);
  font-size: x-large;
  border-color: transparent;
  a {
    background: var(--color-secondary-200);
    border-radius: 6px;
    padding: 0.5rem 1rem;

    &:focus {
      outline-color: var(--color-brand);
    }
    &: hover {
      cursor: pointer;
    }
  }
`

export const TrashModal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  modalContent,
  setGoTrash,
  goTrash
}) => {
  const [deletedata, setDeleteData] = useState<Task[]>([])
  const { mutateAsync: deleteAll } = useDeleteAll()
  const { data: tasks } = useGetTasks()

  useEffect(() => {
    const updateTrashData = async () => {
      const { data } = await axios.get<Task[]>(`api/trash`)
      setGoTrash(data)
    }

    updateTrashData()
  }, [])

  // useEffect(() => {
  //   const UpdateDeleteData = async () => {
  //     const { data } = await axios.delete<Task[]>(`api/trash`)
  //     setDeleteData(data)
  //   }
  //   UpdateDeleteData()
  // }, [])

  console.log(goTrash.length, 'length')
  const modal = (
    <React.Fragment>
      <Backdrop />
      <Wrapper>
        <StyledModal>
          <Header>
            <HeaderText>Trash</HeaderText>
            <Trash onClick={() => deleteAll()}>
              <a>Empty</a>
            </Trash>
            <CloseButton onClick={hide}>X</CloseButton>
          </Header>
          {goTrash.length > 0 ? (
            goTrash.map(task => <Content key={task.id}>{task.text}</Content>)
          ) : (
            <NoTasks emoji='🎉' text="There's nothing here" />
          )}
          <Content>{modalContent}</Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  )
  return isShown ? ReactDOM.createPortal(modal, document.body) : null
}
