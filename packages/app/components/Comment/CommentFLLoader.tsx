import { View, Text } from 'react-native'
import React from 'react'
import { Comment } from './Comment'
import { useApiComicComment } from '../../store/api'
import { Loading } from '../Loading'
import useInteraction from '../../hooks/useInteraction'
import { CommentFL } from './CommentFL'

type Props = { path?: string }

export const CommentFLLoader = React.memo((props: Props) => {
  const { data } = useApiComicComment(props.path || '')

  const { loading } = useInteraction()

  return <>{data && !loading ? <CommentFL data={data} /> : <Loading />}</>
})
