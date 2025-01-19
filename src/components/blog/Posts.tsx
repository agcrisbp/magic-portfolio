import { getPosts } from '@/app/utils/utils';
import { Grid } from '@/once-ui/components';
import Post from './Post';

interface PostsProps {
  range?: [number] | [number, number];
  columns?: '1' | '2' | '3';
  thumbnail?: boolean;
  tag?: string;
}

export function Posts({ range, columns = '1', thumbnail = false, tag }: PostsProps) {
  let allBlogs = getPosts(['src', 'app', 'blog', 'posts']);
  const filteredBlogs = tag ? allBlogs.filter((post) => post.metadata.tag?.includes(tag)) : allBlogs;

  const sortedBlogs = filteredBlogs.sort((a, b) => {
    const aDate = a.metadata.updatedAt || a.metadata.publishedAt;
    const bDate = b.metadata.updatedAt || b.metadata.publishedAt;

    return new Date(bDate).getTime() - new Date(aDate).getTime();
  });

  const displayedBlogs = range ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length) : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={`repeat(${columns}, 1fr)`} mobileColumns="1col" fillWidth marginBottom="40" gap="m">
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} />
          ))}
        </Grid>
      )}
    </>
  );
}