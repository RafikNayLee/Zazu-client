import RssFeedIcon from "@material-ui/icons/RssFeed";
import HomeIcon from "@material-ui/icons/Home";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CategoryIcon from "@material-ui/icons/Category";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import PauseIcon from "@material-ui/icons/Pause";
import PlayIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const icons = {
  news: (props) => <RssFeedIcon {...props} />,
  loadFeeds: (props) => <AutorenewIcon {...props} />,
  home: (props) => <HomeIcon {...props} />,
  logout: (props) => <MeetingRoomIcon {...props} />,
  categories: (props) => <CategoryIcon {...props} />,
  read: (props) => <MarkunreadIcon {...props} />,
  delete: (props) => <DeleteIcon {...props} />,
  edit: (props) => <EditIcon {...props} />,
  voice: (props) => <RecordVoiceOverIcon {...props} />,
  play: (props) => <PlayIcon {...props} />,
  pause: (props) => <PauseIcon {...props} />,
};

export default icons;
