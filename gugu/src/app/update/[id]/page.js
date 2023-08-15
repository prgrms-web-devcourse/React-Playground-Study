'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, options)
          .then((res) => res.json())
          .then((result) => {
            const lastId = result.id;
            router.push(`/read/${lastId}`);
            router.refresh();
          });
      }}
    >
      <p>
        <input
          type='text'
          name='title'
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name='body'
          placeholder='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type='submit' value='update' />
      </p>
    </form>
  );
};

export default Create;
