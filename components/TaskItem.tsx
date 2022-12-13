import { Task } from '@prisma/client'
import { useUpdateTask, useGoTrash } from 'queries'
import { MdCheck, MdRestoreFromTrash } from 'react-icons/md'
import { useRef, useState, useEffect, useContext, createContext } from 'react'
// import { FaTrash } from 'react-icons/md'
import styled from 'styled-components'
// import useEffect from 'react';

import Layout from './Layout'

const Card = styled.div`
  display: flex;
  font-size: x-large;
  grid-template-columns: min-content auto;
  gap: 0.75rem;
  align-items: center;
`
const Text = styled.h2`
  margin-right: auto;
  font-size: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const DoneButton = styled.button<{ isDone: boolean }>`
  background: ${props =>
    props.isDone ? 'var(--color-success)' : 'transparent'};
  border-color: ${props =>
    props.isDone ? 'var(--color-success)' : 'var(--color-black-300)'};
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  font-size: inherit;
  display: flex;
  align-items: center;

  svg {
    opacity: ${props => (props.isDone ? '1' : '0')};
  }

  &:not(:disabled):hover {
    background: var(--color-success);
    cursor: pointer;

    svg {
      opacity: 1;
    }
  }

  &:disabled svg {
    color: var(--color-black-400);
  }
`
const TrashButton = styled.button<{ isTrash: boolean }>`
  background: ${props =>
    props.isTrash ? 'var(--color-success)' : 'transparent'};
  border-color: ${props =>
    props.isTrash ? 'var(--color-success)' : 'transparent'};
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  font-size: inherit;
  display: flex;
  align-items: center;
  svg :hover {
    background: var(--color-success);
    cursor: pointer;
    svg {
      opacity: ${props => (props.isTrash ? '1' : '0')};
    }
  }
`

const TaskItem: React.FC<Task> = ({ id, isDone, isTrash, text }) => {
  const { mutateAsync: updateTask } = useUpdateTask({ id })
  // const { mutateAsync: deleteTask } = useDeleteTask({ id })
  const { mutateAsync: goTrash } = useGoTrash({ id })
  // const [count, setCount] = useState(0)
  // const [calculation, setCalculation] = useState(0)
  // const trashCount = useRef(0)

  // useEffect(() => {
  //   trashCount = count
  // }, [count])
  // console.log(trashCount, 'here')

  return (
    <Card>
      <DoneButton
        isDone={!!isDone}
        disabled={!!isDone}
        onClick={() => updateTask({ isDone: true })}
      >
        <MdCheck />
      </DoneButton>
      <Text>{text}</Text>

      <TrashButton
        isTrash={!!isTrash}
        disabled={!!isTrash}
        onClick={() => goTrash({ isTrash: true })}
      >
        <MdRestoreFromTrash />
      </TrashButton>
    </Card>
  )
}

export default TaskItem
