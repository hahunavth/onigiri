import * as FileSystem from 'expo-file-system'

// NOTE: Safe image in $HOME_DIR/download/$COMIC/$CHAPTER
const imgDirWithSlash = FileSystem.documentDirectory + 'downloads/'

// NOTE: Encode and decode dir name
function encodeDirName(path: string) {
  return path
    .replace(/\//g, '%1%')
    .replace(/:/g, '%2%')
    .replace(/\./g, '%3%')
    .replace(/=/g, '%4%')
    .replace(/\?/g, '%5%')
}
function decodeDirName(dirName: string) {
  return dirName
    .replace(/\%1\%/g, '/')
    .replace(/\%2\%/g, ':')
    .replace(/\%3\%/g, '.')
    .replace(/\%4\%/g, '=')
    .replace(/\%5\%/g, '?')
}
function getComicDir(comicPath: string) {
  const comicDirName = encodeDirName(comicPath)
  return `${imgDirWithSlash}${comicDirName}/`
}
function getChapterDir(comicPath: string, chapterPath: string) {
  const comicDirName = encodeDirName(comicPath)
  const chapterDirName = encodeDirName(chapterPath)

  return `${imgDirWithSlash}${comicDirName}/${chapterDirName}/`
}

// const imgFileUri = (imgId: string) => imgDir + `gif_${imgId}_200.gif`
function imgFileUri(str: string, comicPath: string, chapterPath: string) {
  const chapterDirWithSlash = getChapterDir(comicPath, chapterPath)
  return (
    chapterDirWithSlash +
    str
      .replace('https://hahunavth-express-api.herokuapp.com/api/v1/cors/', '')
      .replace(/\//g, '%1%')
      .replace(/:/g, '%2%')
      .replace(/\./g, '%3%')
      .replace(/=/g, '%4%')
      .replace(/\?/g, '%5%')
      .replace('http', '') +
    '.jpg'
  )
}

// see https://developers.giphy.com/docs/api/schema#image-object
// const imgUrl = (imgId: string) => `${imgId}`
function imgUrl(str: string, comicPath: string, chapterPath: string) {
  const chapterDirWithSlash = getChapterDir(comicPath, chapterPath)

  return (
    'https://hahunavth-express-api.herokuapp.com/api/v1/cors/' +
    // 'http' +
    str
      .replace(chapterDirWithSlash, '')
      .replace(/\%1\%/g, '/')
      .replace(/\%2\%/g, ':')
      .replace(/\%3\%/g, '.')
      .replace(/\%4\%/g, '=')
      .replace(/\%5\%/g, '?')
      .replace(/.jpg$/, '')
  )
}

/**
 * Helper function
 * Checks if gif directory exists. If not, creates it
 */
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(imgDirWithSlash)
  if (!dirInfo.exists) {
    console.log("Download directory doesn't exist, creating...")
    await FileSystem.makeDirectoryAsync(imgDirWithSlash, {
      intermediates: true
    })
  }
}
async function ensureComicDirExists(comicPath: string) {
  const comicDir = getComicDir(comicPath)
  const dirInfo = await FileSystem.getInfoAsync(comicDir)
  if (!dirInfo.exists) {
    console.log("Comic directory doesn't exist, creating...")
    await FileSystem.makeDirectoryAsync(comicDir, { intermediates: true })
  }
}
async function ensureChapterDirExists(comicPath: string, chapterPath: string) {
  const chapterDir = getChapterDir(comicPath, chapterPath)
  const dirInfo = await FileSystem.getInfoAsync(chapterDir)
  if (!dirInfo.exists) {
    console.log("Comic directory doesn't exist, creating...")
    await FileSystem.makeDirectoryAsync(chapterDir, { intermediates: true })
  }
}

/**
 * Downloads all imgs specified as array of IDs
 */
export async function addMultipleImgs(
  imgIds: string[],
  comicPath: string,
  chapterPath: string
) {
  try {
    await ensureDirExists()
    await ensureComicDirExists(comicPath)
    await ensureChapterDirExists(comicPath, chapterPath)

    console.log('Downloading', imgIds.length, 'img files...')
    await Promise.all(
      imgIds.map((id) => {
        FileSystem.downloadAsync(
          imgUrl(id, comicPath, chapterPath),
          imgFileUri(id, comicPath, chapterPath)
        ).catch((e) => console.log('Download file error'))
        // console.log(imgUrl(id), imgFileUri(id))
      })
    ).then(() => console.log('Done!!!'))
  } catch (e) {
    console.error("Couldn't download gif files:", e)
  }
}

/**
 * Returns URI to our local gif file
 * If our gif doesn't exist locally, it downloads it
 */
export async function getSingleImg(
  gifId: string,
  comicPath: string,
  chapterPath: string
) {
  await ensureDirExists()
  await ensureComicDirExists(comicPath)
  await ensureChapterDirExists(comicPath, chapterPath)

  const fileUri = imgFileUri(gifId, comicPath, chapterPath)
  const fileInfo = await FileSystem.getInfoAsync(fileUri)

  if (!fileInfo.exists) {
    console.log("Gif isn't cached locally. Downloading...")
    await FileSystem.downloadAsync(
      imgUrl(gifId, comicPath, chapterPath),
      fileUri
    )
  }

  return fileUri
}

/**
 * Exports shareable URI - it can be shared outside your app
 */
export async function getImgContentUri(
  imgId: string,
  comicPath: string,
  chapterPath: string
) {
  return FileSystem.getContentUriAsync(
    await getSingleImg(imgId, comicPath, chapterPath)
  )
}

/**
 * Deletes whole giphy directory with all its content
 */
export async function deleteAllImgs() {
  console.log('Deleting all GIF files...')
  await FileSystem.deleteAsync(imgDirWithSlash)
}
export async function deleteComic(path: string) {
  try {
    const comicDirName = getComicDir(path)
    if (comicDirName) await FileSystem.deleteAsync(comicDirName)
    console.log('delete comic')
  } catch (error) {
    console.log('Delete comic fail', error)
  }
}
export async function deleteChapter(comicPath: string, chapterPath: string) {
  try {
    const chapterDirName = getChapterDir(comicPath, chapterPath)
    if (chapterDirName) await FileSystem.deleteAsync(chapterDirName)
    console.log('delete chapter')
  } catch (error) {
    console.log('Delete chapter fail', error)
  }
}
