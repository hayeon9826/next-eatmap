import Layout from '@/components/Layout';
import Link from 'next/link';

export default function SigninPage() {
  return (
    <Layout>
      <div className="flex h-[calc(100vh-52px)] flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-blue-800 text-center text-2xl font-semibold italic">
            eatmap
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            회원가입
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-2 px-2 !outline-none focus:border-blue-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  비밀번호
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-2 px-2 !outline-none focus:border-blue-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password_confirm"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  비밀번호 확인
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password_confirm"
                  name="password_confirm"
                  type="password"
                  autoComplete="password_confirm"
                  required
                  className="block w-full rounded-md border-0 py-2 px-2 !outline-none focus:border-blue-300 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                회원가입
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            계정이 있으신가요?
            <Link
              href="/users/login"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500 ml-2"
            >
              로그인 하러가기
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
