// import Image from 'next/image';
// import { Button } from '@heroui/button';

// import { CommentCreateForm } from '@/components/comments';

// type TCommentShowProps = {
//   commentId: string;
// };

// TODO: Get a list of comments
export default function CommentShow() {
  // const comment = comments.find((c) => c.id === commentId);
  //
  // if (!comment) {
  //   return null;
  // }
  //
  // const children = comments.filter((c) => c.parentId === commentId);
  //
  // return (
  //   <div className="mb-1 mt-2 border p-4">
  //     <div className="flex gap-3">
  //       <Image
  //         className="size-10 rounded-full"
  //         src={comment.user.image || ''}
  //         alt="user image"
  //         width={40}
  //         height={40}
  //       />
  //       <div className="flex-1 space-y-3">
  //         <p className="text-sm font-medium text-gray-500">{comment.user.name}</p>
  //         <p className="text-gray-900">{comment.content}</p>
  //
  //         <CommentCreateForm postId={comment.postId} parentId={comment.id} />
  //       </div>
  //     </div>
  //     <div className="pl-4">
  //       {children.map((child) => (
  //         <CommentShow key={child.id} commentId={child.id} comments={comments} />
  //       ))}
  //     </div>
  //   </div>
  // );

  return <div>CommentShow</div>;
}
