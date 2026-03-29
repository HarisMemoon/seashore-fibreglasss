import type { BlogArticleBlock } from "@seashore/types";

export function BlogArticleBlocks({ blocks }: { blocks: readonly BlogArticleBlock[] }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-navy prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;
        switch (block.type) {
          case "h2":
            return (
              <h2 key={key} className="not-prose font-heading mt-12 scroll-mt-28 text-2xl font-bold text-navy first:mt-0 md:text-3xl">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={key} className="not-prose font-heading mt-8 text-xl font-bold text-navy md:text-2xl">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={key} className="not-prose mt-5 text-base text-slate-600 first:mt-0 md:text-lg md:leading-relaxed">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={key}
                className="not-prose mt-5 list-disc space-y-2 pl-6 text-base text-slate-600 marker:text-turquoise md:text-lg"
              >
                {block.items.map((item) => (
                  <li key={item.slice(0, 64)}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={key}
                className="not-prose mt-5 list-decimal space-y-2 pl-6 text-base text-slate-600 marker:font-semibold marker:text-navy md:text-lg"
              >
                {block.items.map((item) => (
                  <li key={item.slice(0, 64)}>{item}</li>
                ))}
              </ol>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
