type Span = {
  _key: string;
  text: string;
  marks?: string[];
};

type MarkDef = {
  _key: string;
  _type: string;
  href?: string;
};

type Block = {
  _key: string;
  _type: string;
  style?: string;
  listItem?: "bullet" | "number";
  children?: Span[];
  markDefs?: MarkDef[];
};

function renderSpan(span: Span, markDefs: MarkDef[] = []) {
  let content: React.ReactNode = span.text;

  (span.marks || []).forEach((mark) => {
    if (mark === "strong") {
      content = <strong key={mark}>{content}</strong>;
    } else if (mark === "em") {
      content = <em key={mark}>{content}</em>;
    } else if (mark === "underline") {
      content = <u key={mark}>{content}</u>;
    } else if (mark === "code") {
      content = <code key={mark}>{content}</code>;
    } else {
      const linkDef = markDefs.find((def) => def._key === mark);
      if (linkDef?.href) {
        content = (
          <a key={mark} href={linkDef.href} target="_blank" rel="noopener noreferrer">
            {content}
          </a>
        );
      }
    }
  });

  return content;
}

export default function ArticleBody({ blocks }: { blocks?: Block[] }) {
  if (!blocks || blocks.length === 0) return null;

  const elements: React.ReactNode[] = [];
  let listBuffer: { type: "bullet" | "number"; items: React.ReactNode[] } | null = null;

  const flushList = (key: string) => {
    if (!listBuffer) return;
    const Tag = listBuffer.type === "bullet" ? "ul" : "ol";
    elements.push(<Tag key={key}>{listBuffer.items}</Tag>);
    listBuffer = null;
  };

  blocks.forEach((block, index) => {
    if (block._type !== "block") return;

    const key = block._key || `block-${index}`;
    const content = (block.children || []).map((span, i) => (
      <span key={span._key || i}>{renderSpan(span, block.markDefs)}</span>
    ));

    if (block.listItem) {
      if (!listBuffer || listBuffer.type !== block.listItem) {
        flushList(`list-${key}`);
        listBuffer = { type: block.listItem, items: [] };
      }
      listBuffer.items.push(<li key={key}>{content}</li>);
      return;
    }

    flushList(`list-${key}`);

    switch (block.style) {
      case "h1":
      case "h2":
        elements.push(<h2 key={key}>{content}</h2>);
        break;
      case "h3":
        elements.push(<h3 key={key}>{content}</h3>);
        break;
      case "h4":
        elements.push(<h4 key={key}>{content}</h4>);
        break;
      case "blockquote":
        elements.push(<blockquote key={key}>{content}</blockquote>);
        break;
      default:
        elements.push(<p key={key}>{content}</p>);
    }
  });

  flushList("list-final");

  return <>{elements}</>;
}