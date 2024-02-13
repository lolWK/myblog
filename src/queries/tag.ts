import supabase from '@/lib/supabase';
import { createClient } from '@/util/supabaseServer';
import { notNull } from '@/util/typeGuard';

/**
 * @description 해당 post에 등록된 tag의 배열을 불러옵니다.
 */
export const fetchTagsForPost = async (
  postId: string
): Promise<Tag[] | null> => {
  const { data, error } = await supabase
    .from('post_tag')
    .select(`tag(id,name)`)
    .eq('post_id', postId);

  if (error) throw new Error(error.message);

  const filteredData = data.map((item) => item.tag).filter(notNull);

  return filteredData.length > 0 ? filteredData : null;
};

/**
 * @description tagName이 테이블에 등록 되어있는 태그인지 체크합니다. 등록 되어있으면 tag를 반환합니다
 */
export const getTagByName = async (
  tagName: string
): Promise<{ id: string } | null> => {
  const { data: tag } = await supabase
    .from('tag')
    .select('id')
    .eq('name', tagName)
    .single();

  if (!tag) return null;

  return tag;
};

/**
 * @description tag테이블에 새 태그를 등록합니다
 * @returns {string} 등록한 tag id를 반환합니다.
 */
export const createNewTag = async (tagName: string): Promise<string> => {
  const supabaseWithAuth = createClient();

  const { data: newTagId, error } = await supabaseWithAuth
    .from('tag')
    .insert([{ name: tagName }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return newTagId.id;
};

/**
 * @description 등록된 post와 tag관계를 삭제합니다.
 */
export const deletePostTag = async (postId: string, tagId: string) => {
  const supabaseWithAuth = createClient();

  const { error } = await supabaseWithAuth
    .from('post_tag')
    .delete()
    .eq('post_id', postId)
    .eq('tag_id', tagId);

  if (error) throw new Error(error.message);

  await deleteUnusedTag(tagId);
};

/**
 * @description 글에서 사용하지 않고 있는 태그를 체크하고 삭제합니다.
 */
export const deleteUnusedTag = async (tagId: string) => {
  const supabaseWithAuth = createClient();

  const { data: existTag, error: checkPostTagError } = await supabase
    .from('post_tag')
    .select('tag_id')
    .eq('tag_id', tagId);

  if (checkPostTagError) throw new Error(checkPostTagError.message);

  if (!existTag || existTag.length === 0) {
    const { error: deleteTagError } = await supabaseWithAuth
      .from('tag')
      .delete()
      .eq('id', tagId);

    if (deleteTagError) throw new Error(deleteTagError.message);
  }
};
