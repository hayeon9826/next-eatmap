import { CommentInterface } from '@/interface';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CommentFormProps {
  storeId: number;
  refetch: any;
}

export default function CommentForm({ storeId, refetch }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<CommentInterface>();

  return (
    <div className="flex items-start space-x-4 my-10">
      <div className="min-w-0 flex-1">
        <form
          onSubmit={handleSubmit(async (data) => {
            const res = await axios.post('/api/comments', {
              ...data,
              storeId,
            });
            if (res.status === 200) {
              toast.success('댓글을 등록했습니다.');
              resetField('body');
              refetch();
            } else {
              toast.error('다시 시도해주세요');
            }
          })}
          className="relative"
        >
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-blue-600">
            <textarea
              rows={3}
              {...register('body', { required: true })}
              className="block w-full min-h-[120px] resize-none border-0 bg-transparent py-2.5 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder=" 댓글을 작성해주세요..."
              defaultValue={''}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                작성하기
              </button>
            </div>
          </div>
        </form>
        {errors?.body?.type === 'required' && (
          <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
        )}
      </div>
    </div>
  );
}
