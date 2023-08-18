import Link from 'next/link';
import './globals.css';
import { Control } from './Control';
import useFetchTopics from '@/hooks/useFetchTopics';

export const metadata = {
  title: 'Next App Practice',
  description: 'Generated by GUGU',
};

export default async function RootLayout({ children }) {
  const topics = await useFetchTopics();

  return (
    <html lang="ko">
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
