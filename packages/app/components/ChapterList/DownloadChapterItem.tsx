import ChapterListItem from "./ChapterListItem";

type DownloadChapterItemProps = {
  onPress?: (id: any) => any;
  id?: number;
  name?: string;
  selected?: boolean;
  readCptObj?: {
    [path: string]: number;
  };
  disable?: boolean;
};

export const DownloadChapterItem = ({
  id,
  name,
  onPress,
  selected,
  readCptObj,
  disable
}: DownloadChapterItemProps) => {
  return (
    <ChapterListItem
      chapter={{
        name: name || "unknown",
        path: "",
        updatedAt: "",
        updatedDistance: "",
        updatedVew: 0,
        url: ""
      }}
      id={id || -1}
      comicPath=""
      customOnPress={onPress && (() => onPress(id))}
      selectable
      selected={selected}
      readCptObj={readCptObj}
      disable={disable}
    />
  );
};
