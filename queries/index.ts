import { Prisma, Task } from '@prisma/client'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const QUERY_KEY_TASKS = 'tasks'

export function useGetTasks() {
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>(`/api/tasks`)
    return data
  }
  return useQuery([QUERY_KEY_TASKS, 'incomplete'], getTasks)
}
export function useCreateTask() {
  const queryClient = useQueryClient()
  const createTask = async (newTask: Prisma.TaskCreateInput) => {
    const { data } = await axios.post<Task>(`/api/tasks`, newTask)
    return data
  }
  return useMutation(createTask, {
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_TASKS])
  })
}
export function useUpdateTask({ id }: { id: Task['id'] }) {
  console.log('update', id)
  const queryClient = useQueryClient()
  const updateTask = async (newTask: Prisma.TaskUpdateInput) => {
    const { data } = await axios.put<Task>(`/api/tasks/${id}`, newTask)
    return data
  }
  return useMutation(updateTask, {
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_TASKS])
  })
}
// export function useDeleteTask({ id }: { id: Task['id'] }) {
//   console.log('delete', id)
//   const queryClient = useQueryClient()
//   const deleteTask = async (delTask: Prisma.TaskDeleteArgs) => {
//     const { data } = await axios.delete<Task>(`/api/tasks/${id}`, delTask)
//     return data
//   }
//   return useMutation(deleteTask, {
//     onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_TASKS])
//   })
// }

export function useGoTrash({ id }: { id: Task['id'] }) {
  const queryClient = useQueryClient()
  const goTrash = async (goTrash: Prisma.TaskUpdateInput) => {
    const { data } = await axios.put<Task>(`/api/tasks/${id}`, goTrash)
    return data
  }
  return useMutation(goTrash, {
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_TASKS])
  })
}

export function useDeleteAll() {
  const queryClient = useQueryClient()
  const deleteAll = async () => {
    console.log('delete')
    const { data } = await axios.delete<Task>(`api/trash`)
    return data
  }
  return useMutation(deleteAll, {
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_TASKS])
  })
}
