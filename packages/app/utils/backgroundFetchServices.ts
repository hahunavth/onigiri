import { mmkvStorage } from './mmkvStorage'
/**
 *
 * NOTE: SPECIFIC EXPO
 *
 */

import { resComicDetail_T } from 'app/types'
import {
  fetchBackgroundInfo,
  NotificationStoreT
} from './../store/notificationSlice'
import { RootState } from './../store/store'
import { fetchNewChapterNotificationThunk } from '../store/notificationSlice'
import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import React from 'react'
import store from 'app/store/store'
import { triggerBackgroundFetchNotification } from './notification'

export const BACKGROUND_FETCH_TASK = 'background-fetch'

export const fetchBackgroundTask = async () => {
  const now = Date.now()
  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  )
  const str = await mmkvStorage.getItem('background-fetch-last-number')
  const num = Number.parseInt(str || '0') || 0
  await mmkvStorage.setItem(
    'background-fetch-last-number',
    (num + 1).toString()
  )

  async function bg() {
    // instead of notificationSlice/fetchNewChapterNotificationAsync
    const state: RootState = await mmkvStorage
      .getItem('persist:root')
      .then((s) => (s ? JSON.parse(s) : undefined))
    if (state) {
      const notifications: NotificationStoreT['newChapter'] = {}
      const comicPushList: resComicDetail_T[] = []
      await fetchBackgroundInfo(state, notifications, comicPushList, true)
      console.log('bg fetch result: ')
      console.log(notifications)
      await mmkvStorage.setItem(
        'notifications-template',
        JSON.stringify(notifications)
      )
      await mmkvStorage.setItem(
        'comicPushList-template',
        JSON.stringify(comicPushList)
      )
    }
  }
  // await triggerBackgroundFetchNotification()
  // await store.dispatch(fetchNewChapterNotificationThunk())
  // .catch(
  // )

  await bg()
  //
  console.log('background fetch done!')
  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData
}

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, fetchBackgroundTask)

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    // minimumInterval: 60, // 15 minutes
    minimumInterval: 60,
    stopOnTerminate: false, // android only,
    startOnBoot: true // android only
  })
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
}

/**
 * NOTE: USE THIS HOOKS TO ANY COMPONENT
 */
export const useBackgroundPushNotificationInfo = () => {
  const [isRegistered, setIsRegistered] = React.useState(false)
  const [status, setStatus] =
    React.useState<BackgroundFetch.BackgroundFetchStatus | null>(null)

  React.useEffect(() => {
    checkStatusAsync()
  }, [])

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync()
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    )
    setStatus(status)
    setIsRegistered(isRegistered)
  }

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync()
    } else {
      await registerBackgroundFetchAsync()
    }

    checkStatusAsync()
  }

  return {
    isRegistered,
    status,
    checkStatusAsync,
    toggleFetchTask
  }
}
