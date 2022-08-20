import React from 'react'

function CommentSection({post}) {
  return (
    <>
        {(post.comments.length > 0 && (
            <div className='ml-4 h-20 overflow-y-auto scrollbar-thumb-black scrollbar-thin'>
                {post.comments.map((comment) => {
                    return <div className='flex items-center space-x-2 mb-2' key={comment.id}>
                        <p className='text-md flex-1'>
                            <span className='font-semibold'>{comment.user.username}</span> {comment.content}</p>
                    </div>
                })}
            </div>
        ))}
    </>
  )
}

export default CommentSection