import clsx from 'clsx';
import postcomments from '@/content/comments/postcomments';
import { formatDate } from '@/lib/formatDate';

function checker(slug: string): keyof typeof postcomments | false {
  if (slug in postcomments) {
    return slug as keyof typeof postcomments;
  } else {
    return false;
  }
}

export default function Comments({ slug }: { slug: string }) {
  const check = checker(slug);

  if (!check) {
    return null;
  }

  const thread = postcomments[check].comments;

  return (
    <>
      <h2 className="mb-4 mt-16 text-2xl font-bold tracking-tight text-primary-900">
        Comments{' '}
        <small className="text-sm text-stone-400 dark:text-stone-600">
          (archived for posterity)
        </small>
      </h2>
      <ul role="list" className="space-y-6">
        {thread.map((threadItem, threadItemIdx) => (
          <li key={threadItem['@id']} className="relative flex gap-x-4">
            <div
              className={clsx(
                threadItemIdx === thread.length - 1 ? 'h-6' : '-bottom-6',
                'absolute left-0 top-0 flex w-6 justify-center'
              )}
            >
              <div className="w-px bg-gray-200" />
            </div>
            {
              <>
                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                </div>
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">
                        {threadItem.author.name}
                      </span>{' '}
                      commented
                    </div>
                    <time
                      dateTime={threadItem.createdAt}
                      className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                    >
                      {formatDate(threadItem.createdAt)}
                    </time>
                  </div>
                  <div className="prose prose-sm dark:prose-invert">
                    {threadItem.message}
                  </div>
                </div>
              </>
            }
          </li>
        ))}
      </ul>
    </>
  );
}
