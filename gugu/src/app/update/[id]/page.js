'use client';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

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
  }, [id]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
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
  }, [id, router])

  const handleInputChange = useCallback((event) => {
    setTitle(event.target.value);
  }, [])

  const handleTextareaChange = useCallback((event) => {
    setBody(event.target.value);
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
    >
      <p>
        <input
          type='text'
          name='title'
          placeholder='title'
          value={title}
          onChange={handleInputChange}
        />
      </p>
      <p>
        <textarea
          name='body'
          placeholder='body'
          value={body}
          onChange={handleTextareaChange}
        ></textarea>
      </p>
      <p>
        <input type='submit' value='update' />
      </p>
    </form>
  );
};

export default Create;
