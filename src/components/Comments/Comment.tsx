import { prettyTime } from "helpers/time";
import Image from "next/image";
import { Fragment, useState } from "react";
import { AlignCenter, SpaceBetween } from "styles/";
import { TComment } from "types/story";
import { styled } from "../../../stitches.config";
import chevronDown from "svgs/chevron_down.svg";
import chevronUp from "svgs/chevron_up.svg";

type Props = {
  comment: TComment;
  op: string;
};

const Author = styled("p", {
  fontSize: "$1",
  color: "$primaryText",
  background: "$codeBlock",
  padding: "4px",
  borderRadius: "4px",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  variants: {
    op: {
      true: {
        color: "#4970CB",
        background: "#1D2433",
      },
    },
  },
});

const OPTag = styled("span", {
  padding: "2px 6px",
  fontSize: "12px",
  borderRadius: "4px",
  background: "$secondaryText",
  color: "$primaryText",
  marginLeft: "8px",
  fontWeight: 500,
});

const Time = styled("p", {
  fontSize: "$1",
  color: "$secondaryText",

  "@phone": {
    fontSize: "$0",
  },
});

const Text = styled("div", {
  fontSize: "$2",

  p: {
    marginBottom: "8px",
    whiteSpace: "break-spaces",
  },

  a: {
    color: "$coloredLink",
  },

  pre: {
    whiteSpace: "break-spaces",
    padding: "8px",
    background: "$codeBlock",
    borderRadius: "4px",
    margin: "8px 0",
    overflowX: "scroll",
  },

  code: {
    "@phone": {
      fontSize: "$1",
    },
  },
});

const DeletedComment = styled("i", {
  color: "$secondaryText",
});

const CommentContainer = styled("div", {
  padding: "0 8px 4px 12px",
  display: "flex",
  flexDirection: "column",
  marginTop: "8px",
  marginBottom: "8px",
  position: "relative",
  width: "100%",
  borderLeft: "2px solid",

  variants: {
    levels: {
      "0": {
        borderLeftColor: "$level0",
      },
      "1": {
        borderLeftColor: "$level1",
      },
      "2": {
        borderLeftColor: "$level2",
      },
      "3": {
        borderLeftColor: "$level3",
      },
      "4": {
        borderLeftColor: "$level4",
      },
      "5": {
        borderLeftColor: "$level5",
      },
      "6": {
        borderLeftColor: "$level6",
      },
      "7": {
        borderLeftColor: "$level7",
      },
    },
  },
});

const CollapseButton = styled("button", {
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
  padding: "4px",
  background: "$codeBlock",
  cursor: "pointer",
  borderRadius: "3px",
  border: "none",

  "&:hover": {
    background: "#4a4e69",
  },
});

const Comment: React.FC<Props> = (props: Props) => {
  const {
    comment: { user, time, content, deleted, level, comments, comments_count },
    op,
  } = props;
  const isCommenterOP = user === op;
  const [collapsed, setCollapsed] = useState<Boolean>(false);

  if (collapsed)
    return (
      <CommentContainer
        css={{
          marginLeft: `calc(16px * ${level})`,
          "@phone": { marginLeft: `calc(8px * ${level})` },
        }}
        levels={level}
      >
        <SpaceBetween css={{ marginBottom: "8px" }}>
          <Author op={isCommenterOP}>
            {user} {isCommenterOP && <OPTag>OP</OPTag>}
          </Author>
          <AlignCenter>
            <CollapseButton onClick={() => setCollapsed(false)}>
              <Image height={14} width={14} src={chevronDown} alt="unhide" />
            </CollapseButton>
            <OPTag css={{ marginLeft: "4px" }}>{comments_count}</OPTag>
          </AlignCenter>
        </SpaceBetween>
      </CommentContainer>
    );

  return (
    <Fragment>
      {/* Indent the children based on the level */}
      <div style={{ display: "flex" }}>
        <CommentContainer
          css={{
            marginLeft: `calc(16px * ${level})`,
            "@phone": { marginLeft: `calc(8px * ${level})` },
          }}
          levels={level}
        >
          {!deleted && (
            <SpaceBetween css={{ marginBottom: "8px" }}>
              <Author op={isCommenterOP}>
                {user} {isCommenterOP && <OPTag>OP</OPTag>}
              </Author>
              <AlignCenter>
                <CollapseButton onClick={() => setCollapsed(true)}>
                  <Image height={14} width={14} src={chevronUp} alt="hide" />
                </CollapseButton>

                <Time>{prettyTime(time)}</Time>
              </AlignCenter>
            </SpaceBetween>
          )}
          {deleted ? (
            <DeletedComment>Comment was deleted :(</DeletedComment>
          ) : (
            <Text dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </CommentContainer>
        {/* // Recursively call the same component for children comments */}
      </div>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} op={op} />
        ))}
    </Fragment>
  );
};

export default Comment;
