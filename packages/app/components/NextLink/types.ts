import { Link } from 'expo-next-react-navigation'

export declare type NextProps = {
  nextLinkProps?: React.ComponentPropsWithoutRef<typeof Link>
}

export declare type Web = {
  /**
   * Alternative path to override routeName on web.
   */
  path?: string
  /**
   * A custom URL ending to show in the browser address bar instead of the `web.path` or `routeName`.
   *
   * Should start with `/`.
   */
  as?: string
  /**
   * Prefetch the page in the background. Defaults to `true`
   */
  prefetch?: boolean
  /**
   * Scroll to the top of the page after a navigation. Defaults to `true`
   *
   */
  scroll?: boolean
  /**
   * Replace the current history state instead of adding a new url into the stack. Defaults to `false`
   */
  replace?: boolean
  /**
   * Update the path of the current page without rerunning getStaticProps, getServerSideProps or getInitialProps. Defaults to false
   */
  shallow?: boolean
}

export type LinkProps = {
  children: React.ReactNode
  touchableOpacityProps?:
    | import('react-native').TouchableOpacityProps
    | undefined
  touchableNativeFeedbackProps?:
    | import('react-native').TouchableNativeFeedbackProps
    | undefined
  style?: import('react-native').TextStyle | undefined
  routeName: string
  params?: {} | undefined
  web?: Web | undefined
  isText?: boolean | undefined
  native?:
    | {
        screen?: string | undefined
      }
    | undefined
  linkStyle?: import('react-native').TextStyle | undefined
}
