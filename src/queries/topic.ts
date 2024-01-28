import supabase from '@/lib/supabase';

export const fetchTopics = async () => {
  const { data: topic, error } = await supabase.from('topic').select('*');

  if (error) throw new Error(error.message);

  return topic;
};

export const fetchAllTopicListWithCount = async () => {
  const { data, error } = await supabase.from('topic').select(`
    id,
    name,
    post!inner(id, topic_id)
  `);

  if (error) throw new Error(error.message);

  return (
    data.map((item) => ({
      id: item.id,
      text: item.name,
      count: item.post?.length || 0,
    })) || []
  );
};
