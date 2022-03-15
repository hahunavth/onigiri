import { View, Text, Button, useColorMode } from 'native-base'
import React from 'react'
import { TextInput } from 'react-native'
import { useAppDispatch } from '../../store/hooks'
import { historyAction } from 'app/store/historySlice'
import { SearchNavigationHeader } from '../../components/NavigationHeader'
import { navigate } from '../../navigators'
import ZoomableImage from '../../components/ZoomableImage'
import { Comment } from '../../components/Comment'

const data = {
  success: true,
  pagination: {
    max: 30,
    page: 2
  },
  count: null,
  data: [
    {
      id: 'jid-16919198',
      username: 'RBLX Trung',
      role: 'Thành viên',
      avatarUrl:
        'https://st.nettruyenmoi.com/data/sites/1/useravatars/807749.jpg?v=1912',
      abbr: '3/1/2022 6:05:40 PM',
      datednf: '8 ngày trước',
      chapterName: 'Chapter 17.5',
      content: 'Truyện này tôi tưởng drop r',
      reply: []
    },
    {
      id: 'jid-16919196',
      username: 'Cờ Lao Ơ Tạc Niệm - Đế Vương',
      role: 'Thành viên',
      avatarUrl:
        'https://st.nettruyenmoi.com/data/sites/1/useravatars/696452.jpg?v=5515',
      abbr: '3/1/2022 6:05:35 PM',
      datednf: '8 ngày trước',
      chapterName: 'Chapter 4',
      content: 'Momo cute ghê Thích mày nhất',
      reply: []
    },
    {
      id: 'jid-16919176',
      username: 'Bét flo ',
      role: 'Thành viên',
      avatarUrl: 'https://s.nettruyenmoi.com/Data/SiteImages/anonymous.png',
      abbr: '3/1/2022 6:03:54 PM',
      datednf: '8 ngày trước',
      content: 'Đù trên ảnh t thấy m700 huyền thoại:))',
      reply: [
        {
          id: 'cmt-16922821',
          username: 'Pie ...',
          role: 'Thành viên',
          abbr: '3/1/2022 10:05:48 PM',
          datednf: '8 ngày trước',
          content: 'Anh bn à '
        },
        {
          id: 'cmt-16932795',
          username: 'Mai Tiến Dũng',
          role: 'Thành viên',
          abbr: '3/2/2022 1:36:16 PM',
          datednf: '7 ngày trước',
          content: 'flo của bạn nạp vjp à '
        }
      ]
    },
    {
      id: 'jid-16918635',
      username: 'ThiÃªn PhÆ°á»›c 29_',
      role: 'Thành viên',
      avatarUrl: 'https://s.nettruyenmoi.com/Data/SiteImages/anonymous.png',
      abbr: '3/1/2022 5:21:02 PM',
      datednf: '8 ngày trước',
      chapterName: 'Chapter 17.5',
      content: 'u la trời có chap mới ròiii',
      reply: []
    },
    {
      id: 'jid-16918605',
      username: 'Phạm Hùng',
      role: 'Thành viên',
      avatarUrl: 'https://s.nettruyenmoi.com/Data/SiteImages/anonymous.png',
      abbr: '3/1/2022 5:18:22 PM',
      datednf: '8 ngày trước',
      chapterName: 'Chapter 17.5',
      content: 'tao đợi lâu lắm rồi mới có chap mới',
      reply: []
    },
    {
      id: 'jid-16918544',
      username: 'Einstein ',
      role: 'Thành viên',
      avatarUrl: 'https://s.nettruyenmoi.com/Data/SiteImages/anonymous.png',
      abbr: '3/1/2022 5:13:28 PM',
      datednf: '8 ngày trước',
      chapterName: 'Chapter 17.5',
      content: 'Bá thế ko ai biết chắc giết cả trường còn đcSát thủ + bắn tỉa',
      reply: []
    },
    {
      id: 'jid-15882331',
      username: 'Thiện Sang',
      role: 'Thành viên',
      avatarUrl: 'https://s.nettruyenmoi.com/Data/SiteImages/anonymous.png',
      abbr: '12/24/2021 12:30:35 AM',
      datednf: '00:30 24/12/21',
      content: 'Sao chưa có chap mới dị',
      reply: [
        {
          id: 'cmt-16918923',
          username: 'Huy Onii-chan',
          role: 'Thành viên',
          abbr: '3/1/2022 5:45:03 PM',
          datednf: '8 ngày trước',
          content: 'Có r nek bạn vào đọc đi'
        }
      ]
    },
    {
      id: 'jid-15597232',
      username: 'Danh Thành',
      role: 'Thành viên',
      avatarUrl:
        'https://st.nettruyenmoi.com/data/sites/1/useravatars/446270.jpg',
      abbr: '12/3/2021 6:59:21 PM',
      datednf: '18:59 03/12/21',
      content:
        'Nếu bạn đam mê các truyện tranh tu tiên, ham mê kết cấu bố cục của các tông môn, gia tộc, lầu các, bảo đường, hiệp hội... Hay nói tóm lại là các thế lực trong tiểu thế giới truyện ấy. Bạn thực sự muốn trải nghiệm thử chiếc cảm giác được làm ông to bà lớn (Ảo), muốn thử cảm giác như một đệ tử thế lực lớn, cảm giác như là một nhân vật trong thế giới đại tu tiên? Hãy vào gr "Mê tu tiên."(muốn vào liên hệ za.lo với số 070.396.9205)',
      reply: []
    },
    {
      id: 'jid-15571819',
      username: 'NGUYá»„N MINH TRÃŒNH',
      role: 'Thành viên',
      avatarUrl: 'https://s.nettruyenmoi.com/Data/SiteImages/anonymous.png',
      abbr: '12/1/2021 9:38:46 PM',
      datednf: '21:38 01/12/21',
      content:
        'Tìm truyện: main tái sinh vào thế giới giả tưởng nơi tất cả mọi người khi sinh ra đều có sự bảo hộ của ít nhất 2 vị thần nhất định trong số 12 vị thần tối cao...theo truyền thuyết A hùng huyền thoại mạnh nhất TG 1000 năm trước đc 5 vị thần bảo hộ...main sinh ra trong gia đình hoàng gia và chỉ có 1 sự bảo hộ của vị thần...bị cho là kẻ vô dụng rẻ rách bị vứt bỏ vào rừng hoang...nhưng ko ai biết rằng sự bảo hộ duy nhất mà mọi người cho rằng vô dụng đó lại là " SỰ BẢO HỘ CỦA TẤT CẢ CÁC VỊ THẦN TỐI CAO", truyện kể về sự trả thù và lập vương quốc của ĐỨA CON CƯNG CỦA CÁC VỊ THẦN.ai có mình xin nha đọc thấy hay mà quên tên r',
      reply: []
    },
    {
      id: 'jid-15565475',
      username: '.Eve .',
      role: 'Thành viên',
      avatarUrl:
        'https://st.nettruyenmoi.com/data/sites/1/useravatars/176374.jpg?v=3438',
      abbr: '12/1/2021 1:07:04 PM',
      datednf: '13:07 01/12/21',
      chapterName: 'Chapter 17',
      content:
        'Này thì có phải là kho đồ hay lưu trữ đou. Gần bằng điều khiển không gian với thời gian r. 🙄 Vừa tấn công vừa thủ, vừa tiện, buff lố vãi. Ai chọn nghề như main rồi lên lv z cx đc skill đấy thì thế giới k đến nỗi gần như bị phá hủy z đou 😃 buff lố zl',
      reply: []
    },
    {
      id: 'jid-15558149',
      username: 'Trần Thảo',
      role: 'Thành viên',
      avatarUrl: 'https://s.nettruyenmoi.com/Data/SiteImages/anonymous.png',
      abbr: '11/30/2021 10:20:36 PM',
      datednf: '22:20 30/11/21',
      chapterName: 'Chapter 3',
      content: 'tôi thấy quả skill lưu trữ được buff lố vler :v',
      reply: [
        {
          id: 'cmt-16919609',
          username: 'Dâm dâm công tử',
          role: 'Thành viên',
          abbr: '3/1/2022 6:36:46 PM',
          datednf: '8 ngày trước',
          content: 'quả lưu trữ bên boruto còn ghê hơn nữa :v'
        }
      ]
    },
    {
      id: 'jid-15530027',
      username: 'Ikki Kurogane',
      role: 'Thành viên',
      avatarUrl:
        'https://st.nettruyenmoi.com/data/sites/1/useravatars/473865.jpg',
      abbr: '11/29/2021 12:32:42 AM',
      datednf: '00:32 29/11/21',
      chapterName: 'Chapter 17',
      content: 'Nhỏ này là hikikomori+yandere à',
      reply: []
    },
    {
      id: 'jid-15522175',
      username: 'Gray / Grey',
      role: 'Thành viên',
      avatarUrl:
        'https://st.nettruyenmoi.com/data/sites/1/useravatars/30892.jpg',
      abbr: '11/28/2021 2:41:28 PM',
      datednf: '14:41 28/11/21',
      chapterName: 'Chapter 17',
      content:
        'kinsplayer là gì vậy? giết người? 2 đứa đc main cứu giết người hồi nào mà skill đấy vậy?',
      reply: [
        {
          id: 'cmt-15536621',
          username: '???',
          role: 'Thành viên',
          abbr: '11/29/2021 2:36:46 PM',
          datednf: '14:36 29/11/21',
          content:
            'Kin là đồng loại á ông kinslayer là giết đồng loại của nóÔng coi bộ kumo desu ga nani ka là biết :))'
        }
      ]
    },
    {
      id: 'jid-15514442',
      username: 'Thiện Huỳnh',
      role: 'Thành viên',
      avatarUrl: 'https://s.nettruyenmoi.com/Data/SiteImages/anonymous.png',
      abbr: '11/27/2021 10:42:44 PM',
      datednf: '22:42 27/11/21',
      chapterName: 'Chapter 14',
      content:
        'nu9 còn là học sinh phải ko? tại chap 10 nó đê cúp học chơi game mà sao chap 12 nó để 1 năm sau khi nghỉ việc là sao? cuối cùng nu9 là học sinh hay đi lảm rồi? Ai cho biết với',
      reply: [
        {
          id: 'cmt-15522165',
          username: 'Duy Diy Hephaestus',
          role: 'Thành viên',
          abbr: '11/28/2021 2:36:30 PM',
          datednf: '14:36 28/11/21',
          content: 'Thì bỏ học xong đi làm thêm, r bỏ làm thêm thành hikki luôn'
        }
      ]
    },
    {
      id: 'jid-15512420',
      username: '. xacraken',
      role: 'Thành viên',
      avatarUrl: 'https://s.nettruyenmoi.com/Data/SiteImages/anonymous.png',
      abbr: '11/27/2021 9:03:39 PM',
      datednf: '21:03 27/11/21',
      chapterName: 'Chapter 17',
      content: 'skill yandere level max ',
      reply: []
    }
  ]
}

export const MainTestScreen = () => {
  const dispatch = useAppDispatch()
  const { toggleColorMode } = useColorMode()
  const [text, setText] = React.useState('')
  return (
    <View>
      {/* <Text>MainTestScreen</Text>
      <Button onPress={() => dispatch(historyAction.reset(null))}>
        Reset history slice
      </Button>
      <Button onPress={() => toggleColorMode()}>Toggle color mode</Button>
      <SearchNavigationHeader />
      <TextInput
        value={text}
        onChangeText={(t) => setText(t)}
        placeholder="Text Input"
      />
      <Button onPress={() => navigate('genres-comic-list')}>
        Genres screen
      </Button>
      <ZoomableImage /> */}

      <Comment data={data} />
    </View>
  )
}
