// REVIEW: BLUR COMPONENT FOR WEB
// STUB: https://github.com/expo/expo/issues/10810

import * as React from 'react'
import { View } from 'react-native'

type BlurProps = {
  tint: BlurTint
  intensity: number
} & React.ComponentProps<typeof View> & { children?: React.ReactNode }

export type BlurTint = 'light' | 'dark' | 'default'

export type ComponentOrHandle =
  | null
  | number
  | React.Component<any, any>
  | React.ComponentClass<any>

function getBackgroundColor(intensity: number, tint: BlurTint): string {
  const opacity = intensity / 100
  switch (tint) {
    case 'dark':
      // From apple.com
      return `rgba(28,28,28,${opacity * 0.65})`
    case 'light':
      // From https://www.apple.com/newsroom
      return `rgba(255,255,255,${opacity * 0.7})`
    case 'default':
      // From xcode composition
      return `rgba(255,255,255,${opacity * 0.3})`
  }
  throw new Error(`Unsupported tint provided: ${tint}`)
}

export function BlurView({
  tint = 'default',
  intensity = 50,
  style,
  ...props
}: BlurProps) {
  // don't collide this style with other blurs
  // TODO: how should I set this?
  const id = React.useRef(`${Math.random()}`).current
  const blurStyle = getBlurStyle(id, { tint, intensity })
  return (
    <>
      <View
        {...props}
        // @ts-ignore
        dataSet={{ blur: id }}
        style={[style]}
      />
      <style dangerouslySetInnerHTML={{ __html: blurStyle }} />
    </>
  )
}

function getBlurStyle(
  id: string,
  { intensity, tint }: Pick<BlurProps, 'intensity' | 'tint'>
) {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/@supports
  const style = `[data-blur="${id}"] {
  background-color: ${getBackgroundColor(intensity, tint)};
}
@supports (backdrop-filter: blur(1px)) {
  [data-blur="${id}"] {
    backdrop-filter: saturate(180%) blur(${intensity * 0.2}px);
  }
}
@supports (-webkit-backdrop-filter: blur(1px)) {
  [data-blur="${id}"] {
    -webkit-backdrop-filter: saturate(180%) blur(${intensity * 0.2}px);
  }
}`
  return style
}
