'use server';

import { checkTagInTagTable, createNewTag } from '@/queries/tag';
import { createClient } from '@/util/supabaseServer';

export async function createAndLinkTags(postId: string, userTagsInput: string) {
  const supabaseWithAuth = createClient();

  const tagNams = userTagsInput.split(',').map((tag) => tag.trim());

  let tagIds = [];

  for (let tagName of tagNams) {
    const existingTagId = await checkTagInTagTable(tagName);

    console.log(tagNams);
    console.log('tag', tagName, 'existingTags', existingTagId);

    let tagId: string;

    if (existingTagId) {
      tagId = existingTagId.id;
    } else {
      const newTagId = await createNewTag(tagName);
      tagId = newTagId;
    }

    tagIds.push(tagId);
  }

  const postTagsData = tagIds.map((tagId) => ({
    post_id: postId,
    tag_id: tagId,
  }));

  let { error: postTagsError } = await supabaseWithAuth
    .from('post_tag')
    .insert(postTagsData);

  if (postTagsError) {
    throw new Error(
      `post_tag 저장 중 에러가 발생했어요 ${postTagsError.message}`
    );
  }
  console.log(postTagsError, 'postTagsError');
}
