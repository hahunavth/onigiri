import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";

const imgDir = FileSystem.documentDirectory + 'img/';
// const imgFileUri = (imgId: string) => imgDir + `${imgId}.jpg`;
const imgFileUri = (imgId: string, gid: number) =>{

  return imgDir + `${gid++}.jpg`};

const imgUrl = (imgId: string) => `https://hahunavth-express-api.herokuapp.com/api/v1/cors/${imgId}`;

/**
 * Helper function
 * Checks if img directory exists. If not, creates it
 */
async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    console.log("Img directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
}

/**
 * Downloads all gifs specified as array of IDs
 */
export async function addMultipleImgs(imgIds: string[]) {
  try {
    await ensureDirExists();

    // const fileIds = imgIds.map(id => id.replace(/\//g, '%20%').replace(/:/g, '%21%').replace(/\?/g, '%23%'))
    const gid = await AsyncStorage.getItem('download_file_name_gid')
    AsyncStorage.setItem('download_file_name_gid', (Number.parseInt(gid || '0') + imgIds.length).toString())

    console.log('Downloading', imgIds.length, 'img files...');

    const paramsIds = imgIds.map((imgId, id) => ({url: imgUrl(imgId), fileUri: imgFileUri(imgId, Number.parseInt(gid || '0') + id)}))

    await Promise.all(paramsIds.map(p => FileSystem.downloadAsync(p.url, p.fileUri)));
    // console.log(fileIds.map(id => ({url: imgUrl(id), imgFileUri: imgFileUri(id)})))
    console.log('Finished!');
    return paramsIds.map(id => id.fileUri);
  } catch (e) {
    console.error("Couldn't download img files:", e);
  }
}
/*
 file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252Fmy-app-03129072-d077-49aa-b929-b9d3388fe55f
 /img/http:%20%%20%anhtoc.org%20%content%20%image.jpg?data=61wbcDWV8UEGvjUpW3p5kMEX2PamRYlwFpX5UymnuUbajvUjZ0LMaPYu5JNLX4bTDWvqikNJoxEcGG4viMAbDg==

 file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252Fmy-app-03129072-d077-49aa-b929-b9d3388fe55f
 /img/https%21%%20%%20%blogger.googleusercontent.com%20%img%20%a%20%AVvXsEgg-LoZcQ7lmPHf4XyMd80ujkg7BV1KcLMF2nYfyEcKirq56ZqK
 -Sg1mSRQlhuy1Lw4yaForCKGCQMgdWWvhGDKFuIL-ndjNK7InnLeuP7UrKuJWFCzXPgy_ITQEyPzRtSUUcEfpA4ZfVNGBSBIf6vsLUNtJFV8a1W64iAQb4ElTmiyoYCP7Hq42Jt-MQ=s0.jpg
*/
/**
 * Returns URI to our local gif file
 * If our gif doesn't exist locally, it downloads it
 */
// export async function getSingleGif(imgId: string) {
//   await ensureDirExists();

//   const fileUri = imgFileUri(imgId);
//   const fileInfo = await FileSystem.getInfoAsync(fileUri);

//   if (!fileInfo.exists) {
//     console.log("Gif isn't cached locally. Downloading...");
//     await FileSystem.downloadAsync(imgUrl(imgId), fileUri);
//   }

//   return fileUri;
// }

/**
 * Exports shareable URI - it can be shared outside your app
 */
export async function getImgContentUri(gifId: string) {
  return FileSystem.getContentUriAsync(await getSingleGif(gifId));
}

/**
 * Deletes whole giphy directory with all its content
 */
export async function deleteAllImgs() {
  console.log('Deleting all GIF files...');
  await FileSystem.deleteAsync(imgDir);
}
