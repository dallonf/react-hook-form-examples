import * as fs from "node:fs/promises";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{
  pages: string[];
}> = async () => {
  const siblings = await fs.readdir(__dirname);
  console.log(siblings);
  const pages = siblings.filter((s) => s.match(/^[0-9]{2}-.+.js$/));
  return {
    props: {
      pages: pages.map((p) => p.replace(/\.js$/, "")),
    },
  };
};

export default function Home({
  pages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className={`p-2`}>
      <ul>
        {pages.map((page) => (
          <li key={page}>
            <a href={page} className="text-blue-700 underline">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
