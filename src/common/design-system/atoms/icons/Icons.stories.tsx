import { Meta, StoryFn } from "@storybook/react";
import { SVGAttributes, createElement } from "react";
import { StorySection } from "../../storybook/StorySection";
import { AddIcon } from "./icons-list/add";
import { AssignmentIndIcon } from "./icons-list/assignment_ind";
import { BackHandIcon } from "./icons-list/back_hand";
import { CallIcon } from "./icons-list/call";
import { CheckCircleIcon } from "./icons-list/check_circle";
import { ChevronLeftIcon } from "./icons-list/chevron_left";
import { ChevronRightIcon } from "./icons-list/chevron_right";
import { ChildCareIcon } from "./icons-list/child_care";
import { CommentIcon } from "./icons-list/comment";
import { CreateNewFolderIcon } from "./icons-list/create_new_folder";
import { DeleteIcon } from "./icons-list/delete";
import { DescriptionIcon } from "./icons-list/description";
import { DoNotDisturbOnIcon } from "./icons-list/do_not_disturb_on";
import { EditNoteIcon } from "./icons-list/edit_note";
import { EventIcon } from "./icons-list/event";
import { FavoriteIcon } from "./icons-list/favorite";
import { GroupIcon } from "./icons-list/group";
import { HomeIcon } from "./icons-list/home";
import { LockIcon } from "./icons-list/lock";
import { MailIcon } from "./icons-list/mail";
import { MarkdownCopyIcon } from "./icons-list/markdown_copy";
import { MoreHorizIcon } from "./icons-list/more_horiz";
import { MoreVertIcon } from "./icons-list/more_vert";
import { OpenInNewIcon } from "./icons-list/open_in_new";
import { PaymentsIcon } from "./icons-list/payments";
import { PersonIcon } from "./icons-list/person";
import { PictureAsPdfIcon } from "./icons-list/picture_as_pdf";
import { PostAddIcon } from "./icons-list/post_add";
import { PreviewIcon } from "./icons-list/preview";
import { SearchIcon } from "./icons-list/search";
import { SettingsIcon } from "./icons-list/settings";
import { ShareIcon } from "./icons-list/share";
import { SlideshowIcon } from "./icons-list/slideshow";
import { TerminalIcon } from "./icons-list/terminal";
import { TuneIcon } from "./icons-list/tune";
import { IconComponent } from "./icons.types";

export default {
  title: "Design System/Atoms/Icons List",
} as Meta<IconComponent>;

const list = [
  AddIcon,
  AssignmentIndIcon,
  BackHandIcon,
  CallIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChildCareIcon,
  CommentIcon,
  CreateNewFolderIcon,
  DeleteIcon,
  DescriptionIcon,
  DoNotDisturbOnIcon,
  EditNoteIcon,
  EventIcon,
  FavoriteIcon,
  GroupIcon,
  HomeIcon,
  LockIcon,
  MailIcon,
  MarkdownCopyIcon,
  MoreHorizIcon,
  MoreVertIcon,
  OpenInNewIcon,
  PaymentsIcon,
  PersonIcon,
  PictureAsPdfIcon,
  PostAddIcon,
  PreviewIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  SlideshowIcon,
  TerminalIcon,
  TuneIcon,
];

interface IconListItemProps {
  icon: IconComponent;
  props: SVGAttributes<SVGSVGElement>;
}

function IconListItem({ icon }: IconListItemProps) {
  return (
    <div title={icon.name}>
      {createElement(icon, {
        width: "2rem",
        height: "2rem",
      })}
    </div>
  );
}

export const IconsList: StoryFn<IconComponent> = (args) => (
  <StorySection title="Icons list" description="Hover over the icons to visualize it's name">
    <div className="flex flex-wrap gap-4">
      {list.map((icon) => (
        <IconListItem key={icon.name} icon={icon} props={args} />
      ))}
    </div>
  </StorySection>
);
IconsList.args = {};
