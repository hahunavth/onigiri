import { Text, View } from 'native-base'
import React, { FC, memo, useMemo } from 'react'
import { StyleSheet, ViewProps, Dimensions } from 'react-native'
import { useColorModeStyle } from '../../hooks/useColorModeStyle'
import useInteraction from '../../hooks/useInteraction'
import { TextSmP, TextSmS } from '../Typo'
// import QuicksandText, { QFontFamily } from '../Common/QuicksandText'

const { width } = Dimensions.get('window')

type Props = Pick<ViewProps, 'style'> & { name: string; numChapter: number }

const HeaderOverlay: FC<Props> = ({ style, name, numChapter }) => {
  const containerStyle = useMemo(() => [styles.container, style], [style])

  const { boxStyle: bs1, textStyle: ts1 } = useColorModeStyle('', 'Secondary')

  const { loading } = useInteraction()

  if (loading) return null

  return (
    <View style={[containerStyle, bs1]}>
      <TextSmP style={styles.title} numberOfLines={1}>
        {name}
      </TextSmP>
      <TextSmS
        // category={"s1"}
        // status={'warning'}
        style={{ opacity: 0.6 }}
      >
        {numChapter} chapters
      </TextSmS>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // margin: 20,
    // marginHorizontal: 60,
    flex: 1,
    justifyContent: 'center',
    // TODO: CHANGE STATUSBAR HEIGHT
    paddingTop: 100,
    marginTop: -100
  },
  title: {
    fontSize: 15,
    maxWidth: width - 158
  }
})

export default memo(HeaderOverlay)
