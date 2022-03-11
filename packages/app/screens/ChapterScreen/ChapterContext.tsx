import React from 'react'

type ChapterScreenContextProps = {
  children: React.ReactNode
}

type ChapterContextT = {
  ctxName?: string
  ctxId?: number
  ctxPath?: string
  setCtxName?: React.Dispatch<React.SetStateAction<string>>
  setCtxId?: React.Dispatch<React.SetStateAction<number>>
  setCtxPath?: React.Dispatch<React.SetStateAction<string>>
  changeChapter?: (
    p: Pick<ChapterContextT, 'ctxId' | 'ctxName' | 'ctxPath'>
  ) => any
  viewStatus?: 'vertical' | 'horizontal'
  setViewStatus?: React.Dispatch<
    React.SetStateAction<'vertical' | 'horizontal'>
  >
}

export const ChapterContext = React.createContext<ChapterContextT>({})

export default function ChapterContextProvider(
  props: ChapterScreenContextProps
) {
  const [viewStatus, setViewStatus] = React.useState<'vertical' | 'horizontal'>(
    'horizontal'
  )
  const [ctxName, setCtxName] = React.useState('')
  const [ctxId, setCtxId] = React.useState(-1)
  const [ctxPath, setCtxPath] = React.useState('')
  const changeChapter = ({
    ctxId,
    ctxName,
    ctxPath
  }: Pick<ChapterContextT, 'ctxId' | 'ctxName' | 'ctxPath'>) => {
    setCtxName((prev) => {
      return ctxName || prev
    })
    setCtxPath((prev) => {
      return ctxPath || prev
    })
    setCtxId((prev) => {
      return ctxId || prev
    })
  }

  return (
    <ChapterContext.Provider
      value={{
        ctxName,
        setCtxName,
        ctxId,
        setCtxId,
        ctxPath,
        setCtxPath,
        changeChapter,
        viewStatus,
        setViewStatus
      }}
    >
      {props.children}
    </ChapterContext.Provider>
  )
}
