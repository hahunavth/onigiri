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
  changeChapter?: (p: Pick<ChapterContextT, 'ctxId' | 'ctxName' | 'ctxPath'>) => any
}

export const ChapterContext = React.createContext<ChapterContextT>({})

export default function ChapterScreenContext (props: ChapterScreenContextProps) {

  const [ctxName, setCtxName] = React.useState('')
  const [ctxId, setCtxId] = React.useState(-1)
  const [ctxPath, setCtxPath] = React.useState('')
  const changeChapter = ({ctxId, ctxName, ctxPath}: Pick<ChapterContextT, 'ctxId' | 'ctxName' | 'ctxPath'>) => {
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

  return <ChapterContext.Provider value={{
    ctxName, setCtxName, ctxId, setCtxId, ctxPath, setCtxPath, changeChapter
  }}>
    {props.children}
  </ChapterContext.Provider>
}
