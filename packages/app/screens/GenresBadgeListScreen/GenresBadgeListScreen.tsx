import { View, Text, FlatList, Badge } from 'native-base'
import React from 'react'
import { GenresBadge } from '../../components/GenresBadge'

import { GENRES_LIST } from '../../utils/findOption'
import { LIST } from './data'

// const LIST = GENRES_LIST.map((g) => ({
//   name: g.item
//   // imageUrl:
//   //   'https://www.google.com/search?q=image&client=firefox-b-d&sxsrf=APq-WBt1pfdllc6lrUHQLRx5FdFlwzJZLg:1647010351812&tbm=isch&source=iu&ictx=1&vet=1&fir=fhzIl1ta5n0KrM%252C-2MmUucYHRkmMM%252C_%253Bp3t5h48HhFbUrM%252CEx9sQ9aDzz1n4M%252C_%253BDH7p1w2o_fIU8M%252CQG4MQQA3E95exM%252C_%253BA4G7eW2zetaunM%252Cl3NoP295SYrYvM%252C_%253Bn5hAWsQ-sgKo_M%252C-UStXW0dQEx4SM%252C_%253BItY9cBsepnqjwM%252C0JWe7yDOKrVFAM%252C_%253BkwgHAQqTiLQXLM%252CR0KnAtfyBDsyiM%252C_%253Bl5RllJHFLw5NyM%252CLOSptVP0p_ZwUM%252C_%253BqXynBYpZpHkhWM%252C4O2GvGuD-Cf09M%252C_%253B2DNOEjVi-CBaYM%252CAOz9-XMe1ixZJM%252C_&usg=AI4_-kRotQM0CL-mxzsEzVW8KIDfR-dqOQ&sa=X&ved=2ahUKEwjl59fXp772AhWTLZQKHX6cBowQ9QF6BAgMEAE#imgrc=fhzIl1ta5n0KrM'
// }))

export const GenresBadgeListScreen = () => {
  return (
    <FlatList
      data={LIST}
      style={{ marginTop: 12 }}
      columnWrapperStyle={{
        justifyContent: 'space-around',
        marginVertical: 8
      }}
      numColumns={2}
      renderItem={({ item }) => {
        return <GenresBadge name={item.name} imageUrl={item.imageUrl} />
      }}
      keyExtractor={(item) => item.name}
    />
  )
}
