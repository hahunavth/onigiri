import { MotiView } from 'moti'
import { Platform } from 'react-native'

type Props = {
  transY?: number
  delay?: number
  children: React.ReactNode
  type?: 'spring' | 'timing'
}

export const SideInDownView = ({ transY, delay, children, type }: Props) => {
  return (
    <MotiView
      from={{
        transform: [{ translateY: transY || 100 }]
      }}
      animate={{
        transform: [{ translateY: 0 }]
      }}
      transition={{
        delay: delay || 0,
        // FIXME: UNKNOWN SPRING ANIMATION WORKING ON WEB
        type: Platform.OS === 'web' ? 'timing' : type ? type : undefined
      }}
    >
      {children}
    </MotiView>
  )
}
