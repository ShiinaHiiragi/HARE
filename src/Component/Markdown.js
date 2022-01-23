import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import "katex/dist/katex.min.css";
import "../Interface/Markdown.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { localMarkdown } from "../Interface/Constant";

export default function PackedMarkdown(props) {
  const { children } = props;

  return (
    <ReactMarkdown
      remarkPlugins={[gfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      components={{
        img: ({ node, ...props }) => (
          <img
            style={{ maxWidth: "100%" }}
            alt={props.title}
            {...props}
          />
        ),
        a: ({ node, ...props }) => (
          <a
            target="_blank"
            rel="noreferrer"
            href={props.href}
            children={props.children}
            {...props}
          />
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={vs}
              customStyle={{
                padding: "0",
                margin: "0",
                border: "0",
                fontSize: "0.9rem",
                backgroundColor: "rgb(246, 248, 250)"
              }}
              language={match[1]}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        }
      }}
      // these are valid:
      // <line> <line > <line/> <line /> <line/ > <line / >
      // <line size={}> <line size={8}> <line size={16}>
      // <line size={8} > <line size={8}/> <line size={8}/ >
      // <line size={8} /> <line size={8} / >
      // <line length={8}> <line width={8}>
      // these are invalid:
      // < line> <linesize={8}> </line> <line>8</line>
      children={localMarkdown(children)}
    />
  );
}
