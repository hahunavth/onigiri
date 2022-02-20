import React from 'react'
import { TouchableOpacity } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { Badge, IBadgeProps, View } from 'native-base'
import { NextLink } from '../NextLink'

type Props = IBadgeProps & {
  onPress?: (id: any) => any
  id?: number
  name?: string | number
}

/**
 * Show genres component
 * Wrap genres list in HStack
 */
export const SelectableBadge = React.memo(function (props: Props) {
  /**
   * STUB: INCREASE PERFORMANCE FOR LONG LIST
   * Rerender button before state in parent component change
   */
  const [toggling, setToggling] = React.useState(false)
  React.useEffect(() => {
    if (toggling)
      props?.onPress ? Promise.resolve(props?.onPress(props.id)) : null
    setToggling(false)
  }, [props.variant, toggling])
  /** */

  return (
    <View
      overflow={'hidden'}
      style={{
        alignSelf: 'center',
        borderRadius: 10,
        marginHorizontal: 2,
        marginBottom: 8
        // marginBottom: 50
      }}
    >
      <TouchableNativeFeedback
        style={{ borderRadius: 10 }}
        onPress={() => {
          setToggling(true)
        }}
        // onPress={() => console.log('first')}
      >
        <Badge
          {...props}
          variant={
            toggling
              ? props.variant === 'subtle'
                ? 'outline'
                : 'subtle'
              : props.variant
          }
          // variant={props.variant}
          colorScheme={'info'}
          rounded={100}
          w={120}
          h={8}
          _text={{ m: 'auto' }}
        >
          {props?.name}
        </Badge>
      </TouchableNativeFeedback>
    </View>
  )
})
