async function useFetchTopics() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, {
    cache: 'no-cache',
  });
  return res.json();
}

export default useFetchTopics;
