'use client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const handleClick = useCallback(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        router.push('/');
        router.refresh();
      });
  }, [id, router]);

  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id && (
        <>
          <li>
            <Link href={`/update/${id}`}>Update</Link>
          </li>
          <li>
            <input type="button" value="delete" onClick={handleClick} />
          </li>
        </>
      )}
    </ul>
  );
}
